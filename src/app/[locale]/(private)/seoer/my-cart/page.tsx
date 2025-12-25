"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { formatCurrency } from "@/utils/format.util";

import OrderModalComponent from "./_component/OrderModalComponent";
import { AdminDetailLogic } from "./MyCart.logic";

const Page = () => {
  const t = useTranslations("MyCart");
  const {
    columns,
    data,
    loadingState,
    total,
    totalPrice,
    handleShowModalOrder,
    handleOrderSubmit,
    checkedListData,
    isModalOrder,
    setIsModalOrder,
    isLoadingCreateOrder,
    serviceModalData,
  } = AdminDetailLogic();
  return (
    <div className="container-page my-5 flex flex-col gap-6 ">
      <div className="text-[20px] font-bold">{t("title")}</div>
      <MyTable
        columns={columns}
        data={data || []}
        fetching={loadingState}
        NoDataProps={{
          title: t("empty.title"),
          message: t("empty.message"),
        }}
        getRowClassName={(row) => {
          if (!row?.isPartnerRow) return "!bg-[#FFFCE4]";
          return "";
        }}
      />
      <MyPagination total={total} />
      <div className="flex items-center justify-end gap-x-4">
        <div className="text-[20px] font-bold">
          {t("order.totalPayment")} {formatCurrency(totalPrice)}
        </div>
        <MyButton onClick={handleShowModalOrder}>
          {t("order.placeOrder")}
        </MyButton>
      </div>
      <OrderModalComponent
        isLoadingSubmit={isLoadingCreateOrder}
        funcConfirm={handleOrderSubmit}
        data={checkedListData}
        isOpen={isModalOrder}
        onCancel={() => setIsModalOrder(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Page;
