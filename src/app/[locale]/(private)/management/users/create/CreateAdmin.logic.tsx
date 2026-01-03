"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { mappingDataOptions } from "@/app/_components/formik/FSelectInput/fSelectInput.utils";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { REGEX } from "@/constant/Regex.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { CreateAdmin, Role } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import {
  useCreateAdminMutation,
  useGetRolesQuery,
} from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth";
import { getLabelFromOptions } from "@/utils/loan.utils";

import { FormikProps } from "formik";
import * as Yup from "yup";
import { USER_ROLES } from "@/constant/User.constant";

export interface FormValues {
  email?: string;
  password?: string;
  roles: string;
}

export const useCreateAdminLogic = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  // const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const router = useLocaleRouter();
  const t = useTranslations("Admin");
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
    router.push(history[ROUTERS.MANAGEMENT_ADMIN] || ROUTERS.MANAGEMENT_ADMIN);
  }, [setLeavePage, formRef]);

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      const formData: CreateAdmin = {
        email: values?.email,
        password: values?.password,
        roles: values?.roles?.split(",") as USER_ROLES[],
      };

      const res: any = await createAdmin(formData);
      if (res.error) {
        toast.error(res.error?.data?.message || t("create.error"));
        return;
      }

      toast.success(t("create.success"));
      router.push(ROUTERS.MANAGEMENT_ADMIN);
    } catch (err: any) {
      toast.error(t("create.error"));
    }
  }, []);

  const initialFormValues = useMemo(() => {
    return {
      username: "",
      roles: "",
      password: "",
    };
  }, []);

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  const { data: roles } = useGetRolesQuery();

  const roleOptions = useMemo(() => {
    if (!roles?.data) {
      return [];
    }

    const result = roles.data.map((role: Role) => {
      return {
        id: role.id,
        label: role.roleName,
      };
    });

    return mappingDataOptions({
      data: result,
      keyName: "id",
      labelName: "label",
    })?.map((i) => {
      return {
        ...i,
        label: getLabelFromOptions(
          (i.label as string)?.trim(),
          ADMIN_ROLE_OPTIONS,
        ),
      };
    });
  }, [admin, roles]);

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
    roleOptions,
  };
};

const createValidationSchema = (t: ReturnType<typeof useTranslations>) => {
  return Yup.object({
    email: Yup.string()
      .transform((value) => value.trim())
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .transform((value) => value.trim())
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    roles: Yup.string().required("Roles are required"),
  });
};
