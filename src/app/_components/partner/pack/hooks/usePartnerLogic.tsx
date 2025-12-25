import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import {
  SERVICE_FIELD_TYPE,
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { useGetMyServicesQuery } from "@/store/Apis/Service.api";
import { cn } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { statusServiceClass } from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "../ActionColumnService";

const usePartnerLogic = () => {
  const t = useTranslations("Pack");
  const tStatusService = useTranslations("statusService");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const fieldType = searchParams.get("fieldType") || undefined;
  const serviceType = searchParams.get("serviceType") || undefined;
  const isIndex = searchParams.get("isIndex") || undefined;
  const status = searchParams.get("status") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const [serviceDetailModal, setServiceDetailModal] = useState<{
    isOpen: boolean;
    serviceData: any;
    serviceType: SERVICE_TYPE | null;
  }>({
    isOpen: false,
    serviceData: null,
    serviceType: null,
  });

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetMyServicesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      typePack: SERVICE_TYPE_PACK.PACK,
      fieldType: fieldType
        ? (fieldType.split(",") as SERVICE_FIELD_TYPE[])
        : undefined,
      type: serviceType ? (serviceType.split(",") as any[]) : undefined,
      isIndex:
        isIndex === "true" || isIndex === "false"
          ? isIndex === "true"
          : undefined,
      status: status as SERVICE_STATUS,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [editService, setEditService] = useState<Service | null>(null);

  const {
    isVisible: isVisibleCreateDomain,
    show: showCreateDomain,
    hide: hideCreateDomain,
  } = useVisibility();

  const onOpenCreateDomain = () => {
    setEditService(null);
    showCreateDomain();
  };

  const handleViewServiceDetails = (service: Service) => {
    // Determine service type based on service properties
    let serviceType: SERVICE_TYPE = SERVICE_TYPE.GP; // default
    if (service.isSaleGuestPost) serviceType = SERVICE_TYPE.GP;
    else if (service.isSaleTextLink) serviceType = SERVICE_TYPE.TEXTLINK;
    else if (service.isSaleBanner) serviceType = SERVICE_TYPE.BANNER;

    setServiceDetailModal({
      isOpen: true,
      serviceData: service,
      serviceType: serviceType,
    });
  };

  const commonCellClass = "break-words text-left text-sm font-medium";
  const columnHelper = createColumnHelper<Service>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("name", {
        size: 150,
        cell: (info) => (
          <p
            className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewServiceDetails(info.row.original);
            }}
          >
            {info?.getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="name">
            <p className="break-words text-left text-base font-medium">
              {t("columns.name")}
            </p>
          </SortableHeader>
        ),
      }),
      columnHelper.display({
        id: "serviceType",
        size: 100,
        cell: (info) => (
          <p
            className={cn(
              commonCellClass,
              "break-words text-left text-base font-medium",
            )}
          >
            {getLabelFromOptions(
              info?.row?.original?.type as SERVICE_TYPE,
              SERVICE_TYPE_OPTIONS,
            )}
          </p>
        ),
        header: () => (
          <p className="break-words text-left text-base font-medium">
            {t("columns.serviceType")}
          </p>
        ),
      }),
      columnHelper.accessor("status", {
        size: 80,
        cell: (info) => (
          <p
            className={cn(
              commonCellClass,
              "break-words text-left text-base font-medium",
            )}
          >
            {info?.row?.original?.isIndex ? "Index" : "No Index"}
          </p>
        ),
        header: () => (
          <p className="break-words text-left text-base font-medium">
            {t("search.status")}
          </p>
        ),
      }),
      columnHelper.accessor("status", {
        size: 100,
        cell: (info) => {
          const status = info.getValue() || "";

          return (
            <p
              className={cn(
                "break-words text-left text-base font-medium",
                statusServiceClass[status],
              )}
            >
              {tStatusService(status)}
            </p>
          );
        },
        header: () => (
          <SortableHeader sortKey="status">
            <p className="break-words text-left text-base font-medium">
              {t("search.serviceStatus")}
            </p>
          </SortableHeader>
        ),
      }),

      columnHelper.accessor("urlDemo", {
        size: 150,
        cell: (info) => (
          <p className="break-all text-left text-base font-medium">
            {info?.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.demoLink")}</p>,
      }),
      columnHelper.accessor("note", {
        size: 120,
        cell: (info) => (
          <p className="break-words text-left text-base font-medium">
            {info?.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.note")}</p>,
      }),
      columnHelper.accessor("price", {
        size: 120,
        cell: (info) => (
          <p
            className={cn(
              commonCellClass,
              "break-words text-right text-base font-medium",
            )}
          >
            {formatCurrency(info.getValue())}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="price">
            <p className="break-words text-right text-base font-medium">
              {t("columns.price")}
            </p>
          </SortableHeader>
        ),
      }),
      columnHelper.accessor("discountPackService", {
        size: 120,
        cell: (info) => (
          <p
            className={cn(
              commonCellClass,
              "break-words text-right text-base font-medium",
            )}
          >
            {formatCurrency(info.getValue())}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="discountPackService">
            <p className="break-words text-right text-base font-medium">
              {t("price.discount")}
            </p>
          </SortableHeader>
        ),
      }),
      columnHelper.accessor("price", {
        size: 150,
        cell: (info) => (
          <p
            className={cn(
              commonCellClass,
              "break-words text-right text-base font-medium",
            )}
          >
            {formatCurrency(
              (info.getValue() || 0) -
                (info.row?.original?.discountPackService || 0),
            )}
          </p>
        ),
        header: () => (
          <p className="break-words text-right text-base font-medium">
            {t("price.final")}
          </p>
        ),
      }),
      columnHelper.display({
        id: "action",
        header: () => (
          <p className="text-center text-base font-medium">{t("columns.actions")}</p>
        ),
        cell: (cell) => {
          return (
            <div className="flex items-center justify-center">
              <ActionColumnService
                data={cell.row.original}
                onEdit={() => {
                  setEditService(cell.row.original);
                  showCreateDomain();
                }}
                refetch={refetch}
              />
            </div>
          );
        },
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px] px-0",
        },
      }) as any,
    ];

    return result;
  }, [data, setEditService, refetch, showCreateDomain, t]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    columns,
    onOpenCreateDomain,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    fetching,
    editService,
    serviceDetailModal,
    setServiceDetailModal,
  };
};

export { usePartnerLogic };
