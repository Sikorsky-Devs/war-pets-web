export type AccountType = "GUEST" | "SHELTER" | "VOLUNTEER";

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  name: string | null;
  accountType: AccountType;
  avatarLink: string | null;
}
