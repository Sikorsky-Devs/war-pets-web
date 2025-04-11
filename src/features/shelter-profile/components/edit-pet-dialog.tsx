"use client"

import { useEffect,useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Pet, PetHealthType, PetType } from "@/types/pet";

type EditPetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

const EditPetDialog = ({ open, onOpenChange, pet }: EditPetDialogProps) => {
  const [formData, setFormData] = useState<{
    name: string
    petType: PetType
    breed: string
    age: string
    address: string
    description: string
    healthStatus: PetHealthType
  }>({
    name: "",
    petType: "DOG",
    breed: "",
    age: "",
    address: "",
    description: "",
    healthStatus: "HEALTHY",
  })

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name ?? "",
        petType: pet.petType,
        breed: pet.breed ?? "",
        age: pet.age !== null ? pet.age.toString() : "",
        address: pet.address ?? "",
        description: pet.description ?? "",
        healthStatus: pet.healthStatus,
      })
    }
  }, [pet])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!pet) return

    // In a real app, you would submit this data to your API
    console.log({
      id: pet.id,
      ...formData,
      age: formData.age ? Number.parseInt(formData.age) : null,
    })

    onOpenChange(false)
  }

  if (!pet) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Редагувати інформацію про тварину</DialogTitle>
          <DialogDescription>
            Внесіть зміни до інформації про тварину тут. Натисніть зберегти, коли закінчите.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-3">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Ім&#39;я тварини</Label>
            <Input id="edit-name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-petType">Тип тварини</Label>
              <Select value={formData.petType} onValueChange={(value) => handleChange("petType", value as PetType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOG">Собака</SelectItem>
                  <SelectItem value="CAT">Кіт</SelectItem>
                  <SelectItem value="BIRD">Птах</SelectItem>
                  <SelectItem value="FISH">Риба</SelectItem>
                  <SelectItem value="DOMESTIC">Домашня тварина</SelectItem>
                  <SelectItem value="EXOTIC">Екзотична тварина</SelectItem>
                  <SelectItem value="OTHER">Інше</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-breed">Порода</Label>
              <Input id="edit-breed" value={formData.breed} onChange={(e) => handleChange("breed", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-age">Вік (років)</Label>
              <Input
                id="edit-age"
                type="number"
                min="0"
                step="0.5"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-healthStatus">Стан здоров&#39;я</Label>
              <Select
                value={formData.healthStatus}
                onValueChange={(value) => handleChange("healthStatus", value as PetHealthType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть стан" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HEALTHY">Здоровий</SelectItem>
                  <SelectItem value="INJURED">Травмований</SelectItem>
                  <SelectItem value="SICK">Хворий</SelectItem>
                  <SelectItem value="UNDER_TREATMENT">На лікуванні</SelectItem>
                  <SelectItem value="DISABLED">З інвалідністю</SelectItem>
                  <SelectItem value="CRITICAL">Критичний стан</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Адреса</Label>
            <Input
              id="edit-address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Опис</Label>
            <Textarea
              id="edit-description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Зберегти зміни
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditPetDialog;
