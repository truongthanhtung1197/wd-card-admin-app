import React, { memo, ReactNode, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";
import { Button } from "@nextui-org/button";

import SortDecreaseIcon from "../../icons/SortDecreaseIcon";
import SortDefaultIcon from "../../icons/SortDefaultIcon";
import SortIncreaseIcon from "../../icons/SortIncreaseIcon";

interface ISorting {
  className?: string;
  children: ReactNode;
  sortKey: string;
  variant?: "default" | "white";
}

const Sorting = memo(
  ({ className, children, sortKey, variant = "default" }: ISorting) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useLocaleRouter();
    const sortBy = searchParams.get("sortBy") || "";
    const sortOrder = searchParams.get("sortOrder") || "";

    const onSorting = useCallback(
      (sortBy?: string, sortOrder?: string) => {
        const params = new URLSearchParams(searchParams);
        if (sortBy) {
          params.set("sortBy", sortBy);
        } else {
          params.delete("sortBy");
        }
        if (sortOrder) {
          params.set("sortOrder", sortOrder);
        } else {
          params.delete("sortOrder");
        }
        params.set("page", "1");
        push(`${pathname}?${params.toString()}`);
      },
      [pathname, searchParams],
    );

    const buttonVariant = "light";
    const iconClassName = variant === "white" ? "[&_svg_path]:fill-white" : "";

    return (
      <div className={cn("row gap-2", className)}>
        {children}
        {sortBy !== sortKey && (
          <Button
            isIconOnly
            radius="full"
            variant={buttonVariant}
            size="sm"
            onClick={() => onSorting(sortKey, "DESC")}
            className={cn(
              variant === "white" ? "hover:bg-white/20" : "",
              iconClassName,
            )}
          >
            <SortDefaultIcon />
          </Button>
        )}
        {sortBy === sortKey && sortOrder === "DESC" && (
          <Button
            isIconOnly
            radius="full"
            variant={buttonVariant}
            size="sm"
            onClick={() => onSorting(sortKey, "ASC")}
            className={cn(
              variant === "white" ? "hover:bg-white/20" : "",
              iconClassName,
            )}
          >
            <SortDecreaseIcon />
          </Button>
        )}
        {sortBy === sortKey && sortOrder === "ASC" && (
          <Button
            isIconOnly
            radius="full"
            variant={buttonVariant}
            size="sm"
            onClick={() => onSorting()}
            className={cn(
              variant === "white" ? "hover:bg-white/20" : "",
              iconClassName,
            )}
          >
            <SortIncreaseIcon />
          </Button>
        )}
      </div>
    );
  },
);

// Component helper để tạo sortable header cho table
interface SortableHeaderProps {
  children: ReactNode;
  sortKey: string;
  className?: string;
}

export const SortableHeader = memo(
  ({ children, sortKey, className }: SortableHeaderProps) => {
    return (
      <Sorting
        sortKey={sortKey}
        variant="white"
        className={cn("text-left", className)}
      >
        {children}
      </Sorting>
    );
  },
);

export default Sorting;
