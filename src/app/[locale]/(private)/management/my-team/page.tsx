"use client";

import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import TeamMembersView from "./TeamMembers.view";

const TeamMembersPage = () => {
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
      fallback={
        <BodyBaseLayout>
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <p>{tSidebar("accessDenied")}</p>
          </div>
        </BodyBaseLayout>
      }
    >
      <BodyBaseLayout>
        <SetupSubHeader label={tSidebar("myTeam")} />
        <TeamMembersView />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default TeamMembersPage;
