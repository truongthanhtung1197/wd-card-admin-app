"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import MyTooltip from "@/app/_components/common/MyTooltip";
import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import CartDetailModal from "@/app/_components/modal/Cart/CardDetailModal";
import { useVisibility } from "@/hook";
import { useDetectResetPage } from "@/hook/useDetectResetPage";
import { apiResponseHandle } from "@/utils/common.util";

const DeleteConfirmModal = dynamic(() => import("./DeleteConfirmModal"), {
  ssr: false,
});

const ActionColumnCustom = memo(
  ({
    data,
    refetch,
    dataLength = 0,
    deleteAction,
    isLoading = false,

    items = [],
    setCheckedList,
  }: {
    data: any;
    refetch: () => void;
    dataLength?: number;
    deleteAction?: (id: number) => void;

    isLoading?: boolean;
    items?: any;
    setCheckedList: (list: any) => void;
  }) => {
    const t = useTranslations("MyCart");
    const tCommon = useTranslations("common");
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);

    const onClose = () => {
      setIsShowDeleteConfirm(false);
    };

    const { detectResetPage } = useDetectResetPage({ dataLength });

    const onDelete = async () => {
      if (!deleteAction || !data.id) return;

      const res = await deleteAction(data.id);

      apiResponseHandle({
        res,
        toastSuccessMessage: t("delete.success"),
        toastErrorMessage: t("delete.failed"),
        onSuccess: () => {
          detectResetPage();
          refetch();

          setCheckedList((prev: any[]) => {
            let newList = prev.filter(
              (id: any) => id.toString() !== data.id.toString(),
            );
            newList = newList.map((id: any) => {
              if (id.toString().startsWith("s-")) {
                id = id.toString().replace(`-${data.id}`, "");
              }
              return id;
            });
            return newList;
          });
        },
        onFailer: () => {
          detectResetPage();
          refetch();
        },
      });
      onClose();
    };

    const {
      isVisible: isShowDetailModal,
      show: showDetailModal,
      hide: hideDetailModal,
    } = useVisibility();

    return (
      <div className="flex justify-center gap-1">
        <div className="center relative">
          <MyTooltip content={tCommon("delete")}>
            <button
              onClick={() => setIsShowDeleteConfirm(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
              aria-label={tCommon("delete")}
            >
              <TrashIcon size="24" />
            </button>
          </MyTooltip>
        </div>

        <div className="relative">
          <MyTooltip content={tCommon("viewDetails")}>
            <button
              onClick={showDetailModal}
              className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label={tCommon("viewDetails")}
            >
              <EyeSlashFilledIcon size="24" />
            </button>
          </MyTooltip>
        </div>

        {isShowDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={onDelete}
            onClose={onClose}
            isLoading={isLoading}
            open={isShowDeleteConfirm}
            user={data}
          />
        )}

        {isShowDetailModal && (
          <CartDetailModal
            isOpen={isShowDetailModal}
            onCancel={hideDetailModal}
            cartDetailId={data.id}
          />
        )}
      </div>
    );
  },
);

export default ActionColumnCustom;
