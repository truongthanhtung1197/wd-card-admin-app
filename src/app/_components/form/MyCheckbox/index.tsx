import React, { memo, ReactNode } from "react";

import CheckedIcon from "@/app/_components/icons/CheckedIcon";
import UnCheckIcon from "@/app/_components/icons/UnCheckIcon";
import { cn, insertObjectIf } from "@/utils/common.util";
import { Button } from "@nextui-org/button";

import Text from "../../common/Text";

interface MyCheckboxProps {
  className?: string;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
  UnCheckComponent?: ReactNode;
  isDisabled?: boolean;
  label?: string;
  classNameLabel?: string;
}

function MyCheckbox({
  className = "",
  checked,
  onChecked,
  UnCheckComponent,
  isDisabled,
  label,
  classNameLabel,
}: MyCheckboxProps) {
  return (
    <div className={label ? "row items-start gap-3" : "flex justify-center"}>
      <div className={cn("h-[24px] w-[24px]", className)}>
        {checked ? (
          <Button
            className="!size-6 !min-w-6 overflow-hidden rounded-none"
            isIconOnly
            radius="full"
            variant="light"
            size="sm"
            isDisabled={isDisabled}
            onClick={() => onChecked?.(false)}
          >
            <CheckedIcon
              {...insertObjectIf(isDisabled, {
                fill: "#A3A3A3",
              })}
            />
          </Button>
        ) : UnCheckComponent ? (
          UnCheckComponent
        ) : (
          <Button
            className="!size-6 !min-w-6 overflow-hidden rounded-none"
            isIconOnly
            radius="full"
            variant="light"
            size="sm"
            isDisabled={isDisabled}
            onClick={() => onChecked?.(true)}
          >
            <UnCheckIcon />
          </Button>
        )}
      </div>
      <Text
        variant="body1-regular"
        onClick={() => onChecked?.(true)}
        className={cn("cursor-pointer", classNameLabel)}
      >
        {label}
      </Text>
    </div>
  );
}

export default memo(MyCheckbox);
