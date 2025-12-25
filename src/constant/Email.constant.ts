export const CONNECTOR_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
};

export enum SentStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  SENDING = "SENDING",
  RECEIVED = "RECEIVED",
  SCHEDULED = "SCHEDULED",
  FAIL = "FAIL",
  SEND = "SEND",
  OPENED = "OPENED",
}

export enum EmailType {
  SCHEDULED = "SCHEDULED",
  SEND_NOW = "SEND_NOW",
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const TIME_SCHEDULE = {
  MINUTES_30: 30,
};

export enum EmailProvider {
  GMAIL = "gmail",
  OUTLOOK = "outlook",
}
