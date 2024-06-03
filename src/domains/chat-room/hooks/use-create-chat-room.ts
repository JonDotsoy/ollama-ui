import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import ollama from "ollama";
import type { ChatRoomDTO } from "../dtos/chat-room.dto";
import { $chatRooms } from "../stores/chat-rooms.store";
import { $currentChatRoomId } from "../stores/current-chat-room-id.store";

const createChatRoom = async (
  chatRoom: Pick<ChatRoomDTO, Exclude<keyof ChatRoomDTO, "id" | "createdAt">>,
) => {
  const c: ChatRoomDTO = {
    ...chatRoom,
    createdAt: Date.now(),
    id: crypto.randomUUID(),
  };
  $chatRooms.set([...$chatRooms.get(), c]);
  $currentChatRoomId.set(c.id);
  // const chat = await ollama.chat({
  //     model: c.model,
  // })
};

export const useCreateChatRoom = () => {
  const { trigger, isMutating } = useSWRMutation(
    "ollama.chat",
    (
      _key,
      {
        arg: partialChatRoom,
      }: {
        arg: Pick<ChatRoomDTO, Exclude<keyof ChatRoomDTO, "id" | "createdAt">>;
      },
    ) => createChatRoom(partialChatRoom),
  );

  return {
    trigger: async (
      chatRoom: Pick<
        ChatRoomDTO,
        Exclude<keyof ChatRoomDTO, "id" | "createdAt">
      >,
    ) => {
      await trigger(chatRoom);
    },
    isLoading: isMutating,
  };
};
