import React, { memo, useState } from "react";

import { cn } from "@/utils/common.util";
import { Input, InputProps } from "@nextui-org/input";

import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

interface MyInputProps extends InputProps {
  className?: string;
  isShowIcon?: boolean;
  min?: number;
  max?: number;
  classNameInputWrapper?: string;
}

function MyInputNumber({ className = "", onChange, value, isShowIcon = true, min = 1, max = 999999, classNameInputWrapper = "", ...inputProps }: MyInputProps) {
  const [internalValue, setInternalValue] = useState<string>(String(value ?? "1"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");

    if (newValue === "" || (newValue !== "" && Number(newValue) < min)) {
      newValue = String(min);
    } else if (Number(newValue) > max) {
      newValue = String(max);
    }

    setInternalValue(newValue);

    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      });
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(Number(internalValue) + 1, max);
    setInternalValue(String(newValue));
    if (onChange) {
      onChange({
        target: { value: String(newValue) },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(internalValue) - 1, min);
    setInternalValue(String(newValue));
    if (onChange) {
      onChange({
        target: { value: String(newValue) },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={cn(className, "flex items-center h-full")}>
      {isShowIcon && (
        <span
          onClick={handleDecrement}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full cursor-pointer",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Number(internalValue) <= min && "opacity-50 cursor-not-allowed"
          )}
        >
          <MinusIcon size="16" />
        </span>
      )}
      <Input
        radius="none"
        type="text"
        value={internalValue}
        onChange={handleChange}
        classNames={{
          base: "h-full text-center",
          input: [
            "bg-transparent h-full text-center",
            "text-black/90 dark:text-white/90 font-quicksand font-medium text-base",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent h-full",
          inputWrapper: [
            "h-full w-20",
            "bg-white",
            "border",
            "border-neutral-stroke-light",
            "hover:!bg-white",
            "hover:!border-brand-primary",
            "group-data-[focus=true]:bg-white",
            "group-data-[focus=true]:border-brand-primary",
            "!shadow-none",
            "transition-colors duration-200",
            classNameInputWrapper,
          ],
        }}
        {...inputProps}
      />
      {isShowIcon && (
        <span
          onClick={handleIncrement}
          className={cn(
            "flex items-center justify-center w-8 h-full cursor-pointer",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Number(internalValue) >= max && "opacity-50 cursor-not-allowed"
          )}
        >
          <PlusIcon size="16" fill="#000" />
        </span>
      )}
    </div>
  );
}

export default memo(MyInputNumber);
