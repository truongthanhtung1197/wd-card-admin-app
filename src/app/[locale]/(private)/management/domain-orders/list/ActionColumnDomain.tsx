"use client";
import React, { memo } from "react";
import { useTranslations } from "next-intl";

import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

const ActionDomainColumn = memo(({ data }: { data: any }) => {
  const t = useTranslations("Domain");
  const router = useLocaleRouter();

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          router.push(
            ROUTERS.MANAGEMENT_DOMAIN_ORDER_DETAIL.replace(
              ":id",
              String(data?.id || ""),
            ),
          );
        }}
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
        title={t("columns.actions")}
        aria-label={t("columns.actions")}
      >
        <EyeSlashFilledIcon />
      </button>
    </div>
  );
});

export default ActionDomainColumn;
