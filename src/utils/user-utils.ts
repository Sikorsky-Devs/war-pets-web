import { ACCOUNT_TYPE_MAPPER } from "@/constants/mappers";
import type { AccountType } from "@/types/user";

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
