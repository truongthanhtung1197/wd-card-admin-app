"use client";

import { ReactNode } from "react";

import Loading from "@/app/_components/common/Loading";
import { useRoleGuard } from "@/hook/useRoleGuard";

interface PrivateAuthProviderProps {
  children: ReactNode;
}

export default function PrivateAuthProvider({
  children,
}: PrivateAuthProviderProps) {
  const { isLoading, isAuthenticated, hasAccess } = useRoleGuard();

  // Show loading while checking authentication and authorization
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  // If not authenticated or no access, the hook will handle redirects
  // So we can return loading state while redirecting
  if (!isAuthenticated || !hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  // User is authenticated and has access, render children
  return <>{children}</>;
}
