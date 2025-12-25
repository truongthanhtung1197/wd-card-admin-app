"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { Admin } from "@/model/Admin.mode";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

import { FormValues } from "./BasicInformation.logic";

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
      <MyCard
        label={
          <div className="row w-full justify-between">
            <h5>{t("title")}</h5>
          </div>
        }
      >
        <div className="grid grid-cols-4 gap-4">
          <RenderFiledValue
            filedName={t("fields.username")}
            value={data?.username}
          />
          <RenderFiledValue
            filedName={t("fields.displayName")}
            value={data?.displayName}
          />
          <RenderFiledValue
            filedName={t("fields.totalBudget")}
            value={formatCurrency(data?.totalBudget)}
          />
          <RenderFiledValue
            filedName={t("fields.role")}
            value={getLabelFromOptions(
              data?.role?.roleName,
              ADMIN_ROLE_OPTIONS,
            )}
          />

          <RenderFiledValue filedName={t("fields.email")} value={data?.email} />
          <RenderFiledValue filedName={t("fields.phone")} value={data?.phone} />
          <RenderFiledValue
            filedName={t("fields.telegramUsername")}
            value={data?.telegramUsername}
          />
          <RenderFiledValue
            filedName={t("fields.username")}
            value={data?.username}
          />
          <RenderFiledValue
            filedName={t("fields.bankName")}
            value={data?.bankName}
          />
          <RenderFiledValue
            filedName={t("fields.bankNameInCard")}
            value={data?.bankNameInCard}
          />
          <RenderFiledValue
            filedName={t("fields.bankNumber")}
            value={data?.bankNumber}
          />
        </div>
      </MyCard>
    </div>
  );
};

export default BasicInformationView;
