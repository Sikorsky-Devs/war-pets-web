"use client"

import { Info,Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Pet } from "@/types/pet"
import { formatHealthStatus,formatPetType, getHealthStatusColor } from "@/utils/shelter-pets-utils"

import EditPetDialog from "./edit-pet-dialog"
import PetDetailsDialog from "./pet-details-dialog"

// Sample data - in a real app, this would come from your database
const samplePets: Pet[] = [
  {
    id: "pet-1",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Макс",
    petType: "DOG",
    breed: "Золотистий ретривер",
    age: 3,
    address: "Київ, Україна",
    imageLink: "/placeholder.svg?height=200&width=200",
    description: "Дружелюбний та енергійний пес, який шукає люблячу домівку.",
    healthStatus: "HEALTHY",
  },
  {
    id: "pet-2",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Луна",
    petType: "CAT",
    breed: "Сіамська",
    age: 2,
    address: "Київ, Україна",
    imageLink: "/placeholder.svg?height=200&width=200",
    description: "Спокійна та ласкава кішка, яка любить обійми.",
    healthStatus: "HEALTHY",
  },
  {
    id: "pet-3",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Рокі",
    petType: "DOG",
    breed: "Німецька вівчарка",
    age: 4,
    address: "Київ, Україна",
    imageLink: "/placeholder.svg?height=200&width=200",
    description: "Вірний та захисний пес, який відновлюється після травми.",
    healthStatus: "UNDER_TREATMENT",
  },
]

const ShelterPets = ({ shelterId }: { shelterId: string }) => {
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [viewingPet, setViewingPet] = useState<Pet | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // In a real app, you would filter pets by shelterId from your database
  const pets = samplePets.filter((pet) => pet.shelterId === shelterId)

  const handleEditClick = (pet: Pet) => {
    setEditingPet(pet)
    setIsEditDialogOpen(true)
  }

  const handleViewDetailsClick = (pet: Pet) => {
    setViewingPet(pet)
    setIsDetailsDialogOpen(true)
  }

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
                <Badge className={`absolute top-2 right-2 ${getHealthStatusColor(pet.healthStatus)}`}>
                  {formatHealthStatus(pet.healthStatus)}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{pet.name ?? "Безіменна тварина"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatPetType(pet.petType)} • {pet.breed ?? "Невідома порода"} •{" "}
                      {pet.age ? `${pet.age} років` : "Вік невідомий"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm line-clamp-2">{pet.description ?? "Опис відсутній."}</p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetailsClick(pet)}>
                  <Info className="h-4 w-4 mr-2"/> Деталі
                </Button>
                <div className="flex flex-wrap w-full gap-2">
                  <Button className="flex-1" variant="outline" size="sm" onClick={() => handleEditClick(pet)}>
                    <Pencil className="h-4 w-4 mr-2"/> Редагувати
                  </Button>
                  <Button className="flex-1" variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2"/> Видалити
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
