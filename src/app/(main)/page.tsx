import type {Metadata} from "next";

import HomePage from "@/features/home/home.page";

export const metadata: Metadata = {
  title: "Головна",
}

const Home = () => {
  return <HomePage />;
};

export default Home;
