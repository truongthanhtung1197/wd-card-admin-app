"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/utils/format.util";

import { FormikProps } from "formik";

export interface FormValues {
  username: string;
  role: {
    roleName: string;
  };
}

export const AdminDetailLogic = ({
  data: admin,
}: {
  data?: any;
  refetch?: () => void;
}) => {
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

  const initialFormValues = useMemo(() => {
    return {
      username: admin?.username || "",
      role: admin?.role?.roleName || "",
      totalBudget: formatCurrency(admin?.totalBudget) || 0,
    };
  }, [admin]);

  const isCanEdit = useMemo(() => {
    // if (authAdmin?.role === ADMIN_ROLE.SUPER_ADMIN) {
    //   return true;
    // }
    // if (
    //   authAdmin?.role === ADMIN_ROLE.ADMIN &&
    //   admin?.role !== ADMIN_ROLE.SUPER_ADMIN
    // ) {
    //   return true;
    // }
    return false;
  }, [admin]);

  return {
    handleButtonClick,
    avatarRef,
    leavePage,
    setLeavePage,
    formRef,
    initialFormValues,
    admin,
    handleGoBack,
    isEdit: isEdit && isCanEdit,
    isShowEditButton: true,
    showEdit,
    handleCancelEdit,
  };
};
