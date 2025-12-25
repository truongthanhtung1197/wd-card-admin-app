"use client";
import React, { memo } from "react";

import { cn } from "@/utils/common.util";
import { Button, ButtonProps } from "@nextui-org/react";

import LoadingIcon from "../../icons/LoadingIcon";

type BType = "primary" | "secondary" | "neutral" | "ghost";
type BSize = "medium" | "small" | "xs" | "sm";
interface MyButtonProps extends ButtonProps {
  bSize?: BSize;
  bType?: BType;
}
const MyButton = memo(
  ({
    children,
    className,
    variant,
    bSize = "medium",
    bType = "primary",
    ...props
  }: MyButtonProps) => {
    return (
      <Button
        {...props}
        disableRipple
        size="lg"
        variant={
          bType === "secondary" || bType === "neutral" ? "bordered" : undefined
        }
        spinner={<LoadingIcon />}
        className={cn(
          " !px-3 font-medium",
          bSize === "sm" &&
            "!h-7 min-w-[60px] !rounded-[4px] text-[14px]/[16px]",
          bSize === "medium" &&
            "!h-11 min-w-[100px] !rounded-[8px] text-[16px]/[20px]",
          bSize === "small" &&
            "!h-10 min-w-[100px] !rounded-[8px] text-[16px]/[20px]",
          bSize === "xs" &&
            "!h-7 min-w-[80px] !rounded-[4px] text-[14px]/[16px]",
          bType === "primary" &&
            (props.disabled
              ? "bg-brand-super-light text-white"
              : "bg-brand-primary text-white hover:bg-brand-bold-shade hover:!opacity-100"),
          bType === "secondary" &&
            (props.disabled
              ? "border border-brand-super-light bg-white text-brand-super-light"
              : "border border-brand-primary bg-white text-brand-primary hover:bg-brand-super-light hover:!opacity-100"),
          bType === "neutral" &&
            (props.disabled
              ? "border border-neutral-stroke-light bg-neutral-surface text-neutral-element-tertiary"
              : "border border-brand-primary bg-white text-neutral-element-primary hover:bg-neutral-surface hover:text-neutral-element-primary hover:!opacity-100"),
          bType === "ghost" &&
            (props.disabled
              ? "bg-neutral-surface text-neutral-element-tertiary"
              : "bg-transparent text-neutral-element-primary hover:bg-neutral-stroke-light hover:text-neutral-element-primary hover:!opacity-100"),
          className,
        )}
      >
        {children}
      </Button>
    );
  },
);

export default MyButton;
