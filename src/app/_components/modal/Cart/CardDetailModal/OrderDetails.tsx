import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { IOrder, IOrderDetail } from "@/constant/Manager.constant";
import { useVisibility } from "@/hook";
import { useAppSelector } from "@/store";
import { useDeleteOrderDetailMutation } from "@/store/Apis/Order.api";
import { AuthSelector } from "@/store/Auth";
import { apiResponseHandle } from "@/utils/common.util";

import MyCard from "../../../common/MyCard";
import OrderDetailInfo from "./OrderDetailInfo";

const DeleteConfirmModal = dynamic(
  () => import("@/app/_components/common/DeleteConfirmModal"),
  { ssr: false },
);

export default function OrderDetails({
  order,
  refetchOrderDetail,
}: {
  order?: IOrder;
  refetchOrderDetail: () => void;
}) {
  const t = useTranslations("DetailModal");
  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );
  const [deleteOrderDetail, { isLoading: deleting }] =
    useDeleteOrderDetailMutation();

  const [pendingDeleteId, setPendingDeleteId] = useState<
    number | string | null
  >(null);
  const {
    isVisible: isShowDeleteConfirm,
    show: showDeleteConfirm,
    hide: hideDeleteConfirm,
  } = useVisibility(false);

  const totalCount = order?.orderDetails?.length ?? 0;
  const canDeleteByRole =
    admin?.role?.roleName === ADMIN_ROLE.MANAGER ||
    admin?.role?.roleName === ADMIN_ROLE.ASSISTANT ||
    admin?.role?.roleName === ADMIN_ROLE.SUPER_ADMIN;

  const handleDelete = async (id: number | string) => {
    try {
      const res = await deleteOrderDetail(id as any);
      apiResponseHandle({
        res,
        onSuccess: () => {
          toast.success("Deleted order detail successfully");
          refetchOrderDetail();
        },
        toastErrorMessage: "Failed to delete order detail",
      });
    } catch (error) {
      toast.error("Failed to delete order detail");
    }
  };

  return (
    <div className="h-full rounded-md border border-green-200 bg-green-50 p-4">
      <h3 className="mb-4 text-xl font-bold text-[#066102]">
        {t("detailService")}
      </h3>
      <div className="col gap-4">
        {order?.orderDetails?.map((orderDetail: IOrderDetail, idx) => (
          <MyCard
            key={orderDetail.id}
            className="bg-[#b8d7f8]/30  shadow-lg"
            label={
              <div className="flex items-center justify-between">
                {totalCount > 1 ? `Đơn ${idx + 1}` : ""}
                {canDeleteByRole && totalCount > 1 && !!orderDetail.id ? (
                  <button
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                    onClick={() => {
                      setPendingDeleteId(orderDetail.id as number);
                      showDeleteConfirm();
                    }}
                    disabled={deleting}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            }
          >
            <OrderDetailInfo
              orderDetail={orderDetail}
              refetchOrderDetail={refetchOrderDetail}
            />
          </MyCard>
        ))}
      </div>
      {isShowDeleteConfirm && (
        <DeleteConfirmModal
          open={isShowDeleteConfirm}
          onClose={() => {
            setPendingDeleteId(null);
            hideDeleteConfirm();
          }}
          onConfirm={async () => {
            if (pendingDeleteId !== null) {
              await handleDelete(pendingDeleteId);
            }
            setPendingDeleteId(null);
            hideDeleteConfirm();
          }}
          isLoading={deleting}
          title={"Delete order detail"}
          message={"Are you sure you want to delete this order detail?"}
          btnLabel="Delete"
        />
      )}
    </div>
  );
}
