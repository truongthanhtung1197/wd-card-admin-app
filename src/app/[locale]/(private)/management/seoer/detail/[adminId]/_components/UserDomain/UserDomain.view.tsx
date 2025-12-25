"use client";

import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { Admin } from "@/model/Admin.mode";

interface UserDomainViewProps {
  data: any;
  total: number;
  fetching: boolean;
  columns: any;
  refetch: () => void;
  adminDetail: Admin;
}

const UserDomainView = ({
  data,
  total,
  fetching,
  columns,
  refetch,
  adminDetail,
}: UserDomainViewProps) => {
  const t = useTranslations("UserDomain");

  return (
    <div>
      <MyCard
        label={
          <div className="row w-full justify-between gap-6">
            <h5>{t("title")}</h5>
          </div>
        }
      >
        <MyTable
          columns={columns}
          data={data}
          NoDataProps={{
            title: t("noData.title"),
            message: t("noData.message"),
          }}
        />
        <MyPagination total={total} />
      </MyCard>
    </div>
  );
};

export default UserDomainView;
