import { API_URL } from "@/constants/global";
import {
  type AddPetFormData,
  type EditPetFormData,
} from "@/features/shelter-profile/types/shelter-profile-types";
import type { ErrorResponse } from "@/types/api";
import { type Pet, type PetResponse } from "@/types/pet";
import { generateAuthHeaders } from "@/utils/auth-utils";

export const addPet = async (
  data: AddPetFormData & {
    shelterId: string;
    isApproved: boolean;
  },
) => {
  try {
    const response = await fetch(`${API_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Pet;
  } catch (e) {
    throw e;
  }
};

export const getPetById = async (petId: string) => {
  try {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Pet;
  } catch (e) {
    throw e;
  }
};

export const editPetById = async (
  petId: string,
  data: EditPetFormData & {
    isApproved: boolean;
  },
) => {
  try {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const deletePetById = async (petId: string) => {
  try {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const getAllPets = async (params?: string) => {
  try {
    const response = await fetch(`${API_URL}/pets?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as {
      top: PetResponse[];
      common: PetResponse[];
    };
  } catch (e) {
    throw e;
  }
};

export const updatePetImage = async (formData: FormData, id: string) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}/images`, {
      method: "PATCH",
      headers: {
        ...generateAuthHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};
