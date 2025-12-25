export enum DOMAIN_STATUS {
  REQUEST_BUY = "REQUEST_BUY", // yêu cầu mua domain
  BUYING = "BUYING", // đang mua domain
  PURCHASED = "PURCHASED", // đã mua domain
  DNS = "DNS", // dns
  SEOING = "SEOING", // đang seo domain
  STOPPED = "STOPPED", // ngừng seo domain
  SATELLITE = "SATELLITE", // domain phụ
  AUDIT = "AUDIT", // domain cần audit
  DIE = "DIE", // domain chết
  CANCEL_BUY = "CANCEL_BUY", // hủy mua domain
}

export const DOMAIN_STATUS_OPTIONS = [
  {
    label: "Seoing",
    key: DOMAIN_STATUS.SEOING,
  },
  {
    label: "Stopped",
    key: DOMAIN_STATUS.STOPPED,
  },
  {
    label: "Satellite",
    key: DOMAIN_STATUS.SATELLITE,
  },
  {
    label: "Audit",
    key: DOMAIN_STATUS.AUDIT,
  },
  {
    label: "Die",
    key: DOMAIN_STATUS.DIE,
  },
  {
    label: "Request Buy",
    key: DOMAIN_STATUS.REQUEST_BUY,
  },
  {
    label: "Buying",
    key: DOMAIN_STATUS.BUYING,
  },
  {
    label: "Purchased",
    key: DOMAIN_STATUS.PURCHASED,
  },
  {
    label: "DNS",
    key: DOMAIN_STATUS.DNS,
  },
  {
    label: "Cancel Buy",
    key: DOMAIN_STATUS.CANCEL_BUY,
  },
];

export enum DOMAIN_TYPE {
  NORMAL = "NORMAL",
  REDIRECT = "301",
  PBN = "PBN",
}

export const DOMAIN_TYPE_OPTIONS = [
  {
    label: "Normal",
    key: DOMAIN_TYPE.NORMAL,
  },
  {
    label: "301",
    key: DOMAIN_TYPE.REDIRECT,
  },
  {
    label: "PBN",
    key: DOMAIN_TYPE.PBN,
  },
];

export enum DOMAIN_ORDER_STATUS {
  REQUESTED = "REQUESTED",
  BUYING = "BUYING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const DOMAIN_ORDER_STATUS_OPTIONS = [
  {
    label: "Requested",
    key: DOMAIN_ORDER_STATUS.REQUESTED,
  },
  {
    label: "Buying",
    key: DOMAIN_ORDER_STATUS.BUYING,
  },
  {
    label: "Completed",
    key: DOMAIN_ORDER_STATUS.COMPLETED,
  },
  {
    label: "Cancelled",
    key: DOMAIN_ORDER_STATUS.CANCELLED,
  },
];
