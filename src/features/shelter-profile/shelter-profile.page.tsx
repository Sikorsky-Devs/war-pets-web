"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPetDialog from "@/features/shelter-profile/components/add-pet-dialog";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PetRequests from "./components/pet-requests";
import ShelterPets from "./components/shelter-pets";
import UserSearchRequests from "./components/user-search-requests";

const ShelterProfilePage = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="current-pets" className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="current-pets">Наявні тварини</TabsTrigger>
            <TabsTrigger value="pet-requests">Запити на отримання</TabsTrigger>
            <TabsTrigger value="user-search-requests">
              Запити на пошук
            </TabsTrigger>
          </TabsList>
          <AddPetDialog>
            <Button
              icon={<PlusCircle className="h-4 w-4" />}
              className="gap-1"
              size="sm"
            >
              Додати тварину
            </Button>
          </AddPetDialog>
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
    </div>
  );
};

export default ShelterProfilePage;
