import { type Comment } from "@/types/models/comment";
import { type Post } from "@/types/models/post";
import { type AccountType, type User } from "@/types/models/user";

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
  chats: {
    dataType: string;
    action: "view" | "create";
  };
  bringPet: {
    dataType: string;
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
