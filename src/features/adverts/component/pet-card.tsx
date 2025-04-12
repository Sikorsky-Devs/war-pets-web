import { MapPin } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type Pet, type PetResponse } from "@/types/pet";
import { getPetAge } from "@/utils/pet-utils";

interface PetCardProps {
  pet: PetResponse;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { imageLink, address, age, name, shelter } = pet;
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageLink ?? ""} alt={name} fill className="object-cover" />
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
      {shelter && (
        <CardFooter className="border-t pt-4 text-sm">
          <Badge>Притулок: {shelter}</Badge>
        </CardFooter>
      )}
    </Card>
  );
};

export default PetCard;
