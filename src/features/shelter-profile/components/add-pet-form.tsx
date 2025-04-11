"use client"

import { X } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { PetHealthType, PetType } from "@/types/pet";

type AddPetFormProps = {
  onClose: () => void;
  shelterId: string;
}

const AddPetForm = ({ onClose, shelterId }: AddPetFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    petType: "" as PetType,
    breed: "",
    age: "",
    address: "",
    description: "",
    healthStatus: "" as PetHealthType,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would submit this data to your API
    console.log({
      ...formData,
      shelterId,
      age: formData.age ? Number.parseInt(formData.age) : null,
      isApproved: true,
      volunteerId: null,
    })

    onClose()
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Додати нову тварину</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Ім&#39;я тварини</Label>
            <Input
              id="name"
              placeholder="Введіть ім'я тварини"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="petType">Тип тварини</Label>
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
              <Label htmlFor="breed">Порода</Label>
              <Input
                id="breed"
                placeholder="Введіть породу"
                value={formData.breed}
                onChange={(e) => handleChange("breed", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Вік (років)</Label>
              <Input
                id="age"
                placeholder="Напр. 2"
                type="number"
                min="0"
                step="0.5"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthStatus">Стан здоров&#39;я</Label>
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
            <Label htmlFor="address">Адреса</Label>
            <Input
              id="address"
              placeholder="Введіть адресу, де знайдено/розташовано тварину"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Фотографія</Label>
            <Input id="image" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Опис</Label>
            <Textarea
              id="description"
              placeholder="Опишіть характер тварини, її потреби тощо"
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Скасувати
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Додати тварину
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddPetForm;
