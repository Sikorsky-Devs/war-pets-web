import type {Metadata} from "next";

import ShelterPage from "@/features/shelter/shelter.page";

export const metadata: Metadata = {
  title: "Притулки",
}

const Shelter = () => {
  return <ShelterPage />;
};

export default Shelter;
