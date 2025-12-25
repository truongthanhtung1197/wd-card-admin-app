"use client";
import React from "react";
import { useParams } from "next/navigation";

import MyAccordion from "@/app/_components/common/MyAccordion";
import MyCard from "@/app/_components/common/MyCard";
import { DomainDetailView } from "@/app/_components/Views/DomainDetailModal/DomainDetailView";
import { IDomain } from "@/constant/Manager.constant";
import { useGetDomainByIdQuery } from "@/store/Apis/Domain.api";

import OrdersView from "../../../orders/Orders.view";

const AdminView = () => {
  const { domainId } = useParams();
  const {
    data: domainDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetDomainByIdQuery(domainId?.toString() || "", {
    refetchOnMountOrArgChange: true,
    skip: !domainId,
  });
  return (
    <div className="flex flex-col gap-4">
      <MyCard label="Basic Information">
        <DomainDetailView
          isLoading={false}
          isFetching={false}
          domainDetail={domainDetail?.data || ({} as IDomain)}
          totalDomainSpending={domainDetail?.totalDomainSpending || 0}
          refetch={refetch}
        />
      </MyCard>

      <MyAccordion title="Đơn hàng đã đi" defaultExpandedKeys={[]}>
        <OrdersView
          domainId={domainId?.toString() || ""}
          viewType="domainDetail"
        />
      </MyAccordion>
    </div>
  );
};

export default AdminView;
