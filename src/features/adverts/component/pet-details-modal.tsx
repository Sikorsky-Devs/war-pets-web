"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Info, InfoIcon, MapPin, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { toast } from "sonner";

import { getPetById, savePet, unsavePet } from "@/api/pets/pets.api";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Routes } from "@/constants/navigation";
import { hasPermission } from "@/permissions";
import useAuthStore from "@/store/use-auth-store";
import { getPetAge } from "@/utils/pet-utils";
import { cn } from "@/utils/styles-utils";

interface PetDetailsModalProps {
  petId: string;
  isSaved?: boolean;
  className?: string;
  isShelter?: boolean;
}

const PetDetailsModal = memo(
  ({ petId, isSaved = false, className }: PetDetailsModalProps) => {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const canSave = hasPermission(user, "save", "create");

    const { data: pet, isLoading } = useQuery({
      queryKey: ["pet", petId],
      queryFn: () => getPetById(petId),
      enabled: open,
    });

    const shelterHref = Routes.Shelter.replace("[id]", pet?.shelterId ?? "");

    const { mutate: handleSave, isPending: isSaving } = useMutation({
      mutationFn: async () => {
        try {
          if (isSaved) {
            await unsavePet(petId);
          } else {
            await savePet(petId);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={className}
            size="sm"
            variant="outline"
            icon={<Info />}
          >
            Детальніше
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{pet?.name}</span>
              {canSave && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave()}
                  disabled={isSaving}
                >
                  <Heart
                    className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="h-96 animate-pulse bg-muted" />
          ) : pet ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square">
                <Image
                  src={pet.imageLink ?? ""}
                  alt={pet.name ?? ""}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Інформація про тварину
                  </h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Вік:</span>{" "}
                      {getPetAge(pet.age)}
                    </p>
                    {pet.breed && (
                      <p>
                        <span className="font-medium">Порода:</span> {pet.breed}
                      </p>
                    )}
                    {pet.address && (
                      <p className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {pet.address}
                      </p>
                    )}
                  </div>
                </div>

                {pet.description && (
                  <div>
                    <h3 className="text-lg font-semibold">Опис</h3>
                    <p className="mt-2 text-sm">{pet.description}</p>
                  </div>
                )}

                {pet.shelter && (
                  <div>
                    <h3 className="text-lg font-semibold">Притулок</h3>
                    <p className="mt-2 text-sm">{pet.shelter}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "outline",
                      }),
                      "gap-2",
                    )}
                    href={shelterHref}
                  >
                    <InfoIcon className="size-4" />
                    <span>Детальніше про притулок</span>
                  </Link>
                  <Button icon={<MessageCircleIcon />} size="sm">
                    Чат з притулком
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  },
);

PetDetailsModal.displayName = "PetDetailsModal";

export default PetDetailsModal;
