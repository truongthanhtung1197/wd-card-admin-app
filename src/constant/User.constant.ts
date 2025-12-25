export enum USER_ROLES {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
}

export enum USER_TYPE {
  AGENCY = "agency",
}

export enum TARGET_WEBSITE {
  USER_DETAIL_SITE = "USER_DETAIL_SITE",
  USER_WEBSITE = "USER_WEBSITE",
}

export enum CERTIFICATE_NAME {
  NMLS = "NMLS",
  DRE = "DRE",
}

export const CERTIFICATE_NAME_OPTIONS = [
  {
    label: "NMLS",
    key: CERTIFICATE_NAME.NMLS,
  },
  {
    label: "DRE",
    key: CERTIFICATE_NAME.DRE,
  },
];
