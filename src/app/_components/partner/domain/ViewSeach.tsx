"use client";
import React, { memo, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { SERVICE_ORDER_STATUS_OPTIONS } from "@/constant/Manager.constant";
import { SERVICE_FIELD_TYPE_OPTIONS } from "@/constant/service.constant";
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
  const t = useTranslations("Partner.domain.search");
  const router = useLocaleRouter();
  const pathname = usePathname();

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  const tFieldType = useTranslations("serviceFieldType");
  const tStatusService = useTranslations("statusService");

  const optionsFieldTypeMultileLanguage = useMemo(() => {
    return SERVICE_FIELD_TYPE_OPTIONS.map((item) => ({
      ...item,
      label: tFieldType(item.key),
    }));
  }, [tFieldType]);

  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("title")}
        </Text>
        <div className="flex gap-2">
          {/* <MyButton bSize="small" bType="neutral" onClick={onExportExcel}>
            Export Excel
          </MyButton> */}
          <MyButton bSize="small" bType="neutral" onClick={onOpenImportExcel}>
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
          options={optionsFieldTypeMultileLanguage}
          param="fieldType"
          labelContent={t("field")}
        />
        <div className="w-[200px]">
          <MySingleSelectSearch
            param="status"
            options={SERVICE_ORDER_STATUS_OPTIONS.map((item) => ({
              ...item,
              label: tStatusService(item.key),
            }))}
            myVariant="v2"
            placeholder={t("status")}
          />
        </div>
        {/* <div className="w-[160px]">
          <MySingleSelectSearch
            options={SERVICE_TYPE_OPTIONS?.filter((item) =>
              [
                SERVICE_TYPE.BANNER,
                SERVICE_TYPE.GP,
                SERVICE_TYPE.TEXTLINK,
              ].includes(item.key),
            )}
            placeholder="Dịch vụ"
            param="serviceType"
            myVariant="v2"
          />
        </div> */}

        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default memo(ViewSeach);
