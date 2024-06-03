import useSWRMutation from "swr/mutation";
import type { ChatRoomDTO, MessageDTO } from "../dtos/chat-room.dto";
import ollama from "ollama";
import { $chatRooms } from "../stores/chat-rooms.store";

const mutable = async (chatRoom: ChatRoomDTO) => {
  const messagesRequest =
    $chatRooms
      .get()
      .find((m) => m.id === chatRoom.id)
      ?.messages.map((m) => ({
        role: m.role,
        content: m.message,
      })) ?? [];

  const newAssistantMessage: MessageDTO = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    message: "",
    parent: null,
    role: "assistant",
    processing: true,
  };

  $chatRooms.set([
    ...$chatRooms.get().map((e) =>
      e.id === chatRoom.id
        ? {
            ...e,
            messages: [...e.messages, newAssistantMessage],
          }
        : e,
    ),
  ]);

  const updateStore = () => {
    $chatRooms.set([
      ...$chatRooms.get().map((e) =>
        e.id === chatRoom.id
          ? {
              ...e,
              messages: e.messages.map((m) =>
                m.id === newAssistantMessage.id
                  ? { ...newAssistantMessage }
                  : m,
              ),
            }
          : e,
      ),
    ]);
  };

  for await (const a of await ollama.chat({
    model: chatRoom.model,
    stream: true,
    messages: messagesRequest,
  })) {
    newAssistantMessage.role = a.message.role as any;
    newAssistantMessage.message = `${newAssistantMessage.message}${a.message.content}`;
    updateStore();
  }

  newAssistantMessage.processing = false;
  updateStore();
};

export const useProcesableChatRoom = () => {
  const { isMutating, trigger } = useSWRMutation(
    "cal",
    (_, { arg }: { arg: ChatRoomDTO }) => mutable(arg),
  );

  return (chatRoom: ChatRoomDTO) => {
    trigger(chatRoom);
  };
};
