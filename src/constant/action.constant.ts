export const ActionKeys = {
  EDIT: "edit",
  DELETE: "delete",
  VIEW: "view",
} as const;

export const ActionLabels = {
  [ActionKeys.EDIT]: "Chỉnh sửa",
  [ActionKeys.DELETE]: "Xóa",
  [ActionKeys.VIEW]: "Xem chi tiết",
} as const;

export type ActionKeyType = (typeof ActionKeys)[keyof typeof ActionKeys];
