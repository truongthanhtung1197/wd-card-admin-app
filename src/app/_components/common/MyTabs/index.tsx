"use client";
import React, { memo, ReactNode, useMemo } from "react";

import { cn } from "@/utils/common.util";
import { Tab, Tabs } from "@nextui-org/react";

import { LocaleLink } from "../../LocaleLink";
import Text from "../Text";

export interface Tabs {
  key: string;
  label: string | ReactNode;
  component?: ReactNode;
  href?: string;
  hidden?: boolean;
  disabled?: boolean;
}

type Variant = "v1" | "v2";
const getClassNames = ({
  variant,
  tabListCln,
}: {
  variant: Variant;
  tabListCln?: string;
}) => {
  switch (variant) {
    case "v1":
      return {
        base: "w-full rounded-lg bg-white p-5 pb-0 border-[0.5px] divide-solid border-neutral-stroke-light overflow-x-auto",
        tabList: cn("gap-5 w-full relative rounded-none p-0", tabListCln),
        cursor: "w-full bg-brand-primary",
        tab: "max-w-fit px-0 h-9 pb-3",
        tabContent: "group-data-[selected=true]:text-[#06b6d4] p-0",
        panel: "p-0",
      };
    case "v2":
      return {
        base: "w-full h-[38px] border-neutral-stroke-light",
        tabList: cn(
          "gap-5 w-full relative rounded-none p-0 border-b border-neutral-stroke-light",
          tabListCln,
        ),
        cursor: "w-full bg-brand-primary",
        tab: "max-w-fit px-0 h-9",
        tabContent: "group-data-[selected=true]:text-[#06b6d4] p-0",
        panel: "p-0",
      };
    default:
      break;
  }
};

const MyTabs = memo(
  ({
    tabs = [],
    disabledKeys = [],
    defaultSelectedKey,
    selectedKey,
    variant = "v1",
    onSelectionChange,
    tabListCln,
    scroll = true,
  }: {
    tabs: Tabs[];
    disabledKeys?: string[];
    defaultSelectedKey?: string;
    selectedKey?: string;
    variant?: Variant;
    onSelectionChange?: (key: string) => void;
    tabListCln?: string;
    scroll?: boolean;
  }) => {
    const tabsData = useMemo(() => {
      return tabs?.filter((item) => !item?.hidden);
    }, [tabs]);
    return (
      <Tabs
        variant="underlined"
        aria-label="Tabs variants"
        classNames={getClassNames({ variant, tabListCln })}
        disabledKeys={disabledKeys}
        onSelectionChange={(key) => onSelectionChange?.(key as string)}
        defaultSelectedKey={defaultSelectedKey}
        selectedKey={selectedKey}
      >
        {tabsData?.map((item) => (
          <Tab
            key={item?.key}
            title={
              <div className={cn("flex", item?.disabled && "opacity-50")}>
                {item?.href && !item?.disabled ? (
                  <LocaleLink href={item.href || ""} scroll={scroll}>
                    <Text variant="h5">{item.label}</Text>
                  </LocaleLink>
                ) : (
                  <Text variant="h5">{item.label}</Text>
                )}
              </div>
            }
          >
            {item?.component}
          </Tab>
        ))}
      </Tabs>
    );
  },
);

export default MyTabs;
