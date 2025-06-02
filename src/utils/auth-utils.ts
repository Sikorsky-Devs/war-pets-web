import { getMe } from "@/api/auth/auth.api";
import { AUTH_ROUTES, PROTECTED_ROUTES, Routes } from "@/constants/navigation";
import { guestUser, hydrateAuthStore } from "@/store/use-auth-store";
import { type AccountType } from "@/types/models/user";

const isBrowser = typeof window !== "undefined";
const tokenKey = "token";

export const setAuthToken = (token: string) => {
  if (isBrowser) {
    localStorage.setItem(tokenKey, token);
  }
};

export const removeAuthToken = () => {
  if (isBrowser) {
    localStorage.removeItem(tokenKey);
  }
};

export const getAuthToken = () => {
  if (isBrowser) {
    return localStorage.getItem(tokenKey);
  }
  return null;
};

export const generateAuthHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUser = async () => {
  const user = await getMe();
  hydrateAuthStore(user);
};

export const logoutUser = () => {
  hydrateAuthStore(guestUser);
};

export const isGuest = (accountType: AccountType) => {
  return accountType === "GUEST";
};

export const isShelter = (accountType: AccountType) => {
  return accountType === "SHELTER";
};

export const getRedirectPath = (pathname: Routes, userRole: AccountType) => {
  if (AUTH_ROUTES.includes(pathname) && !isGuest(userRole)) {
    return Routes.Home;
  }

  if (PROTECTED_ROUTES.includes(pathname) && isGuest(userRole)) {
    return Routes.SignIn;
  }
};
