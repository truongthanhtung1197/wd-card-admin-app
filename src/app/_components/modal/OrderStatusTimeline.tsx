import React from "react";
import {
  FaBan,
  FaCheck,
  FaCheckCircle,
  FaHandshake,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPlus,
  FaStar,
  FaThumbsUp,
  FaTimesCircle,
  FaTools,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

import {
  IOrderHistory,
  optionsStatusOrder,
  ORDER_HISTORY_TYPE,
  ORDER_STATUS,
} from "@/store/Apis/Order.api";
import { formatDateTime, getLabelFromKey } from "@/utils/format.util";

import Text from "../common/Text";

interface OrderStatusTimelineProps {
  currentStatus: ORDER_STATUS;
  beforeStatus?: ORDER_STATUS;
  histories?: IOrderHistory[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  FaPlus,
  FaUserCheck,
  FaUserTimes,
  FaBan,
  FaCheckCircle,
  FaTimesCircle,
  FaHandshake,
  FaTools,
  FaThumbsUp,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaStar,
};

// Define the consolidated workflow sequence
const workflowSequence = [
  ORDER_STATUS.SEOER_ORDER,
  ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
  ORDER_STATUS.CONFIRMED_BY_PARTNER,
  ORDER_STATUS.COMPLETED_BY_PARTNER,
  ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER,
  ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER,
  ORDER_STATUS.PAID_BY_MANAGER,
];

// Map rejected statuses to their corresponding workflow step
const rejectedStatusMap: Partial<Record<ORDER_STATUS, ORDER_STATUS>> = {
  [ORDER_STATUS.REJECTED_BY_TEAM_LEADER]: ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
  [ORDER_STATUS.CANCELLED_BY_SEOER]: ORDER_STATUS.SEOER_ORDER,
};

// Shortened labels for better UI
const shortenedLabels: Record<string, { vi: string; zh: string }> = {
  SEOER_ORDER: { vi: "Tạo đơn hàng", zh: "创建订单" },
  CONFIRMED_BY_TEAM_LEADER: { vi: "TT/TP đã xác nhận", zh: "TT确认" },
  CONFIRMED_BY_PARTNER: { vi: "NCC đã xác nhận", zh: "NCC确认" },
  COMPLETED_BY_PARTNER: { vi: "NCC đã hoàn thành", zh: "NCC完成" },
  CONFIRMED_COMPLETION_BY_SEOER: { vi: "SEOer đã xác nhận", zh: "SEOer确认" },
  PAYMENT_APPROVED_BY_MANAGER: { vi: "TL SEO đã duyệt TT", zh: "TL批准付款" },
  PAID_BY_MANAGER: { vi: "TL đã TT", zh: "TL已付款" },
  REJECTED_BY_TEAM_LEADER: { vi: "TT/TP đã từ chối", zh: "TT拒绝" },
  CANCELLED_BY_SEOER: { vi: "SEOer đã huỷ", zh: "SEOer取消" },
};

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  currentStatus,
  beforeStatus,
  histories,
}) => {
  const t = useTranslations("DetailModal");
  const tStatus = useTranslations("statusOrder");

  // Get current locale to determine which shortened label to use
  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.includes("/zh-CN")
        ? "zh"
        : "vi"
      : "vi";

  const getStatusesToShow = () => {
    if (currentStatus === ORDER_STATUS.CANCELLED_BY_MANAGER) {
      // Giả định bạn truyền prop recentChangeStatusHistory từ cha vào
      const cancelledAfterStatus = beforeStatus;

      const insertIndex = workflowSequence.findIndex(
        (s) => s === cancelledAfterStatus,
      );

      if (insertIndex !== -1) {
        const newSequence = [...workflowSequence];
        newSequence.splice(
          insertIndex + 1,
          0,
          ORDER_STATUS.CANCELLED_BY_MANAGER,
        );

        return newSequence;
      }
    }

    return workflowSequence;
  };

  const statusesToShow = getStatusesToShow();

  // Find the position in workflow - handle rejected statuses
  const getCurrentStatusIndex = () => {
    if (currentStatus === ORDER_STATUS.CANCELLED_BY_MANAGER) {
      return statusesToShow.findIndex(
        (status) => status === ORDER_STATUS.CANCELLED_BY_MANAGER,
      );
    }

    // If current status is a rejected one, find its corresponding workflow step

    if (rejectedStatusMap[currentStatus]) {
      return statusesToShow.findIndex(
        (status) => status === rejectedStatusMap[currentStatus],
      );
    }

    // Otherwise find direct match
    return statusesToShow.findIndex((status) => status === currentStatus);
  };

  const currentStatusIndex = getCurrentStatusIndex();
  const isRejectedStatus =
    Object.keys(rejectedStatusMap).includes(currentStatus);

  const getStepState = (index: number, status: ORDER_STATUS) => {
    if (currentStatus === ORDER_STATUS.CANCELLED_BY_MANAGER) {
      const cancelIndex = statusesToShow.findIndex(
        (s) => s === ORDER_STATUS.CANCELLED_BY_MANAGER,
      );
      if (index === cancelIndex) return "cancelled";
      if (index < cancelIndex) return "completed";
      if (index > cancelIndex) return "disabled";
    }

    if (isRejectedStatus && index === currentStatusIndex) return "failed";
    if (index === currentStatusIndex && !isRejectedStatus) return "current";
    if (index < currentStatusIndex) return "completed";
    return "pending";
  };

  const getDisplayStatus = (status: ORDER_STATUS, stepState: string) => {
    // If this is the failed step, show the rejected status instead
    if (stepState === "failed" && rejectedStatusMap[currentStatus] === status) {
      return currentStatus;
    }
    return status;
  };

  const getShortLabel = (status: ORDER_STATUS) => {
    const statusKey = getLabelFromKey(optionsStatusOrder, status) || "";
    const shortLabel = shortenedLabels[statusKey];
    return shortLabel ? shortLabel[locale] : tStatus(statusKey);
  };

  return (
    <div className="w-full rounded-md border border-red-200 bg-red-50 p-6">
      <h3 className="mb-8 text-xl font-bold text-red-700">
        {t("orderStatus")}
      </h3>

      {/* Show horizontal timeline for all cases */}
      <div className="relative px-2">
        {/* Progress line */}
        <div className="absolute left-8 right-8 top-6 h-1 rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isRejectedStatus ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              width: `${(currentStatusIndex / (statusesToShow.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Status steps */}
        <div className="flex justify-between gap-1">
          {statusesToShow.map((status, index) => {
            const stepState = getStepState(index, status);
            const displayStatus = getDisplayStatus(status, stepState);
            const statusConfig = optionsStatusOrder.find(
              (option) => option.key === displayStatus,
            );
            const IconComponent = statusConfig?.icon
              ? iconMap[statusConfig.icon]
              : FaPlus;

            const createOrderHistory = histories?.find((history) => {
              return history?.type === ORDER_HISTORY_TYPE.CREATE_ORDER;
            });

            const history = histories?.find((history) => {
              return (
                [
                  ORDER_HISTORY_TYPE.CHANGE_STATUS,
                  ORDER_HISTORY_TYPE.CREATE_ORDER,
                ].includes(history?.type) &&
                history?.metadata?.after === displayStatus
              );
            });

            return (
              <div key={status} className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
                    stepState === "completed"
                      ? "bg-green-500 text-white"
                      : stepState === "current"
                        ? "bg-green-500 text-white ring-2 ring-green-200"
                        : stepState === "failed"
                          ? "bg-red-500 text-white ring-2 ring-red-200"
                          : stepState === "cancelled"
                            ? "bg-red-700 text-white ring-2 ring-red-300"
                            : stepState === "disabled"
                              ? "cursor-not-allowed bg-gray-300 text-gray-400"
                              : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepState === "completed" ? (
                    <FaCheck size={24} />
                  ) : IconComponent ? (
                    <IconComponent size={24} />
                  ) : null}
                </div>
                <div className="col mt-2 gap-2 text-center">
                  <div
                    className={` text-xs font-medium leading-tight ${
                      stepState === "completed"
                        ? "text-green-700"
                        : stepState === "current"
                          ? "text-green-700"
                          : stepState === "failed"
                            ? "text-red-700"
                            : "text-gray-500"
                    }`}
                  >
                    {getShortLabel(displayStatus)}
                  </div>
                  <div className="col">
                    <Text variant="body3-regular">
                      {formatDateTime(
                        status === ORDER_STATUS.SEOER_ORDER
                          ? createOrderHistory?.createdAt || ""
                          : history?.createdAt || "",
                      )}
                    </Text>
                    <Text variant="body3-regular">
                      {formatDateTime(
                        status === ORDER_STATUS.SEOER_ORDER
                          ? createOrderHistory?.createdAt || ""
                          : history?.createdAt || "",
                        "HH:mm:ss",
                      )}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
