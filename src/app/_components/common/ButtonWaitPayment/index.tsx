import React, { memo } from "react";
import { useTranslations } from "next-intl";

import { useGetPendingPaymentQuery } from "@/store/Apis/Auth.api";
import { formatCurrency } from "@/utils/format.util";
import { Button, ButtonProps } from "@nextui-org/react";

import MyTooltip from "../MyTooltip";

type BType = "primary" | "secondary" | "neutral" | "ghost";
type BSize = "medium" | "small" | "xs";
interface MyButtonProps extends ButtonProps {
  totalAmount: number;
  bSize?: BSize;
  bType?: BType;
}
const ButtonWaitPayment = memo(
  ({
    totalAmount,
    className,
    variant,
    bSize = "medium",
    bType = "primary",
    ...props
  }: MyButtonProps) => {
    const t = useTranslations("ButtonWaitPayment");
    const { data: pendingPayment } = useGetPendingPaymentQuery({});
    return (
      <MyTooltip
        content={
          "The amount that the assistant has approved for payment but has not yet transferred"
        }
      >
        <Button
          {...props}
          disableRipple
          size="lg"
          variant={
            bType === "secondary" || bType === "neutral"
              ? "bordered"
              : undefined
          }
          className={
            "rounded-lg border border-neutral-stroke-bold bg-white px-4 py-2 font-medium text-black"
          }
        >
          {t("title")}
          <span className="text-red-500">
            {formatCurrency(pendingPayment?.pendingPayment) || 0}
          </span>
        </Button>
      </MyTooltip>
    );
  },
);

export default ButtonWaitPayment;
