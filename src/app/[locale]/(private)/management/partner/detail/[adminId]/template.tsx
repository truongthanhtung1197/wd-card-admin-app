"use client";
import React, { ReactNode } from "react";
import { notFound } from "next/navigation";

import SubHeader from "@/app/_components/common/SubHeader";
import { ModuleEnum } from "@/constant/Permission.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";

const Template = ({ children }: { children: ReactNode }) => {
  const router = useLocaleRouter();
  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);

  if (
    !checkPermission({
      permission: rolePermission,
      accessKeys: [ModuleEnum.USER_MGMT],
    })
  ) {
    notFound();
  }
  return (
    <div className=" base-layout">
      <SubHeader
        label={"Detail Partner"}
        isBack
        goBack={() => router.back()}
        className="row top-0"
      />
      {children}
    </div>
  );
};

export default Template;
