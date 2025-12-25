"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { REGEX } from "@/constant/Regex.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { CreateAdmin, Role } from "@/model/Admin.mode";
import {
  useCreateAdminMutation,
  useGetRolesQuery,
} from "@/store/Apis/Admin.api";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  username?: string;
  password?: string;
  email?: string;
  role: string;
}

export const useCreateAdminLogic = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const t = useTranslations("CreateAdmin.validation");
  const tMessages = useTranslations("CreateAdmin.messages");

  // const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const router = useLocaleRouter();
  const ValidationSchema = createValidationSchema(t);
  const handleButtonClick = useCallback(() => {
    avatarRef.current?.click();
  }, [avatarRef]);

  const { history } = useUrlHistory();
  const handleGoBack = useCallback(() => {
    if (formRef?.current?.dirty) {
      setLeavePage(true);
      return;
    }
    router.push(
      history[ROUTERS.MANAGEMENT_PARTNER] || ROUTERS.MANAGEMENT_PARTNER,
    );
  }, [setLeavePage, formRef]);
  const { data: roles = [] } = useGetRolesQuery();

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const result: Role = roles?.data?.find(
          (role: Role) => role.roleName === ADMIN_ROLE.PARTNER,
        );
        const formData: CreateAdmin = {
          username: values.username,
          email: values?.email,
          password: values?.password,
          roleId: Number(result?.id),
        };

        const res: any = await createAdmin(formData);
        if (res.error) {
          toast.error(res.error?.data?.message || "");
          return;
        }

        toast.success(tMessages("createSuccess"));
        router.push(ROUTERS.MANAGEMENT_PARTNER);
      } catch (err: any) {
        toast.error(tMessages("createError"));
      }
    },
    [roles],
  );

  const initialFormValues = useMemo(() => {
    return {
      username: "",
      role: "",
      password: "",
    };
  }, []);

  return {
    onSubmit,
    isLoading: isLoading,
    // handleChangeAvatar,
    handleButtonClick,
    avatarRef,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory: history,
  };
};

const createValidationSchema = (t: (key: string) => string) => {
  return Yup.object({
    username: Yup.string()
      .transform((value) => value.trim())
      .required(t("usernameRequired"))
      .matches(REGEX.USERNAME, t("usernameInvalid")),
    password: Yup.string()
      .transform((value) => value.trim())
      .required(t("passwordRequired"))
      .min(6, t("passwordMin")),
  });
};
