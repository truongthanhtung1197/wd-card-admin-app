import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { DisplayName } from "@/app/_components/common/DisplayName";
import {
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { useGetServicesQuery } from "@/store/Apis/Service.api";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "./_components/actionColumn";

const useLogic = () => {
  const t = useTranslations("Pack");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const partnerId = searchParams.get("partnerId") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const [isModalDetail, setIsModalDetail] = useState(false);

  const [modalDetailData, setModalDetailData] = useState<Service | null>(null);
  const [serviceTypeDetail, setServiceTypeDetail] =
    useState<SERVICE_TYPE | null>(null);

  const useViewAction = useCallback((item: any) => {
    if (!item.id) return;
    setModalDetailData(item);
    setIsModalDetail(true);
  }, []);

  useEffect(() => {
    if (!isModalDetail) {
      setModalDetailData(null);
    }
  }, [isModalDetail]);

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetServicesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      typePack: SERVICE_TYPE_PACK.CONTENT,
      status: SERVICE_STATUS.APPROVED,
      partnerId: Number(partnerId) || undefined,
      isShow: true,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [addCartData, setAddCart] = useState<Service | null>(null);

  const {
    isVisible: isVisibleCreateDomain,
    show: showCreateDomain,
    hide: hideCreateDomain,
  } = useVisibility();

  const handleViewDetails = (service: Service) => {
    setModalDetailData(service);
    setServiceTypeDetail((service.serviceType as SERVICE_TYPE) || null);
    setIsModalDetail(true);
  };

  const columnHelper = createColumnHelper<Service>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("name", {
        size: 250,
        cell: (info) => (
          <p
            className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(info.row.original);
            }}
          >
            {info?.getValue() ?? "-"}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.name")}</p>,
      }),
      columnHelper.display({
        id: "patner name",
        size: 140,
        cell: (info) => (
          <div className="break-words">
            <DisplayName
              displayName={info?.row?.original?.user?.displayName}
              username={info?.row?.original?.user?.username}
              isAdmin={false}
            />
          </div>
        ),
        header: () => (
          <p className="text-left text-base font-medium">
            {t("columns.partner")}
          </p>
        ),
        meta: {
          className: "min-w-[140px]",
        },
      }),
      columnHelper.accessor("urlDemo", {
        size: 180,
        cell: (info) => (
          <p className="break-all text-left text-base font-medium">
            {info?.getValue() ?? "-"}
          </p>
        ),
        header: () => (
          <p className="text-left text-base font-medium">
            {t("columns.demoLink")}
          </p>
        ),
      }),
      columnHelper.accessor("note", {
        size: 250,
        cell: (info) => (
          <p className="break-words text-left text-base font-medium">
            {info?.getValue() || "-"}
          </p>
        ),
        header: () => (
          <p className="text-left text-base font-medium">{t("columns.note")}</p>
        ),
      }),
      // columnHelper.accessor("price", {
      //   size: 200,
      //   cell: (info) => (
      //     <div
      //       className={`flex h-full w-full items-center justify-center py-2`}
      //     >
      //       <div className="w-full gap-1 text-sm font-medium">
      //         <RenderPriceCell
      //           price={info.getValue()}
      //           discount={info?.row?.original?.discountPackService}
      //         />
      //       </div>
      //     </div>
      //   ),
      //   header: () => (
      //     <SortableHeader sortKey="price">
      //       <p className="w-full text-right text-base font-medium">
      //         {t("columns.price")}
      //       </p>
      //     </SortableHeader>
      //   ),
      //   meta: {
      //     className: "!w-[300px]",
      //   },
      // }),
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
                  setServiceTypeDetail(cell?.row?.original?.type as any);
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
  }, [data, setAddCart, showCreateDomain, t]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    columns,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    fetching,
    addCartData,
    isModalDetail,
    setIsModalDetail,
    modalDetailData,
    serviceTypeDetail,
  };
};

export { useLogic };
