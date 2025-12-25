"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import SearchInput from "@/app/_components/common/SearchInput";
import MyMultipleSelect from "@/app/_components/form/MyMultipleSelect";
import PlusIcon from "@/app/_components/icons/PlusIcon";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  DOMAIN_ORDER_STATUS_OPTIONS,
} from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { useAdminLogic } from "./logic";

const View = () => {
  const { data, fetching, total, admin, columns } = useAdminLogic();
  const t = useTranslations("Domain");
  const router = useLocaleRouter();
  const pathname = usePathname();

  const handleClearQueryUrl = () => {
    router.push(`${pathname}?page=1`);
  };

  return (
    <>
      <MyCard label={"Tìm kiếm"} className="mb-4">
        <div className="row justify-between gap-2">
          <div className="row flex-wrap gap-3">
            <SearchInput
              param="proposeCode"
              className="h-[44px] !w-[300px]"
              placeholder={"Mã đề xuất"}
            />
            <SearchInput
              param="orderCode"
              className="h-[44px] !w-[300px]"
              placeholder={"Mã đơn"}
            />

            <SearchInput
              className="h-[44px] !w-[300px]"
              placeholder={"Mô tả đơn hàng"}
            />

            <MyMultipleSelect
              options={DOMAIN_ORDER_STATUS_OPTIONS}
              param="status"
              selectCheckboxItemClassName="lowercase first-letter:uppercase"
              wrapperClassName="w-[200px]"
              labelContent={t("search.status")}
            />

            <MyButton
              onClick={handleClearQueryUrl}
              bType="neutral"
              className="!h-[40px] !w-[134px]"
            >
              Bỏ lọc
            </MyButton>
            {admin?.role?.roleName !== ADMIN_ROLE.DOMAIN_BUYER && (
              <MyButton
                onClick={() =>
                  router.push(ROUTERS.MANAGEMENT_DOMAIN_ORDER_CREATE)
                }
                bType="secondary"
              >
                <PlusIcon /> New Order
              </MyButton>
            )}
          </div>
        </div>
      </MyCard>
      <MyTable
        {...{
          data: data || [],
          fetching,
          columns,
          NoDataProps: {
            title: "No data",
          },
          tableClassName: "min-w-[800px]",
          onRowClick: (row) => {
            router.push(
              `${ROUTERS.MANAGEMENT_DOMAIN_ORDER_DETAIL?.replace(":id", row.id)}`,
            );
          },
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default View;
