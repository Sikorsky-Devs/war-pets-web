import { type PropsWithChildren } from "react";
import Navbar from "src/components/header";

import ChatPopover from "@/components/chat/chat-popover";
import Footer from "@/components/footer/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <ScrollArea className="flex h-screen flex-col">
      <Navbar />
      <main className="h-full flex-1">{children}</main>
      <ChatPopover />
      <Footer />
    </ScrollArea>
  );
};

export default MainLayout;
