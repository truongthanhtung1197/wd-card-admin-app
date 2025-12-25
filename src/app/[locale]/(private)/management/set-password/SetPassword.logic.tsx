"use client";
import { useCallback, useMemo, useRef } from "react";

import { toast } from "@/app/_components/common/Toaster";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useSetPasswordMutation } from "@/store/Apis/Admin.api";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  username?: string;
  newPassword?: string;
}

export const SetPassword = () => {
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const formRef = useRef<FormikProps<FormValues>>(null);
  const router = useLocaleRouter();
  const ValidationSchema = createValidationSchema();

  const { history } = useUrlHistory();
  const handleGoBack = useCallback(() => {
    router.back();
  }, [formRef]);

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      const formData: any = {
        username: values.username,
        newPassword: values.newPassword,
      };

      const res: any = await setPassword(formData);
      if (res.error) {
        toast.error(res.error?.data?.message || "");
        return;
      }

      toast.success("Set password successfully");
    } catch (err: any) {
      toast.error("Set password failed");
    }
  }, []);

  const initialFormValues = useMemo(() => {
    return {
      username: "",
      newPassword: "",
    };
  }, []);

  return {
    onSubmit,
    isLoading: isLoading,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory: history,
  };
};

const createValidationSchema = () => {
  return Yup.object({
    username: Yup.string()
      .transform((value) => value.trim())
      .required("Username is required "),
    newPassword: Yup.string()
      .transform((value) => value.trim())
      .required("Password is required"),
  });
};
