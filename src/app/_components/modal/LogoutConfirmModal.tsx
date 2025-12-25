import React, { memo } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import MyButton from "../common/MyButton";
import Text from "../common/Text";

interface LogoutConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <Text variant="body1-emphasized">Confirm Logout</Text>
            </ModalHeader>
            <ModalBody>
              <Text variant="body1-regular">
                Are you sure you want to logout?
              </Text>
            </ModalBody>
            <ModalFooter>
              <MyButton bType="neutral" bSize="small" onClick={onClose}>
                <Text variant="button-small">Cancel</Text>
              </MyButton>
              <MyButton bSize="small" onClick={onConfirm}>
                <Text
                  variant="button-small"
                  className="text-neutral-text-button"
                >
                  Confirm
                </Text>
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(LogoutConfirmModal);
