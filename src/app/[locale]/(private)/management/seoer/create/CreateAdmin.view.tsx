"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import SubCreatingHeader from "../../_components/SubCreatingHeader";
import { FormValues, useCreateAdminLogic } from "./CreateAdmin.logic";

import { Formik, FormikProps } from "formik";

const ConfirmUnsavedModal = dynamic(
  () => import("@/app/_components/modal/ConfirmUnsavedModal"),
  {
    ssr: false,
  },
);

export type CreateOrEditUserVariant = "edit" | "create";

const CreateAdminView = () => {
  const t = useTranslations("CreateAdmin");
  const {
    onSubmit,
    isLoading,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory,
  } = useCreateAdminLogic();
  const router = useLocaleRouter();

  return (
    <div className="h-[940px] w-full bg-neutral-surface">
      <div className="mx-auto w-[640px]">
        <SubCreatingHeader goBack={handleGoBack} label={"Create SEOer"} />
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
                  <h5>{t("basicInfo")}</h5>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label={t("fields.username")}
                      name="username"
                      isRequired
                      onBlur={() => {
                        validateField("username");
                      }}
                    />
                    <TextInput
                      label={t("fields.password")}
                      name="password"
                      isRequired
                      onBlur={() => {
                        validateField("password");
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput label={t("fields.email")} name="email" />
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

      {leavePage && (
        <ConfirmUnsavedModal
          onCancel={() => setLeavePage(false)}
          funcConfirm={() =>
            router.push(
              urlHistory[ROUTERS.MANAGEMENT_ADMIN] || ROUTERS.MANAGEMENT_ADMIN,
            )
          }
        />
      )}
    </div>
  );
};

export default CreateAdminView;
