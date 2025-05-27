import { type User } from "@/types/user";

export interface Post {
  id: string
  userId: string
  title: string
  content: string
  createdAt: string
  user: User
}