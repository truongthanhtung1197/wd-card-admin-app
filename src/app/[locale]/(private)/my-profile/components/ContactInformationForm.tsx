import React from "react";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";
import { Divider } from "@nextui-org/react";

import TelegramIdGuideModal from "../../management/teams/_components/TelegramIdGuideModal";
import { contactInformationSchema } from "../schemas/contactInformationSchema";
import { FormValues } from "../useLogic";

import { Form, Formik, FormikProps } from "formik";

interface ContactInformationFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  initialFormValues: FormValues;
  bankOptions: any[];
  user: any;
  isEditMode: boolean;
  handleEditClick: () => void;
  handleCancelEdit: () => void;
  isDisabledEdit: boolean;
}

const ContactInformationForm = ({
  onSubmit,
  isLoading,
  initialFormValues,
  bankOptions,
  user,
  isEditMode,
  handleEditClick,
  handleCancelEdit,
  isDisabledEdit,
}: ContactInformationFormProps) => {
  const t = useTranslations("MyProfile");
  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  return (
    <div className="my-5">
      <Formik
        initialValues={initialFormValues}
        validationSchema={contactInformationSchema(t, user?.role?.roleName)}
        onSubmit={(values) => {
          onSubmit(values);
          handleCancelEdit();
        }}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
      >
        {(props: FormikProps<FormValues>) => {
          const { validateField } = props;
          return (
            <Form className="mx-auto">
              <MyCard
                label={
                  <div className="row w-full justify-between">
                    <h5>{t("contactInfo.title")}</h5>
                    {isEditMode ? (
                      <div className="flex justify-end gap-2">
                        <MyButton
                          bSize="small"
                          bType="secondary"
                          onClick={handleCancelEdit}
                        >
                          {t("common.cancel")}
                        </MyButton>
                      </div>
                    ) : (
                      <div className="flex cursor-pointer justify-end">
                        <MyButton
                          bSize="small"
                          bType="secondary"
                          onClick={handleEditClick}
                        >
                          {t("common.edit")}
                        </MyButton>
                      </div>
                    )}
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-5">
                  <TextInput
                    onBlur={() => {
                      validateField("phone");
                    }}
                    label={t("contactInfo.phone")}
                    name="phone"
                    disabled={isDisabledEdit}
                    editable={isEditMode}
                  />
                  <TextInput
                    label={t("contactInfo.usdt")}
                    name="usdt"
                    disabled={isDisabledEdit}
                    editable={isEditMode}
                  />
                  {admin?.role?.roleName === ADMIN_ROLE.PARTNER && (
                    <div className="col-span-2 flex flex-col gap-2">
                      <TelegramIdGuideModal />
                      <div className="flex w-full gap-2">
                        <TextInput
                          wrapperClassName="flex-1 w-full"
                          label="Telegram Group ID"
                          name="telegramId"
                          editable={isEditMode}
                        />
                        <TextInput
                          wrapperClassName="flex-1 w-full"
                          label="Telegram Thread ID"
                          name="telegramChatId"
                          editable={isEditMode}
                        />
                      </div>
                    </div>
                  )}
                  <TextInput
                    label={t("contactInfo.telegramUsername")}
                    name="telegramUsername"
                    onBlur={() => {
                      validateField("telegramUsername");
                    }}
                    disabled={isDisabledEdit}
                    editable={isEditMode}
                  />

                  <TextInput
                    label={t("contactInfo.bankNumber")}
                    name="bankNumber"
                    disabled={isDisabledEdit}
                    editable={isEditMode}
                  />
                  <TextInput
                    label={t("contactInfo.bankNameInCard")}
                    name="bankNameInCard"
                    disabled={isDisabledEdit}
                    editable={isEditMode}
                  />
                  <FSelectInput
                    label={t("contactInfo.bankName")}
                    options={bankOptions || []}
                    name="bankName"
                    isDisabled={isDisabledEdit}
                    editable={isEditMode}
                  />
                </div>

                {isEditMode && (
                  <>
                    <Divider className="my-5 bg-neutral-stroke-light" />
                    <div className="row sticky bottom-0 z-50 w-full justify-end gap-3">
                      <MyButton
                        bSize="small"
                        disabled={isLoading || isDisabledEdit}
                        isLoading={isLoading}
                        type="submit"
                      >
                        {t("common.save")}
                      </MyButton>
                    </div>
                  </>
                )}
              </MyCard>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContactInformationForm;
