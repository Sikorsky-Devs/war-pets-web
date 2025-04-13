import { useQuery } from "@tanstack/react-query";

import { getShelters } from "@/api/users/users.api";

const useSheltersQuery = (limit?: number) => {
    const {
        data: shelters = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["shelters"],
        queryFn: getShelters,
        select: (shelters) => shelters.slice(0, limit),
    });

    return { shelters, isLoading, error };
};

export default useSheltersQuery;
