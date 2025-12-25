"use client";
import React, { memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { SERVICE_ORDER_STATUS_OPTIONS } from "@/constant/Manager.constant";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import MyButton from "../../common/MyButton";
import SearchInput from "../../common/SearchInput";
import ShowMessage from "../../common/ShowMessage";
import Text from "../../common/Text";
import MyMultipleSelect from "../../form/MyMultipleSelect";
import MySingleSelectSearch from "../../form/MySingleSelectSearch";
import PlusIcon from "../../icons/PlusIcon";

interface Props {
  onOpenCreateDomain?: () => void;
  onOpenImportExcel?: () => void;
  onExportExcel?: () => void;
  isImporting?: boolean;
}

const ViewSeach: React.FC<Props> = ({
  onOpenCreateDomain,
  onOpenImportExcel,
  onExportExcel,
  isImporting,
}) => {
  const t = useTranslations("Pack.search");
  const router = useLocaleRouter();
  const pathname = usePathname();

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);
  const tStatusService = useTranslations("statusService");
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("title")}
        </Text>
        <div className="flex items-center gap-3">
          {/* <MyButton bSize="small" bType="secondary" onClick={onExportExcel}>
            Export Excel
          </MyButton> */}

          <MyButton bSize="small" bType="secondary" onClick={onOpenImportExcel}>
            Import Excel
          </MyButton>
          <MyButton
            bSize="small"
            startContent={<PlusIcon fill="#fff" />}
            className="bg-brand-primary"
            onClick={onOpenCreateDomain}
          >
            {t("button")}
          </MyButton>
        </div>
      </div>
      {isImporting && (
        <ShowMessage
          variant="warning"
          text="Dữ liệu import của bạn đang được xử lí trong nền. Bạn vui lòng chờ
          hoặc quay lại hoặc làm mới trang sau vài phút!"
        />
      )}
      <div className="row w-full flex-wrap gap-3">
        <SearchInput
          placeholder={t("placeholder")}
          size="lg"
          className="max-w-[400px]"
        />
        <MyMultipleSelect
          options={[
            {
              key: "true",
              label: "Index",
            },
            {
              key: "false",
              label: "No Index",
            },
          ]}
          param="isIndex"
          labelContent={t("status")}
        />

        <div className="w-[200px]">
          <MySingleSelectSearch
            param="status"
            options={SERVICE_ORDER_STATUS_OPTIONS.map((item) => ({
              ...item,
              label: tStatusService(item.key),
            }))}
            myVariant="v2"
            placeholder={t("serviceStatus")}
          />
        </div>
        <MyMultipleSelect
          options={SERVICE_TYPE_OPTIONS?.filter((item) =>
            [
              SERVICE_TYPE.TRAFFIC,
              SERVICE_TYPE.ENTITY,
              SERVICE_TYPE.BACKLINK,
              SERVICE_TYPE.TOOL,
            ].includes(item.key),
          )}
          param="serviceType"
          labelContent={t("service")}
        />
        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default memo(ViewSeach);
