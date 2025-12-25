import React, { ReactNode } from "react";

import { cn } from "@/utils/common.util";

const BodyBaseLayout = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={cn("base-layout bg-neutral-surface", className)}>
      {children}
    </div>
  );
};

export default BodyBaseLayout;
