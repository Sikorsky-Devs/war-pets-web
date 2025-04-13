"use client"

import { useState } from "react"

import { type Pet } from "@/types/pet"

import PetRequest from "@/features/shelter-profile/components/pet-request"
import usePetsQuery from "@/features/shelter/hooks/use-pets-query"
import useAuthStore from "@/store/use-auth-store"
import PetDetailsDialog from "./pet-details-dialog"

const PetRequests = () => {
  const { user: { id } } = useAuthStore();
  const [viewingPet, setViewingPet] = useState<Pet | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const { pets = [], isLoading } = usePetsQuery(id);

  const filteredPets = pets.filter((pet) => !pet.isApproved)

  return (
    <div className="space-y-6">
      {filteredPets.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Немає запитів на передачу тварин</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPets.map((pet) => (
            <PetRequest key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      <PetDetailsDialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen} pet={viewingPet} />
    </div>
  )
}

export default PetRequests;
