"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";

import { getAllPets, getSavedPets } from "@/api/pets/pets.api";
import { Button } from "@/components/ui/button";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import PetFilters from "@/features/adverts/component/pet-filters";
import PetSearchModal from "@/features/adverts/component/pet-seatch-modal";
import useDebounce from "@/hooks/use-debounce";
import { type PetResponse } from "@/types/pet";

const ITEMS_PER_PAGE = 9;

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
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value,
  });

  const debouncedSearch = useDebounce(search ?? "", 500);
  const currentPage = Number(page);

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
    const savedPetIds = savedPets?.map((pet) => pet.id);
    return savedPetIds?.includes(id);
  };

  const skeletonCards = Array(ITEMS_PER_PAGE)
    .fill(0)
    .map((_, index) => <PetCardSkeleton key={`skeleton-${index}`} />);

  // Calculate pagination
  const totalItems = pets?.length ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPets = pets?.slice(startIndex, endIndex);

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
          ) : currentPets?.length === 0 ? (
            <div className="p-8 text-center">
              Тварин за вашими критеріями не знайдено.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentPets?.map((pet: PetResponse) => {
                  const isSaved = isSavedPet(pet.id);
                  return <PetCard key={pet.id} pet={pet} isSaved={isSaved} />;
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(String(currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <Button
                          key={pageNum}
                          variant={
                            pageNum === currentPage ? "default" : "outline"
                          }
                          size="icon"
                          onClick={() => setPage(String(pageNum))}
                        >
                          {pageNum}
                        </Button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(String(currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
