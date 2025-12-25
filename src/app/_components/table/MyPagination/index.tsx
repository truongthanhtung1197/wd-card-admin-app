"use client";
import React, { memo, ReactNode, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react";

import MyLink from "../../common/MyLink";
import MySelect from "../../form/MySelect";
import ChevronIcon from "../../icons/ChevronIcon";
import LinkIcon from "../../icons/LinkIcon";

interface Props {
  total: number;
  isLeadPage?: boolean;
  isShowPageSize?: boolean;
  totalItemRender?: ReactNode;
  scrollToTopWhenChangePage?: boolean;
  customPage?: number;
  customLimit?: number;
  setCustomPage?: (page: number) => void;
  setCustomLimit?: (limit: number) => void;
}

const MyPagination = memo(
  ({
    customPage,
    customLimit,
    setCustomPage,
    setCustomLimit,
    total,
    isLeadPage,
    isShowPageSize = true,
    totalItemRender,
    scrollToTopWhenChangePage = true,
  }: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useLocaleRouter();

    const page = customPage ? customPage : searchParams.get("page") || 1;
    const limit = customLimit
      ? String(customLimit)
      : searchParams.get("limit") || "10";

    const pageSize = Math.ceil(total / Number(limit));

    const handleChangePagination = useCallback(
      (newPage: any) => {
        if (setCustomPage) {
          setCustomPage(newPage);
        } else {
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage);
          push(`${pathname}?${params.toString()}`, {
            scroll: scrollToTopWhenChangePage,
          });
        }
      },
      [pathname, searchParams, setCustomPage],
    );
    const handleChangePageSize = useCallback(
      (newPageSize: string) => {
        if (setCustomLimit) {
          setCustomLimit(Number(newPageSize));
        } else {
          const params = new URLSearchParams(searchParams);
          params.set("limit", newPageSize);
          params.set("page", "1");
          push(`${pathname}?${params.toString()}`, {
            scroll: scrollToTopWhenChangePage,
          });
        }
      },
      [pathname, searchParams, setCustomLimit],
    );

    const renderItem = ({
      ref,
      key,
      value,
      isActive,
      onNext,
      onPrevious,
      setPage,
      className,
    }: PaginationItemRenderProps) => {
      const isPrevious = Number(page) !== 1;
      const isNext = Number(page) !== pageSize;
      if (value === PaginationItemType.NEXT) {
        return (
          <button
            key={key}
            className={cn(
              className,
              "h-7 w-7 min-w-7 shadow-none hover:border-b hover:!border-b-neutral-element-primary",
            )}
            onClick={onNext}
            disabled={!isNext}
          >
            <div className="rotate-180">
              <ChevronIcon color={isNext ? "#1A1A1A" : "#A3A3A3"} />
            </div>
          </button>
        );
      }

      if (value === PaginationItemType.PREV) {
        return (
          <button
            key={key}
            className={cn(
              className,
              "h-7 w-7 min-w-7 shadow-none hover:border-b hover:!border-b-neutral-element-primary",
            )}
            onClick={onPrevious}
            disabled={!isPrevious}
          >
            <ChevronIcon color={isPrevious ? "#1A1A1A" : "#A3A3A3"} />
          </button>
        );
      }

      if (value === PaginationItemType.DOTS) {
        return (
          <button key={key} className={cn(className, "shadow-none")}>
            ...
          </button>
        );
      }

      return (
        <button
          ref={ref}
          key={key}
          className={cn(
            className,
            "!min-w-fit bg-transparent p-1 text-sm font-medium text-primary shadow-none",
            isActive && "!border-b !border-primary",
          )}
          onClick={() => setPage(value)}
        >
          {value}
        </button>
      );
    };

    return (
      <div className={cn("row-between mt-3")}>
        <div>
          {isLeadPage ? (
            <MyLink
              href={ROUTERS.LEAD_RECENT_DELETE}
              isCacheCurrentRoute
              className="row gap-1"
            >
              <p className="border-b border-accent-link text-accent-link">
                View Recently deleted
              </p>
              <LinkIcon />
            </MyLink>
          ) : (
            totalItemRender || (
              <p className="text-base font-medium ">Total {total} items</p>
            )
          )}
        </div>
        <div className="row gap-3">
          <Pagination
            total={pageSize}
            page={Number(page)}
            onChange={handleChangePagination}
            disableCursorAnimation
            isCompact
            showControls
            initialPage={1}
            renderItem={renderItem}
            classNames={{
              wrapper: "h-7 gap-3 shadow-none !min-w-fit",
              item: "h-7 w-fit rounded-none bg-transparent",
              cursor: "",
              base: "m-0",
            }}
          />
          {isShowPageSize && (
            <div className="min-w-[180px]">
              <MySelect
                options={PageSizes}
                selectedKeys={new Set([limit])}
                onChange={(e) => handleChangePageSize(e.target.value)}
                triggerClassName="hover:!bg-white data-[open=true]:!border-brand-primary"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);

const PageSizes = [
  { key: "10", label: "10 items/page" },
  { key: "25", label: "25 items/page" },
  { key: "50", label: "50 items/page" },
  { key: "100", label: "100 items/page" },
];
export default MyPagination;
