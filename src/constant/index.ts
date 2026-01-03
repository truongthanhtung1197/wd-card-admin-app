export const ROUTERS = {
  REGISTER: "/auth/register",

  //TODO ROUTER
  PARTNER_PACKAGES: "/partner/pack",
  PARTNER_ORDER: "/partner/order",
  PARTNER_CONTENT: "/partner/content",
  PARTNER_DOMAIN: "/partner/domain",
  PARTNER_GUIDELINE: "/partner/guidelines",

  SEO_SERVICE_DOMAIN: "/seoer/services/domain",
  SEO_SERVICE_PACK: "/seoer/services/pack",
  SEO_SERVICE_CONTENT: "/seoer/services/content",
  SEO_CART: "/seoer/cart",
  SEO_DOMAIN: "/seoer/my-domain",
  SEO_ORDER: "/seoer/order",
  SEO_MY_CART: "/seoer/my-cart",
  SEO_MY_ORDER: "/seoer/my-order",

  // -------------------69 vn--------------------
  HOME: "/#",
  USER: "/user/:status",
  ADMIN: "/user/:status",
  ADMIN_ACTIVE: "/admin/active",
  ADMIN_DETAIL: "/admin/detail/:adminId",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER_CREATE: "/user/create",
  USER_DETAIL: "/user/detail/:username",
  ADMIN_CREATE: "/admin/create",

  // Manager
  USER_ACTIVE: "/user/active",
  DOMAIN_ACTIVE: "/domain/active",
  ORDER_ACTIVE: "/order/active",
  SERVICE_ACTIVE: "/service/active",

  // GROUP
  GROUP_CREATE: "/group/create",
  GROUP_ACTIVE: "/group/active",
  GROUP: "/group/:status",
  GROUP_DETAIL: "/group/detail/:groupId",
  //profile
  MY_PROFILE: "/my-profile",

  ORDER_DETAIL: "/order-detail/:id",

  // -------------wd-------------

  MANAGEMENT_ADMIN: "/management/admins",
  MANAGEMENT_USERS: "/management/users",

  MANAGEMENT_PACKAGES: "/management/packages",
  MANAGEMENT_PACKAGE_EDIT: "/management/packages/create-edit/:id",
  MANAGEMENT_PACKAGE_CREATE: "/management/packages/create-edit/create",

  // -------------end wd-------------

  MANAGEMENT_ADMIN_DETAIL: "/management/admins/detail/:id",
  MANAGEMENT_ADMIN_EDIT: "/management/admins/edit/:id",
  MANAGEMENT_ADMIN_CREATE: "/management/admins/create",

  MANAGEMENT_SEOER: "/management/seoer",
  MANAGEMENT_SEOER_DETAIL: "/management/seoer/detail/:id",
  MANAGEMENT_SEOER_CREATE: "/management/seoer/create",
  MANAGEMENT_SEOER_EDIT: "/management/seoer/edit/:id",

  MANAGEMENT_PARTNER: "/management/partner",
  MANAGEMENT_PARTNER_CONTENT: "/management/partner/content",
  MANAGEMENT_PARTNER_DETAIL: "/management/partner/detail/:id",
  MANAGEMENT_PARTNER_CREATE: "/management/partner/create",
  MANAGEMENT_PARTNER_EDIT: "/management/partner/edit/:id",

  MANAGEMENT_DOMAINS: "/management/domains",
  MANAGEMENT_DOMAINS_EDIT: "/management/domains/edit/:id",
  MANAGEMENT_DOMAINS_DETAILS: "/management/domains/details/:domainId",
  MANAGEMENT_DOMAINS_CREATE: "/management/domains/create",

  MANAGEMENT_ORDERS: "/management/orders",
  MANAGEMENT_ORDERS_DETAIL: "/management/orders/detail/:id",
  MANAGEMENT_ORDERS_CREATE: "/management/orders/create",

  MANAGEMENT_SERVICES: "/management/services",
  MANAGEMENT_SERVICES_DETAIL: "/management/services/detail/:id",
  MANAGEMENT_SERVICES_CREATE: "/management/services/create",
  MANAGEMENT_STATISTICS: "/management/statistics",

  MANAGEMENT_DOMAIN_ORDERS: "/management/domain-orders/create",
  MANAGEMENT_DOMAIN_ORDER_CREATE: "/management/domain-orders/create",
  MANAGEMENT_DOMAIN_ORDER_LIST: "/management/domain-orders/list",
  MANAGEMENT_DOMAIN_ORDER_DETAIL: "/management/domain-orders/detail/:id",

  MANAGEMENT_TEAMS: "/management/teams",

  MANAGEMENT_TEAMS_CREATE: "/management/teams/create",
  MANAGEMENT_TEAMS_EDIT: "/management/teams/edit/:id",
  MANAGEMENT_MY_TEAM: "/management/my-team",
};

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  LOCKED: "locked",
};

export enum TEAM_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const TEAM_STATUS_OPTIONS = [
  {
    label: "Active",
    key: TEAM_STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    key: TEAM_STATUS.INACTIVE,
  },
];

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum ACCOUNT_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  NONE = "NONE",
}

export enum LEAD_SOURCE_TYPE {
  AGENT = "AGENT",
  TEAM_AGENT = "TEAM_AGENT",
  PACIFICWIDE = "PACIFICWIDE",
}

export enum LEAD_SOURCE {
  WEBSITE = "WEBSITE",
  REFERRAL = "REFERRAL",
  ADVERTISEMENT = "ADVERTISEMENT",
  MANUAL = "MANUAL",
}

export const LEAD_SOURCE_OPTIONS = [
  {
    label: "Website",
    key: LEAD_SOURCE.WEBSITE,
  },
  {
    label: "Referral",
    key: LEAD_SOURCE.REFERRAL,
  },
  {
    label: "Advertisement",
    key: LEAD_SOURCE.ADVERTISEMENT,
  },
  {
    label: "Manual",
    key: LEAD_SOURCE.MANUAL,
  },
];

export enum LEAD_TYPE {
  SELLER = "SELLER",
  BUYER = "BUYER",
}

export const LEAD_TYPE_OPTIONS = [
  {
    label: "Seller",
    key: LEAD_TYPE.SELLER,
  },
  {
    label: "Buyer",
    key: LEAD_TYPE.BUYER,
  },
];

export enum LEAD_STATUS {
  NEW = "NEW",
  PRIME = "PRIME",
  PENDING = "PENDING",
  ARCHIVED = "ARCHIVED",
  CLOSE = "CLOSE",
  JUNK = "JUNK",
  DO_NOT_CONTACT = "DO_NOT_CONTACT",
  BLOCKED = "BLOCKED",
  CLEAR = "CLEAR",
}
export const LEAD_STATUS_OPTIONS = [
  {
    label: "New",
    key: LEAD_STATUS.NEW,
  },
  {
    label: "Prime",
    key: LEAD_STATUS.PRIME,
  },
  {
    label: "Pending",
    key: LEAD_STATUS.PENDING,
  },
  {
    label: "Archived",
    key: LEAD_STATUS.ARCHIVED,
  },
  {
    label: "Close",
    key: LEAD_STATUS.CLOSE,
  },
  {
    label: "Junk",
    key: LEAD_STATUS.JUNK,
  },
  {
    label: "Do Not Contact",
    key: LEAD_STATUS.DO_NOT_CONTACT,
  },
  {
    label: "Blocked",
    key: LEAD_STATUS.BLOCKED,
  },
];

export enum AGENCY_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
}
export const AGENCY_STATUS_OPTIONS = [
  {
    label: "Active",
    key: AGENCY_STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    key: AGENCY_STATUS.INACTIVE,
  },
  {
    label: "Locked",
    key: AGENCY_STATUS.LOCKED,
  },
];

export enum AGENCY_POSITION {
  LOAN_OFFICER = "Loan Officer",
  LOAN_PROCESSOR = "Loan Processor",
  REAL_ESTATE_AGENT = "Real Estate Agent",
  REALTOR = "Realtor",
}
export const AGENCY_POSITION_OPTIONS = [
  {
    label: "Loan Officer",
    key: AGENCY_POSITION.LOAN_OFFICER,
  },
  {
    label: "Loan Processor",
    key: AGENCY_POSITION.LOAN_PROCESSOR,
  },
  {
    label: "Real Estate Agent",
    key: AGENCY_POSITION.REAL_ESTATE_AGENT,
  },
  {
    label: "Realtor",
    key: AGENCY_POSITION.REALTOR,
  },
];

export enum AGENCY_REVIEW_STATUS {
  PUBLISH = "PUBLISH",
  HIDE = "HIDE",
  PENDING = "PENDING",
}

export enum DATE_TYPE {
  FULL_DATE_EMAIL = "MM/DD/YYYY h:mm A",
  FULL_DATE = "DD/MM/YYYY h:mm A",
  SHORT_TIME = "HH:mm",
}

export enum EMAIL_TYPE {
  DRAFT = "DRAFT",
  SCHEDULE = "SCHEDULE",
  SEND_NOW = "SEND_NOW",
}

export const EXPECTED_HEADERS = [
  "First Name",
  "Last Name",
  "Email",
  "Primary Phone",
  "Street",
  "City",
  "State",
  "Zip Code",
  "Lead Source",
  "Status",
  "Lead Type",
];

export enum USER_STATUS_ENUM {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
}

export enum OWNER_LEAD_TYPE {
  ALL = "ALL",
  INDIVIDUAL = "INDIVIDUAL",
  TEAM = "TEAM",
  COMPANY = "COMPANY",
}

export const OWNER_LEAD_TYPE_OPTIONS = [
  // {
  //   label: "All lead owners",
  //   key: OWNER_LEAD_TYPE.ALL,
  // },
  {
    label: "Individual",
    key: OWNER_LEAD_TYPE.INDIVIDUAL,
  },
  {
    label: "Team",
    key: OWNER_LEAD_TYPE.TEAM,
  },
  {
    label: "Company",
    key: OWNER_LEAD_TYPE.COMPANY,
  },
];

export enum EMPLOYMENT_STATUS {
  "Employed" = "Employed",
  "Self-employed" = "Self-employed",
  "Unemployed" = "Unemployed",
  "Retired" = "Retired",
  "Student" = "Student",
  "Homemaker" = "Homemaker",
  "Military" = "Military",
  "Other" = "Other",
}

export const EMPLOYMENT_STATUS_OPTIONS = [
  {
    label: "Employed",
    key: EMPLOYMENT_STATUS.Employed,
  },
  {
    label: "Self-employed",
    key: EMPLOYMENT_STATUS["Self-employed"],
  },
  {
    label: "Unemployed",
    key: EMPLOYMENT_STATUS.Unemployed,
  },
  {
    label: "Retired",
    key: EMPLOYMENT_STATUS.Retired,
  },
  {
    label: "Student",
    key: EMPLOYMENT_STATUS.Student,
  },
  {
    label: "Homemaker",
    key: EMPLOYMENT_STATUS.Homemaker,
  },
  {
    label: "Military",
    key: EMPLOYMENT_STATUS.Military,
  },
  {
    label: "Other",
    key: EMPLOYMENT_STATUS.Other,
  },
];

export enum INDUSTRY {
  "Accounting" = "Accounting",
  "Airlines/Aviation" = "Airlines/Aviation",
  "Alternative medicine" = "Alternative medicine",
  "animation" = "animation",
  "Apparel & Fashion" = "Apparel & Fashion",
  "Architecture & Planning" = "Architecture & Planning",
  "Arts and Crafts" = "Arts and Crafts",
  "Automotive" = "Automotive",
  "Aviation & Aerospace" = "Aviation & Aerospace",
  "Banking" = "Banking",
  "Biotechnology" = "Biotechnology",
  "Broadcast Media" = "Broadcast Media",
  "Building materials" = "Building materials",
  "Business supplies and equipment" = "Business supplies and equipment",
  "Capital Markets" = "Capital Markets",
  "Chemicals" = "Chemicals",
  "Civic & Social Organization" = "Civic & Social Organization",
  "Civil Engineering" = "Civil Engineering",
  "Commercial real estate" = "Commercial real estate",
  "Computer & Network Security" = "Computer & Network Security",
  "Computer games" = "Computer games",
  "Computer hardware" = "Computer hardware",
  "Computer networking" = "Computer networking",
  "Computer software" = "Computer software",
  "Construction" = "Construction",
  "Consumer electronics" = "Consumer electronics",
  "Consumer goods" = "Consumer goods",
  "Consumer services" = "Consumer services",
  "Cosmetics" = "Cosmetics",
  "Dairy" = "Dairy",
  "Defense & Space" = "Defense & Space",
  "Design" = "Design",
  "Education management" = "Education management",
  "E-learning" = "E-learning",
  "Electrical/Electronic manufacturing" = "Electrical/Electronic manufacturing",
  "Entertainment" = "Entertainment",
  "Environmental services" = "Environmental services",
  "Events services" = "Events services",
  "Executive office" = "Executive office",
  "Facilities services" = "Facilities services",
  "Farming" = "Farming",
  "Financial services" = "Financial services",
  "Fine art" = "Fine art",
  "Fishery" = "Fishery",
  "Food & Beverages" = "Food & Beverages",
  "Food production" = "Food production",
  "Fund-Raising" = "Fund-Raising",
  "Furniture" = "Furniture",
  " Gaming & Casinos" = " Gaming & Casinos",
  "Glass" = "Glass",
  "Ceramics & Concrete" = "Ceramics & Concrete",
  "Government administration" = "Government administration",
  "Government relations" = "Government relations",
  "Graphic design" = "Graphic design",
  "Health" = "Health",
  "Wellness and Fitness" = "Wellness and Fitness",
  "Higher education" = "Higher education",
  "Hospital & Health Care" = "Hospital & Health Care",
  "Hospitality" = "Hospitality",
  "Human resources" = "Human resources",
  "Import and Export" = "Import and Export",
  "Individual & Family services" = "Individual & Family services",
  "Industrial Automation" = "Industrial Automation",
  "Information services" = "Information services",
  "Information Technology and services" = "Information Technology and services",
  "Insurance" = "Insurance",
  "International affairs" = "International affairs",
}

export const INDUSTRY_OPTIONS = [
  {
    label: "Accounting",
    key: INDUSTRY.Accounting,
  },
  {
    label: "Airlines/Aviation",
    key: INDUSTRY["Airlines/Aviation"],
  },
  {
    label: "Alternative medicine",
    key: INDUSTRY["Alternative medicine"],
  },
  {
    label: "animation",
    key: INDUSTRY.animation,
  },
  {
    label: "Apparel & Fashion",
    key: INDUSTRY["Apparel & Fashion"],
  },
  {
    label: "Architecture & Planning",
    key: INDUSTRY["Architecture & Planning"],
  },
  {
    label: "Arts and Crafts",
    key: INDUSTRY["Arts and Crafts"],
  },
  {
    label: "Automotive",
    key: INDUSTRY.Automotive,
  },
  {
    label: "Aviation & Aerospace",
    key: INDUSTRY["Aviation & Aerospace"],
  },
  {
    label: "Banking",
    key: INDUSTRY.Banking,
  },
  {
    label: "Biotechnology",
    key: INDUSTRY.Biotechnology,
  },
  {
    label: "Broadcast Media",
    key: INDUSTRY["Broadcast Media"],
  },
  {
    label: "Building materials",
    key: INDUSTRY["Building materials"],
  },
  {
    label: "Business supplies and equipment",
    key: INDUSTRY["Business supplies and equipment"],
  },
  {
    label: "Capital Markets",
    key: INDUSTRY["Capital Markets"],
  },
  {
    label: "Chemicals",
    key: INDUSTRY["Chemicals"],
  },
  {
    label: "Civic & Social Organization",
    key: INDUSTRY["Civic & Social Organization"],
  },
  {
    label: "Civil Engineering",
    key: INDUSTRY["Civil Engineering"],
  },
  {
    label: "Commercial real estate",
    key: INDUSTRY["Commercial real estate"],
  },
  {
    label: "Computer & Network Security",
    key: INDUSTRY["Computer & Network Security"],
  },
  {
    label: "Computer games",
    key: INDUSTRY["Computer games"],
  },
  {
    label: "Computer hardware",
    key: INDUSTRY["Computer hardware"],
  },
  {
    label: "Computer networking",
    key: INDUSTRY["Computer networking"],
  },
  {
    label: "Computer software",
    key: INDUSTRY["Computer software"],
  },
  {
    label: "Construction",
    key: INDUSTRY["Construction"],
  },
  {
    label: "Consumer electronics",
    key: INDUSTRY["Consumer electronics"],
  },
  {
    label: "Consumer goods",
    key: INDUSTRY["Consumer goods"],
  },
  {
    label: "Consumer services",
    key: INDUSTRY["Consumer services"],
  },
  {
    label: "Cosmetics",
    key: INDUSTRY["Cosmetics"],
  },
  {
    label: "Dairy",
    key: INDUSTRY["Dairy"],
  },
  {
    label: "Defense & Space",
    key: INDUSTRY["Defense & Space"],
  },
  {
    label: "Design",
    key: INDUSTRY["Design"],
  },
  {
    label: "Education management",
    key: INDUSTRY["Education management"],
  },
  {
    label: "E-learning",
    key: INDUSTRY["E-learning"],
  },
  {
    label: "Electrical/Electronic manufacturing",
    key: INDUSTRY["Electrical/Electronic manufacturing"],
  },
  {
    label: "Entertainment",
    key: INDUSTRY["Entertainment"],
  },
  {
    label: "Environmental services",
    key: INDUSTRY["Environmental services"],
  },
  {
    label: "Events services",
    key: INDUSTRY["Events services"],
  },
  {
    label: "Executive office",
    key: INDUSTRY["Executive office"],
  },
  {
    label: "Facilities services",
    key: INDUSTRY["Facilities services"],
  },
  {
    label: "Farming",
    key: INDUSTRY["Farming"],
  },
  {
    label: "Financial services",
    key: INDUSTRY["Financial services"],
  },
  {
    label: "Fine art",
    key: INDUSTRY["Fine art"],
  },
  {
    label: "Fishery",
    key: INDUSTRY["Fishery"],
  },
  {
    label: "Food & Beverages",
    key: INDUSTRY["Food & Beverages"],
  },
  {
    label: "Food production",
    key: INDUSTRY["Food production"],
  },
  {
    label: "Fund-Raising",
    key: INDUSTRY["Fund-Raising"],
  },
  {
    label: "Furniture",
    key: INDUSTRY["Furniture"],
  },
  {
    label: "Gaming & Casinos",
    key: INDUSTRY[" Gaming & Casinos"],
  },
  {
    label: "Glass",
    key: INDUSTRY["Glass"],
  },
  {
    label: "Ceramics & Concrete",
    key: INDUSTRY["Ceramics & Concrete"],
  },
  {
    label: "Government administration",
    key: INDUSTRY["Government administration"],
  },
  {
    label: "Government relations",
    key: INDUSTRY["Government relations"],
  },
  {
    label: "Graphic design",
    key: INDUSTRY["Graphic design"],
  },
  {
    label: "Health",
    key: INDUSTRY["Health"],
  },
  {
    label: "Wellness and Fitness",
    key: INDUSTRY["Wellness and Fitness"],
  },
  {
    label: "Higher education",
    key: INDUSTRY["Higher education"],
  },
  {
    label: "Hospital & Health Care",
    key: INDUSTRY["Hospital & Health Care"],
  },
  {
    label: "Hospitality",
    key: INDUSTRY["Hospitality"],
  },
  {
    label: "Human resources",
    key: INDUSTRY["Human resources"],
  },
  {
    label: "Import and Export",
    key: INDUSTRY["Import and Export"],
  },
  {
    label: "Individual & Family services",
    key: INDUSTRY["Individual & Family services"],
  },
  {
    label: "Industrial Automation",
    key: INDUSTRY["Industrial Automation"],
  },
  {
    label: "Information services",
    key: INDUSTRY["Information services"],
  },
  {
    label: "Information Technology and services",
    key: INDUSTRY["Information Technology and services"],
  },
  {
    label: "Insurance",
    key: INDUSTRY["Insurance"],
  },
  {
    label: "International affairs",
    key: INDUSTRY["International affairs"],
  },
];

export enum TASK_SORT_BY_DEADLINE {
  DESC = "DESC",
  ASC = "ASC",
}

export const TASK_SORT_BY_DEADLINE_OPTIONS = [
  {
    label: "Deadline: Earliest first",
    key: TASK_SORT_BY_DEADLINE.ASC,
  },
  {
    label: "Deadline: Latest first",
    key: TASK_SORT_BY_DEADLINE.DESC,
  },
];
