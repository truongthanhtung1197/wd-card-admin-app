import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { PermissionEnum } from "@/constant/Permission.constant";
import { Admin } from "@/model/Admin.mode";
import { GlobalDispatch, useAppSelector } from "@/store";
import { useEditAdminByIdMutation } from "@/store/Apis/Admin.api";
import {
  useChangePasswordMutation,
  useLazyGetMeQuery,
} from "@/store/Apis/Auth.api";
import { AuthActions, AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { apiResponseHandle } from "@/utils/common.util";

import { FormikProps } from "formik";
import Cookies from "js-cookie";

export interface FormValues {
  username: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  telegramUsername?: string;
  phone?: string;
  bankName?: string;
  bankNumber?: string;
  bankNameInCard?: string;
  usdt?: string;
  displayName?: string;
  email?: string;
}

export const useMyProfileLogic = () => {
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("MyProfile");

  const [editAdminById, { isLoading: isLoadingEditAdmin }] =
    useEditAdminByIdMutation();

  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useChangePasswordMutation();

  const [getMe] = useLazyGetMeQuery();

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

  const handlePasswordUpdate = useCallback(
    async (values: FormValues) => {
      try {
        const passwordRes = await changePassword({
          oldPassword: values.oldPassword!,
          newPassword: values.newPassword!,
        });

        apiResponseHandle({
          res: passwordRes,
          onSuccess: () => {
            toast.success(t("password.success"));
            handleCancelEdit();
          },
          toastSuccessMessage: t("password.success"),
        });
        return true;
      } catch (err: any) {
        toast.error(err.message || t("password.error"));
        return false;
      }
    },
    [changePassword, handleCancelEdit, t],
  );

  const handleUpdateLocalStorage = (admin: Admin) => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    GlobalDispatch(
      AuthActions.verifyOTPSuccess({
        data: {
          admin: admin as Admin,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
      }),
    );
  };

  const handleProfileUpdate = useCallback(
    async (values: FormValues, isEditDisplayName: boolean = false) => {
      try {
        let dataUpdate: any = {};
        if (isEditDisplayName) {
          dataUpdate = {
            displayName: values.displayName,
            email: values.email,
          };
        } else {
          dataUpdate = { ...values };
          if (dataUpdate.displayName) {
            delete dataUpdate.displayName;
          }
          if (dataUpdate.email) {
            delete dataUpdate.email;
          }
          if (dataUpdate.username) {
            delete dataUpdate.username;
          }
        }

        for (const key in dataUpdate) {
          if (dataUpdate[key] === "") {
            dataUpdate[key] = null;
          }
        }

        const res = await editAdminById({
          id: String(admin?.id) || "",
          data: dataUpdate,
        });

        const adminRes = res?.data?.data as Admin;

        apiResponseHandle({
          res,
          onSuccess: () => {
            toast.success(t("update.success"));
            handleUpdateLocalStorage(adminRes);
          },
          toastSuccessMessage: t("update.success"),
        });

        return true;
      } catch (err: any) {
        toast.error(err.message || t("update.error"));
        return false;
      }
    },
    [admin, editAdminById, t],
  );

  const initialFormValues = useMemo(() => {
    return {
      username: admin?.username || "",
      telegramUsername: admin?.telegramUsername || "",
      phone: admin?.phone || "",
      bankName: admin?.bankName || "",
      bankNumber: admin?.bankNumber || "",
      bankNameInCard: admin?.bankNameInCard || "",
      displayName: admin?.displayName || "",
      email: admin?.email || "",
      usdt: admin?.usdt || "",
      telegramId: admin?.telegramId || "",
      telegramThreadId: admin?.telegramThreadId || "",
    };
  }, [admin]);

  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);

  const isCanEdit = useMemo(() => {
    return checkPermission({
      permission: rolePermission,
      accessKeys: [PermissionEnum.USER_MGMT_EDIT],
    });
  }, [rolePermission]);

  return {
    handlePasswordUpdate,
    handleProfileUpdate,
    isLoading: isLoadingEditAdmin,
    isLoadingChangePassword: isLoadingChangePassword,
    handleButtonClick,
    avatarRef,
    leavePage,
    setLeavePage,
    formRef,
    initialFormValues,
    user: admin,
    handleGoBack,
    isEdit: isEdit && isCanEdit,
    isShowEditButton: isCanEdit && !isEdit,
    showEdit,
    variant: "",
    handleEditClick: showEdit,
    handleCancelEdit,
  };
};
