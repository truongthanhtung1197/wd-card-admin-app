"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

import { SERVICE_TYPE } from "@/constant/service.constant";

import OrderDetailModal from "../../modal/Order/OrderDetailModal";
import MyPagination from "../../table/MyPagination";
import MyTable from "../../table/MyTable";
import Note from "../Note";
import ModalEditOrder from "./ModalEditOrder";
import { usePartnerOrderLogic } from "./useOrderLogic";
import ViewSearch from "./ViewSearch";

const PackPartner = () => {
  const t = useTranslations("Partner.note");
  const {
    columns,
    data,
    fetching,
    total,
    editService,
    isVisibleCreateDomain,
    hideEditOrder,
    refetch,
    isModalDetail,
    selectedOrder,
    handleCloseModal,
    serviceModalData,
  } = usePartnerOrderLogic();

  const content1 = useMemo(() => {
    return [t("content1.1"), t("content1.2"), t("content1.3"), t("content1.4")];
  }, [t]);
  const content2 = useMemo(() => {
    return [t("content2.1"), t("content2.2"), t("content2.3")];
  }, [t]);

  const serviceType = selectedOrder?.serviceType as SERVICE_TYPE;
  const serviceModalType = serviceModalData?.type || SERVICE_TYPE.GP;
  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSearch />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </span>
      <Note
        title1={t("title1")}
        content1={content1 as any}
        content2={content2 as any}
        title2={t("title2")}
      />
      <ModalEditOrder
        editService={editService || undefined}
        isVisibleCreateDomain={isVisibleCreateDomain}
        hideEditOrder={hideEditOrder}
        onSuccess={() => {
          hideEditOrder();
          refetch();
        }}
      />
      <OrderDetailModal
        orderData={selectedOrder}
        isOpen={isModalDetail}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default PackPartner;
