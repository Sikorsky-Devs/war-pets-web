"use client";

import { EditIcon, PlusCircle } from "lucide-react";
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
import AddPetForm from "@/features/shelter-profile/components/add-pet-form";

const AddPetDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          icon={<PlusCircle className="h-4 w-4" />}
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-1"
        >
          Додати тварину
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Додати тварину</DialogTitle>
          <DialogDescription>
            Заповніть форму, щоб додати нову тварину до профілю притулку.
          </DialogDescription>
        </DialogHeader>
        <AddPetForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPetDialog;
