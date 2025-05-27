import { type PropsWithChildren } from "react";

import ProfileCard from "@/features/profile/components/cards/profile-card";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
      <div className="space-y-6 md:col-span-1">
        <ProfileCard />
      </div>

      <div className="space-y-6 md:col-span-2">{children}</div>
    </div>
  );
};

export default ProfileLayout;
