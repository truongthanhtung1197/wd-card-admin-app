"use client";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";

import SubCreatingHeader from "../_components/SubCreatingHeader";
import { FormValues, SetPassword } from "./SetPassword.logic";

import { Formik, FormikProps } from "formik";

export type CreateOrEditUserVariant = "edit" | "create";

const CreateAdminView = () => {
  const t = useTranslations("CreateAdmin");
  const {
    onSubmit,
    isLoading,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
  } = SetPassword();

  return (
    <div className="h-[940px] w-full bg-neutral-surface">
      <div className="mx-auto w-[640px]">
        <SubCreatingHeader goBack={handleGoBack} label={"Set Password"} />
        <Formik
          initialValues={initialFormValues as FormValues}
          validationSchema={ValidationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          innerRef={formRef}
          enableReinitialize={true}
        >
          {(props: FormikProps<FormValues>) => {
            const { validateField } = props;
            return (
              <form className="col relative w-full ">
                <div className="mb-3 flex flex-col gap-5 overflow-hidden rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                  <h5>Set Password</h5>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label={"Username"}
                      name="username"
                      isRequired
                      onBlur={() => {
                        validateField("username");
                      }}
                    />
                    <TextInput
                      label={"New Password"}
                      name="newPassword"
                      isRequired
                      onBlur={() => {
                        validateField("newPassword");
                      }}
                    />
                  </div>
                </div>

                <div className="row sticky bottom-0 z-50 w-full justify-end gap-3 bg-neutral-surface py-4">
                  <MyButton
                    bSize="small"
                    bType="neutral"
                    onClick={handleGoBack}
                  >
                    {t("buttons.cancel")}
                  </MyButton>
                  <MyButton
                    bSize="small"
                    onClick={() => props.handleSubmit()}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {t("buttons.add")}
                  </MyButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAdminView;
