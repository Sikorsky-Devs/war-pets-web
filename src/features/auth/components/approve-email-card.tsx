"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes } from "@/constants/navigation";
import { emailApprove, emailResend } from "@/features/auth/api/auth-api";
import { cn } from "@/utils/styles-utils";

const ApproveEmailCard = () => {
  const [token] = useQueryState("token", parseAsString);
  const [email] = useQueryState("email");
  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );

  const handleApprove = async () => {
    if (!token) return;
    try {
      await emailApprove(token);
      setStatus("success");
      toast.success("Пошту підтверджено успішно");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      setStatus("failure");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await emailResend({ email: email });
      toast.success("Лист підтвердження надіслано повторно");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    handleApprove().catch(console.error);
  }, [token]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Підтвердження пошти
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {status === "loading" && (
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        )}
        {status === "success" && (
          <>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-md font-semibold">
                Пошту підтверджено успішно!
              </span>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-4",
              )}
              href={Routes.SignIn}
            >
              Повернутися до входу
            </Link>
          </>
        )}
        {status === "failure" && (
          <>
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <XCircle className="h-6 w-6" />
              <span className="text-md font-semibold">
                Не вдалося підтвердити пошту.
              </span>
            </div>
            <Button
              onClick={handleResend}
              variant="outline"
              size="lg"
              className="mt-4"
            >
              Спробувати ще раз
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApproveEmailCard;
