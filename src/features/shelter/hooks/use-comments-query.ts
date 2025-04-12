import { useQuery } from "@tanstack/react-query";

import { getComments } from "@/api/comments/comments.api";
import useAuthStore from "@/store/use-auth-store";

const useCommentsQuery = (shelterId: string) => {
  const { user } = useAuthStore();

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", shelterId],
    queryFn: async () => {
      const data = await getComments(shelterId);
      return data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    },
  });

  const userComments = comments.filter(
    (comment) => comment.volunteer.id === user?.id,
  );

  return {
    comments,
    isLoading,
    error,
    canLeftComment: userComments.length === 0,
  };
};

export default useCommentsQuery;
