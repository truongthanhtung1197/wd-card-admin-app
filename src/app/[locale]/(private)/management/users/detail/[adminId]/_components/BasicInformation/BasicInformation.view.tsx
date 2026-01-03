"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { Admin } from "@/model/Admin.mode";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { Divider } from "@nextui-org/react";

import { FormValues } from "./BasicInformation.logic";

import { Formik, FormikProps } from "formik";

const ConfirmUnsavedModal = dynamic(
  () => import("@/app/_components/modal/ConfirmUnsavedModal"),
  {
    ssr: false,
  },
);
interface BasicInformationViewProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  handleChangeAvatar: (e: any) => void;
  avatarPreview: string | null;
  avatarRef: any;
  handleButtonClick: () => void;
  leavePage: boolean;
  setLeavePage: (v: boolean) => void;
  formRef: any;
  ValidationSchema: any;
  initialFormValues: FormValues;
  handleGoBack: () => void;
  isEdit: boolean;
  isShowEditButton: boolean;
  showEdit: () => void;
  handleCancelEdit: () => void;
  variant?: "my-profile";
  data?: Admin;
}

const BasicInformationView = ({
  onSubmit,
  isLoading,
  leavePage,
  setLeavePage,
  formRef,
  ValidationSchema,
  initialFormValues,
  handleGoBack,
  isEdit,
  handleCancelEdit,
  data,
}: BasicInformationViewProps & any) => {
  const t = useTranslations("BasicInformation");

  return (
    <div>
      <div>
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
            const { values } = props;
            return (
              <form className="mx-auto max-w-[640px]">
                <MyCard
                  label={
                    <div className="row w-full justify-between">
                      <h5>{t("title")}</h5>
                    </div>
                  }
                >
                  <div className="grid max-w-[640px] grid-cols-2 gap-4">
                    <RenderFiledValue filedName={"Email"} value={data?.email} />

                    <RenderFiledValue
                      filedName={"Roles"}
                      value={values?.roles}
                    />

                    {/* <RenderFiledValue
                      filedName={t("fields.role")}
                      value={getLabelFromOptions(
                        data?.role?.roleName,
                        ADMIN_ROLE_OPTIONS,
                      )}
                    /> */}
                  </div>
                  {isEdit && (
                    <>
                      <Divider className="my-5 bg-neutral-stroke-light" />
                      <div className="row sticky bottom-0 z-50 w-full justify-end gap-3">
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
                          {t("buttons.save")}
                        </MyButton>
                      </div>
                    </>
                  )}
                </MyCard>
              </form>
            );
          }}
        </Formik>
      </div>

      {leavePage && (
        <ConfirmUnsavedModal
          onCancel={() => setLeavePage(false)}
          funcConfirm={() => {
            handleCancelEdit();
            setLeavePage(false);
          }}
        />
      )}
    </div>
  );
};

export default BasicInformationView;
