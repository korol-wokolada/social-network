import { ChatMessagesType } from "./Api";
type SubscriberType = (messages: ChatMessagesType[]) => void;

let socket: WebSocket | null = null;
let subscribers = [] as SubscriberType[];

export function messageHandler(e: MessageEvent) {
  let newMessage = JSON.parse(e.data);
  console.log(newMessage);
  subscribers.forEach((s) => s(newMessage));
}

function closeHandler() {
  console.log("close WS");
  setTimeout(createChannel, 3000);
}
export function createChannel() {
  socket?.removeEventListener("close", closeHandler);

  socket = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  subscribers = [];
  socket.addEventListener("close", closeHandler);
  socket.addEventListener("message", messageHandler);
}

export const ChatApi = {
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
  },
  unsubscribe(callback: SubscriberType) {
    subscribers.filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    socket?.send(message);
  },
  start() {
    createChannel();
  },
  stop() {
    socket?.removeEventListener("close", closeHandler);
    socket?.removeEventListener("message", messageHandler);
  },
};
