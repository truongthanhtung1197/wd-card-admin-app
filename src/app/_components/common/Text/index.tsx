import { FunctionComponent, PropsWithChildren } from "react";

import { cn } from "@/utils/common.util";

interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "figure-medium"
    | "figure-small"
    | "body1-regular"
    | "body1-emphasized"
    | "body1-link"
    | "body2-regular"
    | "body2-emphasized"
    | "body2-link"
    | "body3-regular"
    | "body3-emphasized"
    | "button-medium"
    | "button-small"
    | "button-xsmall";
  className?: string;
  onClick?: () => void;
  textRef?: React.RefObject<HTMLDivElement>;
}

const Text: FunctionComponent<TextProps & PropsWithChildren> = ({
  className,
  variant,
  children,
  onClick,
  textRef,
}) => {
  switch (variant) {
    default:
      return (
        <span ref={textRef} className={className} onClick={onClick}>
          {children}
        </span>
      );
    case "h1": {
      return (
        <h1
          onClick={onClick}
          className={cn(
            "font-quicksand text-[56px]/[58px] text-primary",
            className,
          )}
        >
          {children}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2
          onClick={onClick}
          className={cn(
            "font-quicksand text-[44px]/[44px] text-primary",
            className,
          )}
        >
          {children}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3
          onClick={onClick}
          className={cn(
            "font-quicksand text-[28px]/[32px] text-primary",
            className,
          )}
        >
          {children}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4
          onClick={onClick}
          className={cn(
            "font-quicksand text-[24px]/[28px] tracking-[0.24px] text-primary",
            className,
          )}
        >
          {children}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5
          onClick={onClick}
          className={cn(
            "font-quicksand text-[20px]/[24px] tracking-[0.4px] text-primary",
            className,
          )}
        >
          {children}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6
          onClick={onClick}
          className={cn(
            "font-quicksand text-[14px]/[14px] tracking-[0.28px] text-primary",
            className,
          )}
        >
          {children}
        </h6>
      );
    }
    case "figure-medium": {
      return (
        <span
          onClick={onClick}
          className={cn(
            "font-quicksand text-sm/[24px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </span>
      );
    }
    case "figure-small": {
      return (
        <span
          onClick={onClick}
          className={cn(
            "font-quicksand text-[12px]/[20px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </span>
      );
    }
    case "body1-regular": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "font-quicksand text-lg font-medium text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body1-emphasized": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "font-quicksand text-lg font-bold text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body1-link": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "w-fit cursor-pointer border-b border-accent-link font-quicksand text-lg font-medium text-accent-link",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body2-regular": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "font-quicksand text-base font-medium text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body2-emphasized": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "font-quicksand text-base font-bold text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body2-link": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "w-fit cursor-pointer border-b border-accent-link font-quicksand text-base font-medium text-accent-link",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body3-regular": {
      return (
        <p
          ref={textRef}
          onClick={onClick}
          className={cn(
            "font-quicksand text-sm/[20px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "body3-emphasized": {
      return (
        <p
          onClick={onClick}
          className={cn(
            "font-quicksand text-sm/[20px] font-bold text-primary",
            className,
          )}
        >
          {children}
        </p>
      );
    }
    case "button-medium": {
      return (
        <span
          onClick={onClick}
          className={cn(
            "font-quicksand text-lg/[24px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </span>
      );
    }
    case "button-small": {
      return (
        <span
          onClick={onClick}
          className={cn(
            "font-quicksand text-base/[20px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </span>
      );
    }
    case "button-xsmall": {
      return (
        <span
          onClick={onClick}
          className={cn(
            "font-quicksand text-sm/[16px] font-medium text-primary",
            className,
          )}
        >
          {children}
        </span>
      );
    }
  }
};

export default Text;
