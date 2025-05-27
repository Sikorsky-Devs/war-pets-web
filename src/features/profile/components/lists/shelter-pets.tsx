"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import { deletePetById } from "@/api/pets/pets.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PetDetailsModal from "@/features/adverts/component/pet-details-modal";
import EditPetDialog from "@/features/profile/components/modals/edit-pet-dialog";
import usePetsQuery from "@/features/shelter/hooks/use-pets-query";
import { toast } from "@/lib/toast";
import useAuthStore from "@/store/use-auth-store";
import {
  formatHealthStatus,
  formatPetType,
  getHealthStatusColor,
} from "@/utils/shelter-pets-utils";
import { cn } from "@/utils/styles-utils";

const ShelterPets = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { pets, isLoading } = usePetsQuery(user.id);
  const filteredPets = pets.filter((pet) => pet.isApproved);

  const deleteMutation = useMutation({
    mutationFn: (petId: string) => deletePetById(petId),
    onError: () => {
      toast.error("Помилка при видаленні тварини");
    },
  });

  const handleDeletePet = async (petId: string) => {
    deleteMutation.mutate(petId);
    await queryClient.invalidateQueries({ queryKey: ["pets"] });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Skeleton className="h-9 w-full" />
                <div className="flex w-full flex-wrap gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPets.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
            У цьому притулку ще немає тварин
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={pet.imageLink ?? "/placeholder.svg?height=200&width=200"}
                  alt={pet.name ?? "Тварина"}
                  fill
                  className="object-cover"
                />
                <Badge
                  className={cn(
                    "absolute right-2 top-2",
                    getHealthStatusColor(pet.healthStatus),
                  )}
                >
                  {formatHealthStatus(pet.healthStatus)}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {pet.name ?? "Безіменна тварина"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatPetType(pet.type)} •{" "}
                      {pet.breed ?? "Невідома порода"} •{" "}
                      {pet.age ? `${pet.age} років` : "Вік невідомий"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-2 text-sm">
                  {pet.description ?? "Опис відсутній."}
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <PetDetailsModal petId={pet.id} className="w-full" />
                <div className="grid w-full grid-cols-2 gap-2">
                  <EditPetDialog pet={pet}>
                    <Button
                      icon={<Pencil />}
                      className="w-full"
                      variant="outline"
                      size="sm"
                    >
                      Редагувати
                    </Button>
                  </EditPetDialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePet(pet.id)}
                    isLoading={deleteMutation.isPending}
                    icon={<Trash2 />}
                    disabled={
                      deleteMutation.isPending &&
                      deleteMutation.variables === pet.id
                    }
                  >
                    Видалити
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShelterPets;
