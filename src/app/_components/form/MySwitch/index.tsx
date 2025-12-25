import React, { memo } from "react";

import { cn, Switch, SwitchProps } from "@nextui-org/react";

import TickIcon from "../../icons/TickIcon";

interface MySwitchProps extends SwitchProps {
  className?: string;
}

function MySwitch({ className = "", ...props }: MySwitchProps) {
  return (
    <div className={cn(className, "!h-6")}>
      <Switch
        {...props}
        disableAnimation
        color="danger"
        thumbIcon={({ isSelected }) => isSelected && <TickIcon />}
        classNames={{
          base: "!m-0",
          wrapper: "!m-0 !h-6 !w-10",
          thumb: "group-data-[selected=true]:!ml-3",
        }}
      />
    </div>
  );
}

export default memo(MySwitch);
