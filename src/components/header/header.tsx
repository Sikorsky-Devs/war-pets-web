import UserProfile from "@/components/header/user-profile";
import { Logo } from "@/components/logo";

import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
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
