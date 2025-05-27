"use client";

import PetRequestCard from "@/features/profile/components/cards/pet-request-card";
import PetRequestCardSkeleton from "@/features/profile/components/cards/pet-request-card-skeleton";
import usePetsQuery from "@/features/shelter/hooks/queries/use-pets.query";
import useAuthStore from "@/store/use-auth-store";

const PetRequests = () => {
  const {
    user: { id },
  } = useAuthStore();

  const { pets = [], isLoading } = usePetsQuery(id);

  const filteredPets = pets.filter((pet) => !pet.isApproved);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <PetRequestCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPets.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
            Немає запитів на передачу тварин
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPets.map((pet) => (
            <PetRequestCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetRequests;
