import { type Comment } from "@/types/comment";
import { type Post } from "@/types/post";
import { type AccountType, type User } from "@/types/user";

export type Permissions = {
  comments: {
    dataType: Comment;
    action: "view" | "create";
  };
  save: {
    dataType: string;
    action: "view" | "create" | "delete";
  };
  searchRequests: {
    dataType: string;
    action: "view" | "create";
  };
  posts: {
    dataType: Post;
    action: "view" | "create";
  };
};

export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

export type PermissionsByResource = {
  [Key in keyof Permissions]: Partial<
    Record<
      AccountType,
      Partial<Record<Permissions[Key]["action"], PermissionCheck<Key>>>
    >
  >;
};
