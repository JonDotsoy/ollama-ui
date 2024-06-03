import type { FormEvent } from "react";
import { SelectChatRoom } from "./bloks/select-chat-room";
import { SelectModel } from "./bloks/select-model";
import { useListModels } from "./hooks/use-listmodels";
import { RenderDebugLog, debugLog } from "../../components/debuglog";
import { useCreateChatRoom } from "./hooks/use-create-chat-room";
import { ChatHistory } from "./bloks/chat-history";
import { useStore } from "@nanostores/react";
import { $currentChatRoom } from "./stores/current-chat-room.store";

export const Panel = () => {
  const currentChatRoom = useStore($currentChatRoom);
  const createChatRoom = useCreateChatRoom();

  const createChat = (event: FormEvent) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const form = new FormData(event.target);

      const model = form.get("model")!.toString();

      createChatRoom.trigger({ model, messages: [] });

      debugLog(model);
    }
    //  const form =    new FormData(event.target)
  };

  return (
    <div className="relative">
      <div className="p-4 sticky top-0 bg-white shadow">
        <form onSubmit={createChat} className="flex gap-2">
          <SelectModel name="model"></SelectModel>
          <button className="border p-2">Crear nuevo chat</button>
        </form>

        <SelectChatRoom></SelectChatRoom>
      </div>

      {currentChatRoom && <ChatHistory></ChatHistory>}

      {/* <RenderDebugLog></RenderDebugLog> */}
    </div>
  );
};
