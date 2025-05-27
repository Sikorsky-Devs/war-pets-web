import { type Metadata } from "next";

import ProfileFactory from "@/features/profile/components/profile-factory";

export const metadata: Metadata = {
  title: "Профіль",
};

const Profile = () => {
  return <ProfileFactory />;
};

export default Profile;
