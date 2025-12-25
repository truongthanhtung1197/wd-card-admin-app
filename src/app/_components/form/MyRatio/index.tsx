import React, { memo, ReactNode } from "react";

import { Button } from "@nextui-org/button";

import { RatioCheckedIcon } from "../../icons/RatioCheckedIcon";
import { RatioUnCheckIcon } from "../../icons/RatioUnCheckIcon";

interface MyRatioProps {
  className?: string;
  radioClassName?: string;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
  UnCheckComponent?: ReactNode;
  isDisabled?: boolean;
  size?: number;
}

function MyRatio({
  className = "",
  radioClassName = "",
  checked,
  onChecked,
  UnCheckComponent,
  isDisabled,
  size,
}: MyRatioProps) {
  return (
    <div className={className}>
      {checked ? (
        <Button
          isIconOnly
          radius="full"
          variant="light"
          size="sm"
          isDisabled={isDisabled}
          onClick={() => onChecked?.(false)}
          className={radioClassName}
        >
          <RatioCheckedIcon size={size} />
        </Button>
      ) : UnCheckComponent ? (
        UnCheckComponent
      ) : (
        <Button
          isIconOnly
          radius="full"
          variant="light"
          size="sm"
          isDisabled={isDisabled}
          onClick={() => onChecked?.(true)}
          className={radioClassName}
        >
          <RatioUnCheckIcon size={size} />
        </Button>
      )}
    </div>
  );
}

export default memo(MyRatio);
