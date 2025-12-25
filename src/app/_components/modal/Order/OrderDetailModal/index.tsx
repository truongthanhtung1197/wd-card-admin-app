import React, { memo } from "react";

import MyModal from "@/app/_components/common/MyModal";
import { IOrder } from "@/constant/Manager.constant";
import { useGetOrderByIdQuery } from "@/store/Apis/Order.api";

import OrderDetailView from "./OrderDetailView";

interface EventModalProps {
  onCancel: () => void;
  isOpen: boolean;
  orderData?: IOrder;
}

const OrderDetailModal = memo((props: EventModalProps) => {
  // modal details orders flag
  const { orderData } = props;
  const {
    data: orderDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetOrderByIdQuery(orderData?.id?.toString() || "", {
    refetchOnMountOrArgChange: true,
    skip: !orderData?.id,
  });

  return (
    <MyModal
      size="6xl"
      isOpen={props.isOpen}
      onClose={props.onCancel}
      header={"Order Details"}
      body={
        <OrderDetailView
          isLoading={isLoading}
          isFetching={isFetching}
          orderDetail={orderDetail}
          refetch={refetch}
        />
      }
    />
  );
});

export default OrderDetailModal;
