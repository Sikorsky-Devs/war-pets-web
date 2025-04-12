"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getAllPets } from "@/api/pets/pets-api";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import PetFilters from "@/features/adverts/component/pet-filters";
import { type Pet } from "@/types/pet";

export enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  BIRD = "BIRD",
  OTHER = "OTHER",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  SICK = "SICK",
  RECOVERING = "RECOVERING",
}

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

  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", search, type, ageFrom, ageTo, healthStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("search", search ?? "");
      params.append("type", type ?? "");
      params.append("ageFrom", String(ageFrom) ?? "");
      params.append("ageTo", String(ageTo) ?? "");
      params.append("healthStatus", healthStatus ?? "");

      const response = await getAllPets();
      return response.common;
    },
  });

  // Create an array of skeleton cards for loading state
  const skeletonCards = Array(6)
    .fill(0)
    .map((_, index) => <PetCardSkeleton key={`skeleton-${index}`} />);

  return (
    <div className="mx-auto max-w-screen-xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <PetFilters />

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skeletonCards}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Error loading pets. Please try again later.
            </div>
          ) : pets?.length === 0 ? (
            <div className="p-8 text-center">
              No pets found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets?.map((pet: Pet) => <PetCard key={pet.id} pet={pet} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
