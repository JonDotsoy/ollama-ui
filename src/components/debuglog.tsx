import { useStore } from "@nanostores/react";
import { $recordLogs } from "./$recordLogs";

export const debugLog = (message: unknown) => {
  if (typeof message === "string") {
    $recordLogs.set([...$recordLogs.get(), { timestamp: new Date(), message }]);
    return;
  }

  try {
    $recordLogs.set([
      ...$recordLogs.get(),
      { timestamp: new Date(), message: JSON.stringify(message, null, 2) },
    ]);
  } catch {
    $recordLogs.set([
      ...$recordLogs.get(),
      { timestamp: new Date(), message: String(message).toString() },
    ]);
  }
};

export const RenderDebugLog = () => {
  const messages = useStore($recordLogs);
  return (
    <>
      <div className="flex flex-col-reverse gap-2 p-2">
        {messages.map((message) => {
          return (
            <div
              id={`${message.timestamp}`}
              className="border p-4 bg-gray-50 shadow-sm rounded"
            >
              <div className="text-gray-400 text-sm">
                {message.timestamp.toLocaleString()}
              </div>
              <pre className="overflow-scroll">
                <code>{message.message}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </>
  );
};
