import { type PropsWithChildren } from "react";

import ProfileLayoutContent from "@/features/profile/profile.layout";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return <ProfileLayoutContent>{children}</ProfileLayoutContent>;
};

export default ProfileLayout;
