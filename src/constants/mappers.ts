import { type AccountType, type ShelterType } from "@/types/user";

export const ACCOUNT_TYPE_MAPPER: Record<AccountType, string> = {
  GUEST: "Гість",
  VOLUNTEER: "Волонтер",
  SHELTER: "Притулок",
};

export const SHELTER_TYPE_MAPPER: Record<ShelterType, string> = {
  CLINIC: "Клініка",
  SHELTER: "Притулок",
  KENNEL: "Притулок для тварин",
  OTHER: "Інше",
};
