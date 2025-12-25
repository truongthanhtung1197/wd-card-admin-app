"use client";
import React, { memo, useState } from "react";

import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import InfoIcon from "@/app/_components/icons/InfoIcon";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface TelegramIdGuideModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  label?: string;
}

const TelegramIdGuideModal: React.FC<TelegramIdGuideModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  label = "Nhập Telegram Group ID để nhận thông báo khi đơn hàng được cập nhập",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };
  const handleOpen = () => {
    if (externalOnClose) {
      // If external control, do nothing (parent should handle)
      return;
    } else {
      setInternalIsOpen(true);
    }
  };

  const renderModal = () => (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center !px-5 !py-5">
              <Text variant="body1-emphasized">Hướng dẫn lấy Telegram ID</Text>
            </ModalHeader>
            <ModalBody className="!px-5 !py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Text variant="body1-regular" className="font-medium">
                    Để lấy Telegram ID của group, vui lòng làm theo các bước
                    sau:
                  </Text>
                </div>

                <div className="space-y-3 rounded-lg bg-neutral-surface p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-white">
                      1
                    </div>
                    <div className="flex-1">
                      <Text variant="body1-regular">
                        Tạo một <strong>supergroup</strong> trên Telegram
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-white">
                      2
                    </div>
                    <div className="flex-1">
                      <Text variant="body1-regular">
                        Thêm bot <strong>@crm_69vn_order_bot</strong> vào group
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-white">
                      3
                    </div>
                    <div className="flex-1">
                      <Text variant="body1-regular">
                        Gõ lệnh{" "}
                        <code className="rounded bg-neutral-stroke-light px-2 py-1 font-mono text-sm">
                          /id
                        </code>{" "}
                        trong group
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-white">
                      4
                    </div>
                    <div className="flex-1">
                      <Text variant="body1-regular">
                        Bot sẽ trả về thông tin dạng:
                      </Text>
                      <div className="mt-2 rounded bg-white p-3 font-mono text-sm">
                        <div>Group chat ID: -1234567899</div>
                        <div>Type: supergroup</div>
                        <div>Thread ID: 20</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-white">
                      5
                    </div>
                    <div className="flex-1">
                      <Text variant="body1-regular">
                        Sau đó, lấy <strong>Group chat ID</strong> và{" "}
                        <strong>Thread ID</strong>(nếu có) để nhập vào ô
                        Telegram ID ở trên.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <MyButton
                bType="primary"
                bSize="small"
                onClick={handleClose}
                radius="sm"
              >
                Đã hiểu
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  // If external control (isOpen/onClose provided), only render modal
  if (externalIsOpen !== undefined || externalOnClose) {
    return renderModal();
  }

  // Otherwise render label + button + modal
  return (
    <>
      <div className="flex items-center gap-2">
        <Text
          variant="body2-regular"
          className="text-neutral-element-secondary"
        >
          {label}
        </Text>
        <button
          type="button"
          onClick={handleOpen}
          className="flex items-center justify-center rounded-full p-1 text-neutral-element-secondary transition-colors hover:bg-neutral-stroke-light hover:text-brand-primary"
          title="Hướng dẫn lấy Telegram ID"
        >
          <InfoIcon size={18} color="currentColor" />
        </button>
      </div>
      {renderModal()}
    </>
  );
};

export default memo(TelegramIdGuideModal);
