import { socket } from "@/lib/socket";
import { type Message } from "@/types/models/message";

type MessageCallback = (message: Message) => void;
type JoinCallback = (messages: Message[]) => void;

export class Chat {
  private senderId: string;
  private receiverId: string | null;
  private onMessageCallback?: MessageCallback;
  private onJoinCallback?: JoinCallback;

  constructor(senderId: string, receiverId: string | null) {
    this.senderId = senderId;
    this.receiverId = receiverId;
  }

  connect() {
    socket.emit("join", {
      senderId: this.senderId,
      receiverId: this.receiverId,
    });

    socket.on("join", (history: Message[]) => {
      this.onJoinCallback?.(history);
    });

    socket.on("message", (message: Message) => {
      this.onMessageCallback?.(message);
    });
  }

  disconnect() {
    socket.emit("leave", {
      senderId: this.senderId,
      receiverId: this.receiverId,
    });
    socket.off("join");
    socket.off("message");
  }

  onMessage(callback: MessageCallback) {
    this.onMessageCallback = callback;
  }

  onJoin(callback: JoinCallback) {
    this.onJoinCallback = callback;
  }

  sendMessage(content: string) {
    socket.emit("message", {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content,
    });
  }
}
