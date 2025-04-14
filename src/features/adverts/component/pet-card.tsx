"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { savePet, unsavePet } from "@/api/pets/pets.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { hasPermission } from "@/permissions";
import useAuthStore from "@/store/use-auth-store";
import { type Pet, type PetResponse } from "@/types/pet";
import { getPetAge } from "@/utils/pet-utils";

import PetDetailsModal from "./pet-details-modal";

interface PetCardProps {
  pet: PetResponse | Pet;
  isSaved?: boolean;
}

const PetCard = ({ pet, isSaved = false }: PetCardProps) => {
  const { user } = useAuthStore();
  const { imageLink, address, age, name, shelter, id } = pet;
  const queryClient = useQueryClient();

  const canSave = hasPermission(user, "save", "create");

  const { mutate: handleSave, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      try {
        if (isSaved) {
          await unsavePet(id);
        } else {
          await savePet(id);
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pets"] }),
        queryClient.invalidateQueries({ queryKey: ["savedPets"] }),
      ]);
      toast.success(
        isSaved ? "Тварину видалено зі збережених" : "Тварину збережено",
      );
    },
    onError: () => {
      toast.error("Помилка при збереженні тварини");
    },
  });

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageLink ?? ""}
          alt={name ?? ""}
          fill
          className="object-cover"
        />
        {canSave && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full bg-background/80 hover:bg-background/90"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={isSaving}
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        )}
      </div>
      <CardContent className="flex-grow pt-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-2 text-sm text-muted-foreground">
          <p>{getPetAge(age)}</p>
          {address && (
            <p className="mt-1 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {address}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        {shelter && <Badge>Притулок: {shelter}</Badge>}
        <PetDetailsModal petId={id} isSaved={isSaved} />
      </CardFooter>
    </Card>
  );
};

export default PetCard;
