import type { FormEvent } from "react";
import { SelectChatRoom } from "./bloks/select-chat-room";
import { SelectModel } from "./bloks/select-model";
import { useListModels } from "./hooks/use-listmodels";
import { RenderDebugLog, debugLog } from "../../components/debuglog";
import { useCreateChatRoom } from "./hooks/use-create-chat-room";
import { ChatHistory } from "./bloks/chat-history";

export const Panel = () => {
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
    <>
      <div className="p-4">
        <form onSubmit={createChat} className="flex gap-2">
          <SelectModel name="model"></SelectModel>
          <button className="border p-2">Crear nuevo chat</button>
        </form>

        <SelectChatRoom></SelectChatRoom>
      </div>

      <ChatHistory></ChatHistory>

      <RenderDebugLog></RenderDebugLog>
    </>
  );
};
