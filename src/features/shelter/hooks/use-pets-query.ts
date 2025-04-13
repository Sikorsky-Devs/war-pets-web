import { useQuery } from "@tanstack/react-query";

import { getAllPets } from "@/api/pets/pets.api";

const usePetsQuery = (id: string) => {
  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const { top, common } = await getAllPets();
      const pets = [...top, ...common];
      return pets.filter((pet) => pet.shelterId === id);
    },
  });

  return { pets, isLoading, error };
};

export default usePetsQuery;
