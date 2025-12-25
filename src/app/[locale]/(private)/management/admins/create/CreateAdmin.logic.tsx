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

export interface FormValues {
  username?: string;
  password?: string;
  email?: string;
  role: string;
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
        username: values.username,
        email: values?.email,
        password: values?.password,
        roleId: Number(values?.role),
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
      role: "",
      password: "",
      roleId: "",
    };
  }, []);

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  const { data: roles = [] } = useGetRolesQuery();

  const roleOptions = useMemo(() => {
    const omitRoles = [
      ADMIN_ROLE.SUPER_ADMIN,
      ADMIN_ROLE.SEOER,
      ADMIN_ROLE.PARTNER,
    ];

    if (
      admin?.role?.roleName === ADMIN_ROLE.MANAGER ||
      admin?.role?.roleName === ADMIN_ROLE.VICE_TEAM_LEADER ||
      admin?.role?.roleName === ADMIN_ROLE.TEAM_LEADER ||
      admin?.role?.roleName === ADMIN_ROLE.ASSISTANT
    ) {
      omitRoles.push(
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.ASSISTANT,
      );
    }

    const result: Role[] = roles?.data?.filter(
      (role: Role) => !omitRoles.includes(role.roleName as ADMIN_ROLE),
    );

    return mappingDataOptions({
      data: result,
      keyName: "id",
      labelName: "roleName",
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
    username: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.username.required"))
      .matches(REGEX.USERNAME, t("validation.username.invalid")),
    password: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.password.required"))
      .min(6, t("validation.password.min")),
    role: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.role.required")),
  });
};
