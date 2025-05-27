"use client";

import { useQuery } from "@tanstack/react-query";

import { getSavedPets } from "@/api/pets/pets.api";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";

const ProfilePage = () => {
  const { data: savedPets, isLoading } = useQuery({
    queryKey: ["savedPets"],
    queryFn: getSavedPets,
  });

  const skeletonCards = Array.from({ length: 3 }).map((_, index) => (
    <PetCardSkeleton key={index} />
  ));

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Збережені тварини</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skeletonCards}
        </div>
      ) : !savedPets?.length ? (
        <div className="p-8 text-center">
          У вас поки що немає збережених тварин
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedPets.map((pet) => (
            <PetCard key={pet.id} isSaved {...pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
