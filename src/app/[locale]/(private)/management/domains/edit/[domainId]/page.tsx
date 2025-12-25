"use client";
import React from "react";

import RoleGuard from "@/app/_components/common/RoleGuard";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import EditDomainView from "./EditDomain.view";

interface EditDomainPageProps {
  params: {
    domainId: string;
  };
}

const EditDomainPage = ({ params }: EditDomainPageProps) => {
  return (
    <RoleGuard
      allowedRoles={[
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.ASSISTANT,
        ADMIN_ROLE.SUPER_ADMIN,
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
      ]}
    >
      <EditDomainView />
    </RoleGuard>
  );
};

export default EditDomainPage;
