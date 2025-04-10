"use client";

import { usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

import { Routes } from "@/constants/navigation";
import { getMe } from "@/features/auth/api/auth-api";
import useAuthStore, {
  guestUser,
  hydrateAuthStore,
} from "@/store/use-auth-store";
import { getAuthToken, getUser } from "@/utils/auth-utils";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = getAuthToken();

  const fetchUser = async () => {
    try {
      await getUser();
    } catch (e) {
      hydrateAuthStore(guestUser);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser().catch((error) => console.error(error));
  }, [token]);

  return <>{children}</>;
};

export default AuthProvider;
