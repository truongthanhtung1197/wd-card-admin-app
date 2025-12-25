import React, { memo } from "react";

import { Select, SelectItem, SelectProps } from "@nextui-org/react";

import ArrowDownIcon from "../../icons/ArrowDownIcon";
import CheckedIcon from "../../icons/CheckedIcon";
import UnCheckIcon from "../../icons/UnCheckIcon";

const classNames = {
  trigger:
    "relative bg-white border border-neutral-stroke-light hover:!border-brand-primary active:!border-brand-primary !pl-[16px] !py-2 font-quicksand !h-[40px] shadow-none rounded-3xl",
  label: "text-neutral-element-secondary font-medium text-lg font-quicksand ",
  input: "font-quicksand font-medium text-lg leading-[18px]",
  errorMessage: "text-sm font-medium text-accent-error",
  innerWrapper: "",
  value: "text-neutral-element-tertiary font-medium text-base",
  // listboxWrapper:
  //   "bg-white absolute top-[1px] border divide-solid rounded-lg border-neutral-stroke-bold shadow-[0_8px_16px_0px_rgba(0,0,0,0.08)]",
};
interface MyInputProps extends Omit<SelectProps, "children"> {
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  options: any[];
  setValueSelected: (data: any) => void;
  valueSelected: any[];
  nameSelect: string;
}

function SelectCustom({
  options,
  setValueSelected,
  valueSelected,
  nameSelect,
  ...restProps
}: MyInputProps) {

  const handleSelect = (value: any) => {
    setValueSelected(value);
  };

  return (
    <Select
      className="w-full"
      classNames={classNames}
      {...restProps}
      onChange={(e) => handleSelect(e.target.value)}
      selectorIcon={
        <div className="absolute right-4">
          <ArrowDownIcon />
        </div>
      }
      listboxProps={{
        classNames: {
          list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
        },
      }}
      renderValue={(items) => {
        return (
          <div className="row gap-3">
            {items.map((item: any, index: number) => {
              if (restProps.selectionMode === "multiple" && index === 0) {
                return (
                  <p className="text-base font-medium">
                    {items?.length + " " + nameSelect} selected
                  </p>
                );
              }
              return (
                <div className="" key={item.key}>
                  <p className="text-base font-medium">{item.textValue}</p>
                </div>
              );
            })}
          </div>
        );
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.key} hideSelectedIcon textValue={option.label}>
          <div className="row gap-3">
            {valueSelected?.includes(option.key) ? (
              <CheckedIcon />
            ) : (
              <UnCheckIcon />
            )}
            <p className="font-medium">{option.label.toUpperCase()}</p>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}

export default memo(SelectCustom);
