"use client";

import { type ReactNode } from "react";

import ProfilePage from "@/features/profile/profile.page";
import ShelterProfilePage from "@/features/profile/shelter-profile.page";
import useAuthStore from "@/store/use-auth-store";
import { type AccountType } from "@/types/user";

const contents: Record<AccountType, ReactNode> = {
  GUEST: null,
  VOLUNTEER: <ProfilePage />,
  SHELTER: <ShelterProfilePage />,
};

const ProfileFactory = () => {
  const { user } = useAuthStore();
  const accountType = user?.accountType || "GUEST";
  const Component = contents[accountType];

  return Component;
};

export default ProfileFactory;
