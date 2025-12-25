"use client";

import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import TeamsView from "./Teams.view";

const Page = () => {
  const tSidebar = useTranslations("sidebar");
  return (
    <RoleGuard
      allowedRoles={[
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.ASSISTANT,
        ADMIN_ROLE.SUPER_ADMIN,
      ]}
      fallback={
        <BodyBaseLayout>
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <p>{tSidebar("accessDenied")}</p>
          </div>
        </BodyBaseLayout>
      }
    >
      <BodyBaseLayout>
        <SetupSubHeader label={tSidebar("teamsTitle")} />
        <TeamsView />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
