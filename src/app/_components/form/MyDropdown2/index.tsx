"use client";
import React, { memo, ReactNode } from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SelectionMode,
} from "@nextui-org/react";

import Text from "../../common/Text";

export type Key = string | number;

export interface Item {
  label: string;
  key: Key;
}

export interface MyDropdown2Props {
  items: Item[];
  onOpenChange?: ((isOpen: boolean) => void) | undefined;
  onAction?: ((key: Key) => void) | undefined;
  isDisabled?: boolean;
  contentClassName?: string;
  dropdownTrigger?: ReactNode;
  closeOnSelect?: boolean;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "flat"
    | "shadow"
    | undefined;
  selectionMode?: SelectionMode;
}

const MyDropdown2 = memo(
  ({
    items,
    onAction,
    onOpenChange,
    isDisabled,
    contentClassName,
    dropdownTrigger,
    closeOnSelect,
    variant,
    selectionMode,
  }: MyDropdown2Props) => {
    return (
      <Dropdown
        classNames={{
          base: "!p-0",
          content:
            "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !w-[180px] !min-w-[180px]",
        }}
      >
        <DropdownTrigger>
          <div className="ml-auto flex !h-10 min-w-[100px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap !rounded-[8px] border border-brand-primary bg-white pl-5 pr-3 text-[16px]/[20px] text-brand-primary hover:bg-brand-super-light">
            Add Lead
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          classNames={{
            base: "!p-0 ",
          }}
          itemClasses={{
            base: [
              "!rounded-none",
              "!py-3 !px-4",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-neutral-surface",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownItem key="add-single-lead">
            <Text variant="body2-regular" className="leading-6">
              Add Single Lead
            </Text>
          </DropdownItem>
          <DropdownItem key="add-multiple-leads">
            <Text variant="body2-regular" className="leading-6">
              Add Multiple Leads
            </Text>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  },
);

export default MyDropdown2;
