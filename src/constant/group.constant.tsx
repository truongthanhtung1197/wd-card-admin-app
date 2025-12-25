export enum GROUP_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const GROUP_STATUS_OPTIONS = [
  {
    label: "Active",
    key: GROUP_STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    key: GROUP_STATUS.INACTIVE,
  },
];

export const TRANSACTION_TYPE = {
  COMPANY_DEPOSIT: 1,
  PAYMENT_ONLINE: 2,
  WITHDRAW_ONLINE: 3,
  MANUAL_DEPOSIT: 4,
  PROMOTION_BONUS: 5,
  REFUND: 6,
  REFUND_DAY: 8,
  VIP_BONUS: 9,
};
