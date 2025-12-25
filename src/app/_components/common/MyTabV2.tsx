import React, { memo } from "react";

import { cn } from "@/utils/common.util";

export interface TabV2 {
  key: string;
  label: string;
  value?: any;
}
interface MyTabV2Props {
  currentTab: Partial<TabV2>;
  onChangeTab: (tab: TabV2) => void;
  tabs: TabV2[];
}

const MyTabV2 = memo(({ currentTab, onChangeTab, tabs = [] }: MyTabV2Props) => {
  return (
    <div className="row flex-wrap items-start gap-3">
      {tabs?.map((tab) => {
        return (
          <button
            type="button"
            onClick={() => onChangeTab(tab)}
            key={tab?.label}
            className={cn(
              "center h-10 cursor-pointer divide-solid rounded-3xl border px-4",
              currentTab.key === tab.key
                ? "border-neutral-element-primary"
                : "border-neutral-stroke-light",
            )}
          >
            <p
              className={cn(
                "text-base font-medium text-neutral-element-primary",
              )}
            >
              {tab?.label}
            </p>
          </button>
        );
      })}
    </div>
  );
});

export default MyTabV2;
