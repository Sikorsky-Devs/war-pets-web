import { useQuery } from "@tanstack/react-query";

import { getSearchRequests } from "@/api/pets/pets.api";

const useSearchRequestsQuery = () => {
  const {
    data: searchRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchRequests"],
    queryFn: async () => {
      const data = await getSearchRequests();
      return data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    },
  });

  return {
    searchRequests,
    isLoading,
    error,
  };
};

export default useSearchRequestsQuery;
