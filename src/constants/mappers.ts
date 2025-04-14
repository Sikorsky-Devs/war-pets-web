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

export const HEALTH_STATUS_COLOR_MAPPER: Record<PetHealthType, string> = {
  HEALTHY: "bg-green-500 text-black hover:bg-green-600",
  UNDER_TREATMENT: "bg-amber-500 hover:bg-amber-600",
  INJURED: "bg-gray-500 text-black hover:bg-gray-600",
  SICK: "bg-orange-500 hover:bg-orange-600",
  DISABLED: "bg-purple-500 hover:bg-purple-600",
  CRITICAL: "bg-red-500 hover:bg-red-600",
};
