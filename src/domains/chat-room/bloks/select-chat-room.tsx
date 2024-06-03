import { useStore } from "@nanostores/react";
import { $chatRooms } from "../stores/chat-rooms.store";
import { debugLog } from "../../../components/debuglog";
import type { FormEvent } from "react";
import { $currentChatRoomId } from "../stores/current-chat-room-id.store";

export const SelectChatRoom = () => {
  const chatRooms = useStore($chatRooms);
  const currentChatRoomId = useStore($currentChatRoomId);

  const update = (event: FormEvent) => {
    if (event.target instanceof HTMLSelectElement) {
      $currentChatRoomId.set(event.target.value);
    }
  };

  return (
    <>
      <select
        onChange={update}
        defaultValue={currentChatRoomId ?? undefined}
        className="border p-2"
      >
        <option value="">Choice one</option>
        {chatRooms.map((chatRoom) => (
          <>
            <option value={chatRoom.id}>
              {chatRoom.model} ({new Date(chatRoom.createdAt).toLocaleString()})
            </option>
          </>
        ))}
      </select>
    </>
  );
};
