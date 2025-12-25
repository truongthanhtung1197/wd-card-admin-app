"use client";

import React, { memo, useCallback, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  SERVICE_FIELD_TYPE_OPTIONS,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { optionsStatusOrder,ORDER_STATUS  } from "@/store/Apis/Order.api";

import ButtonWaitPayment from "../../common/ButtonWaitPayment";
import MyButton from "../../common/MyButton";
import MyDateRange from "../../common/MyDateRange";
import SearchInput from "../../common/SearchInput";
import Text from "../../common/Text";
import MyMultipleSelect from "../../form/MyMultipleSelect";
import MySingleSelectSearch from "../../form/MySingleSelectSearch";

const ViewSearch = () => {
  const t = useTranslations("Partner.order.search");
  const tFieldType = useTranslations("serviceFieldType");

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
    [searchParams, pathname, router],
  );

  useEffect(() => {
    if (statusParam) {
      setStatus(statusParam as ORDER_STATUS);
    }
  }, [statusParam]);

  const optionsFieldTypeMultileLanguage = useMemo(() => {
    return SERVICE_FIELD_TYPE_OPTIONS.map((item) => ({
      ...item,
      label: tFieldType(item.key),
    }));
  }, [tFieldType]);

  const tStatus = useTranslations("statusOrder");
  const optionsStatusOrderMultileLanguage = useMemo(() => {
    return optionsStatusOrder.map((item) => ({
      ...item,
      label: tStatus(item.key),
    }));
  }, [tStatus]);

  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-[#e1e4e8] p-4">
      {/* Header Section */}
      <div className="flex w-full items-center justify-between gap-2">
        <Text variant="h3" className="text-lg font-bold">
          {t("title")}
        </Text>
        <ButtonWaitPayment totalAmount={0} />
      </div>

      <div className="row w-full flex-wrap gap-3">
        <SearchInput
          placeholder={"order code"}
          size="lg"
          className="w-[250px] min-w-[200px]"
          param="orderCode"
        />
        <MyMultipleSelect
          options={SERVICE_TYPE_OPTIONS}
          param="serviceType"
          labelContent={t("serviceType")}
        />
        <div className="w-[270px]">
          <MySingleSelectSearch
            param="status"
            options={optionsStatusOrderMultileLanguage}
            myVariant="v2"
            placeholder={"Order status"}
          />
        </div>

        <MyDateRange />

        <MyButton bType="neutral" onClick={handleClearQueryUrl} bSize="small">
          {t("clearFilter")}
        </MyButton>
      </div>
    </div>
  );
};

export default memo(ViewSearch);
