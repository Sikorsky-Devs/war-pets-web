"use client";

import { type PropsWithChildren, useEffect } from "react";

import { guestUser, hydrateAuthStore } from "@/store/use-auth-store";
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
