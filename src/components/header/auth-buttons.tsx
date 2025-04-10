import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/navigation";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={Routes.SignIn}
        className={buttonVariants({ variant: "outline" })}
      >
        Увійти
      </Link>
      <Link
        className={buttonVariants({ variant: "default" })}
        href={Routes.SignUp}
      >
        Зареєструватися
      </Link>
    </div>
  );
};

export default AuthButtons;
