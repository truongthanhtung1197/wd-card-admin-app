import React, { memo } from "react";

import { cn } from "@/utils/common.util";
import { Input, InputProps } from "@nextui-org/input";

interface MyInputProps extends InputProps {
  className?: string;
  baseClassNames?: string;
}

function MyInput({
  className = "",
  baseClassNames = "",
  ...inputProps
}: MyInputProps) {
  return (
    <div className={className}>
      <Input
        radius="sm"
        classNames={{
          base: cn("h-full", baseClassNames),
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90 font-quicksand font-medium text-base",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent h-full",
          inputWrapper: [
            "h-full",
            "bg-white",
            "border",
            "border-neutral-stroke-light",
            "hover:!bg-white",
            "hover:!border-brand-primary",
            "group-data-[focus=true]:bg-white",
            "group-data-[focus=true]:border-brand-primary",
            "!shadow-none",
          ],
        }}
        {...inputProps}
      />
    </div>
  );
}

export default memo(MyInput);
