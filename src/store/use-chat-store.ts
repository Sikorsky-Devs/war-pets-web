import { create } from "zustand/react";

import { type User } from "@/types/user";

interface ChatStore {
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
  chats: User[];
  setChats: (chats: User[]) => void;
  addChat: (chat: User) => void;
  receiverId: string | null;
  setReceiverId: (receiverId: string) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  isChatOpen: false,
  setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
  chats: [],
  setChats: (chats: User[]) => set({ chats }),
  addChat: (chat: User) =>
    set((state) => {
      const alreadyExists = state.chats.some((c) => c.id === chat.id);
      if (alreadyExists) return state;
      return { chats: [chat, ...state.chats] };
    }),
  receiverId: null,
  setReceiverId: (receiverId: string) => set({ receiverId }),
}));

export default useChatStore;
