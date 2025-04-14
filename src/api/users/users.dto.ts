import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  shelterType: z.enum(["SHELTER", "CLINIC", "KENNEL", "OTHER"]).optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  donationLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional()
    .or(z.literal("")),
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>;
