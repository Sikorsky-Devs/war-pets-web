import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Невірний формат електронної пошти"),
  password: z.string().min(8, "Пароль повинен містити не менше 8 символів"),
  accountType: z.enum(["SHELTER", "VOLUNTEER"], {
    errorMap: () => ({ message: "Неправильний тип аккаунту" }),
  }),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

export interface EmailResendRequest {
  email: string;
}

export interface TokenResponse {
  token: string;
}
