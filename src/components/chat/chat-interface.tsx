"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { subHours } from "date-fns/subHours";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getUserChats } from "@/api/users/users.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { ACCOUNT_TYPE_MAPPER } from "@/constants/mappers";
import { socket } from "@/lib/socket";
import useAuthStore from "@/store/use-auth-store";
import useChatStore from "@/store/use-chat-store";
import { type User } from "@/types/user";
import { isShelter } from "@/utils/auth-utils";
import { getUserName } from "@/utils/user-utils";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  from: "VOLUNTEER" | "SHELTER";
  shelterId: string;
  volunteerId: string;
  shelter?: User;
  volunteer?: User;
}

const ChatInterface = () => {
  const user = useAuthStore((state) => state.user);
  const { receiverId } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Привіт! Як справи?",
      createdAt: subHours(new Date(), 2).toISOString(),
      from: "VOLUNTEER",
      shelterId: "",
      volunteerId: user?.id || "",
      volunteer: user,
    },
    {
      id: "2",
      content: "Привіт! Все добре, дякую. А у тебе?",
      createdAt: subHours(new Date(), 2).toISOString(),
      from: "SHELTER",
      shelterId: user?.id || "",
      volunteerId: "",
      shelter: user,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit("join", {
      senderId: user.id,
      receiverId,
    });

    socket.on("join", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("join");
      socket.off("message");
      socket.emit("leave", {
        senderId: user.id,
        receiverId,
      });
    };
  }, [user?.id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !user?.id) return;

    const messageData = {
      senderId: user.id,
      receiverId,
      content: newMessage,
    };

    socket.emit("message", messageData);
    setNewMessage("");
  };

  const isOwnMessage = (message: Message) => {
    if (!user?.id) return false;

    if (user.accountType === "VOLUNTEER") {
      return message.volunteerId === user.id;
    } else {
      return message.shelterId === user.id;
    }
  };

  const getSenderName = (message: Message) => {
    if (isOwnMessage(message)) return "You";

    if (message.from === "VOLUNTEER") {
      return (
        message.volunteer?.name ?? message.volunteer?.firstName ?? "Volunteer"
      );
    } else {
      return message.shelter?.name ?? message.shelter?.firstName ?? "Shelter";
    }
  };

  const getSenderAvatar = (message: Message) => {
    if (isOwnMessage(message)) return user?.avatarLink;

    if (message.from === "VOLUNTEER") {
      return message.volunteer?.avatarLink;
    } else {
      return message.shelter?.avatarLink;
    }
  };

  return (
    <div className="flex w-full flex-col shadow-lg">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            image={user?.avatarLink}
            isShelter={isShelter(user.accountType)}
          />
          <div>
            <div className="font-semibold">
              {getUserName(user.name, user.firstName, user.lastName)}
            </div>
            <div className="text-sm text-muted-foreground">
              {ACCOUNT_TYPE_MAPPER[user?.accountType]}
            </div>
          </div>
        </div>
      </div>

      {receiverId ? (
        <div
          ref={messagesContainerRef}
          className="no-scrollbar h-[300px] space-y-4 overflow-y-auto p-4"
        >
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex ${isOwnMessage(message) ? "justify-end" : "justify-start"} mb-4`}
            >
              {!isOwnMessage(message) && (
                <UserAvatar
                  image={getSenderAvatar(message)}
                  className="mr-2 h-8 w-8 flex-shrink-0"
                />
              )}

              <div
                className={`max-w-[70%] ${isOwnMessage(message) ? "order-1" : "order-2"}`}
              >
                <div
                  className={`flex items-baseline ${isOwnMessage(message) ? "justify-end" : "justify-start"} mb-1`}
                >
                  <span className="text-sm font-semibold">
                    {getSenderName(message)}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {format(new Date(message.createdAt), "HH:mm")}
                  </span>
                </div>

                <div
                  className={`break-words rounded-2xl px-3 py-2 text-sm ${
                    isOwnMessage(message)
                      ? "rounded-tr-none bg-primary text-primary-foreground"
                      : "rounded-tl-none bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>

              {isOwnMessage(message) && (
                <UserAvatar
                  image={user?.avatarLink}
                  className="ml-2 h-8 w-8 flex-shrink-0"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid h-[300px] place-items-center text-center text-muted-foreground">
          Виберіть чат, щоб почати спілкування
        </div>
      )}

      <div className="mt-auto w-full border-t p-4">
        <form onSubmit={sendMessage} className="flex w-full items-center gap-2">
          <Input
            placeholder="Введіть повідомлення..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon" className="inline-flex">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
