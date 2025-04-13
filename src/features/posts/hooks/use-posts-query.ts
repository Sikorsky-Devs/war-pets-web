import { getPosts } from "@/api/posts/posts.api";
import { useQuery } from "@tanstack/react-query";

const usePostsQuery = () => {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    posts,
    isLoading,
    error,
  }
}

export default usePostsQuery;