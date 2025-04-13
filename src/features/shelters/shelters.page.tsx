"use client";

import { PaginationControls } from "@/components/pagination/pagination-controls";
import ShelterCard from "@/features/shelters/components/shelter-card";
import useSheltersQuery from "@/features/shelters/hooks/use-shelters-query";
import { usePagination } from "@/hooks/use-pagination";
import { ShelterUser } from "@/types/user";

const SheltersPage = () => {
  const { shelters } = useSheltersQuery();
  const itemsPerPage = 6;

  const { currentPage, totalPages, handlePageChange, currentItems } = usePagination({
    totalItems: shelters.length,
    itemsPerPage,
  });

  const currentShelters = currentItems(shelters);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Притулки</h1>

      {shelters.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          Притулків не знайдено.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentShelters.map((shelter: ShelterUser) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
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
