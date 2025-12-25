import React, { memo, useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";

import ArrowDownIcon from "../../icons/ArrowDownIcon";

const getClassNames = ({
  variant,
  triggerClassName,
}: {
  variant: MySelectVariant;
  triggerClassName?: string;
}) => {
  switch (variant) {
    case "v1":
      return {
        trigger: cn(
          "bg-white border-1 border-neutral-stroke-light data-[disabled=true]:bg-neutral-on-surface-2 !rounded-[8px] hover:!border-brand-primary active:!border-brand-primary font-quicksand shadow-none !text-base",
          triggerClassName,
        ),
        listbox: "!px-0 py-2",
        value: "!text-base",
        label: "!text-base",
      };
    case "v2":
      return {
        trigger: cn(
          "bg-white border-1 border-neutral-stroke-light !rounded-full hover:!border-brand-primary active:!border-brand-primary font-quicksand shadow-none !text-base",
          triggerClassName,
        ),
        listbox: "!px-0 py-2",
        value: "!text-base",
        label: "!text-base",
      };

    default:
      break;
  }
};

export type MySelectOption = { key: string | number; label: string | number };

export type MySelectVariant = "v1" | "v2";

interface MyInputProps extends Omit<SelectProps, "children"> {
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  options: MySelectOption[];
  myVariant?: MySelectVariant;
  triggerClassName?: string;
  param: string;
  defaultValue?: string; // Thêm thuộc tính defaultValue
}

function MySingleSelectSearch({
  options,
  classNames,
  myVariant = "v1",
  triggerClassName,
  param,
  defaultValue, // Nhận giá trị defaultValue
  ...restProps
}: MyInputProps) {
  const searchParams = useSearchParams();
  const key = searchParams.get(param) || defaultValue; // Sử dụng defaultValue nếu không có giá trị trong URL
  const pathname = usePathname();
  const router = useLocaleRouter();

  const onSelect = useCallback(
    (key: any) => {
      const current = new URLSearchParams(searchParams);
      current.set(param, key?.target.value);
      router.push(`${pathname}?${current.toString()}`);
    },
    [param, pathname, router, searchParams],
  );

  const defaultSelectedKeys = useMemo(() => {
    return key ? [key] : [];
  }, [key]);

  return (
    <Select
      aria-label="MySelect"
      classNames={getClassNames({ variant: myVariant, triggerClassName })}
      listboxProps={{
        classNames: {
          // list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
        },
        itemClasses: {
          base: [
            "rounded-none !px-4 !py-3 border-y-1 border-transparent !text-neutral-element-primary !bg-transparent",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:!bg-neutral-surface data-[hover=true]:!border-y-1 data-[hover=true]:!border-neutral-stroke-light",
            "data-[selected=true]:!bg-neutral-surface data-[selected=true]:!border-y data-[selected=true]:!border-y-neutral-stroke-light",
            "data-[pressed=true]:opacity-70",
          ],
          title: "!text-base",
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200 !p-0",
          content: "!p-0 border-small border-divider bg-background",
        },
      }}
      {...restProps}
      onChange={onSelect as any}
      items={options}
      selectedKeys={defaultSelectedKeys}
      selectorIcon={
        <div className="absolute right-4">
          <ArrowDownIcon />
        </div>
      }
      renderValue={(items) => (
        <div className="row">
          {items.map((item: any) => (
            <div key={item.key}>
              <p className="!text-base font-medium">{item.textValue}</p>
            </div>
          ))}
        </div>
      )}
    >
      {(option) => (
        <SelectItem key={option.key} hideSelectedIcon aria-label="MySelectItem">
          {option.label}
        </SelectItem>
      )}
    </Select>
  );
}

export default memo(MySingleSelectSearch);
