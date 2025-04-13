import UserProfile from "@/components/header/user-profile";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import PetSeatchModal from "@/features/adverts/component/pet-seatch-modal";
import { hasPermission } from "@/permissions";

import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Header = () => {
  const canSearchCreate = hasPermission("searchRequests", "create");
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex h-full items-center gap-3">
          <NavMenu className="hidden md:block" />
          {<PetSeatchModal />}
          <Separator orientation="vertical" className="h-8" />
          <div className="hidden gap-2 md:flex">
            <UserProfile />
          </div>
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
