import { Heart, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SHELTER_TYPE_MAPPER } from "@/constants/mappers";
import { Routes } from "@/constants/navigation";
import type { ShelterUser } from "@/types/models/user";
import { cn } from "@/utils/styles-utils";

interface ShelterCardProps {
  shelter: ShelterUser;
}

const ShelterCard = ({ shelter }: ShelterCardProps) => {
  const shelterHref = Routes.Shelter.replace("[id]", shelter.id);
  return (
    <Card className="overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <Image
          src={shelter.avatarLink ?? "https://placehold.co/400x300"}
          alt={shelter.name ?? "Shelter"}
          className="h-full w-full object-cover"
          width={400}
          height={300}
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl">{shelter.name}</CardTitle>
        {shelter.stars && (
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{shelter.stars}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Badge className="mb-3" variant="outline">
          {SHELTER_TYPE_MAPPER[shelter?.shelterType ?? "OTHER"]}
        </Badge>
        <p className="text-sm text-gray-500">
          {shelter.address ?? "No address provided"}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {shelter.description ?? "No description available"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link className={cn(buttonVariants(), "mr-2")} href={shelterHref}>
          <InfoIcon />
          Деталі
        </Link>
        {shelter.donationLink && (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={shelter.donationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heart />
            Підтримати
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShelterCard;
