import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import usePetsQuery from "@/features/shelter/hooks/use-pets-query";

const ShelterPetsList = () => {
  const { id } = useParams();

  const { pets, isLoading } = usePetsQuery(id as string);

  const filteredPets = pets?.filter((pet) => pet.isApproved);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <PetCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
    );
  }

  if (!filteredPets?.length) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          <p className="text-lg font-medium">Притулок не має тварин</p>
          <p className="text-sm text-muted-foreground">
            Будь ласка, додайте першу тваринку
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPets?.map((pet, index) => <PetCard key={index} {...pet} />)}
    </div>
  );
};

export default ShelterPetsList;
