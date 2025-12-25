"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { useAdminLogic } from "./logic";

const AdminView = () => {
  const { data, fetching, total, columns } = useAdminLogic();
  const router = useLocaleRouter();
  const t = useTranslations("User");

  return (
    <>
      <SetupSubHeader label={`SEOer`} />
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <SearchInput
            className="h-[44px] !w-[500px]"
            placeholder="user name, email, display name, telegram"
          />
          {/* {isCanEdit && ( */}
          {true && (
            <MyButton
              onClick={() => router.push(ROUTERS.MANAGEMENT_SEOER_CREATE)}
              bType="secondary"
            >
              Add new SEOer
            </MyButton>
          )}
        </div>
      </div>
      <MyTable
        {...{
          data: data || [],
          fetching,
          columns,
          NoDataProps: {
            title: t("noData.title"),
          },
          tableClassName: "min-w-[800px]",
          onRowClick: (row) => {
            router.push(
              ROUTERS.MANAGEMENT_SEOER_DETAIL.replace(":id", row.id || ""),
            );
          },
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default AdminView;
