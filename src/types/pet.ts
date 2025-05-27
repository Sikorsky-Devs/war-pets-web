export type PetType =
  | "DOG"
  | "CAT"
  | "BIRD"
  | "FISH"
  | "DOMESTIC"
  | "EXOTIC"
  | "OTHER";
export type PetHealthType =
  | "HEALTHY"
  | "INJURED"
  | "SICK"
  | "UNDER_TREATMENT"
  | "DISABLED"
  | "CRITICAL";

export interface IBasePet {
  id: string;
  name: string;
  age: number;
  address: string | null;
  imageLink: string | null;
  shelter: string | null;
}

export interface Pet extends IBasePet  {
  shelterId: string;
  volunteerId: string | null;
  isApproved: boolean;
  type: PetType;
  breed: string | null;
  address: string | null;
  description: string | null;
  heathStatus: PetHealthType;
}
export interface PetRequest {
  id: string;
  petId: string;
  requestedBy: string;
  requestDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string;
  pet: Pet;
}

export interface PetResponse extends IBasePet {
  shelterId: string;
  isApproved: boolean;
  type: PetType;
  breed: string | null;
  description: string | null;
  healthStatus: PetHealthType;
  createdAt: string;
}

export interface PetSearchRequest {
  id: string;
  volunteerId: string;
  petType: PetType | null;
  ageFrom: number | null;
  ageTo: number | null;
  address: string | null;
  breed: string | null;
  healthStatus: PetHealthType | null;
  createdAt: string;
  volunteer: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
  };
}
