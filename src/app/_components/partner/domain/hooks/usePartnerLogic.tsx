import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { DisplayName } from "@/app/_components/common/DisplayName";
import { SortableHeader } from "@/app/_components/common/Sorting";
import {
  SERVICE_FIELD_TYPE,
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { useGetMyServicesQuery } from "@/store/Apis/Service.api";
import { cn } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";
import { statusServiceClass } from "@/utils/order.ultil";
import { Divider } from "@nextui-org/react";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "../ActionColumnService";

const RenderPriceServicePack = ({
  type,
  price,
  className,
}: {
  type?: string;
  price?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between gap-3", className)}>
      <p className="w-[180px] text-left text-base font-medium">{type}</p>
      <p className="line-clamp-1 w-full text-right text-base font-medium">
        {formatCurrency(Number(price))}
      </p>
    </div>
  );
};

const RenderPriceService = ({
  price,
  discount,
  priceAfterDiscount,
  t,
}: {
  price: number;
  discount: number;
  priceAfterDiscount: number;
  t: any;
}) => {
  return (
    <div className="col gap-1">
      <RenderPriceServicePack type={t("price.original")} price={price} />
      <Divider />
      <RenderPriceServicePack type={t("price.discount")} price={discount} />
      <Divider />
      <RenderPriceServicePack
        type={t("price.final")}
        className="text-[#066102]"
        price={priceAfterDiscount}
      />
    </div>
  );
};

const usePartnerLogic = () => {
  const searchParams = useSearchParams();
  const t = useTranslations("Partner.domain");
  const tStatusService = useTranslations("statusService");

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const fieldType = searchParams.get("fieldType") || undefined;
  const status = searchParams.get("status") || undefined;
  const serviceType = searchParams.get("serviceType") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const serviceTypeParams = useMemo(() => {
    switch (serviceType) {
      case SERVICE_TYPE.BANNER:
        return {
          isSaleBanner: true,
        };
      case SERVICE_TYPE.GP:
        return {
          isSaleGuestPost: true,
        };
      case SERVICE_TYPE.TEXTLINK:
        return {
          isSaleTextLink: true,
        };
      default:
        return {};
    }
  }, [serviceType]);

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetMyServicesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      typePack: SERVICE_TYPE_PACK.DOMAIN,
      fieldType: fieldType
        ? (fieldType.split(",") as SERVICE_FIELD_TYPE[])
        : undefined,
      ...serviceTypeParams,
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

  const commonCellClass =
    " w-full break-words text-center text-base font-medium";
  const cellStyle = "py-4 w-full flex items-center h-full justify-center";

  const columnHelper = createColumnHelper<Service>();

  const columns = useMemo(() => {
    const commonMeta = {
      className: "h-[100px] min-h-[100px]",
    };

    const result = [
      columnHelper.accessor("name", {
        size: 150,
        cell: (info) => (
          <div className={cellStyle}>
            <p className={commonCellClass}>{info?.getValue()}</p>
          </div>
        ),
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <SortableHeader sortKey="name">
              <p className="text-center font-medium text-white">
                {t("columns.name")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),

      // columnHelper.accessor("dr", {
      //   size: 80,
      //   cell: (info) => (
      //     <div className={cellStyle}>
      //       <DrCircle dr={info?.getValue() || 0} />
      //     </div>
      //   ),
      //   header: () => (
      //     <div className="flex h-full items-center justify-center py-3">
      //       <SortableHeader sortKey="dr">
      //         <p className="text-center font-medium text-white">
      //           {t("columns.dr")}
      //         </p>
      //       </SortableHeader>
      //     </div>
      //   ),
      //   meta: {
      //     ...commonMeta,
      //   },
      // }),

      // columnHelper.accessor("refDomain", {
      //   size: 100,
      //   cell: (info) => (
      //     <div className={cellStyle}>
      //       <p className={commonCellClass}>
      //         {formatNumberWithSuffix(info?.getValue() || 0)}
      //       </p>
      //     </div>
      //   ),
      //   header: () => (
      //     <div className="flex h-full items-center justify-center py-3">
      //       <SortableHeader sortKey="refDomain">
      //         <p className="text-center font-medium text-white">
      //           {t("columns.refDomain")}
      //         </p>
      //       </SortableHeader>
      //     </div>
      //   ),
      //   meta: {
      //     ...commonMeta,
      //   },
      // }),

      // columnHelper.accessor("organicTraffic", {
      //   size: 100,
      //   cell: (info) => (
      //     <div className={cellStyle}>
      //       <p className={commonCellClass}>
      //         {formatNumberWithSuffix(info?.getValue() || 0)}
      //       </p>
      //     </div>
      //   ),
      //   header: () => (
      //     <div className="flex h-full items-center justify-center py-3">
      //       <SortableHeader sortKey="organicTraffic">
      //         <p className="text-center font-medium text-white">
      //           {t("columns.organicTraffic")}
      //         </p>
      //       </SortableHeader>
      //     </div>
      //   ),
      //   meta: {
      //     ...commonMeta,
      //   },
      // }),

      columnHelper.display({
        id: "patner name",
        size: 120,
        cell: (info) => (
          <div className={cellStyle}>
            <DisplayName
              displayName={info?.row?.original?.user?.displayName}
              username={info?.row?.original?.user?.username}
              isAdmin={false}
            />
          </div>
        ),
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <p className="text-center font-medium text-white">
              {t("columns.partner")}
            </p>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),
      columnHelper.accessor("status", {
        size: 120,
        cell: (info) => {
          const status = info.getValue() || "";
          return (
            <div className={cellStyle}>
              <p
                className={cn(
                  "break-words text-center text-base font-medium",
                  statusServiceClass[status],
                )}
              >
                {tStatusService(status)}
              </p>
            </div>
          );
        },
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <SortableHeader sortKey="status">
              <p className="text-center font-medium text-white">
                {t("columns.status")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),
      columnHelper.accessor("guestPostPrice", {
        size: 200,
        cell: (info) => (
          <div className={cellStyle}>
            <p
              className={cn(
                commonCellClass,
                !info?.row?.original?.isSaleGuestPost && "text-accent-error",
              )}
            >
              {info?.row?.original?.isSaleGuestPost ? (
                <RenderPriceService
                  price={info?.row?.original?.guestPostPrice || 0}
                  discount={info?.row?.original?.discountGuestPostService || 0}
                  priceAfterDiscount={
                    (info?.row?.original?.guestPostPrice || 0) -
                    (info?.row?.original?.discountGuestPostService || 0)
                  }
                  t={t}
                />
              ) : (
                t("price.noSale")
              )}
            </p>
          </div>
        ),
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <SortableHeader sortKey="guestPostPrice">
              <p className="text-center font-medium text-white">
                {t("columns.guestPostPrice")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),
      columnHelper.accessor("bannerPrice", {
        size: 200,
        cell: (info) => (
          <div className={cellStyle}>
            <p
              className={cn(
                commonCellClass,
                !info?.row?.original?.isSaleBanner && "text-accent-error",
              )}
            >
              {info?.row?.original?.isSaleBanner ? (
                <RenderPriceService
                  price={info?.row?.original?.bannerPrice || 0}
                  discount={info?.row?.original?.discountBannerService || 0}
                  priceAfterDiscount={
                    (info?.row?.original?.bannerPrice || 0) -
                    (info?.row?.original?.discountBannerService || 0)
                  }
                  t={t}
                />
              ) : (
                t("price.noSale")
              )}
            </p>
          </div>
        ),
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <SortableHeader sortKey="bannerPrice">
              <p className="text-center font-medium text-white">
                {t("columns.bannerPrice")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),
      columnHelper.accessor("textLinkPrice", {
        size: 200,
        cell: (info) => (
          <div className={cellStyle}>
            <p
              className={cn(
                commonCellClass,
                !info?.row?.original?.isSaleTextLink && "text-accent-error",
              )}
            >
              {info?.row?.original?.isSaleTextLink ? (
                <RenderPriceService
                  price={info?.row?.original?.textLinkPrice || 0}
                  discount={info?.row?.original?.discountTextLinkService || 0}
                  priceAfterDiscount={
                    (info?.row?.original?.textLinkPrice || 0) -
                    (info?.row?.original?.discountTextLinkService || 0)
                  }
                  t={t}
                />
              ) : (
                t("price.noSale")
              )}
            </p>
          </div>
        ),
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <SortableHeader sortKey="textLinkPrice">
              <p className="text-center font-medium text-white">
                {t("columns.textLinkPrice")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          ...commonMeta,
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => (
          <div className="flex h-full items-center justify-center py-3">
            <p className="text-center font-medium text-white">
              {t("columns.actions")}
            </p>
          </div>
        ),
        cell: (cell) => {
          return (
            <div className={cellStyle}>
              <ActionColumnService
                onEdit={() => {
                  setEditService(cell.row.original);
                  showCreateDomain();
                }}
              />
            </div>
          );
        },
        meta: {
          className: "!w-[48px]",
        },
      }) as any,
    ];

    return result;
  }, [data, setEditService, showCreateDomain, t]);

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
  };
};

export { usePartnerLogic };
