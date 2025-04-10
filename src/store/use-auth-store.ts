import { create } from "zustand/react";

import { type User } from "@/types/user";

export const guestUser: User = {
  id: "1",
  name: null,
  email: "",
  accountType: "GUEST",
  firstName: null,
  lastName: null,
  middleName: null,
  avatarLink: null,
};

interface AuthStore {
  user: User;
  isLoading: boolean;
}

const useAuthStore = create<AuthStore>(() => ({
  user: guestUser,
  isLoading: true,
}));

export const hydrateAuthStore = (initialState: User) => {
  useAuthStore.setState({ user: initialState, isLoading: false });
};

export default useAuthStore;
