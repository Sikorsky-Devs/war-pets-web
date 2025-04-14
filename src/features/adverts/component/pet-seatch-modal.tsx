"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetSearchForm from "@/features/adverts/component/pet-search-form";

const PetSearchModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-9 w-9 sm:h-9 sm:w-auto sm:px-4 sm:py-2"
          variant="outline"
          icon={<Search />}
        >
          <span className="hidden sm:inline">Пошук тварин</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Пошук тварин</DialogTitle>
          <DialogDescription>
            Заповніть критерії для пошуку тварин, які відповідають вашим
            уподобанням.
          </DialogDescription>
        </DialogHeader>

        <PetSearchForm onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default PetSearchModal;
