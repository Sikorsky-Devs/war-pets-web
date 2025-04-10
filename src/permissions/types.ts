import { type AccountType, type User } from "@/types/user";

type Comment = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
};

type Todo = {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
  invitedUsers: string[];
};

export type Permissions = {
  // Example of how to define permissions for different resources
  comments: {
    dataType: Comment;
    action: "view" | "create" | "update";
  };
  todos: {
    // Can do something like Pick<Todo, "userId"> to get just the rows you use
    dataType: Todo;
    action: "view" | "create" | "update" | "delete";
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
