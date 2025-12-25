import React from "react";
import { useRouter } from "next/navigation";

import { getAccessDeniedRedirect } from "@/constant/role-routes";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";

interface AccessDeniedProps {
  message?: string;
}

export default function AccessDenied({
  message = "You don't have permission to access this page",
}: AccessDeniedProps) {
  const router = useRouter();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const userRole = admin?.role?.roleName;

  const handleGoBack = () => {
    const redirectPath = getAccessDeniedRedirect(userRole);
    router.push(redirectPath);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">403</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-500">{message}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.back()}
            className="ml-4 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
