"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import MySingleSelectSearch from "@/app/_components/form/MySingleSelectSearch";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { User69vn } from "@/model";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";

import SearchInput from "../../../../management/_components/SearchInput";
import SearchUserItem from "../../_components/SearchUserItem";

interface Props {
  onOpenCreateDomain?: () => void;
}

const ViewSeach: React.FC<Props> = ({ onOpenCreateDomain }) => {
  const t = useTranslations("Pack.search");
  const router = useLocaleRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState<string | undefined>("");
  const [valueSelected, setValueSelected] = useState<any>(null);
  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
    setValueSelected(null);
  }, [router, pathname, setValueSelected]);

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("partnerId", valueSelected?.id || "");
    router.replace(`${pathname}?${params.toString()}`);
  }, [valueSelected, router, pathname, searchParams]);

  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("title")}
        </Text>
      </div>
      <div className="row w-full flex-wrap gap-3">
        <SearchInput
          placeholder={t("placeholder")}
          size="lg"
          className="max-w-[400px]"
        />
        {/* <SearchAndSelect oldMemberSelect={SERVICE_TYPE_OPTIONS} /> */}
        <div className="w-[160px]">
          <MySingleSelectSearch
            options={SERVICE_TYPE_OPTIONS?.filter((item) =>
              [
                SERVICE_TYPE.TRAFFIC,
                SERVICE_TYPE.BACKLINK,
                SERVICE_TYPE.ENTITY,
              ].includes(item.key),
            )}
            placeholder={t("serviceType")}
            param="serviceType"
            myVariant="v2"
          />
        </div>

        <SearchableSelect
          renderItem={({ item, onClick, onRemove }) => {
            return (
              <SearchUserItem
                data={item as User69vn}
                onClick={onClick}
                onRemove={onRemove}
              />
            );
          }}
          placeholder={t("partner")}
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          setValueSelected={setValueSelected}
          valueSelected={valueSelected}
          data={partnerData}
          isLoading={isLoading}
        />

        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default memo(ViewSeach);
