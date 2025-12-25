"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import SubCreatingHeader from "../../../_components/SubCreatingHeader";
import { FormValues, useEditAdminLogic } from "./EditAdmin.logic";

import { Formik, FormikProps } from "formik";

const ConfirmUnsavedModal = dynamic(
  () => import("@/app/_components/modal/ConfirmUnsavedModal"),
  {
    ssr: false,
  },
);

export type CreateOrEditUserVariant = "edit" | "create";

const EditAdminView = () => {
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
    roleOptions,
  } = useEditAdminLogic();
  const router = useLocaleRouter();
  const t = useTranslations("EditAdmin");

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto w-[640px]">
        <SubCreatingHeader goBack={handleGoBack} label={t("title")} />
        <Formik
          initialValues={initialFormValues}
          validationSchema={ValidationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          innerRef={formRef}
          enableReinitialize={true}
        >
          {(props: FormikProps<FormValues>) => {
            const { values, validateField } = props;
            return (
              <form className="col relative w-full ">
                <div className="mb-3 flex flex-col gap-5 overflow-hidden rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                  <h5>{t("basicInfo")}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label={t("username")}
                      name="username"
                      isRequired
                      disabled={true}
                      onBlur={() => {
                        validateField("username");
                      }}
                    />

                    <TextInput label={"Tên hiển thị"} name="displayName" />
                    <FSelectInput
                      options={roleOptions || []}
                      label={t("role")}
                      name="role"
                      isRequired
                      editable={
                        values?.role?.roleName !== ADMIN_ROLE.SUPER_ADMIN
                      }
                      contentLabel={
                        values?.role?.roleName === ADMIN_ROLE.SUPER_ADMIN
                          ? t("superAdmin")
                          : values?.role?.roleName
                      }
                    />
                    <TextInput
                      editable={true}
                      label={t("email")}
                      name="email"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="row sticky bottom-0 z-50 w-full justify-end gap-3 bg-neutral-surface py-4">
                  <MyButton
                    bSize="small"
                    bType="neutral"
                    onClick={handleGoBack}
                  >
                    {t("cancel")}
                  </MyButton>
                  <MyButton
                    bSize="small"
                    onClick={() => props.handleSubmit()}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {t("save")}
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

export default EditAdminView;
