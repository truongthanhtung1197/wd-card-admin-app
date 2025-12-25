import { useEffect } from "react";

import { useGetMeQuery } from "@/store/Apis/Auth.api";
import { clearAuthState } from "@/utils/auth.utils";

import { useLocaleRouter } from "./useLocaleRouter";

/**
 * Custom hook for private routes authentication guard
 * Automatically redirects to login on auth errors and clears local data
 */
export const useAuthGuard = () => {
  const router = useLocaleRouter();
  const { data, error, isLoading, isError } = useGetMeQuery({});

  useEffect(() => {
    if (isError && error) {
      // Check if it's an authentication error (401, 403)
      if ("status" in error && (error.status === 401 || error.status === 403)) {
        // Clear all auth data and redirect to login
        clearAuthState(false); // Don't use window.location.href redirect
        router.push("/auth/login"); // Use locale-aware router
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
