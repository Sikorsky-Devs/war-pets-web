"use client"

import { MessageCircle, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { type PetSearchRequest } from "@/types/pet";
import { formatHealthStatus, formatPetType } from "@/utils/shelter-pets-utils";

// Sample data - in a real app, this would come from your database
const sampleUserSearchRequests: PetSearchRequest[] = [
  {
    id: "search-1",
    userId: "user-1",
    userName: "Марія Коваленко",
    userEmail: "maria.k@example.com",
    requestDate: "2023-05-10",
    petType: "DOG",
    breed: "Лабрадор",
    ageFrom: 1,
    ageTo: 3,
    address: "Київ, Україна",
    healthStatus: "HEALTHY",
    comment: "Шукаю дружелюбного собаку для моєї сім'ї з дітьми. У нас є будинок з подвір'ям.",
  },
  {
    id: "search-2",
    userId: "user-2",
    userName: "Олександр Петренко",
    userEmail: "oleksandr.p@example.com",
    requestDate: "2023-05-12",
    petType: "CAT",
    breed: null,
    ageFrom: 0,
    ageTo: 1,
    address: "Львів, Україна",
    healthStatus: null,
    comment: "Я шукаю кошеня. Живу в квартирі і працюю з дому, тому можу забезпечити хороший догляд.",
  },
  {
    id: "search-3",
    userId: "user-3",
    userName: "Наталія Шевченко",
    userEmail: "natalia.s@example.com",
    requestDate: "2023-05-15",
    petType: "DOG",
    breed: "Німецька вівчарка",
    ageFrom: null,
    ageTo: null,
    address: "Одеса, Україна",
    healthStatus: "DISABLED",
    comment:
      "Я хотіла б усиновити собаку з інвалідністю. У мене є досвід з тваринами з особливими потребами і я можу забезпечити належний догляд.",
  },
]

const UserSearchRequests = ({ shelterId }: { shelterId: string }) => {
  // In a real app, you would filter requests by shelterId from your database
  const searchRequests = sampleUserSearchRequests;

  return (
    <div className="space-y-6">
      {searchRequests.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Немає запитів на пошук тварин</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {searchRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Запит на пошук тварини</h3>
                    <p className="text-sm text-muted-foreground">
                      Від: {request.userName} • {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-purple-500 hover:bg-purple-600">
                    <Search className="h-3 w-3 mr-1"/> Запит на пошук
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Тип тварини</h4>
                      <p>{request.petType ? formatPetType(request.petType) : "Будь-який"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Порода</h4>
                      <p>{request.breed ?? "Будь-яка"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Віковий діапазон</h4>
                      <p>
                        {request.ageFrom !== null && request.ageTo !== null
                          ? `${request.ageFrom} - ${request.ageTo} років`
                          : request.ageFrom !== null
                            ? `${request.ageFrom}+ років`
                            : request.ageTo !== null
                              ? `До ${request.ageTo} років`
                              : "Будь-який вік"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Місцезнаходження</h4>
                      <p>{request.address ?? "Будь-яке місце"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Стан здоров&#39;я</h4>
                      <p>{request.healthStatus ? formatHealthStatus(request.healthStatus) : "Будь-який"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Контакт</h4>
                      <p>{request.userEmail}</p>
                    </div>
                  </div>
                </div>
                {request.comment && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Додаткові коментарі</h4>
                    <p className="mt-1 text-sm">{request.comment}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2"/> Чат з користувачем
                </Button>
                <div className="space-x-2">
                  <Button variant="default" size="sm">
                    Запропонувати тварин
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserSearchRequests;
