"use client"

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Pet } from "@/types/pet";
import { formatHealthStatus,formatPetType, getHealthStatusColor } from "@/utils/shelter-pets-utils";

type PetDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

const PetDetailsDialog = ({ open, onOpenChange, pet}: PetDetailsDialogProps) => {
  if (!pet) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{pet.name ?? "Безіменна тварина"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="relative h-64 w-full rounded-md overflow-hidden">
            <Image
              src={pet.imageLink ?? "/placeholder.svg?height=400&width=600"}
              alt={pet.name ?? "Тварина"}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Тип</h3>
              <p>{formatPetType(pet.petType)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Порода</h3>
              <p>{pet.breed ?? "Невідома"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Вік</h3>
              <p>{pet.age !== null ? `${pet.age} років` : "Невідомо"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Стан здоров&#39;я</h3>
              <Badge className={getHealthStatusColor(pet.healthStatus)}>{formatHealthStatus(pet.healthStatus)}</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground">Адреса</h3>
            <p>{pet.address ?? "Адреса не вказана"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground">Опис</h3>
            <p className="mt-1">{pet.description ?? "Опис відсутній."}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PetDetailsDialog;
