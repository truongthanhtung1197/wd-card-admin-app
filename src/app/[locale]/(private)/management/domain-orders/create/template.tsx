"use client";

import React, { ReactNode } from "react";
import { notFound } from "next/navigation";

import { PermissionEnum } from "@/constant/Permission.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";

const Template = ({ children }: { children: ReactNode }) => {
  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);
  if (
    !checkPermission({
      permission: rolePermission,
      accessKeys: [PermissionEnum.USER_MGMT_EDIT],
    })
  ) {
    notFound();
  }
  return <div>{children}</div>;
};

export default Template;
