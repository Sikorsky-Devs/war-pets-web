import {useQuery} from "@tanstack/react-query";

import { getUser, getUserContacts } from "@/api/users/users.api";

const useUserQuery = (id: string) => {
  const { data: user, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  const { data: contacts, isLoading: isContactsLoading, error: contactsError } = useQuery({
    queryKey: ['contacts', id],
    queryFn: () => getUserContacts(id),
    enabled: !!id,
  });

  return {
    user,
    contacts,
    isLoading: isUserLoading || isContactsLoading,
    error: userError ?? contactsError,
  };
};

export default useUserQuery;