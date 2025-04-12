"use client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import ProfileCardSkeleton from "@/features/profile/components/profile-card-skeleton";
import UpdateProfileModal from "@/features/profile/components/update-profile-modal";
import useUserQuery from "@/features/profile/hooks/use-user-query";
import useAuthStore from "@/store/use-auth-store";
import { logoutUser, removeAuthToken } from "@/utils/auth-utils";
import { getAccountType, getFullName } from "@/utils/user-utils";

import { profileData } from "../../../../data/profile-data";

const ProfileCard = () => {
  const { replace } = useRouter();
  const {
    user: { id },
  } = useAuthStore();

  const { user, isPending } = useUserQuery(id);

  if (isPending) {
    return <ProfileCardSkeleton />;
  }

  const accountType = getAccountType(user?.accountType);
  const fullName = getFullName(
    user?.firstName,
    user?.lastName,
    user?.middleName,
  );

  const handleSignOut = () => {
    removeAuthToken();
    replace(Routes.Home);
    logoutUser();
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Badge className="absolute -left-2 -top-2">{accountType}</Badge>
          <div className="flex flex-col items-center">
            <div>
              <UserAvatar
                size={24}
                image={user?.avatarLink}
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {profileData.contactInfo.map((item, index) => {
            const Icon = item.icon as React.ElementType;
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {item.isLink ? (
                  <Link
                    href={item.href ?? "#"}
                    className="text-sm text-primary hover:underline"
                  >
                    {item.content}
                  </Link>
                ) : (
                  <span className="text-sm">{item.content}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex w-full gap-2 flex-wrap">

          <UpdateProfileModal />
          <Button
            icon={<LogOutIcon />}
            className="w-full"
            variant="destructive"
            onClick={handleSignOut}
          >
            Вийти
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
