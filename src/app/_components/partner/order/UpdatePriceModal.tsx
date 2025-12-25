import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import Text from "@/app/_components/common/Text";
import { toast } from "@/app/_components/common/Toaster";
import MyInput from "@/app/_components/form/MyInput";
import { IOrder } from "@/constant/Manager.constant";
import { useUpdateOrderPriceMutation } from "@/store/Apis/Order.api";
import { apiResponseHandle } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";

export const UpdatePriceModal = ({
  orderData,
  hide,
  refetch,
}: {
  orderData: IOrder;
  hide: () => void;
  refetch?: () => void;
}) => {
  const [updatePrice, { isLoading: loading }] = useUpdateOrderPriceMutation();
  const tDetailModal = useTranslations("DetailModal");
  const [priceValue, setPriceValue] = useState<string | number>(
    orderData?.price || "",
  );

  const [discountValue, setDiscountValue] = useState<string | number>(
    Number(orderData?.discount) || 0,
  );

  useEffect(() => {
    const value = Number(orderData?.price) || "";
    setPriceValue(value);
  }, [orderData]);

  const finalPrice =
    (Number(orderData?.priceAdjustment) || 0) -
    (Number(discountValue) || 0) +
    (Number(priceValue) || 0);

  const handleUpdatePrice = async () => {
    try {
      if (isNaN(Number(priceValue))) {
        toast.error("Invalid price");
        return;
      }
      if (isNaN(Number(discountValue))) {
        toast.error("Invalid discount");
        return;
      }
      const res = await updatePrice({
        id: orderData?.id,
        price: Number(priceValue) || 0,
        discount: Number(discountValue) || 0,
      });

      apiResponseHandle({
        res,
        toastSuccessMessage: "Update price successfully",
        onSuccess: () => {
          refetch?.();
          hide();
        },
      });
    } catch (error) {
      toast.error("Update price failed");
    }
  };

  return (
    <MyModal
      isOpen={true}
      onClose={hide}
      header={"Chỉnh sửa giá"}
      body={
        <div className="col gap-3">
          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              {tDetailModal("price")}:
            </Text>
            <MyInput
              value={String(priceValue) as string}
              onChange={(e) => {
                setPriceValue(e.target.value);
              }}
            />
          </div>

          <div className="row gap-2">
            <Text variant="body1-regular" className="font-semibold">
              Chiết khấu:
            </Text>
            <MyInput
              value={String(discountValue) as string}
              onChange={(e) => {
                setDiscountValue(e.target.value);
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
            onClick={handleUpdatePrice}
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
