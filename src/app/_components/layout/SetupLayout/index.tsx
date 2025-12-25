"use client";
import React, { ReactNode } from "react";

import AdminHeader from "../AdminLayout/AdminHeader";
import SetupSidebar from "./SetupSidebar";

const SetupLayout = ({ children }: { children: ReactNode }) => {

  
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <SetupSidebar />
        <div className="h-[calc(100vh-60px)] flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default SetupLayout;
