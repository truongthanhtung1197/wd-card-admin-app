"use client";
import React, { memo, useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import OptionIcon from "@/app/_components/icons/OptionIcon";
import { ServiceStatusType } from "@/constant/Manager.constant";

interface StatusOption {
  key: ServiceStatusType;
  label: ServiceStatusType;
}

const ActionColumnService = memo(
  ({
    onEdit,
    data,
    viewAction,
  }: {
    onEdit: () => void;
    data: any;
    viewAction: any;
  }) => {
    const t = useTranslations("common");
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const [showViewTooltip, setShowViewTooltip] = useState(false);

    const handleEdit = useCallback(() => {
      onEdit();
    }, [onEdit]);

    const handleView = useCallback(() => {
      if (!data.id || !viewAction) return;
      viewAction(data);
    }, [data, viewAction]);

    return (
      <div className="flex items-center justify-center gap-1">
        {/* Edit Button with Tooltip */}
        <div className="relative">
          <button
            onClick={handleEdit}
            className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
            onMouseEnter={() => setShowAddTooltip(true)}
            onMouseLeave={() => setShowAddTooltip(false)}
            aria-label={t("addToCart")}
          >
            <OptionIcon size="24" />
          </button>
          {showAddTooltip && (
            <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
              <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                {t("addToCart")}
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>

        {/* View Button with Tooltip */}
        <div className="relative">
          <button
            onClick={handleView}
            className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
            onMouseEnter={() => setShowViewTooltip(true)}
            onMouseLeave={() => setShowViewTooltip(false)}
            aria-label={t("viewDetails")}
          >
            <EyeSlashFilledIcon size="24" />
          </button>
          {showViewTooltip && (
            <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
              <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                {t("viewDetails")}
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default ActionColumnService;
