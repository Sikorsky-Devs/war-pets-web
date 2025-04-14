"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PET_HEALTH_STATUS_MAPPER, PET_TYPE_MAPPER } from "@/constants/mappers";

const PetFilters = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [type, setType] = useQueryState("type");
  const [ageFrom, setAgeFrom] = useQueryState(
    "ageFrom",
    parseAsInteger.withDefault(0),
  );
  const [ageTo, setAgeTo] = useQueryState(
    "ageTo",
    parseAsInteger.withDefault(20),
  );
  const [healthStatus, setHealthStatus] = useQueryState("healthStatus");

  const [ageRange, setAgeRange] = useState<[number, number]>([
    ageFrom ?? 0,
    ageTo ?? 20,
  ]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setSearch(e.target.value);
  };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0] ?? 0, values[1] ?? 20]);
  };

  const handleTypeChange = async (value: string) => {
    if (value === "all") {
      await setType(null);
    } else {
      await setType(value);
    }
  };

  const handleHealthStatusChange = async (value: string) => {
    if (value === "any") {
      await setHealthStatus(null);
    } else {
      await setHealthStatus(value);
    }
  };

  const applyAgeRange = async (values: number[]) => {
    await setAgeFrom(values[0] ?? 0);
    await setAgeTo(values[1] ?? 20);
  };

  const resetFilters = async () => {
    await setSearch("");
    await setType(null);
    await setHealthStatus(null);
    await setAgeFrom(0);
    await setAgeTo(20);
    setAgeRange([0, 20]);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Фільтри</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          id="search"
          placeholder="Пошук тварин..."
          value={search ?? ""}
          onChange={handleSearchChange}
        />

        <div className="space-y-2">
          <Label htmlFor="type">Тип тварини</Label>
          <Select value={type ?? ""} onValueChange={handleTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Виберіть тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі типи</SelectItem>
              {Object.entries(PET_TYPE_MAPPER).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Віковий діапазон</Label>
            <span className="text-sm text-muted-foreground">
              {ageRange[0]} - {ageRange[1]} років
            </span>
          </div>
          <Slider
            defaultValue={[0, 20]}
            value={ageRange}
            min={0}
            max={20}
            step={1}
            onValueChange={handleAgeRangeChange}
            onValueCommit={(values) => applyAgeRange(values)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="health">Стан здоров&apos;я</Label>
          <Select
            value={healthStatus ?? ""}
            onValueChange={handleHealthStatusChange}
          >
            <SelectTrigger id="health">
              <SelectValue placeholder="Виберіть стан" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Будь-який стан</SelectItem>
              {Object.entries(PET_HEALTH_STATUS_MAPPER).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Скинути фільтри
        </Button>
      </CardContent>
    </Card>
  );
};

export default PetFilters;
