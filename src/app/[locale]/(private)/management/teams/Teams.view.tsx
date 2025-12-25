"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { useTeamsLogic } from "./logic";

const TeamsView = () => {
  const { data, fetching, total, columns } = useTeamsLogic();
  const router = useLocaleRouter();
  const t = useTranslations("Teams");

  return (
    <>
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <SearchInput
            className="h-[44px] !w-[500px]"
            placeholder={t("search.placeholder")}
          />
          <MyButton
            onClick={() => router.push(ROUTERS.MANAGEMENT_TEAMS_CREATE)}
            bType="secondary"
          >
            {t("addButton")}
          </MyButton>
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
              ROUTERS.MANAGEMENT_TEAMS_EDIT.replace(":id", row.id || ""),
            );
          },
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default TeamsView;
