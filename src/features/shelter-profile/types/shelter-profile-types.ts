import { z } from "zod";

export const addPetSchema = z.object({
  heathStatus: z.enum(["HEALTHY", "INJURED", "SICK", "UNDER_TREATMENT", "DISABLED", "CRITICAL"], {
    errorMap: () => ({ message: "Неправильний статус здоров'я тварини" }),
  }).optional(),
  type: z.enum(["DOG", "CAT", "BIRD", "FISH", "DOMESTIC", "EXOTIC", "OTHER"], {
    errorMap: () => ({ message: "Неправильний тип аккаунту" }),
  }),
  name: z.string().optional(),
  age: z.number().positive().optional(),
  breed: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});

export const editPetSchema = z.object({
  heathStatus: z.enum(["HEALTHY", "INJURED", "SICK", "UNDER_TREATMENT", "DISABLED", "CRITICAL"], {
    errorMap: () => ({ message: "Неправильний статус здоров'я тварини" }),
  }).optional(),
  type: z.enum(["DOG", "CAT", "BIRD", "FISH", "DOMESTIC", "EXOTIC", "OTHER"], {
    errorMap: () => ({ message: "Неправильний тип аккаунту" }),
  }),
  name: z.string().optional(),
  age: z.number().positive().optional(),
  breed: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});

export type AddPetFormData = z.infer<typeof addPetSchema>;
export type EditPetFormData = z.infer<typeof addPetSchema>;