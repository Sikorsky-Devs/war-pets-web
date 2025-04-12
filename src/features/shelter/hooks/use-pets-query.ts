import { useQuery } from "@tanstack/react-query";

import { getAllPets, getPetById } from "@/api/pets/pets.api";

const usePetsQuery = (id: string) => {
  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const resultPets = await getAllPets();
      const fullPets = await Promise.all(
        resultPets.common.map((pet) => getPetById(pet.id)),
      );
      return fullPets.filter((pet) => pet.shelterId === id);
    },
  });

  return { pets, isLoading, error };
};

export default usePetsQuery;
