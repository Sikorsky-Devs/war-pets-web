"use client"

import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddPetForm from "./components/add-pet-form";
import PetRequests from "./components/pet-requests";
import ShelterPets from "./components/shelter-pets";
import ShelterProfileCard from "./components/shelter-profile-card";
import UserSearchRequests from "./components/user-search-requests";

const ShelterProfilePage = () => {
  const [showAddPetForm, setShowAddPetForm] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-[350px_1fr]">
        <ShelterProfileCard/>

        <div className="space-y-6">
          {showAddPetForm ? (
            <AddPetForm onClose={() => setShowAddPetForm(false)} />
          ) : (
            <Tabs defaultValue="current-pets" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="current-pets">Наявні тварини</TabsTrigger>
                  <TabsTrigger value="pet-requests">Запити на отримання</TabsTrigger>
                  <TabsTrigger value="user-search-requests">Запити на пошук</TabsTrigger>
                </TabsList>
                <Button
                  icon={<PlusCircle className="h-4 w-4" />}
                  size="sm"
                  onClick={() => setShowAddPetForm(true)}
                  className="gap-1"
                >
                  Додати тварину
                </Button>
              </div>

              <TabsContent value="current-pets" className="mt-0">
                <ShelterPets />
              </TabsContent>

              <TabsContent value="pet-requests" className="mt-0">
                <PetRequests />
              </TabsContent>

              <TabsContent value="user-search-requests" className="mt-0">
                <UserSearchRequests />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShelterProfilePage;
