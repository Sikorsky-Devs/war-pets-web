import { type PetHealthType, type PetType } from "@/types/pet";

export const formatPetType = (type: PetType) => {
  switch (type) {
    case "DOG":
      return "Собака";
    case "CAT":
      return "Кіт";
    case "BIRD":
      return "Птах";
    case "FISH":
      return "Риба";
    case "DOMESTIC":
      return "Домашня тварина";
    case "EXOTIC":
      return "Екзотична тварина";
    case "OTHER":
      return "Інше";
    default:
      return type;
  }
};

export const getHealthStatusColor = (status: PetHealthType): string => {
  switch (status) {
    case "HEALTHY":
      return "bg-green-500 text-black hover:bg-green-600";
    case "UNDER_TREATMENT":
      return "bg-amber-500 hover:bg-amber-600";
    case "INJURED":
    case "SICK":
      return "bg-orange-500 hover:bg-orange-600";
    case "DISABLED":
      return "bg-purple-500 hover:bg-purple-600";
    case "CRITICAL":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-slate-500 hover:bg-slate-600";
  }
};

export const formatHealthStatus = (status: PetHealthType): string => {
  switch (status) {
    case "HEALTHY":
      return "Здоровий";
    case "INJURED":
      return "Травмований";
    case "SICK":
      return "Хворий";
    case "UNDER_TREATMENT":
      return "На лікуванні";
    case "DISABLED":
      return "З інвалідністю";
    case "CRITICAL":
      return "Критичний стан";
    default:
      return "Стан невідомий";
  }
};
