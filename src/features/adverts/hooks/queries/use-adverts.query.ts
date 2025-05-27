import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";

import { getAllPets } from "@/api/pets/pets.api";
import useDebounce from "@/hooks/use-debounce";

const useAdvertsQuery = () => {
  const [search] = useQueryState("search");
  const [type] = useQueryState("type");
  const [ageFrom] = useQueryState("ageFrom", parseAsInteger.withDefault(0));
  const [ageTo] = useQueryState("ageTo", parseAsInteger.withDefault(20));
  const [healthStatus] = useQueryState("healthStatus");

  const debouncedSearch = useDebounce(search ?? "", 500);

  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", debouncedSearch, type, ageFrom, ageTo, healthStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (type) params.append("type", type);
      if (ageFrom) params.append("ageFrom", String(ageFrom));
      if (ageTo) params.append("ageTo", String(ageTo));
      if (healthStatus) params.append("healthStatus", healthStatus);

      const { top, common } = await getAllPets(params);

      const filteredPets = [...top, ...common].filter((pet) => pet.isApproved);

      return filteredPets;
    },
  });

  return { pets, isLoading, error };
};

export default useAdvertsQuery;
