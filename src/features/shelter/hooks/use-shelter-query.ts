import {useQuery} from "@tanstack/react-query";

import {getUser} from "@/api/users/users.api";

const useShelterQuery = (id: string) => {
  const { data: shelter, isLoading, error } = useQuery({
    queryKey: ["shelter", id],
    queryFn: () => getUser(id),
  });

  return { shelter, isLoading, error };
}

export default useShelterQuery;