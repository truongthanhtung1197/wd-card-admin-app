import React, { memo, ReactNode } from "react";

import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title?: string | ReactNode;
  message?: string | ReactNode;
  btnLabel?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  title,
  message,
  btnLabel = "Xóa",
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center !px-5 !py-5">
              <Text variant="body1-emphasized">
                {title || "Bạn có chắc chắn muốn xóa?"}
              </Text>
            </ModalHeader>
            <ModalBody>
              <Text variant="body1-regular">{message || ""}</Text>
            </ModalBody>
            <ModalFooter>
              <MyButton
                bType="neutral"
                bSize="small"
                onClick={onClose}
                radius="sm"
                disabled={isLoading}
              >
                Cancel
              </MyButton>
              <MyButton
                bSize="small"
                className="bg-accent-error"
                onClick={onConfirm}
                radius="sm"
                isLoading={isLoading}
              >
                {btnLabel}
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(DeleteConfirmModal);
