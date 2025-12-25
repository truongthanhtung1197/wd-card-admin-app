"use client";
import React, { memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import Text from "@/app/_components/common/Text";
import MySingleSelectSearch from "@/app/_components/form/MySingleSelectSearch";
import { DOMAIN_STATUS_OPTIONS } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

interface Props {
  onOpenCreateDomain?: () => void;
}

const ViewSearch: React.FC<Props> = ({ onOpenCreateDomain }) => {
  const t = useTranslations("SeoerDomain.myDomain");
  const router = useLocaleRouter();
  const pathname = usePathname();

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("title")}
        </Text>
      </div>
      <div className="row w-full flex-wrap gap-3">
        <SearchInput
          placeholder={t("search.placeholder")}
          size="lg"
          className="max-w-[400px]"
        />
        {/* <MyMultipleSelect
          options={SERVICE_FIELD_TYPE_OPTIONS}
          param="fieldType"
          labelContent="Lĩnh vực"
        /> */}
        <div className="w-[200px]">
          <MySingleSelectSearch
            param="status"
            options={DOMAIN_STATUS_OPTIONS}
            myVariant="v2"
            placeholder={t("search.status")}
          />
        </div>
        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("search.clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default memo(ViewSearch);
