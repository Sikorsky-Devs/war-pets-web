"use client"

import { Info,Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import {useEffect, useState} from "react"

import {deletePetById, getAllPets, getPetById} from "@/api/pets/pets-api";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Pet } from "@/types/pet"
import { formatHealthStatus,formatPetType, getHealthStatusColor } from "@/utils/shelter-pets-utils"

import EditPetDialog from "./edit-pet-dialog"
import PetDetailsDialog from "./pet-details-dialog"

const ShelterPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [viewingPet, setViewingPet] = useState<Pet | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const fetchAllPets = async () => {
    const resultPets = await getAllPets();
    const fullPets = await Promise.all(
      resultPets.common.map((pet) => getPetById(pet.id))
    );

    setPets(fullPets);
  };

  const handleEditClick = (pet: Pet) => {
    setEditingPet(pet)
    setIsEditDialogOpen(true)
  }

  const handleViewDetailsClick = (pet: Pet) => {
    setViewingPet(pet)
    setIsDetailsDialogOpen(true)
  }

  const handleDeletePet = async (petId: string) => {
    await deletePetById(petId)
    setPets((prev) => prev.filter((pet) => pet.id !== petId))
  }

  useEffect(() => {
    fetchAllPets().catch((error) => {
      console.error("Error fetching pets:", error);
    });
  }, []);

  return (
    <div className="space-y-6">
      {pets.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">У цьому притулку ще немає тварин</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={pet.imageLink ?? "/placeholder.svg?height=200&width=200"}
                  alt={pet.name ?? "Тварина"}
                  fill
                  className="object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getHealthStatusColor(pet.heathStatus)}`}>
                  {formatHealthStatus(pet.heathStatus)}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{pet.name ?? "Безіменна тварина"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatPetType(pet.type)} • {pet.breed ?? "Невідома порода"} •{" "}
                      {pet.age ? `${pet.age} років` : "Вік невідомий"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm line-clamp-2">{pet.description ?? "Опис відсутній."}</p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button
                  icon={<Info className="h-4 w-4 mr-2"/> }
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleViewDetailsClick(pet)}
                >
                  Деталі
                </Button>
                <div className="flex flex-wrap w-full gap-2">
                  <Button
                    icon={<Pencil className="h-4 w-4 mr-2"/>}
                    className="flex-1"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(pet)}
                  >
                    Редагувати
                  </Button>
                  <Button
                    icon={<Trash2 className="h-4 w-4 mr-2"/>}
                    className="flex-1"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePet(pet.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <EditPetDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} pet={editingPet}/>

      <PetDetailsDialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen} pet={viewingPet}/>
    </div>
  );
}

export default ShelterPets;
