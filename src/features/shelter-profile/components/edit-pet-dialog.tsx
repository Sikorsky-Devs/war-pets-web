"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { editPetById } from "@/api/pets/pets.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type AddPetFormData,
  type EditPetFormData,
  editPetSchema,
} from "@/features/shelter-profile/types/shelter-profile-types";
import { queryClient } from "@/providers/query-provider";
import type { Pet, PetHealthType, PetType } from "@/types/pet";

type EditPetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
};

const EditPetDialog = ({ open, onOpenChange, pet }: EditPetDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditPetFormData>({ resolver: zodResolver(editPetSchema) });

  const onSubmit = async (data: AddPetFormData) => {
    try {
      if (pet) {
        await editPetById(pet.id, {
          ...data,
          isApproved: true,
        });

        onOpenChange(false);
        await queryClient.invalidateQueries({ queryKey: ["pets"] });
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Редагувати інформацію про тварину</DialogTitle>
          <DialogDescription>
            Внесіть зміни до інформації про тварину тут. Натисніть зберегти,
            коли закінчите.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-3" onSubmit={handleSubmit(onSubmit)}>
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
              <Select
                onValueChange={(value: PetType) => setValue("type", value)}
              >
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
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          >
            Зберегти зміни
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPetDialog;
