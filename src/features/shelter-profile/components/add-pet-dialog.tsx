"use client";

import { PropsWithChildren, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddPetForm from "@/features/shelter-profile/components/add-pet-form";

const AddPetDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
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
