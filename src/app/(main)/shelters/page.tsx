import {type Metadata} from "next";

import SheltersPage from "@/features/shelters/shelters.page";

export const metadata: Metadata = {
  title: "Притулки",
}

const Shelters = () => {
  return <SheltersPage />;
}

export default Shelters;