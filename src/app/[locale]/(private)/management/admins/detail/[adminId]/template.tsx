"use client";
import React, { ReactNode } from "react";
import { notFound } from "next/navigation";

import { ModuleEnum } from "@/constant/Permission.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";

const Template = ({ children }: { children: ReactNode }) => {
  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);
  if (
    !checkPermission({
      permission: rolePermission,
      accessKeys: [ModuleEnum.USER_MGMT],
    })
  ) {
    notFound();
  }

  return <>{children}</>;
};

export default Template;
