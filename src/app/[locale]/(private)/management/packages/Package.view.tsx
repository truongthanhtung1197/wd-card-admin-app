"use client";
import React from "react";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { usePackageLogic } from "./logic";

const PackageView = () => {
  const { data, fetching, total, columns } = usePackageLogic();
  const router = useLocaleRouter();

  return (
    <>
      <SetupSubHeader label="Package List" />
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <SearchInput
              className="h-[44px] !w-[500px]"
              placeholder="Search packages..."
            />
          </div>
          {true && (
            <MyButton
              onClick={() => router.push(ROUTERS.MANAGEMENT_PACKAGE_CREATE)}
              bType="secondary"
            >
              Add Package
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
            title: "No packages found",
          },
          tableClassName: "min-w-[800px]",
          onRowClick: (row) => {
            router.push(
              ROUTERS.MANAGEMENT_PACKAGE_EDIT.replace(":id", row.id || ""),
            );
          },
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default PackageView;
