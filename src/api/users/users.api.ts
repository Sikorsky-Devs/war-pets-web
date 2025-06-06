import { type UserUpdateDto } from "@/api/users/users.dto";
import { API_URL } from "@/constants/global";
import type { ErrorResponse } from "@/types/api";
import { type Contact } from "@/types/models/contacts";
import { type ShelterUser } from "@/types/models/user";
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

export const updateUserAvatar = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/users/avatars/upload`, {
      method: "PATCH",
      headers: {
        ...generateAuthHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};

export const getShelters = async () => {
  try {
    const response = await fetch(`${API_URL}/users/shelters`, {
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

    return (await response.json()) as ShelterUser[];
  } catch (e) {
    throw e;
  }
};

export const getUserContacts = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}/contacts`, {
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

    return (await response.json()) as Contact[];
  } catch (e) {
    throw e;
  }
};

export const getUserChats = async () => {
  try {
    const response = await fetch(`${API_URL}/users/chats`, {
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

    return (await response.json()) as ShelterUser[];
  } catch (e) {
    throw e;
  }
};
