import { useTranslations } from "next-intl";

import { IOrder, IOrderDetail } from "@/constant/Manager.constant";

import MyCard from "../../../common/MyCard";
import OrderDetailInfo from "./OrderDetailInfo";

export default function OrderDetails({
  order,
  refetchOrderDetail,
}: {
  order?: IOrder;
  refetchOrderDetail: () => void;
}) {
  const t = useTranslations("DetailModal");

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
              (order?.orderDetails?.length ?? 0) > 1 ? `Đơn ${idx + 1}` : ""
            }
          >
            <OrderDetailInfo
              orderDetail={orderDetail}
              refetchOrderDetail={refetchOrderDetail}
            />
          </MyCard>
        ))}
      </div>
    </div>
  );
}
