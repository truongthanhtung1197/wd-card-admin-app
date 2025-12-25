import React, { memo } from "react";

import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import { Admin } from "@/model/Admin.mode";
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
  user?: Admin;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center !px-5 !py-5">
              <Text variant="body1-emphasized">Xóa sản phẩm</Text>
            </ModalHeader>
            <ModalBody>
              <Text variant="body1-regular">
                Bạn có chắc chắn muốn xóa sản phẩm này không?
              </Text>
            </ModalBody>
            <ModalFooter>
              <MyButton
                bType="neutral"
                bSize="small"
                onClick={onClose}
                radius="sm"
                disabled={isLoading}
              >
                Hủy
              </MyButton>
              <MyButton
                bSize="small"
                className="bg-accent-error"
                onClick={onConfirm}
                radius="sm"
                isLoading={isLoading}
              >
                Xóa
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(DeleteConfirmModal);
