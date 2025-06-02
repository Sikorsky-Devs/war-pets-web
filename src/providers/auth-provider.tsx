"use client";

import { usePathname, useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

import { type Routes } from "@/constants/navigation";
import useAuthStore, {
  guestUser,
  hydrateAuthStore,
} from "@/store/use-auth-store";
import { getAuthToken, getRedirectPath, getUser } from "@/utils/auth-utils";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = getAuthToken();
  const { replace } = useRouter();
  const { user } = useAuthStore();
  const pathname = usePathname() as Routes;

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

  useEffect(() => {
    const redirectPath = getRedirectPath(pathname, user.accountType);
    console.log(user);
    if (redirectPath) {
      replace(redirectPath);
    }
  }, [user, pathname]);

  return <>{children}</>;
};

export default AuthProvider;
