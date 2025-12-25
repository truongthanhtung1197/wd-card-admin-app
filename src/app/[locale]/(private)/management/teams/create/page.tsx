"use client";
import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import CreateTeamView from "./CreateTeam.view";

const Page = () => {
  const t = useTranslations("Teams");
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
            <p>Bạn không có quyền truy cập trang này</p>
          </div>
        </BodyBaseLayout>
      }
    >
      <BodyBaseLayout>
        <SetupSubHeader
          label={t("createEdit.createTitle")}
          className="justify-center"
        />
        <CreateTeamView />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
