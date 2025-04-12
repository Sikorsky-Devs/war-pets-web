"use client";

import { EditIcon } from "lucide-react";
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
import ProfileUpdateForm from "@/features/profile/components/update-profile-form";
import useUserQuery from "@/features/profile/hooks/use-user-query";
import useAuthStore from "@/store/use-auth-store";
import { type ShelterUser } from "@/types/user";

const ProfileUpdateModal = () => {
  const {
    user: { id },
  } = useAuthStore();
  const [open, setOpen] = useState(false);

  const { user } = useUserQuery(id);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<EditIcon />} className="w-full" variant="outline">
          Редагувати
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Оновити профіль</DialogTitle>
          <DialogDescription>
            Заповніть форму, щоб оновити свій профіль. Ви можете змінити
            особисту інформацію, контактні дані та інші налаштування.
          </DialogDescription>
        </DialogHeader>
        {user && <ProfileUpdateForm user={user} closeModal={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
