"use client";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { optionsStatusOrder, ORDER_STATUS } from "@/store/Apis/Order.api";

import MyButton from "../../common/MyButton";
import MyDateRange from "../../common/MyDateRange";
import SearchInput from "../../common/SearchInput";
import Text from "../../common/Text";
import MySingleSelectSearch from "../../form/MySingleSelectSearch";

const ViewSeach = () => {
  const t = useTranslations("MyOrder");
  const router = useLocaleRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<ORDER_STATUS | undefined>(
    undefined,
  );

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
    setStatus(undefined);
  }, [router, pathname]);

  const statusParam = searchParams.get("status") || "";

  const handleChangeStatus = useCallback(
    (e: any) => {
      const value = e.target.value;
      if (!value) {
        return;
      }
      setStatus(value);

      const params = new URLSearchParams(searchParams);
      params.set("status", value?.toString());
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname],
  );

  useEffect(() => {
    if (statusParam) {
      setStatus(statusParam as ORDER_STATUS);
    }
  }, [statusParam]);

  const tStatus = useTranslations("statusOrder");
  const optionsStatusOrderMultileLanguage = useMemo(() => {
    return optionsStatusOrder.map((item) => ({
      ...item,
      label: tStatus(item.key),
    }));
  }, [tStatus]);

  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("search.title")}
        </Text>
      </div>
      <div className="row w-full flex-wrap items-end gap-3">
        <div className="flex h-full flex-col justify-between">
          <SearchInput
            placeholder={t("search.orderCodePlaceholder")}
            size="lg"
            className="w-[250px]"
            param="orderCode"
          />
        </div>
        <div className="flex h-full w-[350px] flex-col justify-between">
          <MySingleSelectSearch
            param="status"
            options={optionsStatusOrderMultileLanguage}
            myVariant="v2"
            placeholder={t("search.statusPlaceholder")}
          />
        </div>
        <div className="flex h-full flex-col justify-between">
          <span>{t("search.orderDate")}</span>
          <MyDateRange />
        </div>
        <div className="flex h-full flex-col items-end justify-between">
          <span></span>
          <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
            {t("search.clearFilter")}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default memo(ViewSeach);
