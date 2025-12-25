"use client";
import React from "react";
import { useTranslations } from "next-intl";

import ServiceDetailModal from "@/app/_components/modal/Service/ServiceDetailModal";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";

import ViewSearch from "./_components/viewSearch";
import AddToCart from "./add-cart/cart.view";
import { useLogic } from "./logic";

const View = () => {
  const t = useTranslations("Pack");
  const {
    columns,
    data,
    fetching,
    total,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    addCartData,
    modalDetailData,
    isModalDetail,
    setIsModalDetail,
  } = useLogic();

  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSearch />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </span>
      <AddToCart
        addCartData={addCartData || undefined}
        isVisibleCreateDomain={isVisibleCreateDomain}
        hideCreateDomain={hideCreateDomain}
        onSuccess={() => {
          hideCreateDomain();
          refetch();
        }}
      />
      <ServiceDetailModal
        isOpen={isModalDetail}
        onCancel={() => setIsModalDetail(false)}
        serviceDetail={modalDetailData || undefined}
      />
    </div>
  );
};

export default View;
