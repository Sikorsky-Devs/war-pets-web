import {type AccountType} from "@/types/user";

export const ACCOUNT_TYPE_MAPPER: Record<AccountType, string> = {
  "GUEST": "Гість",
  "VOLUNTEER": "Волонтер",
  "SHELTER": "Притулок",
}