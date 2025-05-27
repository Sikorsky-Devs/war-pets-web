import {
  HEALTH_STATUS_COLOR_MAPPER,
  PET_HEALTH_STATUS_MAPPER,
  PET_TYPE_MAPPER,
} from "@/constants/mappers";
import { type PetHealthType, type PetType } from "@/types/models/pet";

export const formatPetType = (type: PetType) => {
  return PET_TYPE_MAPPER[type];
};

export const getHealthStatusColor = (status: PetHealthType): string => {
  return HEALTH_STATUS_COLOR_MAPPER[status];
};

export const formatHealthStatus = (status: PetHealthType): string => {
  return PET_HEALTH_STATUS_MAPPER[status] ?? "Стан невідомий";
};
