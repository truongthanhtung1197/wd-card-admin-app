"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { CreateAdmin } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import { useEditAdminByIdMutation } from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  username: string;
  role: {
    roleName: string;
  };
}

export const AdminDetailLogic = ({
  data: admin,
  refetch,
}: {
  data?: any;
  refetch?: () => void;
}) => {
  const t = useTranslations("Admin");
  const [editAdminById, { isLoading: isLoadingEditAdmin }] =
    useEditAdminByIdMutation();

  const [isEdit, setIsEdit] = useState(false);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  useEffect(() => {
    setIsEdit(mode === "edit");
  }, [mode]);

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const ValidationSchema = createValidationSchema(t);
  const handleButtonClick = useCallback(() => {
    avatarRef.current?.click();
  }, [avatarRef]);

  const handleCancelEdit = useCallback(() => {
    setIsEdit(false);
    formRef?.current?.resetForm();
  }, [pathname, formRef]);

  const showEdit = useCallback(() => {
    setIsEdit(true);
  }, [pathname]);

  const handleGoBack = useCallback(() => {
    if (formRef?.current?.dirty) {
      setLeavePage(true);
      return;
    }
    handleCancelEdit();
  }, [setLeavePage, formRef, handleCancelEdit, pathname]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const formData: CreateAdmin = {
          username: values.username,
        };

        const res: any = await editAdminById({
          id: String(admin?.id) || "",
          data: formData,
        });
        if (res.error) {
          toast.error(res.error?.data?.error?.message || "");
          return;
        }

        toast.success(t("editSuccess"));

        handleCancelEdit();
        refetch?.();
      } catch (err: any) {
        toast.error(err.error?.data?.error?.message || "");
      }
    },
    [admin, handleCancelEdit, refetch, t],
  );
  const initialFormValues = useMemo(() => {
    return {
      username: admin?.username || "",
      role: admin?.role?.roleName || "",
      totalBudget: admin?.totalBudget || 0,
    };
  }, [admin]);

  const { admin: authAdmin } = useAppSelector(AuthSelector.selectAuthState);

  const isCanEdit = useMemo(() => {
    return false;
  }, [authAdmin, admin]);

  return {
    onSubmit,
    isLoading: isLoadingEditAdmin,
    handleButtonClick,
    avatarRef,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    admin,
    handleGoBack,
    isEdit: isEdit && isCanEdit,
    isShowEditButton: true,
    showEdit,
    handleCancelEdit,
  };
};

const createValidationSchema = (t: ReturnType<typeof useTranslations>) => {
  return Yup.object({
    username: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.username.required")),
    role: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.role.required")),
  });
};
