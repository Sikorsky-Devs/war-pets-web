import * as z from "zod";

export const createSearchRequestDto = z
  .object({
    petType: z
      .enum(["DOG", "CAT", "BIRD", "FISH", "DOMESTIC", "EXOTIC", "OTHER"])
      .optional(),
    ageFrom: z.number().min(0).optional(),
    ageTo: z.number().min(0).optional(),
    address: z.string().optional(),
    breed: z.string().optional(),
    healthStatus: z
      .enum([
        "HEALTHY",
        "INJURED",
        "SICK",
        "UNDER_TREATMENT",
        "DISABLED",
        "CRITICAL",
      ])
      .optional(),
  })
  .refine(
    (data) => {
      if (data.ageFrom !== undefined && data.ageTo !== undefined) {
        return data.ageFrom <= data.ageTo;
      }
      return true;
    },
    {
      message: "Вік 'від' має бути менше або дорівнювати віку 'до'",
      path: ["ageFrom"],
    },
  );

export type CreateSearchRequestDto = z.infer<typeof createSearchRequestDto>;

export type CreateSearchRequestBody = CreateSearchRequestDto & {
  volunteerId: string;
};

export const addPetSchema = z.object({
  heathStatus: z
    .enum(
      ["HEALTHY", "INJURED", "SICK", "UNDER_TREATMENT", "DISABLED", "CRITICAL"],
      {
        errorMap: () => ({ message: "Неправильний статус здоров'я тварини" }),
      },
    )
    .optional(),
  type: z.enum(["DOG", "CAT", "BIRD", "FISH", "DOMESTIC", "EXOTIC", "OTHER"], {
    errorMap: () => ({ message: "Неправильний тип аккаунту" }),
  }),
  name: z.string().optional(),
  age: z.number().positive().optional(),
  breed: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});

export const editPetSchema = addPetSchema.partial();

export type AddPetFormData = z.infer<typeof addPetSchema>;

export type EditPetFormData = z.infer<typeof editPetSchema>;
