import { create } from "zustand/react";

interface ChatStore {
  receiverId: string | null;
  setReceiverId: (receiverId: string) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  receiverId: null,
  setReceiverId: (receiverId: string) => set({ receiverId }),
}));

export default useChatStore;
