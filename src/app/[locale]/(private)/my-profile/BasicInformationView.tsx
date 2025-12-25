"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import Avatar from "@/app/_components/common/Avatar";
import Loadding from "@/app/_components/common/Loadding";
import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import CameraIcon from "@/app/_components/icons/CameraIcon";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { formatCurrency } from "@/utils/format.util";
import { Divider } from "@nextui-org/react";

import ContactInformationForm from "./components/ContactInformationForm";
import PasswordUpdateForm from "./components/PasswordUpdateForm";
import { FormValues } from "./useLogic";
import { useLogicEditProfile } from "./useLogicEditProfile";

import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";

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
  initialFormValues: FormValues;
  handleGoBack: () => void;
  isEdit: boolean;
  isShowEditButton: boolean;
  showEdit: () => void;
  handleCancelEdit: () => void;
  variant?: "my-profile";
}

const BasicInformationView = ({
  handleProfileUpdate,
  handlePasswordUpdate,
  isLoading,
  leavePage,
  setLeavePage,
  initialFormValues,
  isEdit,
  handleCancelEdit,
  user,
  isLoadingChangePassword,
  handleEditClick,
}: BasicInformationViewProps & any) => {
  const t = useTranslations("MyProfile");
  const {
    bankOptions,
    handleFileChange,
    isLoading: isLoadingEditProfile,
  } = useLogicEditProfile(user);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isEditDisplayName, setIsEditDisplayName] = useState(false);

  const renderField = (
    label: string | undefined,
    value: string | undefined,
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-base">{value || "-"}</span>
      </div>
    );
  };

  return (
    <div className="flex w-full gap-x-5">
      <div className="mx-auto w-[720px]">
        {user?.role?.roleName === ADMIN_ROLE.SEOER && (
          <div className="mb-3">
            <MyCard label={t("seoerStatistic.title")}>
              <div className="grid grid-cols-4 gap-4">
                <RenderFiledValue
                  filedName={t("seoerStatistic.totalSpent")}
                  value={formatCurrency(
                    (user as any)?.statistic?.amountOfMoneySeoerSpent,
                  )}
                />
              </div>
            </MyCard>
          </div>
        )}
        <div className="cursor-pointer">
          <MyCard
            label={
              <div className="row w-full justify-between">
                <h5>{t("basicInfo.title")}</h5>
                {isEditDisplayName ? (
                  <div className="flex justify-end gap-2">
                    <MyButton
                      bSize="small"
                      bType="secondary"
                      onClick={() => setIsEditDisplayName(false)}
                    >
                      {t("common.cancel")}
                    </MyButton>
                  </div>
                ) : (
                  <div className="flex cursor-pointer justify-end">
                    <MyButton
                      bSize="small"
                      bType="secondary"
                      onClick={() => setIsEditDisplayName(true)}
                    >
                      {t("common.edit")}
                    </MyButton>
                  </div>
                )}
              </div>
            }
          >
            <div className="flex gap-x-5">
              <div className="relative flex">
                <label className="relative flex h-[200px] w-[200px] shrink-0 cursor-pointer items-start justify-start overflow-hidden">
                  <div className="relative h-[150px] w-[150px] ">
                    <Avatar
                      className="flex h-[150px] w-[150px] items-center justify-center"
                      letterSize={150}
                      user={user}
                    />
                    {isLoadingEditProfile && (
                      <div className="center absolute inset-0 z-50 rounded-full bg-black/50">
                        <Loadding />
                      </div>
                    )}
                  </div>
                  <span className="center absolute bottom-[60px] right-[70px] h-10 w-10 rounded-full bg-slate-100">
                    <CameraIcon />
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={isLoadingEditProfile}
                  />
                </label>
              </div>
              <div className="flex-1">
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={(values) => {
                    handleProfileUpdate(values, true);
                  }}
                  validationSchema={basicInformationSchema}
                >
                  {(props: FormikProps<FormValues>) => {
                    const { values } = props;
                    return (
                      <Form>
                        <div className="flex flex-col gap-y-5">
                          {renderField(
                            t("basicInfo.username"),
                            values.username,
                          )}
                          <TextInput
                            label={t("basicInfo.displayName")}
                            name="displayName"
                            disabled={isLoading}
                            editable={isEditDisplayName}
                          />
                          <TextInput
                            label={t("basicInfo.email")}
                            name="email"
                            disabled={isLoading}
                            editable={isEditDisplayName}
                          />
                          {isEditDisplayName && (
                            <>
                              <Divider className="my-5 bg-neutral-stroke-light" />
                              <div className="row sticky bottom-0 z-50 w-full justify-end gap-3">
                                <MyButton
                                  bSize="small"
                                  disabled={isLoading}
                                  isLoading={isLoading}
                                  type="submit"
                                >
                                  {t("common.save")}
                                </MyButton>
                              </div>
                            </>
                          )}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </MyCard>
        </div>
        <ContactInformationForm
          onSubmit={handleProfileUpdate}
          isLoading={isLoading}
          initialFormValues={initialFormValues}
          bankOptions={bankOptions}
          user={user}
          isEditMode={isEdit}
          handleEditClick={handleEditClick}
          handleCancelEdit={handleCancelEdit}
          isDisabledEdit={isLoadingEditProfile}
        />

        <PasswordUpdateForm
          onSubmit={handlePasswordUpdate}
          isLoading={isLoadingChangePassword}
          initialFormValues={initialFormValues}
        />
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

const basicInformationSchema = (t: any) => {
  return yup.object().shape({
    displayName: yup.string().optional(),
  });
};

export default BasicInformationView;
