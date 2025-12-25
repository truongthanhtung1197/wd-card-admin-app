import { memo } from "react";

import { cn } from "@/utils/common.util";

const Loadding = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 shrink-0 animate-spin rounded-full border-x-[2px] border-neutral-500",
        className,
      )}
    ></div>
  );
};

export default memo(Loadding);
