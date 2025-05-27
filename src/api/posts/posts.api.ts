import { type CreatePostDto } from "@/api/posts/posts.dto";
import { API_URL } from "@/constants/global";
import { type ErrorResponse } from "@/types/api";
import { type Post } from "@/types/models/post";
import { generateAuthHeaders } from "@/utils/auth-utils";

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/post`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Post[];
  } catch (error) {
    throw error;
  }
};

export const createPost = async (post: CreatePostDto) => {
  try {
    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Post;
  } catch (error) {
    throw error;
  }
};
