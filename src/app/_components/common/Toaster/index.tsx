"use client";

import React from "react";

import { CloseIcon } from "./CloseIcon";
import { ErrorIcon } from "./ErrorIcon";
import { InfoIcon } from "./InfoIcon";
import { SuccessIcon } from "./SuccessIcon";
import { WarningIcon } from "./WarningIcon";

import { toast as ToastControl, Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast !p-0 !w-fit !h-fit !bg-transparent !border-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

interface CustomToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, message }) => {
  let Icon: React.ReactNode;

  switch (type) {
    case "success":
      Icon = <SuccessIcon />;
      break;
    case "error":
      Icon = <ErrorIcon />;
      break;
    case "warning":
      Icon = <WarningIcon />;
      break;
    case "info":
      Icon = <InfoIcon />;
      break;
    default:
      Icon = <InfoIcon />;
  }

  return (
    <div
      className={`row gap-4 rounded-lg bg-neutral-element-primary px-3 py-2 text-white`}
    >
      {Icon}
      <div className="h-6 w-[1px] flex-shrink-0 bg-neutral-element-secondary"></div>

      <p className="font-medium text-white"> {message}</p>
      <button onClick={() => ToastControl.dismiss()}>
        <CloseIcon />
      </button>
    </div>
  );
};

const toast = {
  success: (message: string, option?: any) => {
    ToastControl(<CustomToast type="success" message={message} />, {
      position: "top-right",
      ...(option ? option : {}),
    });
  },
  error: (message: string, option?: any) => {
    ToastControl(<CustomToast type="error" message={message} />, {
      position: "top-right",
      ...(option ? option : {}),
    });
  },
  warning: (message: string, option?: any) => {
    ToastControl(<CustomToast type="warning" message={message} />, {
      position: "top-right",
      ...(option ? option : {}),
    });
  },
  info: (message: string, option?: any) => {
    ToastControl(<CustomToast type="info" message={message} />, {
      position: "top-right",
      ...(option ? option : {}),
    });
  },
};

export { toast };
