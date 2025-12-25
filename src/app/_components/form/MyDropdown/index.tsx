"use client";
import React, { memo, ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SelectionMode,
} from "@nextui-org/react";

export type Key = string | number;

export interface Item {
  label: string;
  key: Key;
}

export interface MyDropdownProps {
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

const MyDropdown = memo(
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
  }: MyDropdownProps) => {
    return (
      <Dropdown
        isDisabled={isDisabled}
        classNames={{
          base: "!p-0",
          content: cn(
            "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !w-[140px] !min-w-[140px]",
            contentClassName,
          ),
        }}
        onOpenChange={onOpenChange}
      >
        <DropdownTrigger>
          {dropdownTrigger ? (
            dropdownTrigger
          ) : (
            <div className="m-auto h-6 w-6 cursor-pointer">
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/1721/1721936.png"}
                alt="option"
                width={20}
                height={20}
              />
            </div>
          )}
        </DropdownTrigger>
        <DropdownMenu
          selectionMode={selectionMode}
          variant={variant}
          closeOnSelect={closeOnSelect}
          aria-label="Dynamic Actions"
          items={items}
          classNames={{
            base: "!p-0 ",
          }}
          itemClasses={{
            base: [
              "!rounded-none",
              "!py-3 !px-4",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-brand-super-light",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
          onAction={onAction}
        >
          {(item) => (
            <DropdownItem key={item.key}>
              <p className="text-base font-medium">{item.label}</p>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  },
);

export default MyDropdown;
