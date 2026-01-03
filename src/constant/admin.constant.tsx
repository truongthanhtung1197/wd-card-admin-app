export enum USER_STATUS_ENUM { // wd
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// old
export enum ADMIN_ROLE {
  // wd
  SALES = "SALES",
  CUSTOMER = "CUSTOMER",
  SUPER_ADMIN = "SUPER_ADMIN",
  MANAGER = "MANAGER",

  // old
  SEOER = "SEOER",
  PARTNER = "PARTNER",
  ASSISTANT = "ASSISTANT",
  TEAM_LEADER = "TEAM_LEADER",
  VICE_TEAM_LEADER = "VICE_TEAM_LEADER",
  DOMAIN_BUYER = "DOMAIN_BUYER",
}

export enum ROLE_STATISTICS {
  MANAGER = "MANAGER",
  SEOER = "SEOER",
  PARTNER = "PARTNER",
  ASSISTANT = "ASSISTANT",
  TEAM_LEADER = "TEAM_LEADER",
  VICE_TEAM_LEADER = "VICE_TEAM_LEADER",
}

export const AdminRoleValues = Object.values(ADMIN_ROLE);

export type AdminRoleType = (typeof ADMIN_ROLE)[keyof typeof ADMIN_ROLE];

export const ADMIN_ROLE_OPTIONS = [
  {
    label: "Super Admin",
    key: ADMIN_ROLE.SUPER_ADMIN,
  },
  {
    label: "Manager",
    key: ADMIN_ROLE.MANAGER,
  },
  {
    label: "Sales",
    key: ADMIN_ROLE.SALES,
  },
  {
    label: "Customer",
    key: ADMIN_ROLE.CUSTOMER,
  },
];
