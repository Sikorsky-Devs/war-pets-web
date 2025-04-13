import {type AddContactDto} from "@/api/contacts/contacts.dto";
import {API_URL} from "@/constants/global";
import type {ErrorResponse} from "@/types/api";
import type {Pet} from "@/types/pet";
import {generateAuthHeaders} from "@/utils/auth-utils";

export const addContact = async (
  data: AddContactDto,
) => {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
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

export const editContactById = async (contactId: string, data: string) => {
  try {
    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify({ content: data }),
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

export const deleteContactById = async (contactId: string) => {
  try {
    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
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