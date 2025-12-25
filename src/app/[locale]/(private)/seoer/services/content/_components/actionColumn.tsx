"use client";
import React, { memo, useCallback } from "react";
import { useTranslations } from "next-intl";

import MyTooltip from "@/app/_components/common/MyTooltip";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import OptionIcon from "@/app/_components/icons/OptionIcon";

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

    const handleEdit = useCallback(() => {
      onEdit();
    }, [onEdit]);

    const handleView = useCallback(() => {
      if (!data.id || !viewAction) return;
      viewAction(data);
    }, [data, viewAction]);

    return (
      <div className="flex items-center justify-center gap-1">
        <MyTooltip content={t("addToCart")}>
          <div className="relative">
            <button
              onClick={handleEdit}
              className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={t("addToCart")}
            >
              <OptionIcon size="24" />
            </button>
          </div>
        </MyTooltip>

        <div className="relative">
          <MyTooltip content={t("viewDetails")}>
            <button
              onClick={handleView}
              className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={t("viewDetails")}
            >
              <EyeSlashFilledIcon size="24" />
            </button>
          </MyTooltip>
        </div>
      </div>
    );
  },
);

export default ActionColumnService;
