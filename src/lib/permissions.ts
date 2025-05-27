import { PERMISSIONS } from "@/constants/permissions";
import { type User } from "@/types/models/user";
import { type Permissions } from "@/types/permissions";

export const hasPermission = <Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"],
) => {
  const rolesForResource = PERMISSIONS[resource];
  const role = user.accountType;

  const permissions = rolesForResource?.[role]?.[action];
  if (permissions == null) return false;
  if (typeof permissions === "boolean") return permissions;
  return data != null && permissions(user, data);
};
