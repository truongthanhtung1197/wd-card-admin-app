"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import EditIcon from "@/app/_components/icons/EditIcon";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { useVisibility } from "@/hook";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useDeleteDomainByIdMutation } from "@/store/Apis/Domain.api";

const DomainDetailModal = dynamic(
  () => import("@/app/_components/Views/DomainDetailModal"),
  {
    ssr: false,
  },
);

const ActionDomainColumn = memo(
  ({
    data,
    refetch,
    dataLength = 0,
  }: {
    data: any;
    refetch: () => void;
    dataLength?: number;
  }) => {
    const t = useTranslations("Domain");
    const router = useLocaleRouter();
    const { updateRouteCache } = useUrlHistory();
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);

    const [deleteDomain, { isLoading }] = useDeleteDomainByIdMutation();
    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const onDeleteUser = async () => {
      try {
        if (!data.id) return;
        const res: any = await deleteDomain(data.id);
        if (res.error) {
          toast.error(
            res.error?.data?.error?.message ||
              t("createEdit.messages.serverError"),
          );
          return;
        }
        detectResetPage();
        refetch();
        toast.success(t("createEdit.messages.updateSuccess"));
      } catch (e) {
        toast.error(t("createEdit.messages.serverError"));
      } finally {
        onClose();
      }
    };

    const handleEdit = () => {
      updateRouteCache(ROUTERS.MANAGEMENT_DOMAINS);
      router.push(
        ROUTERS.MANAGEMENT_DOMAINS_EDIT.replace(":id", String(data?.id || "")),
      );
    };

    const handleDelete = () => {
      setIsShowDeleteConfirm(true);
    };

    // detail
    const {
      isVisible: isShowDetail,
      show: showDetail,
      hide: hideDetail,
    } = useVisibility();

    return (
      <div className="flex items-center justify-center gap-1">
        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleEdit();
          }}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
          title={t("createEdit.editTitle")}
          aria-label={t("createEdit.editTitle")}
        >
          <EditIcon fill="#6B7280" />
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDelete();
          }}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
          title={t("columns.actions")}
          aria-label={t("columns.actions")}
        >
          <TrashIcon />
        </button>

        {/* detail domain Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            showDetail();
          }}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
          title={t("columns.actions")}
          aria-label={t("columns.actions")}
        >
          <EyeSlashFilledIcon />
        </button>

        {isShowDetail && (
          <DomainDetailModal
            onCancel={hideDetail}
            isOpen={isShowDetail}
            domainId={data?.id}
          />
        )}
      </div>
    );
  },
);

export default ActionDomainColumn;
