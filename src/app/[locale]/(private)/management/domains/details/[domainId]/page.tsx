"use client";

import React from "react";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import View from "./View";

const Page = () => {
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
        <SetupSubHeader label={"Domain details"} isBack />
        <View />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
