"use client";

import { format } from "date-fns";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { ACCOUNT_TYPE_MAPPER } from "@/constants/mappers";
import { Chat } from "@/lib/chat";
import useAuthStore from "@/store/use-auth-store";
import useChatStore from "@/store/use-chat-store";
import { type Message } from "@/types/models/message";
import { isShelter } from "@/utils/auth-utils";
import { cn } from "@/utils/styles-utils";
import { getUserName } from "@/utils/user-utils";

const ChatInterface = () => {
  const user = useAuthStore((state) => state.user);
  const { chats, receiverId } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const chat = new Chat(user.id, receiverId);

  useEffect(() => {
    if (!user?.id || !receiverId) return;

    chat.onJoin((history) => {
      setMessages(history);
    });

    chat.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });

    chat.connect();

    return () => {
      chat.disconnect();
    };
  }, [user?.id, receiverId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user?.id || !receiverId) return;

    chat.sendMessage(newMessage.trim());
    setNewMessage("");
  };

  const isOwnMessage = (message: Message) => {
    if (!user?.id) return false;
    return message.from === "VOLUNTEER"
      ? message.volunteerId === user.id
      : message.shelterId === user.id;
  };

  const getSenderName = (message: Message) => {
    if (isOwnMessage(message)) return "";

    const name =
      message.from === "VOLUNTEER"
        ? message.volunteer?.name
        : message.shelter?.name;

    const firstName =
      message.from === "VOLUNTEER"
        ? message.volunteer?.firstName
        : message.shelter?.firstName;

    const lastName =
      message.from === "VOLUNTEER"
        ? message.volunteer?.lastName
        : message.shelter?.lastName;

    return getUserName(name, firstName, lastName);
  };

  const getSenderAvatar = (message: Message) => {
    if (isOwnMessage(message)) return user?.avatarLink;
    return message.from === "VOLUNTEER"
      ? message.volunteer?.avatarLink
      : message.shelter?.avatarLink;
  };

  return (
    <div className="flex w-full flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <UserAvatar
            image={user?.avatarLink}
            isShelter={isShelter(user.accountType)}
            className="h-8 w-8 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-semibold">
              {getUserName(user.name, user.firstName, user.lastName)}
            </div>
            <div className="text-[12px] text-muted-foreground">
              {ACCOUNT_TYPE_MAPPER[user?.accountType]}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Selector */}
      {chats && (
        <div className="overflow-x-auto border-b px-4 py-2">
          <div className="flex w-max gap-2">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={chat.id === receiverId ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-2 py-1"
                onClick={() => useChatStore.setState({ receiverId: chat.id })}
              >
                <UserAvatar
                  image={chat.avatarLink}
                  isShelter={isShelter(chat.accountType)}
                  className="h-6 w-6 flex-shrink-0"
                />
                <div className="text-left">
                  <div className="max-w-[100px] truncate text-xs font-medium">
                    {getUserName(chat.name, chat.firstName, chat.lastName)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {ACCOUNT_TYPE_MAPPER[chat.accountType]}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message List */}
      {messages.length ? (
        <div
          ref={messagesContainerRef}
          className="no-scrollbar h-[300px] space-y-4 overflow-y-auto p-4"
        >
          {messages.map((message) => {
            const isOwn = isOwnMessage(message);
            return (
              <div
                key={message.id}
                className={cn(
                  "mb-4 flex",
                  isOwn ? "justify-end" : "justify-start",
                )}
              >
                {!isOwn && (
                  <UserAvatar
                    image={getSenderAvatar(message)}
                    className="mr-2 h-8 w-8 flex-shrink-0"
                  />
                )}
                <div
                  className={cn("max-w-[70%]", isOwn ? "order-1" : "order-2")}
                >
                  <div
                    className={cn(
                      "mb-1 flex items-baseline",
                      isOwn ? "justify-end" : "justify-start",
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {getSenderName(message)}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {format(new Date(message.createdAt), "HH:mm")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-fit break-words rounded-2xl px-3 py-2 text-sm",
                      isOwn
                        ? "rounded-tr-none bg-primary text-primary-foreground"
                        : "rounded-tl-none bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
                {isOwn && (
                  <UserAvatar
                    image={user?.avatarLink}
                    className="order-last ml-2 h-8 w-8 flex-shrink-0"
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid h-[300px] place-items-center text-center text-muted-foreground">
          Почніть спілкування
        </div>
      )}

      {/* Input */}
      <div className="mt-auto w-full border-t p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center gap-2"
        >
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
