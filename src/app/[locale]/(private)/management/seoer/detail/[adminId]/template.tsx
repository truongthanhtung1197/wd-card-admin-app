"use client";
import React, { ReactNode } from "react";

import SubHeader from "@/app/_components/common/SubHeader";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";

const Template = ({ children }: { children: ReactNode }) => {
  const router = useLocaleRouter();

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
