import React, { memo } from "react";
import { useTranslations } from "next-intl";

import MyButton from "../../common/MyButton";
import MyModal from "../../common/MyModal";
import Text from "../../common/Text";
import { LocaleLink } from "../../LocaleLink";

interface EventModalProps {
  onCancel: () => void;
  funcConfirm?: () => void;
  linkRedirectAfterConfirm?: string;
}

const ConfirmUnsavedModal = memo((props: EventModalProps) => {
  const t = useTranslations("ConfirmUnsavedModal");

  return (
    <MyModal
      size="md"
      isOpen={true}
      onClose={props.funcConfirm}
      header={t("title")}
      body={
        <Text variant="body1-regular" className="mb-6 mt-5">
          {t("message")}
        </Text>
      }
      footer={
        <div className="flex justify-end gap-3">
          <MyButton bType="neutral" bSize="small" onClick={props.onCancel}>
            {t("buttons.keepEditing")}
          </MyButton>
          {props.linkRedirectAfterConfirm ? (
            <LocaleLink href={props.linkRedirectAfterConfirm}>
              <MyButton bSize="small">{t("buttons.leave")}</MyButton>
            </LocaleLink>
          ) : (
            <MyButton bSize="small" onClick={props.funcConfirm}>
              {t("buttons.leave")}
            </MyButton>
          )}
        </div>
      }
    />
  );
});

export default ConfirmUnsavedModal;
