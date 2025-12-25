"use client";
import React, { memo } from "react";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";

import BackIcon from "../../icons/BackIcon";

const SetupSubHeader = memo(
  ({
    label,
    className,
    isBack = false,
  }: {
    label?: string | React.ReactNode;
    className?: string;
    isBack?: boolean;
  }) => {
    const router = useLocaleRouter();
    return (
      <div className="row gap-2">
        {isBack && (
          <div
            className="center size-10 cursor-pointer"
            onClick={() => router.back()}
          >
            <BackIcon />
          </div>
        )}
        <h3
          className={cn(
            "sticky top-0 z-40 flex h-[88px] items-center bg-neutral-surface",
            className,
          )}
        >
          {label}
        </h3>
      </div>
    );
  },
);

export default SetupSubHeader;
