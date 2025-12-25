import { cn } from "@/utils/common.util";
import { Divider } from "@nextui-org/react";

export const RenderFiled = ({
  valueClassName,
  label,
  isDivider,
  value,
}: {
  valueClassName?: string;
  label: string;
  isDivider?: boolean;
  value?: string | number;
}) => {
  return (
    <div className="flex w-full flex-col">
      <p className="!text-base !font-medium text-neutral-element-secondary">
        {label}
      </p>
      <p className={cn("mt-1 leading-6", valueClassName)}>{value}</p>
      {isDivider && <Divider className="mt-3" />}
    </div>
  );
};
