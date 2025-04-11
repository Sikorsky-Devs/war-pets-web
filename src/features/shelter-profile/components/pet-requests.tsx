"use client"

import { Info,MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { type Pet, type PetRequest } from "@/types/pet";
import { formatPetType } from "@/utils/shelter-pets-utils";

import PetDetailsDialog from "./pet-details-dialog"

const sampleRequests: PetRequest[] = [
  {
    id: "req-1",
    petId: "pet-req-1",
    requestedBy: "Іван Петренко",
    requestDate: "2023-04-15",
    status: "PENDING",
    message: "Я знайшов цю собаку біля парку. Вона дружелюбна і добре вихована. Чи може ваш притулок її прийняти?",
    pet: {
      id: "pet-req-1",
      shelterId: "",
      volunteerId: "volunteer-1",
      isApproved: false,
      name: "Белла",
      type: "DOG",
      breed: "Лабрадор",
      age: 1,
      address: "Київ, Україна",
      imageLink: "/placeholder.svg?height=200&width=200",
      description: "Знайдена біля центрального парку. Дуже дружелюбна і добре вихована.",
      heathStatus: "HEALTHY",
    },
  },
  {
    id: "req-2",
    petId: "pet-req-2",
    requestedBy: "Марія Коваленко",
    requestDate: "2023-04-18",
    status: "PENDING",
    message: "Це кошеня було покинуте в нашому районі. Я не можу його залишити, але хотіла б знайти йому хороший дім.",
    pet: {
      id: "pet-req-2",
      shelterId: "",
      volunteerId: "volunteer-2",
      isApproved: false,
      name: "Олівер",
      type: "CAT",
      breed: "Табі",
      age: 0,
      address: "Львів, Україна",
      imageLink: "/placeholder.svg?height=200&width=200",
      description: "Приблизно 6 місяців. Дуже грайливе і ласкаве.",
      heathStatus: "HEALTHY",
    },
  },
]

const PetRequests = () => {
  const [viewingPet, setViewingPet] = useState<Pet | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // In a real app, you would filter requests by shelterId from your database
  const petRequests = sampleRequests

  const handleViewDetailsClick = (pet: Pet) => {
    setViewingPet(pet)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {petRequests.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Немає запитів на передачу тварин</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {petRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[250px_1fr]">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={request.pet.imageLink ?? "/placeholder.svg?height=200&width=200"}
                    alt={request.pet.name ?? "Тварина"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{request.pet.name ?? "Безіменна тварина"}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPetType(request.pet.type)} • {request.pet.breed ?? "Невідома порода"} •{" "}
                          {request.pet.age !== null
                            ? request.pet.age < 1
                              ? "Менше 1 року"
                              : `${request.pet.age} років`
                            : "Вік невідомий"}
                        </p>
                      </div>
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        {request.status === "PENDING"
                          ? "Очікує"
                          : request.status === "APPROVED"
                            ? "Підтверджено"
                            : "Відхилено"}
                      </Badge>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Запит від:</span> {request.requestedBy} від{" "}
                      {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">{request.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetailsClick(request.pet)}>
                        <Info className="h-4 w-4 mr-2"/> Деталі тварини
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2"/> Чат з волонтером
                      </Button>
                    </div>
                    <div className="space-x-2">
                      <Button variant="destructive" size="sm">
                        Відхилити
                      </Button>
                      <Button variant="default" size="sm">
                        Прийняти
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <PetDetailsDialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen} pet={viewingPet}/>
    </div>
  )
}

export default PetRequests;
