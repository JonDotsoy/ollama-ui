import { atom } from "nanostores";

export const $recordLogs = atom<{ timestamp: Date; message: string }[]>([]);
