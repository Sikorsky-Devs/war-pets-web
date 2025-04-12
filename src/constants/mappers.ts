import { type PetHealthType, type PetType } from "@/types/pet";
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

export const PET_TYPE_MAPPER: Record<PetType, string> = {
  DOG: "Собака",
  CAT: "Кішка",
  BIRD: "Птах",
  FISH: "Риба",
  DOMESTIC: "Домашня тварина",
  EXOTIC: "Екзотична тварина",
  OTHER: "Інше",
};

export const PET_HEALTH_STATUS_MAPPER: Record<PetHealthType, string> = {
  HEALTHY: "Здоровий",
  SICK: "Хворий",
  INJURED: "Поранений",
  UNDER_TREATMENT: "В лікарні",
  DISABLED: "Страждає",
  CRITICAL: "Критичний",
};
