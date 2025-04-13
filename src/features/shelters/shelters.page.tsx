"use client";

import { PaginationControls } from "@/components/pagination/pagination-controls";
import ShelterCard from "@/features/shelters/components/shelter-card";
import ShelterCardSkeleton from "@/features/shelters/components/shelter-card-skeleton";
import useSheltersQuery from "@/features/shelters/hooks/use-shelters-query";
import { usePagination } from "@/hooks/use-pagination";

const SheltersPage = () => {
  const { shelters, isLoading } = useSheltersQuery();
  const itemsPerPage = 6;

  const { currentPage, totalPages, handlePageChange, currentItems } = usePagination({
    totalItems: shelters.length,
    itemsPerPage,
  });

  const currentShelters = currentItems(shelters);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Притулки</h1>

      {shelters.length === 0 && !isLoading ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          Притулків не знайдено.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array(6).fill(0).map((_, index) => (
                <ShelterCardSkeleton key={`skeleton-${index}`} />
              ))
              : currentShelters.map(shelter => (
                <ShelterCard key={shelter.id} shelter={shelter} />
              ))
            }
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
  );
};

export default SheltersPage;
