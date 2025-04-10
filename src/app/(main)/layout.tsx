import { type PropsWithChildren } from "react";
import Navbar from "src/components/header";

import ChatPopover from "@/components/chat/chat-popover";
import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ChatPopover />
      <Footer />
    </>
  );
};

export default MainLayout;
