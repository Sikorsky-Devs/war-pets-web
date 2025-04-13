import { z } from "zod";

export const createPostDto = z.object({
  title: z
    .string()
    .min(1, { message: "Введіть заголовок" })
    .max(100, { message: "Заголовок не повинен перевищувати 100 символів" }),
  content: z
    .string()
    .min(1, { message: "Введіть опис" })
    .max(1000, { message: "Опис не повинен перевищувати 1000 символів" }),
});

export type CreatePostDto = z.infer<typeof createPostDto>;
