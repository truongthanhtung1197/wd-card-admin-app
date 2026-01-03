import { usePathname } from "next/navigation";

import { useLocaleRouter } from "./useLocaleRouter";

/**
 * Custom hook for role-based route protection
 * Checks both authentication and authorization
 */
export const useRoleGuard = () => {
  // const { data, error, isLoading, isError } = useGetMeQuery({});

  const pathname = usePathname();
  const router = useLocaleRouter();

  // useEffect(() => {
  //   // Only check authorization after authentication is confirmed
  //   if (!isLoading && isAuthenticated && user) {
  //     const pathWithoutLocale = removeLocalePrefix(pathname);
  //     const userRole = user?.role?.roleName;

  //     // Check if user has access to current route
  //     if (!hasRouteAccess(pathWithoutLocale, userRole)) {
  //       // Redirect to appropriate page based on user role
  //       const redirectPath = getAccessDeniedRedirect(userRole);
  //       router.push(redirectPath);
  //     }
  //   }
  // }, [isLoading, isAuthenticated, user, pathname, router]);

  return {};
};
