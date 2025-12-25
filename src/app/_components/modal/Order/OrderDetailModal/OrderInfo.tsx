import { useTranslations } from "next-intl";

import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { IOrder } from "@/constant/Manager.constant";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { calculateOrderTotalPrice } from "@/utils/order.ultil";

export default function OrderInfo({ order }: { order?: IOrder }) {
  const t = useTranslations("DetailModal");
  const { orderCode, domain, user } = order || {};
  return (
    <div className="flex-grow rounded-md border border-green-200 bg-green-50 p-3">
      <h3 className="mb-3 text-xl font-bold text-[#066102]">
        {t("orderInfo")}
      </h3>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 gap-x-[30px]">
          <RenderFiledValue
            filedName={t("orderCode")}
            value={orderCode || "-"}
          />
          <RenderFiledValue
            filedName={t("orderDate")}
            value={formatDateTime(order?.createdAt)}
          />
          <RenderFiledValue
            filedName={t("buyer")}
            value={user?.displayName || user?.username || "-"}
          />
          <RenderFiledValue
            filedName={t("buyerTelegram")}
            value={user?.telegramUsername || "-"}
          />
          <RenderFiledValue
            filedName={"Domain order"}
            value={domain?.name || "-"}
          />
          <RenderFiledValue
            filedName={t("price")}
            value={formatCurrency(order?.price)}
          />
          <RenderFiledValue
            filedName={t("discount")}
            value={formatCurrency(order?.discount)}
          />
          <RenderFiledValue
            filedName={t("priceAdjustment")}
            value={formatCurrency(order?.priceAdjustment)}
          />
          <RenderFiledValue
            filedName={t("totalOrder")}
            value={formatCurrency(
              calculateOrderTotalPrice(order, order?.priceAdjustment),
            )}
            valueClassName="text-[#820202] font-bold text-lg"
            filedClassName="text-[#820202]"
          />
        </div>
      </div>
    </div>
  );
}
