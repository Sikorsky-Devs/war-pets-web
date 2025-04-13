import { type PropsWithChildren } from "react";

import { Logo } from "@/components/logo";
import Image from "next/image";
import IMAGES from "@/constants/images";

const AuthLayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div
        className="relative hidden lg:block">
        <Image
          src={IMAGES.PET_AUTH}
          alt="Щасливі врятовані тварини"
          fill
          className="object-cover md:object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayoutContent;
