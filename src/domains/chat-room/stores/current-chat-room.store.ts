import { computed } from "nanostores";
import { $currentChatRoomId } from "./current-chat-room-id.store";
import { $chatRooms } from "./chat-rooms.store";

export const $currentChatRoom = computed(
  [$currentChatRoomId, $chatRooms],
  (currentChatRoomId, chatRooms) => {
    console.log("updated");
    return (
      chatRooms.find((chatRoom) => chatRoom.id === currentChatRoomId) ?? null
    );
  },
);
