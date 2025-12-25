import React, { memo, ReactNode } from "react";

import { cn } from "@/utils/common.util";

interface IActiveCell {
  isActive?: boolean;
  children?: ReactNode;
  className?: string;
}
const ActiveCell = memo(({ isActive, children, className }: IActiveCell) => {
  return (
    <div className={cn(isActive ? "active-cell" : "", className)}>
      {children}
    </div>
  );
});

export default ActiveCell;
