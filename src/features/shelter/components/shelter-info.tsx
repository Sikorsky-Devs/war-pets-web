import { Heart, MapPin, MessageCircleIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { SHELTER_TYPE_MAPPER } from "@/constants/mappers";
import AddPetDialog from "@/features/shelter-profile/components/add-pet-dialog";
import useShelterQuery from "@/features/shelter/hooks/use-shelter-query";

const ShelterInfo = () => {
  const { id } = useParams();
  const { back } = useRouter();

  const { shelter, isLoading, error } = useShelterQuery(id as string);

  if (error) {
    toast.error("Такого притулку не існує");
    back();
  }

  if (isLoading) {
    return (
      <div className="mb-8 flex flex-col gap-6 md:flex-row">
        <div className="size-40 animate-pulse rounded-full bg-muted" />
        <div className="w-full space-y-4 md:w-2/3">
          <div className="h-10 w-1/2 animate-pulse bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 animate-pulse bg-muted" />
            <div className="h-6 w-48 animate-pulse bg-muted" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 animate-pulse bg-muted" />
            <div className="h-10 w-32 animate-pulse bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row">
      <UserAvatar className="size-40" size={40} image={shelter?.avatarLink} />

      <div className="w-full md:w-2/3">
        <h1 className="mb-2 text-3xl font-bold">{shelter?.name}</h1>

        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <Badge variant="outline">
            {SHELTER_TYPE_MAPPER[shelter?.shelterType ?? "OTHER"]}
          </Badge>
          {shelter?.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{shelter.address}</span>
            </div>
          )}
        </div>

        <p className="mb-4">{shelter?.description}</p>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" icon={<MessageCircleIcon />}>
            Чат з притулком
          </Button>

          {shelter?.donationLink && (
            <Link
              className={buttonVariants()}
              href={shelter.donationLink ?? ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="mr-2 h-4 w-4" />
              Підтримати
            </Link>
          )}

          <AddPetDialog>
            <Button
              icon={<PlusCircle className="h-4 w-4" />}
              className="gap-1"
              variant="secondary"
            >
              Здати тварину
            </Button>
          </AddPetDialog>
        </div>
      </div>
    </div>
  );
};

export default ShelterInfo;
