import { memo } from "react";

import RemoveXIcon from "@/app/_components/icons/RemoveXIcon";
import { cn } from "@/utils/common.util";

const SearchResultItem = ({
  data,
  onClick,
  onRemove,
  disabled,
}: {
  data: any;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "row w-full items-center gap-3 bg-white px-6 py-2",
        onRemove
          ? "h-[44px] w-full rounded-lg border pl-2"
          : "cursor-pointer hover:bg-neutral-surface",
        disabled && "cursor-not-allowed opacity-35",
      )}
    >
      <div className="w-[calc(100%-20px)]">
        <p className="line-clamp-1 block truncate text-base font-bold text-neutral-element-primary">
          {data.name}
        </p>
      </div>
      {onRemove && (
        <div
          className="absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer"
          onClick={onRemove}
        >
          <RemoveXIcon />
        </div>
      )}
    </div>
  );
};

export default memo(SearchResultItem);
