"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { deletePetById, editPetById } from "@/api/pets/pets.api";
import { getUser } from "@/api/users/users.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PetDetailsModal from "@/features/adverts/component/pet-details-modal";
import { toast } from "@/lib/toast";
import useAuthStore from "@/store/use-auth-store";
import useChatStore from "@/store/use-chat-store";
import { type PetResponse } from "@/types/models/pet";
import { getPetAge } from "@/utils/pet-utils";
import { formatPetType } from "@/utils/shelter-pets-utils";

interface PetRequestProps {
  pet: PetResponse;
}

const PetRequest = ({ pet }: PetRequestProps) => {
  const {
    user: { id },
  } = useAuthStore();
  const { setReceiverId, setIsChatOpen, addChat } = useChatStore();
  const queryClient = useQueryClient();

  const { mutate: acceptPet, isPending: isAccepting } = useMutation({
    mutationFn: () =>
      editPetById(pet.id, {
        isApproved: true,
      }),
    onSuccess: async () => {
      toast.success("Тваринку успішно прийнято!");
      await queryClient.invalidateQueries({
        queryKey: ["pets", id],
      });
    },
    onError: () => {
      toast.error("Помилка при прийнятті тваринки!");
    },
  });

  const { mutate: rejectPet, isPending: isRejecting } = useMutation({
    mutationFn: () => deletePetById(pet.id),
    onSuccess: async () => {
      toast.warning("Тваринку відхилено!");
      await queryClient.invalidateQueries({
        queryKey: ["pets", id],
      });
    },
    onError: () => {
      toast.error("Помилка при відхиленні тваринки!");
    },
  });

  const handleOpenChat = async () => {
    const user = await getUser(pet.shelterId);
    addChat(user);
    setReceiverId(user.id);
    setIsChatOpen(true);
  };

  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[250px_1fr]">
        <div className="relative h-48 md:h-full">
          <Image
            src={pet.imageLink ?? "/placeholder.svg?height=200&width=200"}
            alt={pet.name ?? "Тварина"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {pet.name ?? "Безіменна тварина"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatPetType(pet.type)} • {pet.breed ?? "Невідома порода"} •{" "}
                  {getPetAge(pet.age)}
                </p>
              </div>
              <Badge className="bg-amber-500 hover:bg-amber-600">Очікує</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">{pet.description}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-y-2 border-t pt-4">
            <div className="flex gap-2">
              <PetDetailsModal petId={pet.id} />
              <Button onClick={handleOpenChat} variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" /> Чат з волонтером
              </Button>
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => rejectPet()}
                isLoading={isRejecting}
                variant="destructive"
                size="sm"
              >
                Відхилити
              </Button>
              <Button
                onClick={() => acceptPet()}
                isLoading={isAccepting}
                variant="default"
                size="sm"
              >
                Прийняти
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default PetRequest;
