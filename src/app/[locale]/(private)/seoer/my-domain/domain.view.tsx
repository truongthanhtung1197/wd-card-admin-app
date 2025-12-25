"use client";
import React from "react";

import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";

import ViewSearch from "./_components/viewSearch";
import { useDomainLogic } from "./domain.logic";

const MyDomain = () => {
  const { columns, data, fetching, total } = useDomainLogic();
  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSearch />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />

        <MyPagination total={total} />
      </span>
    </div>
  );
};

export default MyDomain;
