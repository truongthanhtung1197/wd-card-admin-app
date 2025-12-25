"use client";
import React, { memo, useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import EditIcon from "@/app/_components/icons/EditIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";

const ActionColumnService = memo(
  ({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) => {
    const t = useTranslations("common");
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

    const handleEdit = useCallback(() => {
      if (onEdit) {
        onEdit();
      }
    }, [onEdit]);

    const handleDelete = useCallback(() => {
      if (onDelete) {
        onDelete();
      }
    }, [onDelete]);

    return (
      <div className="flex items-center gap-2">
        {/* Edit Button with Tooltip */}
        {onEdit && (
          <div className="relative">
            <button
              onClick={handleEdit}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              onMouseEnter={() => setShowEditTooltip(true)}
              onMouseLeave={() => setShowEditTooltip(false)}
              aria-label={t("edit")}
            >
              <EditIcon fill="#6B7280" />
            </button>
            {showEditTooltip && (
              <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
                <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                  {t("edit")}
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Button with Tooltip */}
        {onDelete && (
          <div className="relative">
            <button
              onClick={handleDelete}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
              onMouseEnter={() => setShowDeleteTooltip(true)}
              onMouseLeave={() => setShowDeleteTooltip(false)}
              aria-label={t("delete")}
            >
              <TrashIcon />
            </button>
            {showDeleteTooltip && (
              <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
                <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                  {t("delete")}
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default ActionColumnService;
