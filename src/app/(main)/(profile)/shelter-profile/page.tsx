import {type Metadata} from "next";

import ShelterPage from "@/features/shelter-profile/shelter-profile.page";

export const metadata: Metadata = {
  title: "Профіль",
}

const ShelterProfile = () => {
  return <ShelterPage />;
};

export default ShelterProfile;