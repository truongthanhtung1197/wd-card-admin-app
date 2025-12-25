"use client";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { EyeSlashFilledIcon } from "@/app/_components/icons/EyeSlashFilledIcon";
import { useVisibility } from "@/hook";

const DomainDetailModal = dynamic(
  () => import("@/app/_components/Views/DomainDetailModal"),
  {
    ssr: false,
  },
);

const ActionColumnDomain = memo(({ data }: { data: any }) => {
  const t = useTranslations("Domain");
  // detail
  const {
    isVisible: isShowDetail,
    show: showDetail,
    hide: hideDetail,
  } = useVisibility();
  return (
    <div className="center w-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          showDetail();
        }}
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200 hover:bg-red-50"
        title={t("columns.actions")}
        aria-label={t("columns.actions")}
      >
        <EyeSlashFilledIcon />
      </button>
      {isShowDetail && (
        <DomainDetailModal
          onCancel={hideDetail}
          isOpen={isShowDetail}
          domainId={data?.id}
        />
      )}
    </div>
  );
});

export default ActionColumnDomain;
