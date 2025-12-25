import React, { memo } from "react";
import { useTranslations } from "next-intl";

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
  title: string;
  message: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  user,
  title,
  message,
}) => {
  const t = useTranslations("common");
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center !px-5 !py-5">
              <Text variant="body1-emphasized">{title}</Text>
            </ModalHeader>
            <ModalBody>
              <Text variant="body1-regular">
                {message}
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
                {t("cancel")}
              </MyButton>
              <MyButton
                bSize="small"
                className="bg-accent-error"
                onClick={onConfirm}
                radius="sm"
                isLoading={isLoading}
              >
                {t("delete")}
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(DeleteConfirmModal);
