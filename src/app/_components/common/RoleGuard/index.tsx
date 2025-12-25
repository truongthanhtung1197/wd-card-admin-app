"use client";
import { ReactNode } from "react";

import { hasRouteAccess } from "@/constant/role-routes";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  fallback?: ReactNode;
  route?: string; // If provided, will check route access instead of allowedRoles
}

export default function RoleGuard({
  children,
  allowedRoles = [],
  fallback = null,
  route,
}: RoleGuardProps) {
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const userRole = admin?.role?.roleName;

  let hasAccess = false;

  if (route) {
    // Check route-based access
    hasAccess = hasRouteAccess(route, userRole);
  } else {
    // Check role-based access
    hasAccess = userRole ? allowedRoles.includes(userRole) : false;
  }

  // if (!hasAccess) {
  //   notFound();
  // }

  return <>{children}</>;
}
