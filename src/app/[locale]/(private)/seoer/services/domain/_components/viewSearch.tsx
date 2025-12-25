"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import Text from "@/app/_components/common/Text";
import MyMultipleSelect from "@/app/_components/form/MyMultipleSelect";
import MySingleSelectSearch from "@/app/_components/form/MySingleSelectSearch";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  SERVICE_FIELD_TYPE_OPTIONS,
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { User69vn } from "@/model";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";

import SearchUserItem from "../../_components/SearchUserItem";

interface Props {
  onOpenCreateDomain?: () => void;
}

const ViewSearch: React.FC<Props> = ({ onOpenCreateDomain }) => {
  const t = useTranslations("SeoerDomain.services");
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState<string | undefined>("");
  const [valueSelected, setValueSelected] = React.useState<any>(null);
  const router = useLocaleRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const serviceType = searchParams.get("serviceType") || "GP";

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
    setValueSelected(null);
  }, [router, pathname, setValueSelected]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("partnerId", valueSelected?.id || "");
    router.replace(`${pathname}?${params.toString()}`);
  }, [valueSelected, router, pathname, searchParams]);

  const { data: partnerData, isLoading } = useGetAdminsQuery(
    {
      limit: limit,
      page: 1,
      role: ADMIN_ROLE.PARTNER,
      search: search,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const tFieldType = useTranslations("serviceFieldType");
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
      </div>
      <div className="row w-full flex-wrap gap-3">
        <SearchInput
          placeholder={t("search.placeholder")}
          size="lg"
          className="max-w-[400px]"
        />
        <MyMultipleSelect
          options={optionsFieldTypeMultileLanguage}
          param="fieldType"
          labelContent={t("search.fieldType")}
        />
        <div className="w-[160px]">
          <MySingleSelectSearch
            options={SERVICE_TYPE_OPTIONS?.filter((item) =>
              [
                SERVICE_TYPE.BANNER,
                SERVICE_TYPE.GP,
                SERVICE_TYPE.TEXTLINK,
              ].includes(item.key),
            )}
            placeholder={t("search.serviceType")}
            param="serviceType"
            myVariant="v2"
            defaultValue={serviceType}
          />
        </div>

        <SearchableSelect
          wrapClassName="w-[300px]"
          renderItem={({ item, onClick, onRemove }) => {
            return (
              <SearchUserItem
                data={item as User69vn}
                onClick={onClick}
                onRemove={onRemove}
              />
            );
          }}
          placeholder={t("search.partner")}
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          setValueSelected={setValueSelected}
          valueSelected={valueSelected}
          data={partnerData}
          isLoading={isLoading}
        />

        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("search.clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default ViewSearch;
