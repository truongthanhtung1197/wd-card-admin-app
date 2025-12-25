"use client";
import React from "react";
import { useTranslations } from "next-intl";

import RoleGuard from "@/app/_components/common/RoleGuard";
import SubHeaderV2 from "@/app/_components/common/SubHeaderV2";
import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import EditTeamView from "./EditTeam.view";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
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
        <SubHeaderV2
          label={`${t("createEdit.editTitle")} `}
          className="mx-auto max-w-[770px] justify-center"
        />
        <EditTeamView teamId={params.id} />
      </BodyBaseLayout>
    </RoleGuard>
  );
};

export default Page;
