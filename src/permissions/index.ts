import { RESOURCES } from "@/permissions/resources";
import { type Permissions } from "@/permissions/types";
import useAuthStore from "@/store/use-auth-store";

export const hasPermission = <Resource extends keyof Permissions>(
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"],
) => {
  const user = useAuthStore.getState().user;
  const rolesForResource = RESOURCES[resource];
  const role = user.accountType;

  const permissions = rolesForResource?.[role]?.[action];
  if (permissions == null) return false;
  if (typeof permissions === "boolean") return permissions;
  return data != null && permissions(user, data);
};
