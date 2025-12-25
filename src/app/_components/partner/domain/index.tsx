"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { useImportServiceMutation } from "@/store/Apis/Service.api";

import { toast } from "../../common/Toaster";
import MyPagination from "../../table/MyPagination";
import MyTable from "../../table/MyTable";
import BannerText from "../BannerText";
import Note from "../Note";
import ExcelImportModal from "./_components/ExcelImportModal";
import CreateOrEditService from "./CreateOrEditService";
import type { DomainExcelData } from "./hooks/useExcelImport";
import { useExcelImport } from "./hooks/useExcelImport";
import { usePartnerLogic } from "./hooks/usePartnerLogic";
import ViewSeach from "./ViewSeach";

const DomainPartner = () => {
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
  } = usePartnerLogic();

  const [isOpenImport, setIsOpenImport] = useState(false);
  const { exportCurrentData } = useExcelImport() as ReturnType<
    typeof useExcelImport
  >;
  const [importService, { isLoading: loadingImport }] =
    useImportServiceMutation();

  const content1 = useMemo(() => {
    return [t("content1.1"), t("content1.2"), t("content1.3"), t("content1.4")];
  }, [t]);
  const content2 = useMemo(() => {
    return [t("content2.1"), t("content2.2"), t("content2.3")];
  }, [t]);

  // Xử lý khi import thành công
  const handleImportSuccess = async (data: DomainExcelData[]) => {
    try {
      await importService(data).unwrap();
      toast.success(
        "Dữ liệu của bạn đang được import trong nền bạn vui lòng chờ hoặc quay lại sau!",
      );
      refetch();
    } catch (error: any) {
      toast.error("Import thất bại. Vui lòng thử lại sau!");
    }
  };

  // Xử lý export Excel
  const handleExportExcel = () => {
    exportCurrentData(data);
  };

  const [isImporting, setIsImporting] = useState(false);

  return (
    <div className="col gap-5 pb-20 pt-10">
      <BannerText />
      <ViewSeach
        onOpenCreateDomain={onOpenCreateDomain}
        onOpenImportExcel={() => setIsOpenImport(true)}
        onExportExcel={handleExportExcel}
        isImporting={isImporting}
      />
      <div className="col">
        <MyTable fetching={fetching} columns={columns} data={data} />
        <MyPagination total={total} />
      </div>
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
    </div>
  );
};

export default DomainPartner;
