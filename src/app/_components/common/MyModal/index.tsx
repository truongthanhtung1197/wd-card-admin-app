"use client";
import React, { memo, ReactNode } from "react";

import { cn } from "@/utils/common.util";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import BackIcon from "../../icons/BackIcon";

const getMySize = (size: ModalSize) => {
  switch (size) {
    case "se":
      return "!max-w-[300px]";
    case "5xl":
      return "!max-w-[1000px]";
    case "6xl":
      return "!max-w-[1300px]";
    case "sm":
      return "!max-w-[400px]";
    case "md":
      return "!max-w-[480px]";
    case "lg":
      return "!max-w-[520px]";
    case "2xl":
      return "!max-w-[600px]";
    case "3xl":
      return "!max-w-[640px]";
    case "4xl":
      return "!max-w-[820px]";
    case "max":
      return "!max-w-[1440px]";
    // define other your size
    default:
      return "";
  }
};

export type ModalSize =
  | "se"
  | "5xl"
  | "xs" // 320px (used)
  | "sm"
  | "md"
  | "lg" // 512px
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "6xl"
  | "full"
  | "max"
  | undefined;

const MyModal = memo(
  ({
    isOpen = false,
    onClose,
    header,
    body,
    footer,
    size,
    onBack,
    isShowBack = false,
    classNameBody = "",
    onOpenChange,
  }: {
    isOpen?: boolean;
    onClose?: () => void;
    header?: string | ReactNode;
    body?: string | ReactNode;
    footer?: string | ReactNode;
    size?: ModalSize;
    onBack?: () => void;
    isShowBack?: boolean;
    classNameBody?: string;
    onOpenChange?: () => void;
  }) => {
    return (
      <Modal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onClose={onClose}
        size={size as any}
        classNames={{
          body: "!py-0",
          base: cn(getMySize(size)),
          closeButton: "!top-5 !right-5 center",
          backdrop: "!bg-black/50",
        }}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className=" flex justify-center !px-5 !py-5">
            {isShowBack && (
              <Button
                variant="light"
                className="absolute left-[20px] top-[22px] !size-6 !min-w-6 rounded-full hover:!bg-transparent"
                onClick={onBack}
                isIconOnly
              >
                <BackIcon size="24" />
              </Button>
            )}
            {header}
          </ModalHeader>
          <ModalBody className={classNameBody}>
            {body}
            <div id="my-modal-container" />
          </ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
);

export default MyModal;
