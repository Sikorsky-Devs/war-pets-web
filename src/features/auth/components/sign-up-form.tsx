"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUp } from "@/api/auth/auth.api";
import { type SignUpFormData, signUpSchema } from "@/api/auth/auth.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Routes } from "@/constants/navigation";
import { toast } from "@/lib/toast";
import { cn } from "@/utils/styles-utils";

interface SignUpFormProps {
  className?: string;
}

const SignUpForm = ({ className }: SignUpFormProps) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignUpFormData & { accountType: "SHELTER" | "VOLUNTEER" }>({
    resolver: zodResolver(
      signUpSchema.extend({
        accountType: z.enum(["SHELTER", "VOLUNTEER"]),
      }),
    ),
    defaultValues: {
      accountType: "VOLUNTEER",
    },
  });

  const onSubmit = async (
    data: SignUpFormData & { accountType: "SHELTER" | "VOLUNTEER" },
  ) => {
    try {
      await signUp({
        ...data,
        accountType: data.accountType,
      });
      toast.success("Акаунт успішно створено", {
        description:
          "Перевірте свою електронну пошту, щоб підтвердити реєстрацію.",
      });
      replace(Routes.AuthSuccess);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Створи новий аккаунт</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введіть ім&#39;я, електронну пошту та пароль для створення нового
          аккаунту
        </p>
      </div>
      <div className="grid gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="m@example.com"
          {...register("email")}
        />
        <Input
          id="password"
          label="Пароль"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <div className="space-y-2">
          <Label htmlFor="accountType">Тип аккаунту</Label>
          <Select
            defaultValue="VOLUNTEER"
            onValueChange={(value: "SHELTER" | "VOLUNTEER") =>
              setValue("accountType", value)
            }
          >
            <SelectTrigger id="accountType">
              <SelectValue placeholder="Оберіть тип аккаунту" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHELTER">Притулок</SelectItem>
              <SelectItem value="VOLUNTEER">Волонтер</SelectItem>
            </SelectContent>
          </Select>
          {errors.accountType && (
            <p className="text-sm text-destructive">
              {errors.accountType.message}
            </p>
          )}
        </div>
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Зареєструватися
        </Button>
      </div>
      <div className="text-center text-sm">
        Вже маєш аккаунт?{" "}
        <a href={Routes.SignIn} className="underline underline-offset-4">
          Увійти
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
