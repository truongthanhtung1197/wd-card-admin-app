import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import Text from "@/app/_components/common/Text";
import { toast } from "@/app/_components/common/Toaster";
import MyInput from "@/app/_components/form/MyInput";
import { useUpdateOrderPriceAdjustmentMutation } from "@/store/Apis/Order.api";
import { apiResponseHandle } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";

export const UpdatePriceAdjustmentModal = ({
  orderData,
  hide,
  refetch,
}: {
  orderData: any;
  hide: () => void;
  refetch?: () => void;
}) => {
  const [updatePriceAdjustment, { isLoading: loading }] =
    useUpdateOrderPriceAdjustmentMutation();
  const tOrder = useTranslations("Order");
  const tDetailModal = useTranslations("DetailModal");
  const [priceAdjustmentValue, setPriceAdjustmentValue] = useState<
    string | number
  >(orderData?.priceAdjustment);

  useEffect(() => {
    const value = Number(orderData?.priceAdjustment) || "";
    setPriceAdjustmentValue(value);
  }, [orderData]);

  const finalPrice =
    (Number(orderData?.price) || 0) -
    (Number(orderData?.discount) || 0) +
    (Number(priceAdjustmentValue) || 0);
  const handleUpdatePriceAdjustment = async () => {
    try {
      if (isNaN(Number(priceAdjustmentValue))) {
        toast.error("Invalid price adjustment");
        return;
      }
      const res = await updatePriceAdjustment({
        id: orderData?.id,
        priceAdjustment: Number(priceAdjustmentValue) || 0,
      });

      apiResponseHandle({
        res,
        toastSuccessMessage: tDetailModal(
          "messages.updatePriceAdjustmentSuccess",
        ),
        onSuccess: () => {
          refetch?.();
          hide();
        },
      });
    } catch (error) {
      toast.error("Update price adjustment failed");
    }
  };

  return (
    <MyModal
      isOpen={true}
      onClose={hide}
      header={tOrder("updatePriceAdjustment")}
      body={
        <div className="col gap-3">
          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              {tDetailModal("price")}:
            </Text>
            <Text variant="body1-regular">
              {formatCurrency(orderData?.price)}
            </Text>
          </div>
          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              {tDetailModal("discount")}:
            </Text>
            <Text variant="body1-regular">
              {formatCurrency(orderData?.discount)}
            </Text>
          </div>

          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              {tDetailModal("priceAdjustment")}:
            </Text>
            <MyInput
              value={String(priceAdjustmentValue) as string}
              onChange={(e) => {
                setPriceAdjustmentValue(e.target.value);
              }}
            />
          </div>

          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              {tDetailModal("finalPrice")}:
            </Text>
            <Text variant="body1-regular" className="font-bold text-red-700">
              {formatCurrency(finalPrice)}
            </Text>
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-center gap-3">
          <MyButton
            bSize="small"
            className="bg-slate-500"
            onClick={hide}
            disabled={loading}
            isLoading={loading}
          >
            {tDetailModal("cancel")}
          </MyButton>
          <MyButton
            bSize="small"
            onClick={handleUpdatePriceAdjustment}
            disabled={loading}
            isLoading={loading}
          >
            {tDetailModal("save")}
          </MyButton>
        </div>
      }
    ></MyModal>
  );
};
