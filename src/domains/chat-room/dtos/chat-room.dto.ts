export type MessageDTO = {
  role: "system" | "user" | "assistant";
  id: string;
  message: string;
  parent: null | string;
  createdAt: number;
  processing?:boolean
};

export type ChatRoomDTO = {
  id: string;
  createdAt: number;
  model: string;
  messages: MessageDTO[];
};
