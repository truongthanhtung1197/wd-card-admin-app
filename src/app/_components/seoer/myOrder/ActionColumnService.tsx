"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ADMIN_ROLE } from "@/constant/admin.constant";
import { confirmMessages } from "@/constant/Order.constant";
import { useVisibility } from "@/hook";
import { SeoerMyOrder } from "@/model/Seoer.model";
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
import { EyeSlashFilledIcon } from "../../icons/EyeSlashFilledIcon";
import OrderDetailModal from "../../modal/Order/OrderDetailModal";

const ActionColumnService = memo(
  ({ data, refetch }: { data: SeoerMyOrder; refetch: () => void }) => {
    const t = useTranslations("MyOrder");
    const tStatus = useTranslations("statusOrder");
    const tActionStatusOrder = useTranslations("actionStatusOrder");
    const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS | null>(
      null,
    );
    const {
      isVisible: isVisibleModalDetail,
      hide: hideModalDetail,
      show: showModalDetail,
    } = useVisibility();

    const onAction = useCallback((key: string) => {
      if (key === "view_partner") {
      } else {
        setSelectedStatus(key as ORDER_STATUS);
        show();
      }
    }, []);

    const statusItems = useMemo(() => {
      const result: any[] = [];

      rolePermissions[ADMIN_ROLE.SEOER]?.allowedStatuses.forEach((status) => {
        if (
          rolePermissions[ADMIN_ROLE.SEOER]?.isAllowed({
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

    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const { isVisible, hide, show } = useVisibility();

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
            toastSuccessMessage: tStatus("changeStatus"),
          });
        } catch (error) {}
      }
    };

    return (
      <div className="flex items-center justify-center gap-1">
        {isVisibleModalDetail && (
          <OrderDetailModal
            isOpen={isVisibleModalDetail}
            onCancel={hideModalDetail}
            orderData={data as any}
          />
        )}
        {isVisible && (
          <MyModal
            size="sm"
            isOpen={isVisible}
            onClose={hide}
            header="Xác nhận"
            body={
              selectedStatus
                ? confirmMessages[selectedStatus as ORDER_STATUS]
                : ""
            }
            footer={
              <div className="flex justify-end gap-3">
                <MyButton bType="neutral" bSize="small" onClick={hide}>
                  Hủy
                </MyButton>
                <MyButton
                  isLoading={isLoading}
                  bSize="small"
                  onClick={onComplete}
                >
                  Xác nhận
                </MyButton>
              </div>
            }
          />
        )}

        {/* View Button with Tooltip */}
        <div className="relative">
          <MyTooltip content={t("actions.orderDetails")}>
            <button
              onClick={showModalDetail}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={t("actions.orderDetails")}
            >
              <EyeSlashFilledIcon size="24" />
            </button>
          </MyTooltip>
        </div>

        {/* Status Update Dropdown with Tooltip - Only show if there are status options */}
        {statusItems.length > 0 && (
          <MyTooltip content="Cập nhật trạng thái">
            <Dropdown
              classNames={{
                base: "!p-0",
                content:
                  "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !min-w-[120px] !max-w-[300px] !w-auto",
              }}
            >
              <DropdownTrigger>
                <div
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
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
          </MyTooltip>
        )}
      </div>
    );
  },
);

export default ActionColumnService;
