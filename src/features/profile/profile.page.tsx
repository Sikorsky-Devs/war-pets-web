'use client';

import { useQuery } from "@tanstack/react-query";

import { getSavedPets } from "@/api/pets/pets.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PetCard from "@/features/adverts/component/pet-card";
import PetCardSkeleton from "@/features/adverts/component/pet-card-skeleton";

const ProfilePage = () => {
  const { data: savedPets, isLoading } = useQuery({
    queryKey: ["savedPets"],
    queryFn: getSavedPets,
  });

  const skeletonCards = Array(3)
    .fill(0)
    .map((_, index) => <PetCardSkeleton key={`skeleton-${index}`} />);

  return (
    <div className="space-y-2">
      <h1 className="font-semibold text-2xl">Збережені тварини</h1>
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
            <PetCard key={pet.id} pet={pet} isSaved />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
