import { type ShelterUser } from "@/types/models/user";

export interface Comment {
  volunteerId: string;
  shelterId: string;
  stars: number;
  content: string;
  createdAt: string;
  volunteer: ShelterUser;
}
