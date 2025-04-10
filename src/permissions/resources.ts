import { type PermissionsByResource } from "@/permissions/types";

export const RESOURCES: PermissionsByResource = {
  comments: {
    GUEST: {
      view: (user, comment) => comment.authorId !== user.id,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
      update: (user, comment) => comment.authorId === user.id,
    },
    SHELTER: {
      view: true,
      create: true,
      update: () => true,
    },
  },
  todos: {
    GUEST: {
      view: () => false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
      update: (user, todo) =>
        todo.userId === user.id || todo.invitedUsers.includes(user.id),
      delete: (user, todo) =>
        (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        todo.completed,
    },
    SHELTER: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
};
