import { type User } from "@/types/user";

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  from: "VOLUNTEER" | "SHELTER";
  shelterId: string;
  volunteerId: string;
  shelter?: User;
  volunteer?: User;
}
