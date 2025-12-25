"use client";
import React, { memo, ReactNode, useCallback } from "react";

import BackIcon from "@/app/_components/icons/BackIcon";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useGetParamsPath } from "@/hook/useMyRouter";
import { cn } from "@/utils/common.util";
import { Button } from "@nextui-org/button";

const SubHeader = memo(
  ({
    label,
    description,
    isBack = false,
    goBack,
    goBackHref,
    RightHeader,
    isKeepPrevFilter,
    className,
  }: {
    label: string;
    description?: string;
    goBack?: () => void;
    goBackHref?: string;
    isBack?: boolean;
    RightHeader?: ReactNode;
    isKeepPrevFilter?: boolean;
    className?: string;
  }) => {
    const router = useLocaleRouter();
    const history = useGetParamsPath((state) => state.history);

    const onGoBack = useCallback(() => {
      if (goBack) {
        goBack();
        return;
      }
      if (goBackHref) {
        const prevQueryString = history?.[goBackHref] || "";
        router.push(goBackHref + prevQueryString);
        return;
      }
      router.back();
    }, [goBack, goBackHref, router, isKeepPrevFilter, history]);

    return (
      <div
        className={cn("sticky top-[60px] z-40 bg-neutral-surface", className)}
      >
        <div className="row-between w-full py-5">
          <div className="row">
            {isBack && (
              <Button
                variant="light"
                className="mr-4 self-start rounded-full"
                onClick={onGoBack}
                isIconOnly
              >
                <BackIcon />
              </Button>
            )}

            <div>
              <h2 className="text-left text-neutral-element-primary">
                {label}
              </h2>
              {description && (
                <p className="mt-1 text-[16px]/[24px]">{description}</p>
              )}
            </div>
          </div>

          {RightHeader && RightHeader}
        </div>
      </div>
    );
  },
);

export default SubHeader;
