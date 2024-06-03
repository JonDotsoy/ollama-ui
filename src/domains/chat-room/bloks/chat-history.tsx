import { useStore } from "@nanostores/react";
import { $currentChatRoom } from "../stores/current-chat-room.store";
import type { FormEvent, KeyboardEvent } from "react";
import { debugLog } from "../../../components/debuglog";
import { $chatRooms } from "../stores/chat-rooms.store";
import { useProcesableChatRoom } from "../hooks/use-procesable-chat-room";
import Markdown from "react-markdown";

export const ChatHistory = () => {
  const chatRoom = useStore($currentChatRoom);
  const pushMessage = useProcesableChatRoom();

  debugLog(chatRoom);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (event.currentTarget instanceof HTMLFormElement) {
      const f = new FormData(event.currentTarget);
      const userMessage = f.get("user-message")?.toString();
      if (!userMessage) return;
      $chatRooms.set(
        $chatRooms.get().map((storedChatRoom) =>
          storedChatRoom === chatRoom
            ? {
                ...chatRoom,
                messages: [
                  ...chatRoom.messages,
                  {
                    id: crypto.randomUUID(),
                    message: userMessage,
                    parent: null,
                    role: "user",
                    createdAt: Date.now(),
                  },
                ],
              }
            : storedChatRoom,
        ),
      );

      event.currentTarget.reset();

      if (chatRoom) pushMessage(chatRoom);
    }
  };

  const formPress = (event: KeyboardEvent) => {
    const target = event.currentTarget;

    if (target instanceof HTMLFormElement) {
      if (event.code === "Enter" && event.bubbles) {
        sendMessage(event);
      }
    }
  };

  return (
    <>
      <div>
        {chatRoom?.messages.map((message) => {
          return (
            <div key={message.id}>
              <div className="pt-2 px-4 flex justify-end">
                <div className="border py-2 px-4 rounded">
                  <Markdown>{message.message}</Markdown>
                </div>
              </div>
              <div className="pb-2 px-4 flex justify-end gap-4">
                {message.processing && (
                  <div className="text-sm text-gray-500">...loading</div>
                )}
                <div className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 scroll-auto">
        <form
          onSubmit={sendMessage}
          className="grid grid-cols-[1fr_auto] gap-2"
          onKeyDown={formPress}
        >
          <textarea
            name="user-message"
            className="border w-full p-2"
          ></textarea>
          <button className="transition-all border px-4 rounded bg-slate-50 hover:bg-slate-100 hover:shadow">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};
