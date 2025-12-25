import { useSearchParams } from "next/navigation";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useResetPasswordMutation } from "@/store/Apis/Auth.api";

const hasUpperCase = (str: string) => /[A-Z]/.test(str);
const hasLowerCase = (str: string) => /[a-z]/.test(str);
const hasSpecialChar = (str: string) => /[^a-zA-Z0-9]/.test(str);
const hasMinLength = (str: string, minLength = 12) => str.length >= minLength;
const hasNumber = (str: string) => /\d/.test(str);

export const useLogic = () => {
  const searchParams = useSearchParams();
  const router = useLocaleRouter();
  const [resetPassword, { isLoading: loading, error }] =
    useResetPasswordMutation();
  const code = searchParams.get("code");

  const handleSubmit = async (values: any) => {
    try {
      const res: any = await resetPassword({
        resetKey: code || "",
        newPassword: values.password,
      });
      if (!res?.error) {
        toast.success("Reset password successfully", {});
        router.push(ROUTERS.RESET_PASSWORD_SUCCESS);
      } else {
        router.push(ROUTERS.RESET_PASSWORD_FAILED);
      }
    } catch (error: any) {}
  };

  return {
    handleSubmit,
    loading,
    error,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    hasMinLength,
    hasNumber,
  };
};
