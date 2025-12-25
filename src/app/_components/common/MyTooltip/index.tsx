import { memo, ReactNode } from "react";

import { cn } from "@/utils/common.util";
import { Tooltip } from "@nextui-org/react";

import Text from "../Text";

interface MyTooltip {
  content?: string | ReactNode;
  className?: string;
  children?: ReactNode;
  contentTooltipClassName?: string;
}
const MyTooltip = ({
  content,
  children,
  className,
  contentTooltipClassName,
}: MyTooltip) => {
  return (
    <Tooltip
      className={cn(
        "max-w-[380px] overflow-hidden break-words rounded-lg",
        className,
      )}
      content={
        <div className="p-1">
          {typeof content === "string" ? (
            <Text
              variant="body2-regular"
              className={cn(
                "overflow-hidden text-wrap break-all",
                contentTooltipClassName,
              )}
            >
              {content}
            </Text>
          ) : (
            content
          )}
        </div>
      }
      showArrow={true}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

export default memo(MyTooltip);
