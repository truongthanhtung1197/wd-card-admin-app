"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { confirmMessages } from "@/constant/Order.constant";
import { SERVICE_TYPE } from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import {
  ORDER_STATUS,
  useUpdateOrderStatusMutation,
} from "@/store/Apis/Order.api";
import { apiResponseHandle } from "@/utils/common.util";
import { rolePermissions } from "@/utils/order.ultil";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import MyButton from "../../common/MyButton";
import MyModal from "../../common/MyModal";
import MyTooltip from "../../common/MyTooltip";
import EditIcon from "../../icons/EditIcon";
import { UpdatePriceModal } from "./UpdatePriceModal";

const ActionColumnService = memo(
  ({
    data,
    refetch,
    onView,
  }: {
    data: any;
    refetch: () => void;
    onView?: () => void;
  }) => {
    const t = useTranslations("common");
    const tActionStatusOrder = useTranslations("actionStatusOrder");
    const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS | null>(
      null,
    );

    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
    const { isVisible, hide, show } = useVisibility();

    const handleView = useCallback(() => {
      if (onView) {
        onView();
      }
    }, [onView]);

    const onAction = useCallback(
      (key: string) => {
        setSelectedStatus(key as ORDER_STATUS);
        show();
      },
      [show],
    );

    const statusItems = useMemo(() => {
      const result: any[] = [];

      rolePermissions[ADMIN_ROLE.PARTNER]?.allowedStatuses.forEach((status) => {
        if (
          rolePermissions[ADMIN_ROLE.PARTNER]?.isAllowed({
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
    }, [data.status, tActionStatusOrder]);

    const onComplete = async () => {
      if (selectedStatus) {
        try {
          const res = await updateOrderStatus({
            id: data.id,
            status: selectedStatus,
          });

          apiResponseHandle({
            res,
            onSuccess: () => {
              hide();
              refetch();
            },
            toastSuccessMessage: t("success.changeStatus"),
          });
        } catch (error) {}
      }
    };
    const {
      isVisible: isEditPriceVisible,
      show: showEditPrice,
      hide: hideEditPrice,
    } = useVisibility(false);

    const allowUpdatePrice = useMemo(() => {
      return (
        [
          ORDER_STATUS.SEOER_ORDER,
          ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
          ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
          ORDER_STATUS.CANCELLED_BY_SEOER,
          ORDER_STATUS.CONFIRMED_BY_PARTNER,
        ].includes(data.status) &&
        data?.orderDetails?.[0]?.serviceType === SERVICE_TYPE.CONTENT
      );
    }, [data.status]);

    return (
      <div className="flex items-center justify-center gap-1">
        {isEditPriceVisible && (
          <UpdatePriceModal
            orderData={data}
            hide={hideEditPrice}
            refetch={refetch}
          />
        )}
        {isVisible && (
          <MyModal
            size="sm"
            isOpen={isVisible}
            onClose={hide}
            header={t("confirm")}
            body={
              selectedStatus
                ? confirmMessages[selectedStatus as ORDER_STATUS]
                : ""
            }
            footer={
              <div className="flex justify-end gap-3">
                <MyButton bType="neutral" bSize="small" onClick={hide}>
                  {t("cancel")}
                </MyButton>
                <MyButton
                  isLoading={isLoading}
                  bSize="small"
                  onClick={onComplete}
                >
                  {t("confirm")}
                </MyButton>
              </div>
            }
          />
        )}

        {/* View Details Button with Tooltip */}
        <div className="relative">
          <MyTooltip content={t("viewDetails")}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleView();
              }}
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={t("viewDetails")}
            >
              <EyeSlashFilledIcon />
            </button>
          </MyTooltip>
        </div>

        {/* Status Update Dropdown with Tooltip - Only show if there are status options */}
        {statusItems.length > 0 && (
          <MyTooltip content={"Cập nhật trạng thái"}>
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
            </div>
          </MyTooltip>
        )}
        {allowUpdatePrice && (
          <MyTooltip content={"Chỉnh sửa giá"}>
            <div onClick={showEditPrice}>
              <EditIcon fill="#000" />
            </div>
          </MyTooltip>
        )}
      </div>
    );
  },
);

export default ActionColumnService;
