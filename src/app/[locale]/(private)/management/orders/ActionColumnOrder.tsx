"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import MyTooltip from "@/app/_components/common/MyTooltip";
import EditIcon from "@/app/_components/icons/EditIcon";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { confirmMessages } from "@/constant/Order.constant";
import { TEAM_MEMBER_ROLE } from "@/constant/Team.constant";
import { useVisibility } from "@/hook";
import { useAppSelector } from "@/store";
import {
  ORDER_STATUS,
  useUpdateOrderStatusMutation,
} from "@/store/Apis/Order.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { apiResponseHandle } from "@/utils/common.util";
import { rolePermissions } from "@/utils/order.ultil";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { UpdatePriceAdjustmentModal } from "./UpdateSpecialDiscountModal";

const ActionColumnOrderManager = memo(
  ({
    data,
    refetch,
    onViewDetails,
  }: {
    data: any;
    refetch: () => void;
    onViewDetails?: (data: any) => void;
  }) => {
    const t = useTranslations("statusOrder");
    const tActionStatusOrder = useTranslations("actionStatusOrder");
    const tOrder = useTranslations("Order");
    const tCommon = useTranslations("common");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS | null>(
      null,
    );

    const [updateOrderStatus, { isLoading: statusLoading }] =
      useUpdateOrderStatusMutation();

    const { admin } = useAppSelector(AuthSelector.selectAuthState);

    const handleViewDetails = useCallback(() => {
      if (onViewDetails) {
        onViewDetails(data);
      }
    }, [onViewDetails, data]);

    const onAction = useCallback((key: string) => {
      setSelectedStatus(key as ORDER_STATUS);
      setShowConfirm(true);
    }, []);

    const handleConfirm = async () => {
      if (selectedStatus) {
        try {
          const res = await updateOrderStatus({
            id: data.id,
            status: selectedStatus,
          });

          apiResponseHandle({
            res,
            onSuccess: () => {
              setShowConfirm(false);
              refetch();
            },
            toastSuccessMessage: t("changeStatus"),
          });
        } catch (error) { }
      }
    };

    const statusItems = useMemo(() => {
      const result: any[] = [];
      let aliasRole = undefined;

      const leaderCurrentAllowedStatuses =
        rolePermissions[ADMIN_ROLE.TEAM_LEADER].currentAllowedStatuses || [];

      const viceLeaderCurrentAllowedStatuses =
        rolePermissions[ADMIN_ROLE.VICE_TEAM_LEADER].currentAllowedStatuses ||
        [];

      const roleInTeam = data?.domain?.team?.teamMembers?.[0]?.role;

      if (
        roleInTeam === TEAM_MEMBER_ROLE.LEADER &&
        leaderCurrentAllowedStatuses?.includes(data.status)
      ) {
        aliasRole = ADMIN_ROLE.TEAM_LEADER;
      }

      if (
        roleInTeam === TEAM_MEMBER_ROLE.VICE_LEADER &&
        viceLeaderCurrentAllowedStatuses?.includes(data.status)
      ) {
        aliasRole = ADMIN_ROLE.VICE_TEAM_LEADER;
      }

      const permission1 =
        rolePermissions[(aliasRole || admin?.role?.roleName) as ADMIN_ROLE];

      permission1?.allowedStatuses.forEach((status) => {
        if (
          permission1?.isAllowed({
            to: status,
            current: data.status,
          }) &&
          status !== data?.status
        ) {
          result.push({
            key: status,
            label: tActionStatusOrder(status),
          });
        }
      });

      return result;
    }, [admin?.role?.roleName, data, tActionStatusOrder]);

    const { isVisible, show, hide } = useVisibility(false);

    const allowUpdatePriceAdjustment = useMemo(() => {
      return (
        [
          ADMIN_ROLE.MANAGER,
          ADMIN_ROLE.ASSISTANT,
          ADMIN_ROLE.SUPER_ADMIN,
        ].includes(admin?.role?.roleName as ADMIN_ROLE) &&
        ![
          ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER,
          ORDER_STATUS.PAID_BY_MANAGER,
        ].includes(data.status)
      );
    }, [admin?.role?.roleName, data.status]);

    return (
      <>
        {isVisible && (
          <UpdatePriceAdjustmentModal
            orderData={data}
            hide={() => {
              hide();
            }}
            refetch={refetch}
          />
        )}
        <div className="flex cursor-pointer items-center justify-center gap-1">
          {onViewDetails && (
            <MyTooltip content={tCommon("viewDetails")}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleViewDetails();
                }}
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
                aria-label={tCommon("viewDetails")}
              >
                <EyeSlashFilledIcon />
              </button>
            </MyTooltip>
          )}
          {statusItems.length > 0 && (
            <div className="relative">
              <MyTooltip content={tOrder("updateStatus")}>
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
                        <p className="w-full text-center text-base font-medium ">
                          {item.label}
                        </p>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </MyTooltip>
            </div>
          )}
          {allowUpdatePriceAdjustment && (
            <MyTooltip content={tOrder("updatePriceAdjustment")}>
              <div onClick={show}>
                <EditIcon fill="#000" />
              </div>
            </MyTooltip>
          )}

          {/* Show the confirmation modal when the user wants to approve or reject */}
          {showConfirm && (
            <MyModal
              size="sm"
              isOpen={showConfirm}
              onClose={() => setShowConfirm(false)}
              header={t("confirm")}
              body={
                selectedStatus
                  ? confirmMessages[selectedStatus as ORDER_STATUS]
                  : ""
              }
              footer={
                <div className="flex justify-end gap-3">
                  <MyButton
                    bType="neutral"
                    bSize="small"
                    onClick={() => setShowConfirm(false)}
                  >
                    {t("cancel")}
                  </MyButton>
                  <MyButton
                    isLoading={statusLoading}
                    bSize="small"
                    onClick={handleConfirm}
                  >
                    {t("confirm")}
                  </MyButton>
                </div>
              }
            />
          )}
        </div>
      </>
    );
  },
);

export default ActionColumnOrderManager;
