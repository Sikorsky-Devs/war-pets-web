"use client";

import { Heart, MapPin } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useSavePetMutation from "@/features/adverts/hooks/mutations/use-save-pet.mutation";
import { hasPermission } from "@/lib/permissions";
import useAuthStore from "@/store/use-auth-store";
import { type IBasePet } from "@/types/models/pet";
import { getPetAge } from "@/utils/pet-utils";

import PetDetailsModal from "./pet-details-modal";

interface PetCardProps extends IBasePet {
  isSaved?: boolean;
}

const PetCard = ({
  imageLink,
  address,
  age,
  name,
  shelter,
  id,
  isSaved = false,
}: PetCardProps) => {
  const { user } = useAuthStore();

  const canSave = hasPermission(user, "save", "create");

  const { handleSave, isSaving } = useSavePetMutation(id, isSaved);

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
