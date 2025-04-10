import { ArrowRightIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes } from "@/constants/navigation";
import { cn } from "@/utils/styles-utils";

const SuccessCard = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-center text-2xl">
          Аккаунт успішно створено
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <h1>Перевірте свою електронну пошту, щоб підтвердити реєстрацію.</h1>
        <Link href={Routes.SignIn} className={cn(buttonVariants(), "w-full")}>
          <span>Увійти</span>
          <ArrowRightIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
