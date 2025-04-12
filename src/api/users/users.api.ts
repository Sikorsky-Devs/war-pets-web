import { type UserUpdateDto } from "@/api/users/users.dto";
import { API_URL } from "@/constants/global";
import type { ErrorResponse } from "@/types/api";
import { type ShelterUser } from "@/types/user";
import { generateAuthHeaders } from "@/utils/auth-utils";

export const getUser = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });
    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }

    return (await response.json()) as ShelterUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data: UserUpdateDto, id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};
