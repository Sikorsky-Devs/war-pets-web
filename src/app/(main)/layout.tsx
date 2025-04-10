import { type PropsWithChildren } from "react";
import Navbar from "src/components/header";

import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
