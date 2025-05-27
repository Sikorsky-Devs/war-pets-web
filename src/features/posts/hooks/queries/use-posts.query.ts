import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/posts/posts.api";

const usePostsQuery = (limit?: number) => {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    select: (data) => data.slice(0, limit),
  });

  return {
    posts,
    isLoading,
    error,
  };
};

export default usePostsQuery;
