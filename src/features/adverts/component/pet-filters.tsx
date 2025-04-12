"use client";

import { useQueryState } from "nuqs";
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
import { HealthStatus, PetType } from "@/features/adverts/adverts.page";

const PetFilters = () => {
  const [search, setSearch] = useQueryState("search");
  const [type, setType] = useQueryState("type");
  const [ageFrom, setAgeFrom] = useQueryState("ageFrom", {
    defaultValue: undefined,
    parse: (value) => (value ? Number.parseInt(value) : undefined),
  });
  const [ageTo, setAgeTo] = useQueryState("ageTo", {
    defaultValue: undefined,
    parse: (value) => (value ? Number.parseInt(value) : undefined),
  });
  const [healthStatus, setHealthStatus] = useQueryState("healthStatus");

  const [ageRange, setAgeRange] = useState<[number, number]>([
    ageFrom ?? 0,
    ageTo ?? 20,
  ]);
  const [searchValue, setSearchValue] = useState(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setSearch(search);
  };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]]);
  };

  const applyAgeRange = async (values: string[]) => {
    await setAgeFrom(values[0]);
    await setAgeTo(values[1]);
  };

  const resetFilters = () => {
    setSearchValue("");
    setAgeRange([0, 20]);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSearchSubmit}>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="Search pets..."
                value={searchValue}
                onChange={handleSearchChange}
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Pet Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Pet Type</Label>
          <Select value={type ?? ""} onValueChange={(value) => setType(value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={PetType.DOG}>Dog</SelectItem>
              <SelectItem value={PetType.CAT}>Cat</SelectItem>
              <SelectItem value={PetType.BIRD}>Bird</SelectItem>
              <SelectItem value={PetType.OTHER}>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Age Range</Label>
            <span className="text-sm text-muted-foreground">
              {ageRange[0]} - {ageRange[1]} years
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

        {/* Health Status */}
        <div className="space-y-2">
          <Label htmlFor="health">Health Status</Label>
          <Select
            value={healthStatus ?? ""}
            onValueChange={(value) => setHealthStatus(value)}
          >
            <SelectTrigger id="health">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              <SelectItem value={HealthStatus.HEALTHY}>Healthy</SelectItem>
              <SelectItem value={HealthStatus.SICK}>Sick</SelectItem>
              <SelectItem value={HealthStatus.RECOVERING}>
                Recovering
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default PetFilters;
