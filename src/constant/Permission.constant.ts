export enum ModuleEnum {
  USER_GENERAL = "USER_GENERAL",
  USER_MGMT = "USER_MGMT",
  ALL_TEAM_MGMT = "ALL_TEAM_MGMT",
  USER_LEAD_MGMT = "USER_LEAD_MGMT",
  ACCOUNT_MGMT = "ACCOUNT_MGMT",

  TEAM_GENERAL = "TEAM_GENERAL",
  TEAM_LEAD_MGMT = "TEAM_LEAD_MGMT",

  ALL_LEAD_MGMT = "ALL_LEAD_MGMT",
  LOAN_MGMT = "LOAN_MGMT",
  ALL_LOAN_MGMT = "ALL_LOAN_MGMT",

  CMS_MGMT = "CMS_MGMT",
}

export enum PermissionEnum {
  // User
  USER_ROLE_MGMT = "USER_ROLE_MGMT",

  USER_MGMT_VIEW = "USER_MGMT_VIEW",
  USER_MGMT_EDIT = "USER_MGMT_EDIT",
  USER_MGMT_DELETE = "USER_MGMT_DELETE",

  ALL_TEAM_MGMT_VIEW = "ALL_TEAM_MGMT_VIEW",
  ALL_TEAM_MGMT_EDIT = "ALL_TEAM_MGMT_EDIT",
  ALL_TEAM_MGMT_DELETE = "ALL_TEAM_MGMT_DELETE",
  ALL_TEAM_ROLE_MGMT = "ALL_TEAM_ROLE_MGMT",

  USER_LEAD_MGMT_VIEW = "USER_LEAD_MGMT_VIEW",
  USER_LEAD_MGMT_EDIT = "USER_LEAD_MGMT_EDIT",
  USER_LEAD_MGMT_DELETE = "USER_LEAD_MGMT_DELETE",
  USER_LEAD_MGMT_COMMUNICATE = "USER_LEAD_MGMT_COMMUNICATE",
  USER_LEAD_MGMT_TAKE_NOTE = "USER_LEAD_MGMT_TAKE_NOTE",

  // Team
  TEAM_ROLE_MGMT = "TEAM_ROLE_MGMT",
  TEAM_MGMT_VIEW = "TEAM_MGMT_VIEW",
  TEAM_MGMT_EDIT = "TEAM_MGMT_EDIT",

  TEAM_LEAD_MGMT_VIEW = "TEAM_LEAD_MGMT_VIEW",
  TEAM_LEAD_MGMT_EDIT = "TEAM_LEAD_MGMT_EDIT",
  TEAM_LEAD_MGMT_ASSIGN = "TEAM_LEAD_MGMT_ASSIGN",
  TEAM_LEAD_MGMT_DELETE = "TEAM_LEAD_MGMT_DELETE",
  TEAM_LEAD_MGMT_COMMUNICATE = "TEAM_LEAD_MGMT_COMMUNICATE",
  TEAM_LEAD_MGMT_TAKE_NOTE = "TEAM_LEAD_MGMT_TAKE_NOTE",

  // All
  ALL_LEAD_MGMT_VIEW_LEAD = "ALL_LEAD_MGMT_VIEW_LEAD",
  ALL_LEAD_MGMT_EDIT_LEAD = "ALL_LEAD_MGMT_EDIT_LEAD",
  ALL_LEAD_MGMT_ASSIGN_LEAD = "ALL_LEAD_MGMT_ASSIGN_LEAD",
  ALL_LEAD_MGMT_DELETE_LEAD = "ALL_LEAD_MGMT_DELETE_LEAD",
  ALL_LEAD_MGMT_COMMUNICATE_LEAD = "ALL_LEAD_MGMT_COMMUNICATE_LEAD",
  ALL_LEAD_MGMT_TAKE_NOTE_LEAD = "ALL_LEAD_MGMT_TAKE_NOTE_LEAD",

  // Loan
  USER_LOAN_MGMT_EDIT = "USER_LOAN_MGMT_EDIT",

  // All Loan
  ALL_LOAN_MGMT_EDIT_LOAN = "ALL_LOAN_MGMT_EDIT_LOAN",
  ALL_ACCOUNT_MGMT_EDIT_ACCOUNT = "ALL_ACCOUNT_MGMT_EDIT_ACCOUNT",

  // Cms
  USER_CMS_MGMT = "USER_CMS_MGMT",
  LOAN_DOCS_CONDITIONS_MGMT = "LOAN_DOCS_CONDITIONS_MGMT",

  //account
  USER_ACCOUNT_MGMT_VIEW = "USER_ACCOUNT_MGMT_VIEW",
  USER_ACCOUNT_MGMT_EDIT = "USER_ACCOUNT_MGMT_EDIT",
  USER_ACCOUNT_MGMT_DELETE = "USER_ACCOUNT_MGMT_DELETE",
  USER_ACCOUNT_MGMT_COMMUNICATE = "USER_ACCOUNT_MGMT_COMMUNICATE",
  USER_ACCOUNT_MGMT_TAKE_NOTE = "USER_ACCOUNT_MGMT_TAKE_NOTE",
}

export enum PERMISSION_MODULE_USE_FOR {
  ALL = "ALL",
  USER = "USER",
  TEAM = "TEAM",
}

export const PermissionModuleList = [
  // User
  {
    moduleKey: ModuleEnum.USER_GENERAL,
    moduleName: "General",
    useFor: PERMISSION_MODULE_USE_FOR.USER,
    permissions: [
      {
        code: PermissionEnum.USER_ROLE_MGMT,
        name: "User role management",
      },
    ],
  },
  {
    moduleKey: ModuleEnum.USER_MGMT,
    moduleName: "User management",
    useFor: PERMISSION_MODULE_USE_FOR.USER,
    permissions: [
      {
        code: PermissionEnum.USER_MGMT_VIEW,
        name: "View",
      },
      {
        code: PermissionEnum.USER_MGMT_EDIT,
        name: "Edit",
      },
      {
        code: PermissionEnum.USER_MGMT_DELETE,
        name: "Delete",
      },
    ],
  },
  {
    moduleKey: ModuleEnum.ALL_TEAM_MGMT,
    moduleName: "Team Management",
    useFor: PERMISSION_MODULE_USE_FOR.USER,
    permissions: [
      {
        code: PermissionEnum.ALL_TEAM_MGMT_VIEW,
        name: "View",
      },
      {
        code: PermissionEnum.ALL_TEAM_MGMT_EDIT,
        name: "Edit",
      },
      {
        code: PermissionEnum.ALL_TEAM_MGMT_DELETE,
        name: "Delete",
      },
      {
        code: PermissionEnum.ALL_TEAM_ROLE_MGMT,
        name: "Team role management",
      },
    ],
  },
  {
    moduleKey: ModuleEnum.USER_LEAD_MGMT,
    moduleName: "User lead management",
    useFor: PERMISSION_MODULE_USE_FOR.USER,
    permissions: [
      {
        code: PermissionEnum.USER_LEAD_MGMT_VIEW,
        name: "View lead",
      },
      {
        code: PermissionEnum.USER_LEAD_MGMT_EDIT,
        name: "Edit lead",
      },
      {
        code: PermissionEnum.USER_LEAD_MGMT_DELETE,
        name: "Delete lead",
      },
      {
        code: PermissionEnum.USER_LEAD_MGMT_COMMUNICATE,
        name: "Communicate lead",
      },
      {
        code: PermissionEnum.USER_LEAD_MGMT_TAKE_NOTE,
        name: "Take note at lead",
      },
    ],
  },

  // Team
  {
    moduleKey: ModuleEnum.TEAM_GENERAL,
    moduleName: "General",
    useFor: PERMISSION_MODULE_USE_FOR.TEAM,
    permissions: [
      {
        code: PermissionEnum.TEAM_ROLE_MGMT,
        name: "Team role management",
      },
      {
        code: PermissionEnum.TEAM_MGMT_VIEW,
        name: "View",
      },
      {
        code: PermissionEnum.TEAM_MGMT_EDIT,
        name: "Edit",
      },
    ],
  },
  {
    moduleKey: ModuleEnum.TEAM_LEAD_MGMT,
    moduleName: `Team's Lead management`,
    useFor: PERMISSION_MODULE_USE_FOR.TEAM,
    permissions: [
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_VIEW,
        name: "View team lead",
      },
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_EDIT,
        name: "Edit team lead",
      },
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_ASSIGN,
        name: "Assign team lead",
      },
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_DELETE,
        name: "Delete team lead",
      },
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_COMMUNICATE,
        name: "Communicate team lead",
      },
      {
        code: PermissionEnum.TEAM_LEAD_MGMT_TAKE_NOTE,
        name: "Take note at team lead",
      },
    ],
  },
  // All
  {
    moduleKey: ModuleEnum.ALL_LEAD_MGMT,
    moduleName: "All Lead management",
    useFor: PERMISSION_MODULE_USE_FOR.ALL,
    permissions: [
      {
        code: PermissionEnum.ALL_LEAD_MGMT_VIEW_LEAD,
        name: "View all lead",
      },
      {
        code: PermissionEnum.ALL_LEAD_MGMT_EDIT_LEAD,
        name: "Edit all lead",
      },
      {
        code: PermissionEnum.ALL_LEAD_MGMT_ASSIGN_LEAD,
        name: "Assign all lead",
      },
      {
        code: PermissionEnum.ALL_LEAD_MGMT_DELETE_LEAD,
        name: "Delete all lead",
      },
      {
        code: PermissionEnum.ALL_LEAD_MGMT_COMMUNICATE_LEAD,
        name: "Communicate all lead",
      },
      {
        code: PermissionEnum.ALL_LEAD_MGMT_TAKE_NOTE_LEAD,
        name: "Take note at all lead",
      },
    ],
  },
];

export const TeamModulePermission = {
  [ModuleEnum.TEAM_GENERAL]: {
    [PermissionEnum.TEAM_ROLE_MGMT]: true,
    [PermissionEnum.TEAM_MGMT_VIEW]: true,
    [PermissionEnum.TEAM_MGMT_EDIT]: true,
  },
  [ModuleEnum.TEAM_LEAD_MGMT]: {
    [PermissionEnum.TEAM_LEAD_MGMT_VIEW]: true,
    [PermissionEnum.TEAM_LEAD_MGMT_EDIT]: true,
    [PermissionEnum.TEAM_LEAD_MGMT_ASSIGN]: true,
    [PermissionEnum.TEAM_LEAD_MGMT_DELETE]: true,
    [PermissionEnum.TEAM_LEAD_MGMT_COMMUNICATE]: true,
    [PermissionEnum.TEAM_LEAD_MGMT_TAKE_NOTE]: true,
  },
};

export const TeamModulePermissionList = [
  {
    moduleKey: ModuleEnum.TEAM_GENERAL,
    moduleName: "General",
    permissions: [
      PermissionEnum.TEAM_ROLE_MGMT,
      PermissionEnum.TEAM_MGMT_VIEW,
      PermissionEnum.TEAM_MGMT_EDIT,
    ],
  },
  {
    moduleKey: ModuleEnum.TEAM_LEAD_MGMT,
    moduleName: "Lead Management",
    permissions: [
      PermissionEnum.TEAM_LEAD_MGMT_VIEW,
      PermissionEnum.TEAM_LEAD_MGMT_EDIT,
      PermissionEnum.TEAM_LEAD_MGMT_ASSIGN,
      PermissionEnum.TEAM_LEAD_MGMT_DELETE,
      PermissionEnum.TEAM_LEAD_MGMT_COMMUNICATE,
      PermissionEnum.TEAM_LEAD_MGMT_TAKE_NOTE,
    ],
  },
];
