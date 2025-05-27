"use client";

import PetRequest from "@/features/profile/components/cards/pet-request";
import PetRequestSkeleton from "@/features/profile/components/cards/pet-request-skeleton";
import usePetsQuery from "@/features/shelter/hooks/use-pets-query";
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
          <PetRequestSkeleton key={index} />
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
            <PetRequest key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetRequests;
