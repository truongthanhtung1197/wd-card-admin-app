export enum ADMIN_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  MANAGER = "MANAGER",
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
    label: "Manager",
    key: ADMIN_ROLE.MANAGER,
  },
  {
    label: "Team Leader",
    key: ADMIN_ROLE.TEAM_LEADER,
  },
  {
    label: "Vice Team Leader",
    key: ADMIN_ROLE.VICE_TEAM_LEADER,
  },
  {
    label: "Seoer",
    key: ADMIN_ROLE.SEOER,
  },
  {
    label: "Partner",
    key: ADMIN_ROLE.PARTNER,
  },
  {
    label: "Assistant",
    key: ADMIN_ROLE.ASSISTANT,
  },
  {
    label: "Vice Team Leader",
    key: ADMIN_ROLE.VICE_TEAM_LEADER,
  },
  {
    label: "Team Leader",
    key: ADMIN_ROLE.TEAM_LEADER,
  },
  {
    label: "Domain Buyer",
    key: ADMIN_ROLE.DOMAIN_BUYER,
  },
];
