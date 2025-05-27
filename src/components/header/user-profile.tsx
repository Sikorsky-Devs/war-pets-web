"use client";

import Link from "next/link";

import AuthButtons from "@/components/header/auth-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";
import { isGuest, isShelter } from "@/utils/auth-utils";
import { cn } from "@/utils/styles-utils";
import { getAccountType, getUserName } from "@/utils/user-utils";

const UserProfile = () => {
  const { user, isLoading } = useAuthStore();

  const accountType = getAccountType(user?.accountType);
  const userName = getUserName(user?.name, user?.firstName, user?.lastName);
  const isUserShelter = isShelter(user?.accountType);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (isGuest(user.accountType) && !isLoading) return <AuthButtons />;

  return (
    <Link
      href={Routes.Profile}
      className={cn(
        "flex items-center justify-center gap-3 hover:bg-transparent",
      )}
    >
      <div className="flex flex-col">
        <span className="text-right text-sm font-medium">
          {userName ?? user?.email}
        </span>
        <span className="text-right text-xs text-muted-foreground">
          {accountType}
        </span>
      </div>
      <UserAvatar image={user?.avatarLink} isShelter={isUserShelter} />
    </Link>
  );
};

export default UserProfile;
