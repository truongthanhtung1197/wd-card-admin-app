import { useState } from "react";

import { toast } from "@/app/_components/common/Toaster";
import {
  useForgotPasswordMutation,
  useForgotPasswordResendMutation,
} from "@/store/Apis/Auth.api";

export const useLogic = () => {
  const [isForgotPasswordSuccess, setIsForgotPasswordSuccess] = useState(false);
  const [_email, setEmail] = useState("");

  const [forgotPassword, { isLoading: loading, error }] =
    useForgotPasswordMutation();
  const [resendOTP, { isLoading: resendLoading, error: resendError }] =
    useForgotPasswordResendMutation();

  const handleSubmit = async (values: { email: string }) => {
    try {
      setEmail(values.email);
      const res = await forgotPassword({
        email: values.email,
      });
      if (!res?.error) {
        setIsForgotPasswordSuccess(true);
      } else {
      }
    } catch (error: any) {
      // setError(error.message);
    }
  };

  const handleResentCode = async () => {
    try {
      const res = await resendOTP({ email: _email });
      if (!res?.error) {
        toast.success("Resent link to email successfully!!!", {});
      }
    } catch (error: any) {}
  };
  return {
    handleSubmit,
    loading,
    isForgotPasswordSuccess,
    handleResentCode,
    error,
  };
};
