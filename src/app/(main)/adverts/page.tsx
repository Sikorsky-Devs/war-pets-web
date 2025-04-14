import { type Metadata } from "next";

import AdvertsPage from "@/features/adverts/adverts.page";

export const metadata: Metadata = {
  title: "Оголошення",
};

const Adverts = () => {
  return <AdvertsPage />;
};

export default Adverts;
