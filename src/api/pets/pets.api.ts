import {
  type AddPetFormData,
  type CreateSearchRequestBody,
  type EditPetFormData,
} from "@/api/pets/pets.dto";
import { API_URL } from "@/constants/global";
import type { ErrorResponse } from "@/types/api";
import {
  type Pet,
  type PetResponse,
  type PetSearchRequest,
} from "@/types/models/pet";
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
    isApproved?: boolean;
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

export const getAllPets = async (params?: URLSearchParams) => {
  try {
    const searchParams = `${params?.toString() ?? ""}`;
    const response = await fetch(`${API_URL}/pets?${searchParams}`, {
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

export const getSavedPets = async () => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    const data = (await response.json()) as { pet: Pet }[];
    return data.map((info) => info.pet);
  } catch (error) {
    throw error;
  }
};

export const savePet = async (petId: string) => {
  try {
    const response = await fetch(`${API_URL}/save/${petId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const unsavePet = async (petId: string) => {
  try {
    const response = await fetch(`${API_URL}/save/${petId}`, {
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
  } catch (error) {
    throw error;
  }
};

export const createSearchRequest = async (
  searchRequest: CreateSearchRequestBody,
) => {
  try {
    const response = await fetch(`${API_URL}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(searchRequest),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Pet[];
  } catch (e) {
    throw e;
  }
};

export const getSearchRequests = async () => {
  try {
    const response = await fetch(`${API_URL}/requests`, {
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

    return (await response.json()) as PetSearchRequest[];
  } catch (e) {
    throw e;
  }
};

export const getSearchRequest = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/requests/${id}`, {
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

    return (await response.json()) as PetSearchRequest[];
  } catch (e) {
    throw e;
  }
};
