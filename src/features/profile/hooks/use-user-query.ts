import {useQuery} from "@tanstack/react-query";

import {getUser} from "@/api/users/users.api";

const useUserQuery = (id: string) => {
  const { data, isPending, error} = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { user: data, isPending, error };
}

export default useUserQuery;