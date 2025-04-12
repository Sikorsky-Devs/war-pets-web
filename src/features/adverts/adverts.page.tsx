"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getAllPets, getSavedPets } from "@/api/pets/pets.api";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import PetFilters from "@/features/adverts/component/pet-filters";
import useDebounce from "@/hooks/use-debounce";
import { type PetResponse } from "@/types/pet";

const PetsPage = () => {
  const [search] = useQueryState("search");
  const [type] = useQueryState("type");
  const [ageFrom] = useQueryState("ageFrom", {
    defaultValue: undefined,
    parse: (value) => (value ? Number.parseInt(value) : undefined),
  });
  const [ageTo] = useQueryState("ageTo", {
    defaultValue: undefined,
    parse: (value) => (value ? Number.parseInt(value) : undefined),
  });
  const [healthStatus] = useQueryState("healthStatus");

  const debouncedSearch = useDebounce(search ?? "", 500);

  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", debouncedSearch, type, ageFrom, ageTo, healthStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (type) params.append("type", type);
      if (ageFrom) params.append("ageFrom", String(ageFrom));
      if (ageTo) params.append("ageTo", String(ageTo));
      if (healthStatus) params.append("healthStatus", healthStatus);

      const response = await getAllPets(params);
      return response.common;
    },
  });

  const { data: savedPets } = useQuery({
    queryKey: ["savedPets"],
    queryFn: getSavedPets,
  });

  const isSavedPet = (id: string) => {
    const savedPetIds = savedPets?.map(pet => pet.id);

    return savedPetIds?.includes(id);
  }

  const skeletonCards = Array(6)
    .fill(0)
    .map((_, index) => <PetCardSkeleton key={`skeleton-${index}`} />);

  return (
    <div className="mx-auto max-w-screen-xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-2xl font-bold">Оголошення про тварин</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <PetFilters />

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skeletonCards}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Помилка завантаження тварин. Будь ласка, спробуйте пізніше.
            </div>
          ) : pets?.length === 0 ? (
            <div className="p-8 text-center">
              Тварин за вашими критеріями не знайдено.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets?.map((pet: PetResponse) => {
                const isSaved = isSavedPet(pet.id);
                return (
                  <PetCard key={pet.id} pet={pet} isSaved={isSaved} />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
