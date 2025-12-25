"use client";
import React, { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import MyTooltip from "@/app/_components/common/MyTooltip";
import { toast } from "@/app/_components/common/Toaster";
import EditIcon from "@/app/_components/icons/EditIcon";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useAppSelector } from "@/store";
import {
  useDeleteAdminByIdMutation,
  useDeletePartnerByIdMutation,
} from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth";

const DeleteConfirmModal = dynamic(
  () => import("@/app/_components/common/DeleteConfirmModal"),
  {
    ssr: false,
  },
);

const ActionColumn = memo(
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
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
    const { updateRouteCache } = useUrlHistory();
    const t = useTranslations("ActionColumn");

    const [deleteAdmin, { isLoading }] = useDeleteAdminByIdMutation();
    const [deletePartner, { isLoading: isLoadingPartner }] =
      useDeletePartnerByIdMutation();

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onDeleteUser = async () => {
      try {
        if (!data.id) return;
        let res: any = null;
        if (data.role.roleName === ADMIN_ROLE.PARTNER) {
          res = await deletePartner(data.id);
        } else {
          res = await deleteAdmin(data.id);
        }
        if (res.error) {
          toast.error(
            res.error?.data?.error?.message || t("deleteConfirm.error"),
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

    const { admin } = useAppSelector(AuthSelector.selectAuthState);

    const handleEdit = () => {
      if (
        admin?.role?.roleName === ADMIN_ROLE.SUPER_ADMIN &&
        data?.role?.roleName !== ADMIN_ROLE.SUPER_ADMIN
      ) {
        updateRouteCache(ROUTERS.ADMIN);
        router.push(
          ROUTERS.MANAGEMENT_PARTNER_EDIT.replace(
            ":id",
            String(data?.id || ""),
          ),
        );
      }
    };

    const handleDelete = () => {
      setIsShowDeleteConfirm(true);
    };

    const onOpenChange = () => {
      router.prefetch(ROUTERS.ADMIN_DETAIL.replace(":adminId", data?.id));
    };

    const canEdit = useMemo(() => {
      const currentUserRole = admin?.role?.roleName;
      const targetUserRole = data?.role?.roleName;
      return (
        currentUserRole === ADMIN_ROLE.SUPER_ADMIN &&
        targetUserRole !== ADMIN_ROLE.SUPER_ADMIN
      );
    }, [admin?.role?.roleName, data?.role?.roleName]);

    const canDelete = useMemo(() => {
      const currentUserRole = admin?.role?.roleName;
      const targetUserRole = data?.role?.roleName;
      return (
        (currentUserRole === ADMIN_ROLE.SUPER_ADMIN &&
          targetUserRole !== ADMIN_ROLE.SUPER_ADMIN) ||
        ([
          ADMIN_ROLE.MANAGER,
          ADMIN_ROLE.TEAM_LEADER,
          ADMIN_ROLE.VICE_TEAM_LEADER,
          ADMIN_ROLE.ASSISTANT,
        ].includes(currentUserRole as any) &&
          [ADMIN_ROLE.SEOER, ADMIN_ROLE.PARTNER].includes(
            targetUserRole as any,
          ))
      );
    }, [admin?.role?.roleName, data?.role?.roleName]);

    return (
      <div className="flex items-center justify-center gap-1">
        <MyTooltip content={"detail"}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDetail?.();
            }}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
            aria-label={t("edit")}
          >
            <EyeSlashFilledIcon />
          </button>
        </MyTooltip>
        {/* Edit Button with Tooltip */}
        {canEdit && (
          <MyTooltip content={"edit"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleEdit();
              }}
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={t("edit")}
            >
              <EditIcon fill="#6B7280" />
            </button>
          </MyTooltip>
        )}

        {/* Delete Button with Tooltip */}
        {canDelete && (
          <MyTooltip content={"delete"}>
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
        )}

        {isShowDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={onDeleteUser}
            onClose={onClose}
            isLoading={isLoading || isLoadingPartner}
            open={isShowDeleteConfirm}
            title={t("deleteConfirm.title")}
            message={t("deleteConfirm.message")}
          />
        )}
      </div>
    );
  },
);

export default ActionColumn;
