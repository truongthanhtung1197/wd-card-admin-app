"use client";
import React from "react";
import { useTranslations } from "next-intl";

import ServiceDetailModal from "@/app/_components/modal/Service/ServiceDetailModal";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";

import ViewSearch from "./_components/viewSearch";
import AddPackToCart from "./add-cart/cart.view";
import { useLogic } from "./domain.logic";

const MyServiceDomain = () => {
  const t = useTranslations("SeoerDomain.services");
  const {
    columns,
    data,
    fetching,
    total,
    addCartData,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    setIsModalDetail,
    isModalDetail,
    modalDetailData,
  } = useLogic();

  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSearch />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </span>
      <AddPackToCart
        addCartData={addCartData || undefined}
        isVisibleCreateDomain={isVisibleCreateDomain}
        hideCreateDomain={hideCreateDomain}
        onSuccess={() => {
          hideCreateDomain();
          refetch();
        }}
      />
      <ServiceDetailModal
        onCancel={() => setIsModalDetail(false)}
        isOpen={isModalDetail}
        serviceDetail={modalDetailData}
      />
    </div>
  );
};

export default MyServiceDomain;
