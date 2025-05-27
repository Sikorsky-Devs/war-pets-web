import { type PermissionsByResource } from "@/types/permissions";

export const PERMISSIONS: PermissionsByResource = {
  comments: {
    GUEST: {
      view: false,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
    },
    SHELTER: {
      view: false,
      create: false,
    },
  },
  save: {
    GUEST: {
      view: false,
      create: false,
      delete: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
      delete: true,
    },
    SHELTER: {
      view: false,
      create: false,
      delete: false,
    },
  },
  searchRequests: {
    GUEST: {
      view: false,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
    },
    SHELTER: {
      view: false,
      create: false,
    },
  },
  posts: {
    GUEST: {
      view: true,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
    },
    SHELTER: {
      view: true,
      create: true,
    },
  },
  chats: {
    GUEST: {
      view: false,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
    },
    SHELTER: {
      view: true,
      create: true,
    },
  },
  bringPet: {
    GUEST: {
      view: false,
      create: false,
    },
    VOLUNTEER: {
      view: true,
      create: true,
    },
    SHELTER: {
      view: false,
      create: false,
    },
  },
};
