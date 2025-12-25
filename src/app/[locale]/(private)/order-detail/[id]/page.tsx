"use client";
import { useParams } from "next/navigation";

import SubHeaderV2 from "@/app/_components/common/SubHeaderV2";
import Text from "@/app/_components/common/Text";
import EmptyState from "@/app/_components/icons/EmptyState";
import OrderDetailView from "@/app/_components/modal/Order/OrderDetailModal/OrderDetailView";
import { useGetOrderByIdQuery } from "@/store/Apis/Order.api";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const {
    data: orderDetail,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetOrderByIdQuery(orderId || "", {
    refetchOnMountOrArgChange: true,
    skip: !orderId,
  });

  return (
    <div>
      <SubHeaderV2 label="Order Detail" />
      {isError && !isLoading && !isFetching ? (
        <div className="col flex min-h-[500px] items-center justify-center gap-10">
          <EmptyState />

          <Text variant="body2-regular">Order not found</Text>
        </div>
      ) : (
        <OrderDetailView
          isLoading={isLoading}
          isFetching={isFetching}
          orderDetail={orderDetail}
          refetch={refetch}
        />
      )}
    </div>
  );
}
