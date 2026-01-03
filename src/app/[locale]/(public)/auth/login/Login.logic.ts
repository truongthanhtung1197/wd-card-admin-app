import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Admin, UserRole } from "@/model/Admin.mode";
import { GlobalDispatch } from "@/store";
import { useLoginMutation } from "@/store/Apis/Auth.api";
import { AuthActions } from "@/store/Auth/Auth.redux";

import Cookies from "js-cookie";
import { isNilOrEmpty } from "ramda-adjunct";

export const LOGIN_EMAIL_KEY = "loginEmail";
export const MAX_ATTEMPTS = 5;

export const useLogic = () => {
  const router = useLocaleRouter();
  const t = useTranslations("Login");

  const [login, { isLoading: loading, error }] = useLoginMutation();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleSubmit = async (values: {
    email: string;
    password: string;
    remember?: boolean;
  }) => {
    try {
      const res: any = await login({
        email: values.email,
        password: values.password,
      } as any);
      if (res?.error) {
        toast.error(t("errors.invalidCredentials"));
      } else {
        if (!res?.error) {
          const expiresDays = values.remember ? 7 : 1;
          Cookies.set("accessToken", res.data?.access_token, {
            expires: expiresDays,
          });
          Cookies.set("refreshToken", res.data?.access_token, {
            expires: expiresDays,
          });
          console.log(res.data?.data);
          GlobalDispatch(
            AuthActions.verifyOTPSuccess({
              data: {
                admin: res.data?.data as Admin,
                accessToken: res.data?.access_token,
                refreshToken: res.data?.access_token,
                roles:
                  res.data?.data?.userRoles?.map(
                    (role: UserRole) => role.role?.roleName,
                  ) || [],
              },
            }),
          );

          // Get target route
          const targetRoute = from || getInitScreenByRole(res.data?.data?.role);

          // Get current locale for proper URL construction
          const currentLocale = getCurrentLocale();
          const fullTargetUrl = `/${currentLocale}${targetRoute}`;

          // Use window.location.href to force full page navigation and clear any cached state
          window.location.href = fullTargetUrl;
        }
      }
    } catch (e: any) {
      toast.error(t("errors.serverError"));
    }
  };

  return {
    handleSubmit,
    error,
    loading,
  };
};

// Helper function to get current locale
const getCurrentLocale = () => {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})(?=\/|$)/);
    return match ? match[1] : "vi";
  }
  return "vi";
};

export const getInitScreenByRole = (role: ADMIN_ROLE) => {
  switch (role) {
    case ADMIN_ROLE.SUPER_ADMIN:
      return ROUTERS.MANAGEMENT_STATISTICS;
    case ADMIN_ROLE.MANAGER:
      return ROUTERS.MANAGEMENT_ADMIN;
    case ADMIN_ROLE.VICE_TEAM_LEADER:
      return ROUTERS.MANAGEMENT_MY_TEAM;
    case ADMIN_ROLE.TEAM_LEADER:
      return ROUTERS.MANAGEMENT_MY_TEAM;
    case ADMIN_ROLE.SEOER:
      return ROUTERS.SEO_SERVICE_DOMAIN;
    case ADMIN_ROLE.PARTNER:
      return ROUTERS.PARTNER_DOMAIN;
    case ADMIN_ROLE.ASSISTANT:
      return ROUTERS.MANAGEMENT_ADMIN;
    case ADMIN_ROLE.DOMAIN_BUYER:
      return ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST;
    default:
      return ROUTERS.HOME;
  }
};

export const getInitScreenByRoleWd = (roles?: UserRole[] | null) => {
  if (isNilOrEmpty(roles)) {
    return ROUTERS.HOME;
  }
  const roleNames = roles?.map((role) => role?.role?.roleName);

  // if (roleNames?.includes(ADMIN_ROLE.SUPER_ADMIN)) {
  //   return ROUTERS.MANAGEMENT_STATISTICS;
  // }
  // if (roleNames?.includes(ADMIN_ROLE.MANAGER)) {
  //   return ROUTERS.MANAGEMENT_ADMIN;
  // }

  return ROUTERS.MANAGEMENT_ADMIN;
};
