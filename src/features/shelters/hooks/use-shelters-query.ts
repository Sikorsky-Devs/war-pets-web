import { useQuery } from "@tanstack/react-query";

import { getShelters } from "@/api/users/users.api";

const useSheltersQuery = () => {
  const {
    data: shelters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shelters"],
    queryFn: getShelters,
  });

  return { shelters, isLoading, error };
};

export default useSheltersQuery;
