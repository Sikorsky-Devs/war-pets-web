"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Info, Loader2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { deletePetById, getAllPets, getPetById } from "@/api/pets/pets.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePetsQuery from "@/features/shelter/hooks/use-pets-query";
import useAuthStore from "@/store/use-auth-store";
import type { Pet } from "@/types/pet";
import {
  formatHealthStatus,
  formatPetType,
  getHealthStatusColor,
} from "@/utils/shelter-pets-utils";
import { cn } from "@/utils/styles-utils";

import EditPetDialog from "./edit-pet-dialog";
import PetDetailsDialog from "./pet-details-dialog";

const ShelterPets = () => {
  const { user } = useAuthStore();
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [viewingPet, setViewingPet] = useState<Pet | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { pets, isLoading } = usePetsQuery(user.id);

  const deleteMutation = useMutation({
    mutationFn: (petId: string) => deletePetById(petId),
    onSuccess: (_, petId) => {
      queryClient.setQueryData(["pets"], (oldData: Pet[] | undefined) =>
        oldData ? oldData.filter((pet) => pet.id !== petId) : [],
      );
    },
  });

  const handleEditClick = (pet: Pet) => {
    setEditingPet(pet);
    setIsEditDialogOpen(true);
  };

  const handleViewDetailsClick = (pet: Pet) => {
    setViewingPet(pet);
    setIsDetailsDialogOpen(true);
  };

  const handleDeletePet = (petId: string) => {
    deleteMutation.mutate(petId);
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
      {pets.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
            У цьому притулку ще немає тварин
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {pets.map((pet) => (
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
                    getHealthStatusColor(pet.heathStatus),
                  )}
                >
                  {formatHealthStatus(pet.heathStatus)}
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleViewDetailsClick(pet)}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Деталі
                </Button>
                <div className="flex w-full flex-wrap gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(pet)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Редагувати
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePet(pet.id)}
                    disabled={
                      deleteMutation.isPending &&
                      deleteMutation.variables === pet.id
                    }
                  >
                    {deleteMutation.isPending &&
                    deleteMutation.variables === pet.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Видалити
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <EditPetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        pet={editingPet}
      />

      <PetDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        pet={viewingPet}
      />
    </div>
  );
};

export default ShelterPets;
