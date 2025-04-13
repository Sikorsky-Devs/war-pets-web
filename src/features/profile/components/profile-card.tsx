"use client";
import {LogOutIcon, Pencil, Trash} from "lucide-react";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import EditContactInline from "@/features/profile/components/edit-contact-inline";
import ProfileCardSkeleton from "@/features/profile/components/profile-card-skeleton";
import UpdateProfileModal from "@/features/profile/components/update-profile-modal";
import {useDeleteContact} from "@/features/profile/hooks/use-delete-contact";
import {useEditContact} from "@/features/profile/hooks/use-edit-contact";
import useUserQuery from "@/features/profile/hooks/use-user-query";
import useAuthStore from "@/store/use-auth-store";
import { isShelter, logoutUser, removeAuthToken } from "@/utils/auth-utils";
import {contactIconMap} from "@/utils/contacts-utils";
import { getAccountType, getFullName } from "@/utils/user-utils";

import AddContactModal from "./add-contact-modal";

const ProfileCard = () => {
  const { replace } = useRouter();
  const {
    user: { id, accountType },
  } = useAuthStore();

  const { user, contacts, isLoading } = useUserQuery(id);
  const deleteContactMutation = useDeleteContact(id);
  const editContactMutation = useEditContact(id);

  const [editingContact, setEditingContact] = useState<string | null>(null);

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  const isUserShelter = isShelter(accountType);
  const accountTypeStr = getAccountType(user?.accountType);
  const fullName = getFullName(
    user?.firstName,
    user?.lastName,
    user?.middleName,
  );

  const handleContactDelete = async (contactId: string) => {
    try {
      await deleteContactMutation.mutateAsync(contactId);
    } catch (error) {
      console.error("Помилка при видаленні контакту:", error);
    }
  };

  const handleEditSave = async (contactId: string, editValue: string) => {
    try {
      await editContactMutation.mutateAsync({ contactId, newContent: editValue });
      setEditingContact(null);
    } catch (error) {
      console.error("Помилка при оновленні контакту:", error);
    }
  };

  const handleSignOut = () => {
    removeAuthToken();
    replace(Routes.Home);
    logoutUser();
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Badge className="absolute -left-2 -top-2">{accountTypeStr}</Badge>
          <div className="flex flex-col items-center">
            <div>
              <UserAvatar
                size={24}
                image={user?.avatarLink}
                className="h-24 w-24"
                isShelter={isUserShelter}
              />
            </div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {contacts && contacts.length > 0 ? (
            contacts.map((item) => {
              const Icon = contactIconMap[item.type];
              const isEditing = editingContact === item.id;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground"/>
                  {isEditing ? (
                    <EditContactInline
                      initialContent={item.content}
                      onSave={(newContent) =>
                        handleEditSave(item.id, newContent)
                      }
                      onCancel={() => setEditingContact(null)}
                    />
                  ) : (
                    <>
                      <span className="flex-1 truncate text-sm">
                        {item.content}
                      </span>
                      <Button
                        icon={<Pencil className="h-4 w-4"/>}
                        variant="outline"
                        size="icon"
                        className="p-2 h-8 w-8"
                        onClick={() => setEditingContact(item.id)}
                      />
                      <Button
                        icon={<Trash className="h-4 w-4"/>}
                        variant="outline"
                        size="icon"
                        className="p-2 h-8 w-8 hover:text-red-500"
                        onClick={() => handleContactDelete(item.id)}
                      />
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <span className="block flex-1 text-center text-gray-400">
              Немає контактів
            </span>
          )}
        </div>
        <div className="flex w-full gap-2 flex-wrap">
          <AddContactModal/>
          <UpdateProfileModal/>
          <Button
            icon={<LogOutIcon/>}
            className="w-full"
            variant="destructive"
            onClick={handleSignOut}
          >
            Вийти
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
