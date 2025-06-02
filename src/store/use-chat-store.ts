import { create } from "zustand/react";

import { type User } from "@/types/models/user";

interface ChatState {
  isChatOpen: boolean;
  chats: User[];
  receiverId: string | null;
}

interface ChatActions {
  setIsChatOpen: (isChatOpen: boolean) => void;
  setChats: (chats: User[]) => void;
  addChat: (chat: User) => void;
  setReceiverId: (receiverId: string) => void;
}

const useChatStore = create<ChatState & ChatActions>((set) => ({
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
