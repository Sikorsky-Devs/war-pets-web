export type AccountType = "GUEST" | "SHELTER" | "VOLUNTEER";
export type ShelterType = "CLINIC" | "SHELTER" | "KENNEL" | "OTHER";

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

export interface ShelterUser extends User {
  shelterType: ShelterType;
  address: string | null;
  description: string | null;
  donationLink: string | null;
  stars: number | null;
}
