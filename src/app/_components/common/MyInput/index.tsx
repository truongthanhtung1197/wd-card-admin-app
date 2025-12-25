import * as React from "react";

import { cn } from "@/utils/common.util";

import Text from "../Text";

interface MyInputProps {
  label?: string;
  name?: string;
  isRequired?: boolean;
  classNames?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  endContent?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = ({
  label,
  name,
  isRequired,
  classNames,
  endContent,
  inputRef,
  onBlur,
  onChange,
  ...inputProps
}: MyInputProps) => {
  return (
    <div
      className={cn(
        "h-[60px] w-full rounded-lg border border-neutral-stroke-light px-4 py-2 hover:border-brand-primary",
        classNames,
      )}
    >
      <label htmlFor={`input-${name}`} className="flex h-5 gap-1">
        <Text variant="body3-regular">{label}</Text>{" "}
        {isRequired && <span className="text-accent-error">*</span>}
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={`input-${name}`}
          {...inputProps}
          className="!underline-none h-6 w-full outline-none"
          onBlur={onBlur}
          onChange={onChange}
        />
        {endContent}
      </div>
    </div>
  );
};

export default MyInput;
