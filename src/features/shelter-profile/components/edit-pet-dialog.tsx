"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { editPetById } from "@/api/pets/pets.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PET_HEALTH_STATUS_MAPPER, PET_TYPE_MAPPER } from "@/constants/mappers";
import {
  type EditPetFormData,
  editPetSchema,
} from "@/features/shelter-profile/types/shelter-profile-types";
import { queryClient } from "@/providers/query-provider";
import useAuthStore from "@/store/use-auth-store";
import type { PetHealthType, PetResponse, PetType } from "@/types/pet";

interface EditPetDialogProps extends PropsWithChildren {
  pet: PetResponse | null;
}

const EditPetDialog = ({ pet, children }: EditPetDialogProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditPetFormData>({
    resolver: zodResolver(editPetSchema),
    defaultValues: {
      name: pet?.name ?? "",
      type: pet?.type ?? "OTHER",
      breed: pet?.breed ?? "",
      age: pet?.age ?? 0,
      heathStatus: pet?.healthStatus ?? "HEALTHY",
      address: pet?.address ?? "",
      description: pet?.description ?? "",
    },
  });

  const onSubmit = async (data: EditPetFormData) => {
    if (!pet?.id) return;
    try {
      await editPetById(pet.id, data);

      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast.success("Інформацію про тварину оновлено");
    } catch (e) {
      if (e instanceof Error)
        toast.error("Помилка оновлення інформації про тварину");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
                defaultValue={pet?.type}
                onValueChange={(value: PetType) => setValue("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_TYPE_MAPPER).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
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
              <Label htmlFor="heathStatus">Стан здоров&#39;я</Label>
              <Select
                defaultValue={pet?.healthStatus}
                onValueChange={(value: PetHealthType) =>
                  setValue("heathStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть стан" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PET_HEALTH_STATUS_MAPPER).map(
                    ([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ),
                  )}
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
          <Button type="submit" isLoading={isSubmitting}>
            Зберегти зміни
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPetDialog;
