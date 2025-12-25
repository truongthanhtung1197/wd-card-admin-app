import { ADMIN_ROLE } from "@/constant/admin.constant";
import { EnumServiceStatus } from "@/constant/Manager.constant";
import { SERVICE_TYPE } from "@/constant/service.constant";
import { Service } from "@/model/Partner.model";
import { ORDER_STATUS } from "@/store/Apis/Order.api";

import { formatCurrency } from "./format.util";

export const statusServiceClass: any = {
  [EnumServiceStatus.Approved]: "text-green-600",
  [EnumServiceStatus.Pending]: "text-[#efb70d]",
  [EnumServiceStatus.Rejected]: "text-red-600",
};

export const statusOrderClass: any = {
  [ORDER_STATUS.SEOER_ORDER]: "text-amber-600",
  [ORDER_STATUS.CONFIRMED_BY_PARTNER]: "text-emerald-600",
  [ORDER_STATUS.COMPLETED_BY_PARTNER]: "text-teal-600",
  [ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER]: "text-blue-500", // Changed to blue
  [ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER]: "text-green-500", // Changed to green
  [ORDER_STATUS.PAID_BY_MANAGER]: "text-green-500", // Changed to green
  [ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER]: "text-blue-500", // Changed to blue
  [ORDER_STATUS.REJECTED_BY_TEAM_LEADER]: "text-red-500",
  [ORDER_STATUS.CANCELLED_BY_SEOER]: "text-red-500",
  [ORDER_STATUS.CANCELLED_BY_MANAGER]: "text-gray-400",
};

export const getFormattedServicePrice = (
  serviceType: SERVICE_TYPE,
  service: any,
) => {
  const price =
    serviceType === SERVICE_TYPE.GP
      ? service?.guestPostPrice
      : serviceType === SERVICE_TYPE.TEXTLINK
        ? service?.textLinkPrice
        : serviceType === SERVICE_TYPE.BANNER
          ? service?.bannerPrice
          : service?.price;

  return formatCurrency(price);
};

export const getFormattedLabelPrice = (serviceType: SERVICE_TYPE, t: any) => {
  if (serviceType === SERVICE_TYPE.GP) {
    return t("pricing.guestPostPrice");
  }
  if (serviceType === SERVICE_TYPE.TEXTLINK) {
    return t("pricing.textLinkPrice");
  }
  if (serviceType === SERVICE_TYPE.BANNER) {
    return t("pricing.bannerPrice");
  }
  return t("pricing.packPrice");
};

export const getFormattedServiceNote = (
  serviceType: SERVICE_TYPE,
  service: any,
) => {
  const Note =
    serviceType === SERVICE_TYPE.GP
      ? service?.guestPostNote
      : serviceType === SERVICE_TYPE.TEXTLINK
        ? service?.textLinkNote
        : serviceType === SERVICE_TYPE.BANNER
          ? "-"
          : service?.note;

  return Note;
};

export const getFormattedTotalPrice = (row: any): string => {
  const { serviceType, service, quantity } = row;
  const priceAfterDiscount = getPriceAndDiscountService(
    serviceType,
    service,
  )?.priceAfterDiscount;
  const total = priceAfterDiscount * Number(quantity);
  return formatCurrency(total);
};

export const getPriceAndDiscountService = (
  serviceType?: SERVICE_TYPE,
  service?: Service,
) => {
  if (!service) {
    return { price: 0, discount: 0, priceAfterDiscount: 0 };
  }
  if (serviceType === SERVICE_TYPE.GP) {
    return {
      price: Number(service?.guestPostPrice) || 0,
      discount: Number(service?.discountGuestPostService) || 0,
      priceAfterDiscount:
        (Number(service?.guestPostPrice) || 0) -
        (Number(service?.discountGuestPostService) || 0),
    };
  }
  if (serviceType === SERVICE_TYPE.TEXTLINK) {
    return {
      price: Number(service?.textLinkPrice) || 0,
      discount: Number(service?.discountTextLinkService) || 0,
      priceAfterDiscount:
        (Number(service?.textLinkPrice) || 0) -
        (Number(service?.discountTextLinkService) || 0),
    };
  }
  if (serviceType === SERVICE_TYPE.BANNER) {
    return {
      price: Number(service?.bannerPrice) || 0,
      discount: Number(service?.discountBannerService) || 0,
      priceAfterDiscount:
        (Number(service?.bannerPrice) || 0) -
        (Number(service?.discountBannerService) || 0),
    };
  }
  return {
    price: Number(service?.price) || 0,
    discount: Number(service?.discountPackService) || 0,
    priceAfterDiscount:
      Number(service?.price) - Number(service?.discountPackService) || 0,
  };
};

export const calculateOrderTotalPrice = (
  order: any,
  priceAdjustmentOverride?: any,
) => {
  const { price, discount, priceAdjustment = 0 } = order || {};

  const priceAfterDiscount = Number(price) - Number(discount);

  const finalPriceAdjustment =
    priceAdjustmentOverride !== undefined
      ? priceAdjustmentOverride
      : priceAdjustment;

  const totalPrice = priceAfterDiscount + Number(finalPriceAdjustment);

  return totalPrice;
};

export const getTotalAmountFromApiOrLocal = (
  apiTotalAmount: unknown,
  orders: any[] | unknown,
) => {
  if (typeof (apiTotalAmount as any) === "number") {
    return Number(apiTotalAmount);
  }
  const list = Array.isArray(orders) ? orders : [];
  return list.reduce((sum, order) => sum + calculateOrderTotalPrice(order), 0);
};

export const rolePermissions: Record<
  ADMIN_ROLE,
  {
    allowedStatuses: ORDER_STATUS[];
    isAllowed: ({
      to,
      current,
    }: {
      to: ORDER_STATUS;
      current: ORDER_STATUS;
    }) => boolean;
    currentAllowedStatuses?: ORDER_STATUS[];
  }
> = {
  [ADMIN_ROLE.PARTNER]: {
    allowedStatuses: [
      ORDER_STATUS.CONFIRMED_BY_PARTNER,
      ORDER_STATUS.COMPLETED_BY_PARTNER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.CONFIRMED_BY_PARTNER) {
        return current === ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER;
      }
      if (to === ORDER_STATUS.COMPLETED_BY_PARTNER) {
        return current === ORDER_STATUS.CONFIRMED_BY_PARTNER;
      }

      return false;
    },
  },
  [ADMIN_ROLE.TEAM_LEADER]: {
    allowedStatuses: [
      ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
      ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER) {
        return [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
        ].includes(current);
      }
      if (to === ORDER_STATUS.REJECTED_BY_TEAM_LEADER) {
        return [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
        ].includes(current);
      }
      return false;
    },
    currentAllowedStatuses: [
      ORDER_STATUS.SEOER_ORDER,
      ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
      ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
    ],
  },
  [ADMIN_ROLE.VICE_TEAM_LEADER]: {
    allowedStatuses: [
      ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
      ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER) {
        return [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
        ].includes(current);
      }
      if (to === ORDER_STATUS.REJECTED_BY_TEAM_LEADER) {
        return [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
        ].includes(current);
      }
      return false;
    },
    currentAllowedStatuses: [
      ORDER_STATUS.SEOER_ORDER,
      ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
      ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
    ],
  },
  [ADMIN_ROLE.SEOER]: {
    allowedStatuses: [
      ORDER_STATUS.SEOER_ORDER,
      ORDER_STATUS.CANCELLED_BY_SEOER,
      ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.SEOER_ORDER) {
        return current === ORDER_STATUS.CANCELLED_BY_SEOER;
      }
      if (to === ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER) {
        return current === ORDER_STATUS.COMPLETED_BY_PARTNER;
      }
      if (to === ORDER_STATUS.CANCELLED_BY_SEOER) {
        return [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
        ].includes(current);
      }
      return false;
    },
  },
  [ADMIN_ROLE.MANAGER]: {
    allowedStatuses: [
      ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER,
      ORDER_STATUS.PAID_BY_MANAGER,
      ORDER_STATUS.CANCELLED_BY_MANAGER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER) {
        return [
          ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER,
          ORDER_STATUS.COMPLETED_BY_PARTNER,
        ].includes(current);
      }
      if (to === ORDER_STATUS.PAID_BY_MANAGER) {
        return [ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER].includes(current);
      }
      if (to === ORDER_STATUS.CANCELLED_BY_MANAGER) {
        return true;
      }
      return false;
    },
  },
  [ADMIN_ROLE.ASSISTANT]: {
    allowedStatuses: [
      ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER,
      ORDER_STATUS.PAID_BY_MANAGER,
      ORDER_STATUS.CANCELLED_BY_MANAGER,
    ],
    isAllowed: ({ to, current }) => {
      if (to === ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER) {
        return [
          ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER,
          ORDER_STATUS.COMPLETED_BY_PARTNER,
        ].includes(current);
      }
      if (to === ORDER_STATUS.PAID_BY_MANAGER) {
        return [ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER].includes(current);
      }
      if (to === ORDER_STATUS.CANCELLED_BY_MANAGER) {
        return true;
      }
      return false;
    },
  },
  [ADMIN_ROLE.DOMAIN_BUYER]: {
    allowedStatuses: [],
    isAllowed: () => false,
  },
  [ADMIN_ROLE.SUPER_ADMIN]: {
    allowedStatuses: Object.values(ORDER_STATUS),
    isAllowed: () => true,
  },
};
