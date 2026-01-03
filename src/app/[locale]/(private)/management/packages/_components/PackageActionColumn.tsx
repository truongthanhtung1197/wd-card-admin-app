"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import MyTooltip from "@/app/_components/common/MyTooltip";
import { toast } from "@/app/_components/common/Toaster";
import EditIcon from "@/app/_components/icons/EditIcon";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useDeletePackageByIdMutation } from "@/store/Apis/Package.api";

const DeleteConfirmModal = dynamic(
  () => import("../../_components/DeleteUserConfirmModal"),
  {
    ssr: false,
  },
);

const PackageActionColumn = memo(
  ({
    data,
    refetch,
    dataLength = 0,
    onDetail,
  }: {
    data: any;
    refetch: () => void;
    dataLength?: number;
    onDetail?: () => void;
  }) => {
    const router = useLocaleRouter();
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
    const t = useTranslations("ActionColumn");

    const [deletePackage, { isLoading }] = useDeletePackageByIdMutation();

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onDeletePackage = async () => {
      try {
        if (!data.id) return;
        const res: any = await deletePackage(data.id);
        if (res.error) {
          toast.error(
            res.error?.data?.error?.message ||
              res.error?.data?.message ||
              t("deleteConfirm.error"),
          );
          return;
        }
        detectResetPage();
        refetch();
        toast.success(t("deleteConfirm.success"));
      } catch (e) {
        toast.error(t("deleteConfirm.error"));
      } finally {
        onClose();
      }
    };

    const handleEdit = () => {
      router.push(
        ROUTERS.MANAGEMENT_PACKAGE_EDIT.replace(":id", String(data?.id || "")),
      );
    };

    const handleDelete = () => {
      setIsShowDeleteConfirm(true);
    };

    return (
      <div className="flex items-center justify-center gap-1">
        {/* Delete Button with Tooltip */}
        <MyTooltip content={"Delete"}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
            aria-label={t("delete")}
          >
            <TrashIcon />
          </button>
        </MyTooltip>

        {isShowDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={onDeletePackage}
            onClose={onClose}
            isLoading={isLoading}
            open={isShowDeleteConfirm}
            user={data}
            title={t("deleteConfirm.title")}
            message={t("deleteConfirm.message")}
          />
        )}
      </div>
    );
  },
);

export default PackageActionColumn;
