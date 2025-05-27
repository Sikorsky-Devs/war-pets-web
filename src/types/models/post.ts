import { type User } from "@/types/models/user";

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
}
