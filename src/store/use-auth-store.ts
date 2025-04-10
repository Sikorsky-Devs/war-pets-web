import { create } from "zustand/react";

import { type User } from "@/types/user";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
}

const useAuthStore = create<AuthStore>(() => ({
  user: null,
  isLoading: true,
}));

export const hydrateAuthStore = (initialState: User | null) => {
  useAuthStore.setState({ user: initialState, isLoading: false });
};

export default useAuthStore;
