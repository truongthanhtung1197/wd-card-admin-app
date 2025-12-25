"use client";

import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import AdminView from "./Domain.view";

const Page = () => {
  const tSidebar = useTranslations("sidebar");

  return (
    <RoleGuard
      allowedRoles={[
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.ASSISTANT,
        ADMIN_ROLE.SUPER_ADMIN,
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
        ADMIN_ROLE.DOMAIN_BUYER,
      ]}
    >
      <BodyBaseLayout>
        <SetupSubHeader label={tSidebar("domainsTitle")} />
        <AdminView />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
