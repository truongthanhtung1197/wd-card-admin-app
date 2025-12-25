import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import MyTooltip from "@/app/_components/common/MyTooltip";
import { SortableHeader } from "@/app/_components/common/Sorting";
import Text from "@/app/_components/common/Text";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ROUTERS } from "@/constant";
import {
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Service } from "@/model/Partner.model";
import { useGetServicesQuery } from "@/store/Apis/Service.api";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { cn } from "@nextui-org/theme";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "./_components/actionColumn";

const useLogic = () => {
  const t = useTranslations("Pack");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const fieldType = searchParams.get("fieldType") || undefined;
  const partnerId = searchParams.get("partnerId") || undefined;
  const serviceType = searchParams.get("serviceType") || undefined;
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
      typePack: SERVICE_TYPE_PACK.PACK,
      type: serviceType as SERVICE_TYPE,
      status: SERVICE_STATUS.APPROVED,
      partnerId: Number(partnerId),
      ...serviceTypeParams,
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

  const onOpenCreateDomain = () => {
    setAddCart(null);
    showCreateDomain();
  };

  const handleViewDetails = (service: Service) => {
    setModalDetailData(service);
    setServiceTypeDetail((service.serviceType as SERVICE_TYPE) || null);
    setIsModalDetail(true);
  };
  const router = useLocaleRouter();

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
      columnHelper.accessor("type", {
        size: 100,
        cell: (info) => (
          <p className="text-left text-base font-medium">
            {getLabelFromOptions(
              info?.getValue() as SERVICE_TYPE,
              SERVICE_TYPE_OPTIONS,
            )}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.serviceType")}</p>,
      }),
      columnHelper.display({
        id: "partner_name",
        size: 140,
        cell: (info) => (
          <div className="break-words">
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
          className: "min-w-[140px]",
        },
      }),
      columnHelper.accessor("urlDemo", {
        cell: (info) => (
          <MyTooltip content={info?.getValue()}>
            <p className="line-clamp-2 break-all text-left text-base font-medium">
              {info?.getValue() ?? "-"}
            </p>
          </MyTooltip>
        ),
        header: () => (
          <p className="text-left text-base font-medium">
            {t("columns.demoLink")}
          </p>
        ),
        meta: {
          className: "!w-[80px]",
        },
      }),
      columnHelper.accessor("note", {
        cell: (info) => (
          <MyTooltip content={info?.getValue()}>
            <p className="line-clamp-4 break-all text-left text-base font-medium">
              {info?.getValue() || "-"}
            </p>
          </MyTooltip>
        ),
        header: () => (
          <p className="text-left text-base font-medium">{t("columns.note")}</p>
        ),
      }),
      columnHelper.accessor("price", {
        size: 200,
        cell: (info) => (
          <div
            className={`flex h-full w-full items-center justify-center py-2`}
          >
            <div className="w-full gap-1 text-sm font-medium">
              <RenderPriceCell
                price={info.getValue()}
                discount={info?.row?.original?.discountPackService}
              />
            </div>
          </div>
        ),
        header: () => (
          <SortableHeader sortKey="price">
            <p className="w-full text-right text-base font-medium">
              {t("columns.price")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[300px]",
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
    onOpenCreateDomain,
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

export const RenderPriceCell = ({
  price,
  className,
  discount,
}: {
  price?: number;
  className?: string;
  discount?: number;
}) => {
  const t = useTranslations("Pack");
  return (
    <div className={cn("col gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <Text variant="body1-regular">{t("price.original")}</Text>
        <Text variant="body1-regular">{formatCurrency(Number(price))}</Text>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Text variant="body1-regular">{t("price.discount")}</Text>
        <Text variant="body1-regular">{formatCurrency(Number(discount))}</Text>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Text variant="body1-regular">{t("price.final")}</Text>
        <Text variant="body1-regular" className="font-bold text-[#813636]">
          {formatCurrency((Number(price) || 0) - (Number(discount) || 0))}
        </Text>
      </div>
    </div>
  );
};
