import React, { useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaExchangeAlt,
  FaHistory,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

import HighlightedText from "@/app/_components/common/HighlightedText";
import Loading from "@/app/_components/common/Loading";
import { GetListResponse } from "@/model";
import { IOrderHistory, ORDER_HISTORY_TYPE } from "@/store/Apis/Order.api";

import HistoryItem from "./HistoryItem";

interface OrderHistoryProps {
  historyData?: GetListResponse<IOrderHistory>;
  loadingGetHistory: boolean;
  fetchingGetHistory: boolean;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  historyData,
  loadingGetHistory: isLoading,
  fetchingGetHistory: isFetching,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const t = useTranslations("OrderHistory");
  const tStatus = useTranslations("statusOrder");

  const getStatusLabel = (status: string) => tStatus(status) || status;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getHistoryIcon = (type: ORDER_HISTORY_TYPE) => {
    const iconMap = {
      [ORDER_HISTORY_TYPE.CREATE_ORDER]: <FaPlus className="text-green-600" />,
      [ORDER_HISTORY_TYPE.CHANGE_STATUS]: (
        <FaExchangeAlt className="text-blue-600" />
      ),
      [ORDER_HISTORY_TYPE.PRICE_ADJUSTMENT]: (
        <FaEdit className="text-orange-600" />
      ),
      [ORDER_HISTORY_TYPE.REMOVE_ORDER_DETAIL]: (
        <FaTrash className="text-red-600" />
      ),
    };
    return iconMap[type] || <FaEdit className="text-gray-600" />;
  };

  const getHistoryTitle = (type: ORDER_HISTORY_TYPE) =>
    t(`types.${type}`) || type;

  const getHistoryDescription = (history: IOrderHistory) => {
    const { type, metadata } = history;

    const descriptions = {
      [ORDER_HISTORY_TYPE.CREATE_ORDER]: t("descriptions.CREATE_ORDER"),
      [ORDER_HISTORY_TYPE.REMOVE_ORDER_DETAIL]: t(
        "descriptions.REMOVE_ORDER_DETAIL",
      ),
      [ORDER_HISTORY_TYPE.CHANGE_STATUS]: (
        <span className="row gap-2">
          <HighlightedText
            text={getStatusLabel(metadata.before)}
            isOldValue={true}
          />
          <BsArrowRightCircleFill />
          <HighlightedText text={getStatusLabel(metadata.after)} />
        </span>
      ),
      [ORDER_HISTORY_TYPE.PRICE_ADJUSTMENT]: (
        <span className="row gap-2">
          <HighlightedText
            text={`${Number(metadata.before).toLocaleString()}đ`}
            isOldValue={true}
          />
          <BsArrowRightCircleFill />
          <HighlightedText
            text={`${Number(metadata.after).toLocaleString()}đ`}
          />
        </span>
      ),
    };

    return descriptions[type] || "Hoạt động trên đơn hàng";
  };

  return (
    <div className="mt-6 rounded-md border border-green-200  bg-green-50 p-3">
      <div
        className="-m-2 flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="mb-3 text-xl font-bold text-[#066102]">
              {t("title")}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <span className="text-sm font-medium">
            {isExpanded ? t("actions.collapse") : t("actions.expand")}
          </span>
          {isExpanded ? (
            <FaChevronUp className="h-4 w-4" />
          ) : (
            <FaChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center py-6">
              <Loading />
            </div>
          ) : historyData?.data && historyData.data.length > 0 ? (
            <div className="space-y-3">
              {historyData.data.map((history, index) => (
                <HistoryItem
                  key={history.id}
                  history={history}
                  index={index}
                  getHistoryIcon={getHistoryIcon}
                  getHistoryTitle={getHistoryTitle}
                  getHistoryDescription={getHistoryDescription}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white py-8 text-center">
              <FaHistory className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="mb-1 font-medium text-gray-500">
                {t("empty.title")}
              </p>
              <p className="text-sm text-gray-400">{t("empty.message")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
