export type PetType = "DOG" | "CAT" | "BIRD" | "FISH" | "DOMESTIC" | "EXOTIC" | "OTHER";
export type PetHealthType = "HEALTHY" | "INJURED" | "SICK" | "UNDER_TREATMENT" | "DISABLED" | "CRITICAL";


export interface Pet {
  id: string;
  shelterId: string;
  volunteerId: string | null;
  isApproved: boolean;
  name: string | null;
  petType: PetType;
  breed: string | null;
  age: number | null;
  address: string | null;
  imageLink: string | null;
  description: string | null;
  healthStatus: PetHealthType;
}
export interface PetRequest {
  id: string
  petId: string
  requestedBy: string
  requestDate: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  message: string
  pet: Pet
}

export interface PetSearchRequest {
  id: string
  userId: string
  userName: string
  userEmail: string
  requestDate: string
  petType: PetType | null
  breed: string | null
  ageFrom: number | null
  ageTo: number | null
  address: string | null
  healthStatus: PetHealthType | null
  comment: string | null
}

