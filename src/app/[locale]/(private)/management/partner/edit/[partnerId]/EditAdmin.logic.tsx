"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { mappingDataOptions } from "@/app/_components/formik/FSelectInput/fSelectInput.utils";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { REGEX } from "@/constant/Regex.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { CreateAdmin, Role } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import {
  useEditAdminByIdMutation,
  useGetAdminByIdQuery,
  useGetRolesQuery,
} from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  username?: string;
  password?: string | null;
  email?: string;
  role: any;
}

export const useEditAdminLogic = () => {
  const [editAdminById, { isLoading }] = useEditAdminByIdMutation();
  const params = useParams<{ partnerId: string }>();
  const { data: adminEdit, refetch } = useGetAdminByIdQuery(params?.partnerId, {
    skip: !params?.partnerId,
    refetchOnMountOrArgChange: true,
  });

  const { data: roles = [] } = useGetRolesQuery();

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
    router.push(
      history[ROUTERS.MANAGEMENT_PARTNER] || ROUTERS.MANAGEMENT_PARTNER,
    );
  }, [setLeavePage, formRef]);
  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const formData: Partial<CreateAdmin> = {};
        if (values.role) {
          formData.roleId = Number(values.role);
        }

        const res: any = await editAdminById({
          id: String(adminEdit?.data?.id) || "",
          data: formData as CreateAdmin,
        });

        if (res.error) {
          toast.error(res.error?.data?.message || t("edit.error"));
          return;
        }

        toast.success(t("edit.success"));
        router.push(ROUTERS.MANAGEMENT_PARTNER);
      } catch (err: any) {
        toast.error(t("edit.error"));
      }
    },
    [editAdminById, adminEdit, router, t],
  );

  const initialFormValues = useMemo(() => {
    return {
      username: adminEdit?.data?.username,
      role: adminEdit?.data?.role?.id || "",
      password: "",
      email: adminEdit?.data?.email,
    };
  }, [adminEdit?.data, adminEdit?.id]);

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  const roleOptions = useMemo(() => {
    const omitRoles = [ADMIN_ROLE.SUPER_ADMIN];
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
    let result: Role[] = roles?.data?.filter(
      (role: Role) => !omitRoles.includes(role.roleName as ADMIN_ROLE),
    );

    return mappingDataOptions({
      data: result,
      keyName: "id",
      labelName: "roleName",
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
    role: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.role.required")),
  });
};
