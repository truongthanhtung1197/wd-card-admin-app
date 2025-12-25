import React from "react";
import { FaClock, FaUser } from "react-icons/fa";

import { IOrderHistory, ORDER_HISTORY_TYPE } from "@/store/Apis/Order.api";
import { formatFullDateTime } from "@/utils/orderHistory.util";

interface HistoryItemProps {
  history: IOrderHistory;
  index: number;
  getHistoryIcon: (type: ORDER_HISTORY_TYPE) => JSX.Element;
  getHistoryTitle: (type: ORDER_HISTORY_TYPE) => string;
  getHistoryDescription: (history: IOrderHistory) => React.ReactNode;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  history,
  index,
  getHistoryIcon,
  getHistoryTitle,
  getHistoryDescription,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50">
            {getHistoryIcon(history.type)}
          </div>
        </div>

        <div className="flex-grow">
          <div className="mb-2">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              {getHistoryTitle(history.type)}
            </h4>
            <div className="text-sm text-gray-600">
              {getHistoryDescription(history)}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock className="h-3 w-3" />
              {formatFullDateTime(history.createdAt)}
            </span>
            {(history.user?.displayName || history.user?.username) && (
              <span className="flex items-center gap-2">
                By
                <div className="flex items-center gap-1">
                  <FaUser className="h-3 w-3" />
                  {history.user?.displayName || history.user.username}
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
