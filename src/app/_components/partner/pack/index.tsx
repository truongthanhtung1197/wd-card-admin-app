"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { useImportServiceMutation } from "@/store/Apis/Service.api";

import MyPagination from "../../table/MyPagination";
import MyTable from "../../table/MyTable";
import Note from "../Note";
import ExcelImportModal from "./_components/ExcelImportModal";
import CreateOrEditService from "./CreateOrEditService";
import type { PackExcelData } from "./hooks/useExcelImport";
import { useExcelImport } from "./hooks/useExcelImport";
import { usePartnerLogic } from "./hooks/usePartnerLogic";
import ViewSeach from "./ViewSeach";

const PackPartner = () => {
  const t = useTranslations("Partner.note");
  const {
    columns,
    data,
    onOpenCreateDomain,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    fetching,
    editService,
    total,
    serviceDetailModal,
    setServiceDetailModal,
  } = usePartnerLogic();

  const [isImporting, setIsImporting] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);
  const { exportCurrentData } = useExcelImport();
  const [importService, { isLoading: loadingImport }] =
    useImportServiceMutation();

  const content1 = useMemo(() => {
    return [t("content1.1"), t("content1.2"), t("content1.3"), t("content1.4")];
  }, [t]);
  const content2 = useMemo(() => {
    return [t("content2.1"), t("content2.2"), t("content2.3")];
  }, [t]);

  // Xử lý khi import thành công
  const handleImportSuccess = async (importedData: PackExcelData[]) => {
    try {
      const dataWithTypePack = importedData.map((item: PackExcelData) => ({
        ...item,
        typePack: "PACK",
      }));
      await importService(dataWithTypePack).unwrap();
      refetch();
    } catch (error) {}
  };

  // Xử lý export Excel
  const handleExportExcel = () => {
    exportCurrentData(data);
  };

  return (
    <div className="col w-full gap-5 pb-20 pt-10">
      <ViewSeach
        onOpenCreateDomain={onOpenCreateDomain}
        onOpenImportExcel={() => setIsOpenImport(true)}
        onExportExcel={handleExportExcel}
        isImporting={isImporting}
      />
      <span className="w-full">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </span>
      <Note
        title1={t("title1")}
        content1={content1}
        content2={content2}
        title2={t("title2")}
      />
      <CreateOrEditService
        editService={editService || undefined}
        isVisibleCreateDomain={isVisibleCreateDomain}
        hideCreateDomain={hideCreateDomain}
        onSuccess={() => {
          hideCreateDomain();
          refetch();
        }}
      />

      <ExcelImportModal
        isOpen={isOpenImport}
        onClose={() => setIsOpenImport(false)}
        onImportSuccess={handleImportSuccess}
        setIsImporting={setIsImporting}
      />

      {/* {serviceDetailModal.isOpen && (
        <OrderDetailModal
          isOpen={serviceDetailModal.isOpen}
          onCancel={() =>
            setServiceDetailModal({
              isOpen: false,
              serviceData: null,
              serviceType: null,
            })
          }
          serviceData={serviceDetailModal.serviceData}
          partnerData={serviceDetailModal.serviceData?.user}
          headerTile={`Chi tiết dịch vụ: ${serviceDetailModal.serviceData?.name || ""}`}
          serviceType={serviceDetailModal.serviceType!}
          showHeader={true}
          showMetrics={true}
          showDescription={true}
          showFeedBackStar={false}
        />
      )} */}
    </div>
  );
};

export default PackPartner;
