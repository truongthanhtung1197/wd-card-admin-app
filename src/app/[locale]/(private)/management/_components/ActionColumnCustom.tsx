"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { apiResponseHandle } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const DeleteConfirmModal = dynamic(() => import("./DeleteUserConfirmModal"), {
  ssr: false,
});

const ActionColumnCustom = memo(
  ({
    data,
    refetch,
    dataLength = 0,
    deleteAction,
    isLoading = false,
    viewAction,
    items = [],
  }: {
    data: any;
    refetch: () => void;
    dataLength?: number;
    deleteAction?: (id: number) => void;
    viewAction?: (item: any) => void;
    isLoading?: boolean;
    items?: any;
  }) => {
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
    const t = useTranslations("common");

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onDelete = async () => {
      if (!deleteAction || !data.id) return;

      const res = await deleteAction(data.id);

      apiResponseHandle({
        res,
        toastSuccessMessage: t("deleteSuccess"),
        toastErrorMessage: t("deleteError"),
        onSuccess: () => {
          detectResetPage();
          refetch();
        },
        onFailer: () => {
          detectResetPage();
          refetch();
        },
      });
      onClose();
    };

    const onAction = (key: string) => {
      if (key === "delete") {
        setIsShowDeleteConfirm(true);
        return;
      }
      if (key === "view") {
        if (!data.id || !viewAction) return;
        viewAction(data);
        return;
      }
    };

    const onOpenChange = () => {};

    return (
      <div>
        <Dropdown
          classNames={{
            base: "!p-0",
            content:
              "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !min-w-[120px] !max-w-[300px] !w-auto",
          }}
          onOpenChange={onOpenChange}
        >
          <DropdownTrigger>
            <div className="m-auto h-6 w-6 cursor-pointer">
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/1721/1721936.png"}
                alt="option"
                width={20}
                height={20}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            items={items}
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
              <DropdownItem key={(item as any).key}>
                <p className="text-base font-medium ">{(item as any).label}</p>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        {isShowDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={onDelete}
            onClose={onClose}
            isLoading={isLoading}
            open={isShowDeleteConfirm}
            user={data}
            title={t("deleteConfirmTitle")}
            message={t("deleteConfirmMessage")}
          />
        )}
      </div>
    );
  },
);

export default ActionColumnCustom;
