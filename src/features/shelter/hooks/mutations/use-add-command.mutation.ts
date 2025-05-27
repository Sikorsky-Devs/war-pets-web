import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addComment } from "@/api/comments/comments.api";
import { toast } from "@/lib/toast";

const useAddCommentMutation = (
  id: string,
  rating: number,
  newComment: string,
) => {
  const queryClient = useQueryClient();

  const { mutate: leftComment, isPending: isAddingComment } = useMutation({
    mutationFn: () => addComment({ stars: rating, content: newComment }, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Коментар успішно додано");
    },
    onError: () => {
      toast.error("Не вдалося залишити коментар");
    },
  });

  return { addComment: leftComment, isAddingComment };
};

export default useAddCommentMutation;
