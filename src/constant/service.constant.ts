export enum SERVICE_TYPE {
  GP = "GP",
  TEXTLINK = "TEXTLINK",
  BANNER = "BANNER",
  TRAFFIC = "TRAFFIC",
  ENTITY = "ENTITY",
  BACKLINK = "BACKLINK",
  TOOL = "TOOL",
  CONTENT = "CONTENT",
}

export const SERVICE_TYPE_PARTNER = {
  GP: "GP",
  TEXTLINK: "TEXTLINK",
  BANNER: "BANNER",
  TRAFFIC: "TRAFFIC",
  ENTITY: "ENTITY",
  BACKLINK: "BACKLINK",
  TOOL: "TOOL",
  CONTENT: "CONTENT",
} as const;

export const SERVICE_TYPE_OPTIONS = [
  {
    label: "Guest Post",
    key: SERVICE_TYPE.GP,
  },
  {
    label: "Textlink",
    key: SERVICE_TYPE.TEXTLINK,
  },
  {
    label: "Banner",
    key: SERVICE_TYPE.BANNER,
  },
  {
    label: "Traffic",
    key: SERVICE_TYPE.TRAFFIC,
  },
  {
    label: "Entity",
    key: SERVICE_TYPE.ENTITY,
  },
  {
    label: "Backlink",
    key: SERVICE_TYPE.BACKLINK,
  },
  {
    label: "Tool",
    key: SERVICE_TYPE.TOOL,
  },
  {
    label: "Content",
    key: SERVICE_TYPE.CONTENT,
  },
];

export enum SERVICE_TYPE_PACK {
  DOMAIN = "DOMAIN", // GP, TEXTLINK, BANNER
  PACK = "PACK", // TRAFFIC, ENTITY, BACKLINK, TOOL
  CONTENT = "CONTENT",
}

export enum SERVICE_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const SERVICE_STATUS_OPTIONS = [
  {
    label: "Pending",
    key: SERVICE_STATUS.PENDING,
  },
  {
    label: "Approved",
    key: SERVICE_STATUS.APPROVED,
  },
  {
    label: "Rejected",
    key: SERVICE_STATUS.REJECTED,
  },
];

export enum SERVICE_FIELD_TYPE {
  TECHNICAL = "TECHNICAL",
  SPORT = "SPORT",
  BUSINESS = "BUSINESS",
  GENERAL = "GENERAL",
}

export const SERVICE_FIELD_TYPE_OPTIONS = [
  {
    label: "serviceFieldType.TECHNICAL",
    key: SERVICE_FIELD_TYPE.TECHNICAL,
  },
  {
    label: "serviceFieldType.SPORT",
    key: SERVICE_FIELD_TYPE.SPORT,
  },
  {
    label: "serviceFieldType.BUSINESS",
    key: SERVICE_FIELD_TYPE.BUSINESS,
  },
  {
    label: "serviceFieldType.GENERAL",
    key: SERVICE_FIELD_TYPE.GENERAL,
  },
];
