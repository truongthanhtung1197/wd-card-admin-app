import React, { memo, useCallback } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import InfiniteScroll from "react-infinite-scroll-component";

import MyInput from "@/app/_components/form/MyInput";
import SearchIcon from "@/app/_components/icons/SearchIcon";
import { useVisibility } from "@/hook";
import { cn } from "@/utils/common.util";

import SearchResultItem from "./SearchResultItem";

import { debounce } from "lodash";

type SearchableSelectProps<T> = {
  limit: number;
  setLimit: (limit: number) => void;
  setSearch: (search?: string) => void;
  setValueSelected: (value: T | null) => void;
  valueSelected: T | null;
  data?: {
    data: T[];
    total: number;
  };
  isLoading: boolean;
  renderItem?: ({
    item,
    onClick,
    onRemove,
  }: {
    item?: T;
    onClick?: (value?: T | null) => void;
    onRemove?: () => void;
  }) => React.ReactNode;
  placeholder?: string;
  inputClassname?: string;
  onBlur?: () => void;
  onRemoveSelected?: () => void;
  wrapClassName?: string;
};

function SearchableSelect<T>({
  limit,
  setLimit,
  setSearch,
  setValueSelected,
  valueSelected,
  data,
  isLoading,
  renderItem,
  placeholder = "Chọn domain",
  inputClassname,
  onBlur,
  onRemoveSelected,
  wrapClassName,
}: SearchableSelectProps<T>) {
  const { isVisible, hide, show } = useVisibility();

  const ref = useDetectClickOutside({
    onTriggered: () => {
      hide();
    },
  });

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      setLimit(20);
    }, 500),
    [],
  );

  const handleSelected = useCallback(
    (data: any) => {
      setValueSelected(data);
      hide();
    },
    [setValueSelected, hide],
  );

  return (
    <div className={wrapClassName}>
      <div className="row gap-3">
        <div className="relative w-full" ref={ref}>
          {valueSelected ? (
            renderItem ? (
              renderItem({
                item: valueSelected,
                onRemove: () => {
                  setSearch?.("");
                  setValueSelected(null);
                  onRemoveSelected?.();
                },
              })
            ) : (
              <SearchResultItem
                data={valueSelected}
                onRemove={() => {
                  setValueSelected(null);
                  onRemoveSelected?.();
                }}
              />
            )
          ) : (
            <MyInput
              endContent={<SearchIcon />}
              className={cn("h-[44px] !w-full", inputClassname)}
              placeholder={placeholder}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => show()}
              onBlur={onBlur}
              autoComplete="off"
            />
          )}
          {isVisible && (
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={data?.data?.length || 0}
              next={() => setLimit(limit + 20)}
              hasMore={(data?.total || 0) > (data?.data?.length || 0)}
              loader={isLoading && <p>Loading...</p>}
            >
              <div
                id="scrollableDiv"
                className="col absolute left-0 right-0 top-[calc(100%+4px)] z-50 h-[304px] w-full overflow-y-auto rounded-lg border border-neutral-stroke-bold bg-white shadow-lg"
              >
                {data?.data?.map((v, index) => {
                  const key =
                    typeof v === "object" && v !== null && "id" in v
                      ? (v as any).id
                      : index;
                  return renderItem ? (
                    renderItem({
                      item: v,
                      onClick: () => handleSelected(v),
                    })
                  ) : (
                    <SearchResultItem
                      data={v}
                      key={key}
                      onClick={() => handleSelected(v)}
                    />
                  );
                })}
                {!data?.data?.length && !isLoading && (
                  <div className="center h-full">
                    <p className="text-neutral-element-secondary">
                      Không có dữ liệu
                    </p>
                  </div>
                )}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(SearchableSelect);
