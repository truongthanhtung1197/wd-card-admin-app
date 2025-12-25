import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ROUTERS } from "@/constant";
import {
  SERVICE_FIELD_TYPE,
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Service } from "@/model/Partner.model";
import { useGetServicesQuery } from "@/store/Apis/Service.api";
import { getKeyAndLabelServiceType } from "@/utils/common.util";
import {
  getFormattedLabelPrice,
  getPriceAndDiscountService,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import { RenderPriceCell } from "../pack/pack.logic";
import ActionColumnService from "./_components/actionColumn";

// Create a DR Circle component for table cells with green color

const useLogic = () => {
  const t = useTranslations("SeoerDomain.services");
  const searchParams = useSearchParams();
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [modalDetailData, setModalDetailData] = useState<any>({});

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const fieldType = searchParams.get("fieldType") || undefined;
  const serviceType = ["BANNER", "GP", "TEXTLINK"].includes(
    searchParams.get("serviceType") || "",
  )
    ? searchParams.get("serviceType")
    : "GP";
  const partnerId = searchParams.get("partnerId") || undefined;
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
  } = useGetServicesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      typePack: SERVICE_TYPE_PACK.DOMAIN,
      status: SERVICE_STATUS.APPROVED,
      fieldType: fieldType
        ? (fieldType.split(",") as SERVICE_FIELD_TYPE[])
        : undefined,
      // serviceType: serviceType as SERVICE_TYPE,
      partnerId: Number(partnerId) || "",
      ...serviceTypeParams,
      isShow: true,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [addCartData, setAddCart] = useState<any | null>(null);

  const useViewAction = useCallback((item: any) => {
    if (!item.id) return;
    setModalDetailData(item);
    setIsModalDetail(true);
  }, []);

  useEffect(() => {
    if (!isModalDetail) {
      setModalDetailData({});
    }
  }, [isModalDetail]);

  const {
    isVisible: isVisibleCreateDomain,
    show: showCreateDomain,
    hide: hideCreateDomain,
  } = useVisibility();

  const onOpenCreateDomain = () => {
    setAddCart(null);
    showCreateDomain();
  };

  const router = useLocaleRouter();

  const columnHelper = createColumnHelper<Service>();

  const columns = useMemo(() => {
    const commonMeta = {
      className: "h-[100px] min-h-[100px]",
    };

    // Get the correct price field key based on service type
    const priceFieldKey = getKeyAndLabelServiceType(
      serviceType as SERVICE_TYPE,
    ).key;

    const result = [
      columnHelper.accessor("name", {
        size: 200,
        cell: (info) => (
          <p className="break-words text-left text-base font-medium">
            {info?.getValue() ?? "-"}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.domainName")}</p>,
        meta: {
          ...commonMeta,
        },
      }),

      columnHelper.display({
        id: "partner_name",
        size: 140,
        cell: (info) => (
          <div>
            <UserInformationV2
              user={info?.row?.original?.user}
              onNameClick={() => {
                router.push(
                  ROUTERS.MANAGEMENT_PARTNER_DETAIL.replace(
                    ":id",
                    info?.row?.original?.user?.id?.toString() || "",
                  ),
                );
              }}
            />
          </div>
        ),
        header: () => (
          <p className="text-left text-base font-medium">
            {t("columns.partner")}
          </p>
        ),
        meta: {
          ...commonMeta,
          className: "min-w-[156px] h-[100px]",
        },
      }),

      // columnHelper.display({
      //   id: "refDomain",
      //   size: 120,
      //   cell: (info) => (
      //     <p className="text-left text-base font-medium">
      //       {formatNumberWithSuffix(info?.row?.original?.refDomain) ?? "-"}
      //     </p>
      //   ),
      //   header: () => (
      //     <SortableHeader sortKey="refDomain">
      //       <p className="text-left font-medium text-white">RefDomain</p>
      //     </SortableHeader>
      //   ),
      //   meta: {
      //     ...commonMeta,
      //   },
      // }),

      // columnHelper.display({
      //   id: "dr",
      //   size: 120,
      //   cell: (info) => {
      //     const dr = info?.row?.original?.dr || 0;
      //     return (
      //       <div className="flex h-full w-full items-center justify-center">
      //         <DrCircle dr={dr} />
      //       </div>
      //     );
      //   },
      //   header: () => (
      //     <div className="flex w-full items-center justify-center">
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

      // columnHelper.display({
      //   id: "organicTraffic",
      //   size: 120,
      //   cell: (info) => (
      //     <p className="text-left text-base font-medium">
      //       {formatNumberWithSuffix(info?.row?.original?.organicTraffic) ?? "-"}
      //     </p>
      //   ),
      //   header: () => (
      //     <SortableHeader sortKey="organicTraffic">
      //       <p className="text-left font-medium text-white">
      //         {"Organic traffic"}
      //       </p>
      //     </SortableHeader>
      //   ),
      //   meta: {
      //     ...commonMeta,
      //   },
      // }),

      columnHelper.accessor("guestPostPrice", {
        size: 150,
        cell: (info) => {
          const price = getPriceAndDiscountService(
            serviceType as SERVICE_TYPE,
            info?.row?.original,
          );
          return (
            <div className="w-full gap-1 text-sm font-medium">
              <RenderPriceCell price={price.price} discount={price.discount} />
            </div>
          );
        },
        header: () => (
          <SortableHeader sortKey={priceFieldKey}>
            <p className="w-full text-right text-base font-medium">
              {getFormattedLabelPrice(serviceType as SERVICE_TYPE, t)}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[200px]",
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => <p className="text-center">{t("columns.actions")}</p>,
        cell: (cell) => {
          return (
            <div className="flex items-center justify-center">
              <ActionColumnService
                data={cell.row.original}
                onEdit={() => {
                  setAddCart(cell.row.original);
                  showCreateDomain();
                }}
                viewAction={useViewAction}
              />
            </div>
          );
        },
        meta: {
          className: "!w-[70px]",
        },
      }) as any,
    ];

    return result;
  }, [data, setAddCart, showCreateDomain, serviceType]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    columns,
    onOpenCreateDomain,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    fetching,
    addCartData,
    isModalDetail,
    setIsModalDetail,
    modalDetailData,
  };
};

export { useLogic };
