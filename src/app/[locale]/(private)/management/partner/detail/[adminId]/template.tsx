"use client";
import React, { ReactNode } from "react";

import SubHeader from "@/app/_components/common/SubHeader";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

const Template = ({ children }: { children: ReactNode }) => {
  const router = useLocaleRouter();

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
