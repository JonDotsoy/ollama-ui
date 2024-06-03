import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { ChatRoomDTO } from "../dtos/chat-room.dto";

export const $chatRooms = persistentAtom<ChatRoomDTO[]>("chat-rooms", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
