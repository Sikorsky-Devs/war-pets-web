"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import { useParams } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { addPet, updatePetImage } from "@/api/pets/pets.api";
import { type AddPetFormData, addPetSchema } from "@/api/pets/pets.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import useAuthStore from "@/store/use-auth-store";
import type { PetHealthType, PetType } from "@/types/models/pet";
import { isShelter } from "@/utils/auth-utils";

type AddPetFormProps = {
  onClose: () => void;
};

const AddPetForm = ({ onClose }: AddPetFormProps) => {
  const { user: shelter } = useAuthStore();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const isUserShelter = isShelter(shelter.accountType);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<AddPetFormData>({ resolver: zodResolver(addPetSchema) });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (petId: string) => {
    if (!selectedImage) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      await updatePetImage(formData, petId);
    } catch (error) {
      toast.error("Помилка при завантаженні фото");
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: AddPetFormData) => {
    try {
      if (!selectedImage) {
        toast.error("Будь ласка, виберіть фото тварини");
        return;
      }

      const { id: petId } = await addPet({
        ...data,
        shelterId: isUserShelter ? shelter.id : id,
        isApproved: isUserShelter,
      });
      await handleImageUpload(petId);
      toast.success(
        isUserShelter
          ? "Тварину додано до притулку"
          : "Запит успішно відправлено",
      );
      await queryClient.invalidateQueries({ queryKey: ["pets"] });
      onClose();
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      toast.error("Трапилась помилка");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col items-center space-y-4">
          <Label
            htmlFor="profileImage"
            className="self-start text-sm font-medium"
          >
            Фото профілю
          </Label>
          <div className="flex flex-col items-center gap-4">
            <div
              onClick={triggerFileInput}
              className="group relative cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative h-32 w-32 overflow-hidden rounded-full border">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelectedImage();
                    }}
                    className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-dashed bg-muted/30 transition-colors group-hover:bg-muted/50">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Підтримувані формати: JPG, PNG, GIF. Макс. розмір: 5МБ
            </p>
          </div>
        </div>

        <Input
          id="name"
          type="text"
          label="Ім'я"
          error={errors.name?.message}
          placeholder="Введіть ім'я тварини"
          {...register("name")}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="petType">Тип тварини</Label>
            <Select onValueChange={(value: PetType) => setValue("type", value)}>
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
            {errors.type?.message && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <Input
            id="breed"
            type="text"
            label="Порода"
            error={errors.breed?.message}
            placeholder="Введіть породу"
            {...register("breed")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="age"
            type="number"
            min="0"
            step="0.5"
            label="Вік (років)"
            placeholder="Напр. 2"
            {...register("age", { valueAsNumber: true })}
          />

          <div className="space-y-2">
            <Label htmlFor="healthStatus">Стан здоров&#39;я</Label>
            <Select
              onValueChange={(value: PetHealthType) =>
                setValue("heathStatus", value)
              }
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
            {errors.heathStatus?.message && (
              <p className="text-sm text-red-500">
                {errors.heathStatus.message}
              </p>
            )}
          </div>
        </div>

        <Input
          id="address"
          type="text"
          min="0"
          step="0.5"
          label="Адреса"
          error={errors.address?.message}
          placeholder="Введіть адресу, де знайдено/розташовано тварину"
          {...register("address")}
        />

        {/*<div className="space-y-2">*/}
        {/*  <Label htmlFor="image">Фотографія</Label>*/}
        {/*  <Input id="image" type="file" accept="image/*" />*/}
        {/*</div>*/}

        <div className="space-y-2">
          <Label htmlFor="description">Опис</Label>
          <Textarea
            id="description"
            placeholder="Опишіть характер тварини, її потреби тощо"
            rows={4}
            {...register("description")}
          />
        </div>
      </form>
      <div className="mt-6 flex items-center justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Скасувати
        </Button>
        <Button
          isLoading={isSubmitting}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {isUserShelter ? "Додати тварину" : "Відправити запит"}
        </Button>
      </div>
    </div>
  );
};

export default AddPetForm;
