"use client";
import React, { memo, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import { toast } from "@/app/_components/common/Toaster";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  ServiceStatusType,
  ServiceStatusValues,
} from "@/constant/Manager.constant";
import { SERVICE_STATUS } from "@/constant/service.constant";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { useAppSelector } from "@/store";
import { useChangeStatusMutation } from "@/store/Apis/Service.api";
import { AuthSelector } from "@/store/Auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface StatusOption {
  key: ServiceStatusType;
  label: string;
}

const ActionColumnService = memo(
  ({
    data,
    refetch,
    dataLength = 0,
    onViewDetails,
  }: {
    data: any;
    refetch: () => void;
    dataLength?: number;
    onViewDetails?: (data: any) => void;
  }) => {
    const t = useTranslations("Service");
    const tCommon = useTranslations("common");
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [statusService, setStatusService] = useState("PENDING");
    const [showViewTooltip, setShowViewTooltip] = useState(false);
    const [showStatusTooltip, setShowStatusTooltip] = useState(false);

    const [changeStatus, { isLoading }] = useChangeStatusMutation();
    const { admin } = useAppSelector(AuthSelector.selectAuthState);

    const onClose = () => {
      setIsShowModalConfirm(false);
    };

    const { detectResetPage } = useDetectResetPage({ dataLength });

    const handleViewDetails = () => {
      if (onViewDetails) {
        onViewDetails(data);
      }
    };

    const onChangeSatus = async () => {
      try {
        if (!data.id) return;

        const res: any = await changeStatus({
          id: data.id,
          data: {
            status: statusService as SERVICE_STATUS,
          } as any,
        });
        if (res.error) {
          toast.error(
            res.error?.data?.error?.message || t("errors.changeStatusFailure"),
          );
          return;
        }
        detectResetPage();
        refetch();
        toast.success(t("messages.changeStatusSuccess"));
      } catch (e) {
        toast.error(t("errors.changeStatusFailure"));
      } finally {
        onClose();
      }
    };

    const onAction = (key: string) => {
      setIsShowModalConfirm(true);
      setStatusService(key);
    };

    const getRemainingStatuses = (
      currentStatus: ServiceStatusType,
    ): StatusOption[] =>
      ServiceStatusValues.filter((status) => status !== currentStatus).map(
        (status) => ({
          key: status,
          label: t(`status.${status.toLowerCase()}`) || status,
        }),
      );

    const statusItems = useMemo(() => {
      const result: StatusOption[] = [];
      const currentUserRole = admin?.role?.roleName;

      const canApproveServices =
        currentUserRole === ADMIN_ROLE.MANAGER ||
        currentUserRole === ADMIN_ROLE.ASSISTANT ||
        currentUserRole === ADMIN_ROLE.SUPER_ADMIN;

      if (canApproveServices) {
        const statusOptions = getRemainingStatuses(data?.status);
        result.push(...statusOptions);
      }

      return result;
    }, [data?.status, admin?.role?.roleName]);

    return (
      <div className="flex items-center justify-center gap-1">
        {/* View Details Button with Tooltip */}
        {onViewDetails && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleViewDetails();
              }}
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              onMouseEnter={() => setShowViewTooltip(true)}
              onMouseLeave={() => setShowViewTooltip(false)}
              aria-label={tCommon("viewDetails")}
            >
              <EyeSlashFilledIcon />
            </button>
            {showViewTooltip && (
              <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
                <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                  {tCommon("viewDetails")}
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status Update Dropdown with Tooltip - Only show if there are status options */}
        {statusItems.length > 0 && (
          <div className="relative">
            <Dropdown
              classNames={{
                base: "!p-0",
                content:
                  "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !min-w-[120px] !max-w-[300px] !w-auto",
              }}
            >
              <DropdownTrigger>
                <div
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
                  onMouseEnter={() => setShowStatusTooltip(true)}
                  onMouseLeave={() => setShowStatusTooltip(false)}
                  aria-label="Cập nhật trạng thái"
                >
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/128/1721/1721936.png"
                    }
                    alt="option"
                    width={20}
                    height={20}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status Actions"
                items={statusItems}
                classNames={{
                  base: "!p-0 ",
                }}
                itemClasses={{
                  base: [
                    "!rounded-none",
                    "!py-3 !px-4",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-brand-super-light",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
                onAction={(key) => onAction(key as string)}
              >
                {(item) => (
                  <DropdownItem key={item.key}>
                    <p className="text-base font-medium ">{item.label}</p>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            {showStatusTooltip && (
              <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform">
                <div className="whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                  Cập nhật trạng thái
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {isShowModalConfirm && (
          <MyModal
            size="sm"
            isOpen={isShowModalConfirm}
            onClose={() => setIsShowModalConfirm(false)}
            header={t("modal.changeStatus.title")}
            body={t("modal.changeStatus.message")}
            footer={
              <div className="flex justify-end gap-3">
                <MyButton
                  bType="neutral"
                  bSize="small"
                  onClick={() => setIsShowModalConfirm(false)}
                >
                  {t("modal.changeStatus.cancel")}
                </MyButton>
                <MyButton
                  isLoading={isLoading}
                  bSize="small"
                  onClick={onChangeSatus}
                >
                  {t("modal.changeStatus.confirm")}
                </MyButton>
              </div>
            }
          />
        )}
      </div>
    );
  },
);

export default ActionColumnService;
