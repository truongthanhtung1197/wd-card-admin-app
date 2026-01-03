import { ADMIN_ROLE } from "@/constant/admin.constant";
import { hasRouteAccess } from "@/constant/role-routes";
import { defaultLocale, LOCALES } from "@/i18n/routing";
import { GlobalDispatch } from "@/store";
import { AuthActions } from "@/store/Auth";

import { AnyObject } from "yup";

/**
 * Get current locale from URL or fallback to default
 */
function getCurrentLocale(): string {
  if (typeof window === "undefined") return defaultLocale;

  const pathname = window.location.pathname;
  const match = pathname.match(/^\/([a-zA-Z-]{2,5})(?=\/|$)/);
  const localeFromPath = match ? match[1] : null;

  // Check if the found locale is valid
  if (
    localeFromPath &&
    Object.values(LOCALES).includes(localeFromPath as LOCALES)
  ) {
    return localeFromPath;
  }

  return defaultLocale;
}

/**
 * Clear all auth related data including Redux persist, localStorage, sessionStorage and cookies
 */
export function clearAllAuthData() {
  try {
    GlobalDispatch(AuthActions.logout());
  } catch (error) {}
}

/**
 * Clear all auth related data (redux state + cookies) and redirect to login
 */
export function clearAuthState(shouldRedirect: boolean = true) {
  // Clear all auth data including persist
  clearAllAuthData();

  // Redirect to login if requested and in browser environment
  if (shouldRedirect && typeof window !== "undefined") {
    const currentLocale = getCurrentLocale();
    window.location.href = `/${currentLocale}/auth/login`;
  }
}

/**
 * Check if user has permission to access a route
 */
export function checkRoutePermission(
  route: string,
  userRole?: string,
): boolean {
  return hasRouteAccess(route, userRole);
}

export function checkPermission({}: {
  permission?: AnyObject | null;
  accessKeys?: string[];
}): boolean {
  return true;
  // if (isNilOrEmpty(permission)) return false;

  // const allKeys = getAllNestedKeys(permission || {});

  // return accessKeys.some((key) => allKeys.includes(key));
}

export enum Permission {
  EDIT_ADMIN = "EDIT_ADMIN",
  CREATE_ADMIN = "CREATE_ADMIN",
  DELETE_ADMIN = "DELETE_ADMIN",

  EDIT_STAFF = "EDIT_STAFF",
  CREATE_STAFF = "CREATE_STAFF",
  DELETE_STAFF = "DELETE_STAFF",
}

export function checkPermissionByRole({
  role,
}: {
  role?: typeof ADMIN_ROLE;
}): Permission[] {
  if (!role) return [];

  return [];
}

export enum Permission69VN {
  CREATE_USER = "CREATE_USER",
  DELETE_USER = "DELETE_USER",
}

export function checkPermission69VN({
  role,
  permission,
}: {
  role?: typeof ADMIN_ROLE;
  permission?: Permission69VN[];
}): boolean {
  return true;
}

export function checkRole({
  userRoles,
  allowRoles,
}: {
  userRoles: ADMIN_ROLE[] | null;
  allowRoles: ADMIN_ROLE[] | null;
}) {
  if (!userRoles) return false;
  if (!allowRoles) return false;
  return userRoles.some((role) => allowRoles.includes(role));
}
