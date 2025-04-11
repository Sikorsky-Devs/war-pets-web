"use client"

import { Globe, LogOut,Mail, MapPin, Phone, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AddPetForm from "./components/add-pet-form"
import PetRequests from "./components/pet-requests"
import ShelterPets from "./components/shelter-pets"
import UserSearchRequests from "./components/user-search-requests"

const ShelterProfilePage = () => {
  const [showAddPetForm, setShowAddPetForm] = useState(false)

  const shelterData = {
    id: "shelter-123",
    name: "Happy Paws Shelter",
    email: "info@happypaws.org",
    phone: "+1 (555) 123-4567",
    location: "Kyiv, Ukraine",
    website: "https://happypaws.org",
    status: "Притулок",
    completionPercentage: 85,
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-[350px_1fr]">
        <Card className="h-fit">
          <CardHeader className="relative pb-0">
            <Badge className="absolute right-6 top-6 bg-orange-500 hover:bg-orange-600">{shelterData.status}</Badge>
            <div className="flex justify-center">
              <div className="relative h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <span className="text-4xl text-muted-foreground">🏠</span>
              </div>
            </div>
            <CardTitle className="text-center mt-2">{shelterData.name}</CardTitle>
            <CardDescription className="text-center">{shelterData.email}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{shelterData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{shelterData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{shelterData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Link href={shelterData.website} className="text-primary hover:underline">
                {shelterData.website}
              </Link>
            </div>
          </CardContent>

          <CardFooter>
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Вийти
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {showAddPetForm ? (
            <AddPetForm onClose={() => setShowAddPetForm(false)} shelterId={shelterData.id} />
          ) : (
            <Tabs defaultValue="current-pets" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="current-pets">Current Pets</TabsTrigger>
                  <TabsTrigger value="pet-requests">Pet Requests</TabsTrigger>
                  <TabsTrigger value="user-search-requests">User Search Requests</TabsTrigger>
                </TabsList>
                <Button className="gap-1" size="sm" onClick={() => setShowAddPetForm(true)}>
                  <PlusCircle className="h-4 w-4" /> Add Pet
                </Button>
              </div>

              <TabsContent value="current-pets" className="mt-0">
                <ShelterPets shelterId={shelterData.id} />
              </TabsContent>

              <TabsContent value="pet-requests" className="mt-0">
                <PetRequests shelterId={shelterData.id} />
              </TabsContent>

              <TabsContent value="user-search-requests" className="mt-0">
                <UserSearchRequests shelterId={shelterData.id} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShelterProfilePage;
