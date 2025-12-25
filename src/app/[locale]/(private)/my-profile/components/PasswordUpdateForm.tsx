import React from "react";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import { Divider } from "@nextui-org/react";

import { usePasswordUpdateSchema } from "../schemas/passwordUpdateSchema";
import { FormValues } from "../useLogic";

import { Form, Formik, FormikProps } from "formik";

interface PasswordUpdateFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  initialFormValues: FormValues;
}

const PasswordUpdateForm = ({
  onSubmit,
  isLoading,
  initialFormValues,
}: PasswordUpdateFormProps) => {
  const t = useTranslations("MyProfile.password");
  const passwordUpdateSchema = usePasswordUpdateSchema();
  return (
    <div className="my-5">
      <Formik
        initialValues={initialFormValues}
        validationSchema={passwordUpdateSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props: FormikProps<FormValues>) => {
          const { validateField } = props;
          return (
            <Form className="mx-auto">
              <MyCard
                label={
                  <div className="row w-full justify-between">
                    <h5>{t("title")}</h5>
                  </div>
                }
              >
                <div className="flex flex-col gap-y-5">
                  <div className="field">
                    <TextInput
                      label={t("oldPassword")}
                      name="oldPassword"
                      type="password"
                      onBlur={() => {
                        validateField("oldPassword");
                      }}
                    />
                  </div>
                  <div className="field">
                    <TextInput
                      label={t("newPassword")}
                      name="newPassword"
                      type="password"
                      onBlur={() => {
                        validateField("newPassword");
                      }}
                    />
                  </div>
                  <div className="field">
                    <TextInput
                      onBlur={() => {
                        validateField("confirmPassword");
                      }}
                      label={t("confirmPassword")}
                      name="confirmPassword"
                      type="password"
                    />
                  </div>
                </div>

                <>
                  <Divider className="my-5 bg-neutral-stroke-light" />
                  <div className="row sticky bottom-0 z-50 w-full justify-end gap-3">
                    <MyButton
                      bSize="small"
                      type="submit"
                      disabled={isLoading}
                      isLoading={isLoading}
                    >
                      {t("save")}
                    </MyButton>
                  </div>
                </>
              </MyCard>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PasswordUpdateForm; 