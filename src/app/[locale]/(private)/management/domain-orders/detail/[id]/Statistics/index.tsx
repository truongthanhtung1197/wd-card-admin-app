import { MyButton } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import Text from "@/app/_components/common/Text";
import { DomainOrder } from "@/model/Domain.model";
import { formatCurrency } from "@/utils/format.util";

import { exportStatisticsToExcel } from "./utils";

const StatisticsDomainOrder = ({ detail }: { detail?: DomainOrder }) => {
  return (
    <MyCard
      label={
        <div className="row justify-between">
          <Text variant="h5">Thống kê</Text>
          <MyButton
            bType="neutral"
            bSize="xs"
            onClick={() => exportStatisticsToExcel(detail)}
          >
            Xuất file Excel
          </MyButton>
        </div>
      }
    >
      <div className="col max-w-[650px] gap-2">
        <div className="row w-full justify-between border-b border-neutral-stroke-bold">
          <Text className="flex-1 font-bold">Loại</Text>
          <Text className="w-[100px] text-center font-bold">Số lượng</Text>
          <Text className="flex-1 text-end font-bold">Giá</Text>
          <Text className="flex-1 text-end font-bold">Thành Tiền</Text>
        </div>
        {detail?.summarizeDomains?.map((item) => (
          <div className="row w-full justify-between border-b border-neutral-stroke-bold pb-2">
            <Text className="flex-1">{item.type}</Text>
            <Text className="w-[100px] text-center">{item.quantity}</Text>
            <Text className="flex-1 text-end">
              {formatCurrency(item.amount / item.quantity)}
            </Text>
            <Text className="flex-1 text-end">
              {formatCurrency(item.amount)}
            </Text>
          </div>
        ))}
        <div className="row w-full justify-between ">
          <Text className="flex-1 font-bold">Tổng</Text>
          <Text className="w-[100px] text-center">{detail?.domainsCount}</Text>
          <Text className="flex-1 text-end font-bold text-accent-error"></Text>
          <Text className="flex-1 text-end font-bold text-accent-error">
            {formatCurrency(detail?.price)}
          </Text>
        </div>
      </div>
    </MyCard>
  );
};

export default StatisticsDomainOrder;
