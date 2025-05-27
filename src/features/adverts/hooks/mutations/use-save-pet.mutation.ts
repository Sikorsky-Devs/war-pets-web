import { useMutation, useQueryClient } from "@tanstack/react-query";

import { savePet, unsavePet } from "@/api/pets/pets.api";
import { toast } from "@/lib/toast";

const useSavePetMutation = (petId: string, isSaved = false) => {
  const queryClient = useQueryClient();

  const { mutate: handleSave, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      try {
        if (isSaved) {
          await unsavePet(petId);
        } else {
          await savePet(petId);
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pets"] }),
        queryClient.invalidateQueries({ queryKey: ["savedPets"] }),
      ]);
      toast.success(
        isSaved ? "Тварину видалено зі збережених" : "Тварину збережено",
      );
    },
    onError: () => {
      toast.error("Помилка при збереженні тварини");
    },
  });

  return { handleSave, isSaving };
};

export default useSavePetMutation;
