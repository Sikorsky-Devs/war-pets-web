import { type CreateCommentDto } from "@/api/comments/comment.dto";
import { API_URL } from "@/constants/global";
import type { ErrorResponse } from "@/types/api";
import { type Comment } from "@/types/models/comment";
import { generateAuthHeaders } from "@/utils/auth-utils";

export const addComment = async (
  comment: CreateCommentDto,
  shelterId: string,
) => {
  try {
    const response = await fetch(`${API_URL}/comment/${shelterId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getComments = async (shelterId: string) => {
  try {
    const response = await fetch(`${API_URL}/comment/${shelterId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Comment[];
  } catch (error) {
    throw error;
  }
};
