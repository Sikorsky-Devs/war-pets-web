"use client";

import { useQuery } from "@tanstack/react-query";

import { getSavedPets } from "@/api/pets/pets.api";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import PetFilters from "@/features/adverts/component/pet-filters";
import { usePagination } from "@/hooks/use-pagination";
import { type PetResponse } from "@/types/pet";

import useAdvertsQuery from "./hooks/use-adverts.query";

const ITEMS_PER_PAGE = 9;

const AdvertsPage = () => {
  const {
    pets,
    isLoading,
    error,
  } = useAdvertsQuery();

  const { data: savedPets, isLoading: isSavedPetLoading } = useQuery({
    queryKey: ["savedPets"],
    queryFn: getSavedPets,
  });

  const isSavedPet = (id: string) => {
    const savedPetIds = savedPets?.map((pet) => pet.id);
    return savedPetIds?.includes(id);
  };

  const { currentPage, totalPages, handlePageChange, currentItems } =
    usePagination({
      totalItems: pets.length,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const currentPets = currentItems(pets);

  return (
    <div className="mx-auto max-w-screen-xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-2xl font-bold">Оголошення про тварин</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <PetFilters />

        <div className="lg:col-span-3">
          {isLoading || isSavedPetLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <PetCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Помилка завантаження тварин. Будь ласка, спробуйте пізніше.
            </div>
          ) : currentPets?.length === 0 ? (
            <div className="p-8 text-center">
              Тварин за вашими критеріями не знайдено.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentPets?.map((pet: PetResponse) => {
                  const isSaved = isSavedPet(pet.id);
                  return <PetCard key={pet.id} isSaved={isSaved} {...pet} />;
                })}
              </div>

              <div className="mt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvertsPage;
