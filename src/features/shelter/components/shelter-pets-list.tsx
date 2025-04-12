import { useParams } from "next/navigation";

import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";
import usePetsQuery from "@/features/shelter/hooks/use-pets-query";

const ShelterPetsList = () => {
  const { id } = useParams();

  const { pets, isLoading } = usePetsQuery(id as string);

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

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pets?.map((pet, index) => <PetCard key={index} pet={pet} />)}
    </div>
  );
};

export default ShelterPetsList;
