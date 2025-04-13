import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import {EditContactDto, editContactSchema} from "@/api/contacts/contacts.dto";

interface EditContactInlineProps {
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

const EditContactInline = ({ initialContent, onSave, onCancel }: EditContactInlineProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditContactDto>({
    resolver: zodResolver(editContactSchema),
    defaultValues: { content: initialContent },
  });

  const onSubmit = (data: EditContactDto) => {
    onSave(data.content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 w-full">
      <Input
        error={errors.content?.message}
        className="flex-1 h-8 text-sm"
        autoFocus
        {...register("content")}
      />
      <Button
        icon={<Check className="h-4 w-4" />}
        variant="outline"
        size="icon"
        className="p-2 h-8 w-8 text-green-500"
        type="submit"
      />
      <Button
        icon={<X className="h-4 w-4" />}
        variant="outline"
        size="icon"
        className="p-2 h-8 w-8 text-red-500"
        onClick={onCancel}
        type="button"
      />
    </form>
  );
};

export default EditContactInline;
