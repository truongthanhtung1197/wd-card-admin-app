"use client";
import React from "react";
import { useTranslations } from "next-intl";

import MyPagination from "../../table/MyPagination";
import MyTable from "../../table/MyTable";
import { useLogic } from "./hooks/useLogic";
import ViewSeach from "./ViewSeach";

const MyOrder = () => {
  const t = useTranslations("MyOrder");
  const { columns, data, fetching, total } = useLogic();

  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSeach />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </span>
    </div>
  );
};

export default MyOrder;
