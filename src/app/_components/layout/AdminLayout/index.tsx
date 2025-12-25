"use client";
import React, { ReactNode, useEffect } from "react";

import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { GlobalDispatch } from "@/store";
import { useGetMeQuery } from "@/store/Apis/Auth.api";
import { AuthActions } from "@/store/Auth";
import { clearAuthState } from "@/utils/auth.utils";

import Loading from "../../common/Loading";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useGetMeQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const router = useLocaleRouter();

  useEffect(() => {
    if (error) {
      clearAuthState();
      router.push(ROUTERS.LOGIN);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      GlobalDispatch(AuthActions.setAdmin(data));
    }
  }, [data]);

  const isLogged = data && !isLoading;

  return (
    <>
      <AdminHeader />
      {isLoading && (
        <div className="center h-[calc(100vh_-_60px)] w-screen">
          <Loading />
        </div>
      )}
      {isLogged && <div className="">{children}</div>}
    </>
  );
};

export default AdminLayout;
