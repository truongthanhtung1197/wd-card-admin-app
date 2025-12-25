import { useSearchParams } from "next/navigation";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import useCookie from "@/hook/useCookie";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { GlobalDispatch } from "@/store";
import {
  useResendOTPMutation,
  useValidateLoginOTPMutation,
} from "@/store/Apis/Auth.api";
import { AuthActions } from "@/store/Auth";

import { LOGIN_EMAIL_KEY } from "../login/Login.logic";

import Cookies from "js-cookie";

export const useLogic = () => {
  const router = useLocaleRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [email] = useCookie(LOGIN_EMAIL_KEY, "");
  const [validateLoginOTP, { isLoading: loading, error }] =
    useValidateLoginOTPMutation();
  const [resendOTP, { isLoading: resendLoading, error: resendError }] =
    useResendOTPMutation();

  const handleSubmit = async (values: { otpCode: string }) => {
    try {
      const res = await validateLoginOTP({
        ...values,
        email: email,
      });

      if (!res?.error) {
        Cookies.set("accessToken", res.data?.data?.accessToken);
        Cookies.set("refreshToken", res.data?.data?.refreshToken);

        GlobalDispatch(AuthActions.verifyOTPSuccess(res.data));

        if (from) {
          router.push(from);
        } else {
          router.push(ROUTERS.DASHBOARD);
        }
      }
    } catch (e: any) {}
  };

  const handleResentCode = async () => {
    const res = await resendOTP({ email });
    if (!res.error) {
      toast.success("Resent OTP Code", {});
    }
  };

  return {
    handleSubmit,
    handleResentCode,
    error,
    loading,
    resendLoading,
    email,
  };
};
