import { ACCOUNT_TYPE_MAPPER } from "@/constants/mappers";
import type { AccountType } from "@/types/models/user";

export const getAccountType = (accountType?: AccountType) => {
  if (!accountType) return "";
  return ACCOUNT_TYPE_MAPPER[accountType];
};

export const getUserName = (
  name?: string | null,
  firstName?: string | null,
  lastName?: string | null,
) => {
  if (name) return name;
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName && !lastName) return firstName;
};

export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
  middleName?: string | null,
  name?: string | null,
) => {
  if (name) return name;
  if (firstName && lastName && middleName) {
    return `${middleName} ${firstName} ${lastName}`;
  }
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName && !lastName) return firstName;
  return "Не вказано";
};
