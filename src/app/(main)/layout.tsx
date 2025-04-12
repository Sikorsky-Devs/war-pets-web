import { type PropsWithChildren } from "react";
import Navbar from "src/components/header";

import ChatPopover from "@/components/chat/chat-popover";
import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="h-full flex-1">{children}</main>
      <ChatPopover />
      <Footer />
    </div>
  );
};

export default MainLayout;
