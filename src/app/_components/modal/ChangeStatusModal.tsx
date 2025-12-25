import React, { memo } from "react";
import { useTranslations } from "next-intl";

import MyButton from "../common/MyButton";
import MyModal from "../common/MyModal";
import Text from "../common/Text";
import { LocaleLink } from "../LocaleLink";

interface ChangeStatusModalProps {
  onCancel: () => void;
  funcConfirm?: () => void;
  linkRedirectAfterConfirm?: string;
}

const ChangeStatusModal = memo((props: ChangeStatusModalProps) => {
  const t = useTranslations("Service.modal.changeStatus");

  return (
    <MyModal
      size="md"
      isOpen={true}
      onClose={props.onCancel}
      header={t("title")}
      body={
        <Text variant="body1-regular" className="mb-6 mt-5">
          {t("message")}
        </Text>
      }
      footer={
        <div className="flex justify-end gap-3">
          <MyButton bType="neutral" bSize="small" onClick={props.onCancel}>
            {t("cancel")}
          </MyButton>
          {props.linkRedirectAfterConfirm ? (
            <LocaleLink href={props.linkRedirectAfterConfirm}>
              <MyButton bSize="small">{t("confirm")}</MyButton>
            </LocaleLink>
          ) : (
            <MyButton bSize="small" onClick={props.funcConfirm}>
              {t("confirm")}
            </MyButton>
          )}
        </div>
      }
    />
  );
});

export default ChangeStatusModal;
