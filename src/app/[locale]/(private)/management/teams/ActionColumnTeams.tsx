"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import EditIcon from "@/app/_components/icons/EditIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { useDeleteTeamMutation } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";

const DeleteConfirmModal = dynamic(
  () => import("@/app/_components/common/DeleteConfirmModal"),
  {
    ssr: false,
  },
);

interface ActionColumnTeamsProps {
  data: any;
  refetch: () => void;
  dataLength?: number;
}

const ActionColumnTeams = memo(
  ({ data, refetch, dataLength = 0 }: ActionColumnTeamsProps) => {
    const t = useTranslations("Teams");
    const router = useLocaleRouter();
    const { admin } = useAppSelector(AuthSelector.selectAuthState);
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

    const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const onDeleteTeam = async () => {
      try {
        if (!data.id) return;
        const res: any = await deleteTeam(data.id);
        if (res.error) {
          toast.error(t("messages.deleteError"));
          return;
        }
        detectResetPage();
        refetch();
        toast.success(t("messages.deleteSuccess"));
      } catch (e) {
        toast.error(t("messages.deleteError"));
      } finally {
        onClose();
      }
    };

    const handleEdit = () => {
      router.push(
        ROUTERS.MANAGEMENT_TEAMS_EDIT.replace(":id", String(data?.id || "")),
      );
    };

    const handleDelete = () => {
      setIsShowDeleteConfirm(true);
    };

    return (
      <div className="flex items-center justify-center gap-1">
        {/* Edit Button with Tooltip */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleEdit();
            }}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
            onMouseEnter={() => setShowEditTooltip(true)}
            onMouseLeave={() => setShowEditTooltip(false)}
            aria-label="Edit team"
          >
            <EditIcon />
          </button>
          {showEditTooltip && (
            <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
              <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                {t("actions.editTeam")}
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>

        {/* Delete Button with Tooltip */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
            onMouseEnter={() => setShowDeleteTooltip(true)}
            onMouseLeave={() => setShowDeleteTooltip(false)}
            aria-label="Delete team"
          >
            <TrashIcon />
          </button>
          {showDeleteTooltip && (
            <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
              <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                {t("actions.deleteTeam")}
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>

        {isShowDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={onDeleteTeam}
            onClose={onClose}
            isLoading={isLoading}
            open={isShowDeleteConfirm}
            title={t("confirmDelete.title")}
            message={t("confirmDelete.message", { name: data?.name })}
          />
        )}
      </div>
    );
  },
);

ActionColumnTeams.displayName = "ActionColumnTeams";

export default ActionColumnTeams;
