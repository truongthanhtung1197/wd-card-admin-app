import { ROUTERS } from ".";
import { ADMIN_ROLE } from "./admin.constant";

// Route patterns and their allowed roles
export const ROUTE_ROLE_MAPPING = {
  // Allow all roles to view partner detail pages
  "/management/partner/detail": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.DOMAIN_BUYER,
    ADMIN_ROLE.SEOER,
    ADMIN_ROLE.PARTNER,
  ],
  // Management routes - for admins and managers
  "/management": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.DOMAIN_BUYER,
  ],
  "/management/admins": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
  ],
  "/management/users": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
  ],
  [ROUTERS.MANAGEMENT_DOMAINS]: [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.DOMAIN_BUYER,
  ],
  "/management/orders": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ],
  "/management/services": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
  ],
  "/management/statistics": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
  ],
  "/management/teams": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
  ],
  "/management/my-team": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ],

  // Partner routes
  "/partner": [ADMIN_ROLE.PARTNER],

  // SEOer routes
  "/seoer": [
    ADMIN_ROLE.SEOER,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ],

  // Profile - accessible by all authenticated users
  "/my-profile": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.SEOER,
    ADMIN_ROLE.PARTNER,
  ],

  "/order-detail": [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.SEOER,
    ADMIN_ROLE.PARTNER,
  ],

  [ROUTERS.MANAGEMENT_DOMAIN_ORDER_DETAIL]: [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.DOMAIN_BUYER,
  ],

  [ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST]: [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
    ADMIN_ROLE.DOMAIN_BUYER,
  ],

  // [ROUTERS.MANAGEMENT_DOMAIN_ORDERS]: [
  //   ADMIN_ROLE.SUPER_ADMIN,
  //   ADMIN_ROLE.MANAGER,
  //   ADMIN_ROLE.ASSISTANT,
  //   ADMIN_ROLE.TEAM_LEADER,
  //   ADMIN_ROLE.VICE_TEAM_LEADER,
  //   ADMIN_ROLE.DOMAIN_BUYER,
  // ],
} as const;

export type RoutePattern = keyof typeof ROUTE_ROLE_MAPPING;

/**
 * Check if a user role has access to a specific route
 */
export function hasRouteAccess(route: string, userRole?: string): boolean {
  if (!userRole) return false;

  // SUPER_ADMIN has access to everything
  if (userRole === ADMIN_ROLE.SUPER_ADMIN) return true;

  // Find matching route pattern
  for (const [pattern, allowedRoles] of Object.entries(ROUTE_ROLE_MAPPING)) {
    if (route.startsWith(pattern)) {
      return (allowedRoles as readonly ADMIN_ROLE[]).includes(
        userRole as ADMIN_ROLE,
      );
    }
  }

  // Default deny if no pattern matches
  return false;
}

/**
 * Get the appropriate redirect route based on user role when access is denied
 */
export function getAccessDeniedRedirect(userRole?: string): string {
  if (!userRole) return "/auth/login";

  switch (userRole) {
    case ADMIN_ROLE.SUPER_ADMIN:
    case ADMIN_ROLE.MANAGER:
    case ADMIN_ROLE.ASSISTANT:
      return "/management/statistics";
    case ADMIN_ROLE.TEAM_LEADER:
    case ADMIN_ROLE.VICE_TEAM_LEADER:
      return "/management/my-team";
    case ADMIN_ROLE.SEOER:
      return "/seoer/services/domain";
    case ADMIN_ROLE.PARTNER:
      return "/partner/domain";
    default:
      return "/";
  }
}
