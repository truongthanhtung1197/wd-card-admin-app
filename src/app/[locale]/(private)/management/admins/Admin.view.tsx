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

import FilterAdmin from "../_components/FilterAdmin";
import { useAdminLogic } from "./logic";
import MyMultipleSelect from "@/app/_components/form/MyMultipleSelect";
import { ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";

const AdminView = () => {
  const { data, fetching, total, columns } = useAdminLogic();
  const router = useLocaleRouter();
  const t = useTranslations("Admin");
  const tSidebar = useTranslations("sidebar");

  return (
    <>
      <SetupSubHeader label={`${tSidebar("list")} ${tSidebar("admin")}`} />
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <SearchInput
              className="h-[44px] !w-[500px]"
              placeholder={t("search.placeholder")}
            />
            <MyMultipleSelect
              options={ADMIN_ROLE_OPTIONS}
              param="role"
              selectCheckboxItemClassName="lowercase first-letter:uppercase"
            />
          </div>
          {/* {isCanEdit && ( */}
          {true && (
            <MyButton
              onClick={() => router.push(ROUTERS.MANAGEMENT_ADMIN_CREATE)}
              bType="secondary"
            >
              {t("addButton")}
            </MyButton>
          )}
        </div>

        <FilterAdmin />
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
              ROUTERS.MANAGEMENT_ADMIN_DETAIL.replace(":id", row.id || ""),
            );
          },
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default AdminView;
