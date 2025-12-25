"use client";

import React from "react";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BackIcon from "@/app/_components/icons/BackIcon";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import View from "./View";

const Page = () => {
  const router = useLocaleRouter();
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
        <SetupSubHeader
          label={
            <div className="row gap-1">
              <div
                className="center size-10 cursor-pointer"
                onClick={() => router.push(ROUTERS.MANAGEMENT_DOMAINS)}
              >
                <BackIcon />
              </div>
              Quản lý đơn domain
            </div>
          }
        />
        <View />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
