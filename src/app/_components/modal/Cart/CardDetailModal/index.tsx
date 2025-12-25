import React, { memo } from "react";

import Loading from "@/app/_components/common/Loading";
import MyModal from "@/app/_components/common/MyModal";
import { useGetCartDetailsByIdQuery } from "@/store/Apis/Seoer.api";

import PartnerInfo from "../../../PartnerInfo";
import ServiceInfo from "../../Service/ServiceDetailModal/ServiceInfo";

interface EventModalProps {
  onCancel: () => void;
  isOpen: boolean;
  cartDetailId?: number;
}

const CartDetailModal = memo((props: EventModalProps) => {
  const { cartDetailId } = props;
  const {
    data: cartDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetCartDetailsByIdQuery(cartDetailId?.toString() || "", {
    refetchOnMountOrArgChange: true,
    skip: !cartDetailId,
  });

  console.log(cartDetail, "cartDetail");

  const partner = cartDetail?.service?.user;

  return (
    <MyModal
      size="6xl"
      isOpen={props.isOpen}
      onClose={props.onCancel}
      header={"Order Details"}
      body={
        <div className="relative max-w-full space-y-6 p-6">
          {(isLoading || isFetching) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/15">
              <Loading />
            </div>
          )}
          <PartnerInfo partner={partner} />
          <div className="flex h-full flex-col space-y-4">
            <ServiceInfo
              service={cartDetail?.service}
              cartDetailData={{
                quantity: cartDetail?.quantity,
                serviceType: cartDetail?.serviceType,
              }}
            />
          </div>
        </div>
      }
    />
  );
});

export default CartDetailModal;
