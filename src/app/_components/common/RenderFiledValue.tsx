import { cn, copyText } from "@/utils/common.util";
import { Divider } from "@nextui-org/react";

import MyTooltip from "./MyTooltip";
import Text from "./Text";

export const RenderFiledValue = ({
  filedName,
  value = "",
  filedClassName,
  valueClassName,
  wraperClassName,
  allowCoppyClick = true,
}: {
  filedName: string | React.ReactNode;
  value?: string | number | React.ReactNode;
  filedClassName?: string;
  valueClassName?: string;
  wraperClassName?: string;
  allowCoppyClick?: boolean;
}) => {
  return (
    <div
      className={cn("flex h-full flex-col justify-between", wraperClassName)}
    >
      <div className="col">
        <p
          className={cn(
            "!text-base !font-medium text-neutral-element-secondary",
            filedClassName,
          )}
        >
          {filedName}
        </p>
        <div>
          {typeof value == "string" || typeof value == "number" ? (
            <MyTooltip content={value} contentTooltipClassName="max-w-[500px]">
              <Text
                variant="body2-regular"
                className={cn("line-clamp-2 cursor-pointer", valueClassName)}
                onClick={() => {
                  if (allowCoppyClick) {
                    copyText(String(value));
                  }
                }}
              >
                {String(value) || "-"}
              </Text>
            </MyTooltip>
          ) : (
            value || "-"
          )}
        </div>
      </div>
      <Divider className="mt-2" />
    </div>
  );
};
