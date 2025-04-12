"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

import { createSearchRequest } from "@/api/pets/pets.api";
import {
  CreateSearchRequestBody,
  type CreateSearchRequestDto,
  createSearchRequestDto,
} from "@/api/pets/pets.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "@/store/use-auth-store";
import { type PetHealthType, type PetType } from "@/types/pet";

interface PetSearchFormProps {
  onCancel: () => void;
}

const PetSearchForm = ({ onCancel }: PetSearchFormProps) => {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CreateSearchRequestDto>({
    resolver: zodResolver(createSearchRequestDto),
    defaultValues: {
      petType: undefined,
      ageFrom: undefined,
      ageTo: undefined,
      address: "",
      breed: "",
      healthStatus: undefined,
    },
  });

  const onSubmit = async (values: CreateSearchRequestDto) => {
    try {
      await createSearchRequest({
        volunteerId: user.id,
        ...values,
      });
      reset();
      toast.success("Запит на пошук тварини успішно надіслано");
      onCancel();
    } catch {
      toast.error("Помилка при надсиланні запиту");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="petType" className="text-sm font-medium">
          Тип тварини
        </label>
        <Select
          onValueChange={(value) => setValue("petType", value as PetType)}
        >
          <SelectTrigger id="petType">
            <SelectValue placeholder="Оберіть тип тварини" />
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
        {errors.petType && (
          <p className="text-sm font-medium text-destructive">
            {errors.petType.message}
          </p>
        )}
      </div>

      {/* Age Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="ageFrom" className="text-sm font-medium">
            Вік від
          </label>
          <Input
            id="ageFrom"
            type="number"
            min="0"
            placeholder="Мін. вік"
            {...register("ageFrom", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.ageFrom && (
            <p className="text-sm font-medium text-destructive">
              {errors.ageFrom.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="ageTo" className="text-sm font-medium">
            Вік до
          </label>
          <Input
            id="ageTo"
            type="number"
            min="0"
            placeholder="Макс. вік"
            {...register("ageTo", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.ageTo && (
            <p className="text-sm font-medium text-destructive">
              {errors.ageTo.message}
            </p>
          )}
        </div>
      </div>

      {/* Breed */}
      <div className="space-y-2">
        <label htmlFor="breed" className="text-sm font-medium">
          Порода
        </label>
        <Input id="breed" placeholder="Введіть породу" {...register("breed")} />
        {errors.breed && (
          <p className="text-sm font-medium text-destructive">
            {errors.breed.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Місцезнаходження
        </label>
        <Input
          id="address"
          placeholder="Введіть адресу"
          {...register("address")}
        />
        <p className="text-sm text-muted-foreground">
          Місто, регіон або конкретна адреса
        </p>
        {errors.address && (
          <p className="text-sm font-medium text-destructive">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Health Status */}
      <div className="space-y-2">
        <label htmlFor="healthStatus" className="text-sm font-medium">
          Стан здоров&#39;я
        </label>
        <Select
          onValueChange={(value) =>
            setValue("healthStatus", value as PetHealthType)
          }
        >
          <SelectTrigger id="healthStatus">
            <SelectValue placeholder="Оберіть стан здоров'я" />
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
        {errors.healthStatus && (
          <p className="text-sm font-medium text-destructive">
            {errors.healthStatus.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Скасувати
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          Надіслати запит
        </Button>
      </div>
    </form>
  );
};

export default PetSearchForm;
