import { ORDER_STATUS } from "@/store/Apis/Order.api";

export const MAX_PRICE = 999999999.99;
export const statusLabels: any = {
  APPROVED: "Chấp nhận ",
  REJECTED: "Từ chối ",
  PENDING: "Chờ duyệt ",
};

export const confirmMessages: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER]:
    "Bạn có chắc chắn muốn phê duyệt hoàn thành đơn hàng này ? ",

  [ORDER_STATUS.CANCELLED_BY_SEOER]:
    "Bạn có chắc chắn muốn hủy đơn hàng này ? ",

  [ORDER_STATUS.SEOER_ORDER]:
    "Bạn có chắc chắn muốn tạo đơn hàng này? Hãy kiểm tra lại thông tin trước khi xác nhận.",

  [ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER]:
    "Bạn có chắc chắn muốn xác nhận đơn hàng này ? ",

  [ORDER_STATUS.REJECTED_BY_TEAM_LEADER]:
    "Bạn có chắc chắn muốn từ chối đơn hàng này ? ",

  [ORDER_STATUS.CONFIRMED_BY_PARTNER]:
    "Bạn có chắc chắn muốn xác nhận đơn hàng này ? ",

  [ORDER_STATUS.COMPLETED_BY_PARTNER]:
    "Bạn có chắc chắn muốn đánh dấu đơn hàng này là đã hoàn thành ? ",

  [ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER]:
    "Bạn có chắc chắn muốn phê duyệt thanh toán cho đơn hàng này ? ",

  [ORDER_STATUS.PAID_BY_MANAGER]:
    "Bạn có chắc chắn muốn xác nhận rằng đơn hàng này đã được thanh toán ? ",

  [ORDER_STATUS.CANCELLED_BY_MANAGER]:
    "Bạn có chắc chắn muốn hủy bỏ đơn hàng này ? ",
};
