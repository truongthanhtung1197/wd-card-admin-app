import { useEffect } from "react";

import { useLazyGetMeQuery } from "@/store/Apis/Auth.api";

import Cookies from "js-cookie";

/**
 * Optional authentication hook for public routes
 * Gets user data if tokens exist but doesn't redirect on errors
 */
export const useOptionalAuth = () => {
  const [getMe, { data, error, isLoading, isError }] = useLazyGetMeQuery();

  useEffect(() => {
    // Only call getMe if tokens exist
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken || refreshToken) {
      getMe({});
    }
  }, [getMe]);

  return {
    user: data,
    isLoading,
    isError,
    error,
    isAuthenticated: !isError && !!data,
    hasTokens: !!(Cookies.get("accessToken") || Cookies.get("refreshToken")),
  };
};
