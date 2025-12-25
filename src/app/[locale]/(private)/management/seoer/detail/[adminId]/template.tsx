"use client";
import React, { ReactNode } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

import SubHeader from "@/app/_components/common/SubHeader";
import { ROUTERS } from "@/constant";
import { ModuleEnum } from "@/constant/Permission.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";

const Template = ({ children }: { children: ReactNode }) => {
  const router = useLocaleRouter();
  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("UserDetail");

  if (
    !checkPermission({
      permission: rolePermission,
      accessKeys: [ModuleEnum.USER_MGMT],
    })
  ) {
    notFound();
  }
  const { history } = useUrlHistory();
  return (
    <>
      <SubHeader
        label={"Detail SEOer"}
        isBack
        goBack={() =>
          router.push(
            history[ROUTERS.MANAGEMENT_SEOER] || ROUTERS.MANAGEMENT_SEOER,
          )
        }
        className="row base-layout top-0 h-[88px]"
      />
      {children}
    </>
  );
};

export default Template;
