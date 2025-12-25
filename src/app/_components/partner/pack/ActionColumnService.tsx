"use client";
import React, { memo, useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import EditIcon from "@/app/_components/icons/EditIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { useDeleteServiceMutation } from "@/store/Apis/Service.api";
import { apiResponseHandle } from "@/utils/common.util";

import DeleteConfirmModal from "../../common/DeleteConfirmModal";

const ActionColumnService = memo(
  ({
    onEdit,
    data,
    refetch,
  }: {
    onEdit: () => void;
    data: Service;
    refetch: () => void;
  }) => {
    const t = useTranslations("ActionColumnService");
    const { isVisible, hide, show } = useVisibility();
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

    const handleEdit = useCallback(() => {
      onEdit();
    }, [onEdit]);

    const handleDelete = useCallback(() => {
      show();
    }, [show]);

    const [deleteService, { isLoading }] = useDeleteServiceMutation();

    const onDelete = useCallback(async () => {
      try {
        const res = await deleteService({ id: String(data.id) || "" });

        apiResponseHandle({
          res,
          onSuccess: () => {
            hide();
            refetch();
          },
          toastSuccessMessage: t("deleteSuccess"),
        });
      } catch (error) {}
    }, [hide, data.id, deleteService, refetch, t]);

    return (
      <div className="flex items-center gap-2">
        {/* Edit Button with Tooltip */}
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

        {/* Delete Button with Tooltip */}
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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          open={isVisible}
          onClose={hide}
          onConfirm={onDelete}
          isLoading={isLoading}
          title={"Xóa dịch vụ"}
          message={
            "Hãy chắc chắn rằng các đơn hàng của dịch vụ này đều đã hoàn tất trước khi xóa."
          }
        />
      </div>
    );
  },
);

export default ActionColumnService;
