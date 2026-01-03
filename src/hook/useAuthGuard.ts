import { useEffect } from "react";

import { useGetMeQuery } from "@/store/Apis/Auth.api";
import { clearAuthState } from "@/utils/auth.utils";

import { useLocaleRouter } from "./useLocaleRouter";

// old
export const useAuthGuard = () => {
  const router = useLocaleRouter();
  const { data, error, isLoading, isError } = useGetMeQuery({});

  useEffect(() => {
    if (isError && error) {
      if ("status" in error && (error.status === 401 || error.status === 403)) {
        clearAuthState(false);
        router.push("/auth/login");
      }
    }
  }, [isError, error, router]);

  return {
    user: data,
    isLoading,
    isError,
    error,
    isAuthenticated: !isError && !!data,
  };
};
