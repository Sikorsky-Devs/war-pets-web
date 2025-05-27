import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/api/posts/posts.api";
import { toast } from "@/lib/toast";

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      toast.success("Пост успішно створено");
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createPost: mutateAsync, error, isPending };
};

export default useCreatePostMutation;
