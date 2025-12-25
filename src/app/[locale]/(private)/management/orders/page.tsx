"use client";
import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import View from "./Orders.view";

const Page = ({ params }: { params: { status: string } }) => {
  const tSidebar = useTranslations("sidebar");
  return (
    <RoleGuard
      allowedRoles={[
        ADMIN_ROLE.SUPER_ADMIN,
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.ASSISTANT,
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
      ]}
    >
      <BodyBaseLayout>
        <SetupSubHeader label={tSidebar("ordersTitle")} />
        <View />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
