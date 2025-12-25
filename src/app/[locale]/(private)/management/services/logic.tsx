import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import CheckedIcon from "@/app/_components/icons/CheckedIcon";
import UnCheckIcon from "@/app/_components/icons/UnCheckIcon";
import { ROUTERS } from "@/constant";
import { PermissionEnum } from "@/constant/Permission.constant";
import {
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Service } from "@/model/Partner.model";
import { useGetServicesQuery } from "@/store/Apis/Service.api";
import { checkPermission } from "@/utils/auth.utils";
import { cn } from "@/utils/common.util";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { statusServiceClass } from "@/utils/order.ultil";
import { Divider } from "@nextui-org/react";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "./ActionColumnService";

const useAdminLogic = () => {
  const t = useTranslations("ServiceManagement");
  const tStatus = useTranslations("statusService");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const status = searchParams.get("status") || undefined;
  const partnerId = searchParams.get("partnerId") || undefined;
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
        return {
          type: serviceType,
        };
    }
  }, [serviceType]);

  const {
    data,
    isFetching: fetching,
    refetch,
  } = useGetServicesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      status: status as SERVICE_STATUS,
      search,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
      ...serviceTypeParams,
      partnerId: partnerId,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<any>();

  const [isModalDetail, setIsModalDetail] = useState(false);
  const [modalDetailData, setModalDetailData] = useState<any>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleViewDetails = useCallback((data: any) => {
    if (!data) return;
    setModalDetailData(data);
    setIsModalDetail(true);
  }, []);

  const handleSelectRow = useCallback((rowId: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        const allIds = new Set(
          data?.data?.map((item: any) => item.id?.toString()) || [],
        );
        setSelectedRows(allIds);
      } else {
        setSelectedRows(new Set());
      }
    },
    [data?.data],
  );

  const router = useLocaleRouter();

  const columns = useMemo(() => {
    const result = [
      columnHelper.display({
        id: "select",
        header: () => {
          const dataLength = data?.data?.length || 0;
          const allSelected =
            dataLength > 0 && selectedRows.size === dataLength;
          const someSelected =
            selectedRows.size > 0 && selectedRows.size < dataLength;

          return (
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAll(!allSelected);
                }}
                className="flex items-center justify-center"
              >
                {allSelected ? (
                  <CheckedIcon size="20" />
                ) : someSelected ? (
                  <CheckedIcon size="20" fill="#05610180" />
                ) : (
                  <UnCheckIcon size="20" />
                )}
              </button>
            </div>
          );
        },
        cell: (info) => {
          const rowId = info.row.original.id?.toString() || "";
          const isSelected = selectedRows.has(rowId);

          return (
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRow(rowId);
                }}
                className="flex items-center justify-center"
              >
                {isSelected ? (
                  <CheckedIcon size="20" />
                ) : (
                  <UnCheckIcon size="20" />
                )}
              </button>
            </div>
          );
        },
        meta: {
          className: "!w-[60px] !min-w-[60px] !max-w-[60px]",
        },
      }),
      columnHelper.accessor("name", {
        cell: (info) => (
          <p
            className="line-clamp-4 cursor-pointer whitespace-normal text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(info.row.original);
            }}
          >
            {info.getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="name">
            <p className="text-left">{t("columns.name")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("user", {
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
        header: () => <p className="text-left">{t("columns.partner")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("type", {
        cell: (info) => {
          if (info.row.original.typePack === SERVICE_TYPE_PACK.CONTENT) {
            return (
              <p className="truncate text-left text-base font-medium">
                Contents
              </p>
            );
          }
          return (
            <p className="truncate text-left text-base font-medium">
              {info.row.original.typePack === "DOMAIN"
                ? "GP/Textlink/Banner"
                : info?.getValue()}
            </p>
          );
        },
        header: () => (
          <SortableHeader sortKey="type">
            <p className="text-left">{t("columns.type")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("price", {
        cell: (info) => <RenderPriceService data={info.row.original} />,
        header: () => <p className="text-right">{t("columns.price")}</p>,
        meta: {
          className: "!min-w-[256px] !w-[256px]",
        },
      }),
      columnHelper.accessor("status", {
        cell: (info) => {
          const status = info.getValue();

          return (
            <p
              className={cn(
                "truncate text-left text-base font-medium",
                statusServiceClass[status] || "",
              )}
            >
              {tStatus(status)}
            </p>
          );
        },
        header: () => (
          <SortableHeader sortKey="status">
            <p className="text-left">{t("columns.status")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {formatDateTime((info.getValue() as unknown as string) || "")}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="createdAt">
            <p className="text-left">{t("columns.createdAt")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
    ];
    {
      result.push(
        columnHelper.display({
          id: "action",
          header: () => <p className="text-center">Action</p>,
          cell: (cell) => {
            return (
              <ActionColumnService
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.length}
                onViewDetails={handleViewDetails}
              />
            );
          },
          meta: {
            className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
          },
        }) as any,
      );
    }
    return result;
  }, [
    data,
    data?.data,
    router,
    t,
    selectedRows,
    handleSelectRow,
    handleSelectAll,
  ]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
    isCanEdit: checkPermission({
      permission: {},
      accessKeys: [PermissionEnum.USER_MGMT_EDIT],
    }),
    isModalDetail,
    setIsModalDetail,
    modalDetailData,
    selectedRows,
    setSelectedRows,
    refetch,
  };
};

export { useAdminLogic };

const RenderPriceService = ({ data }: { data: Service }) => {
  const t = useTranslations("ServiceManagement");
  const {
    typePack,
    price,
    textLinkPrice,
    guestPostPrice,
    bannerPrice,
    isSaleTextLink,
    isSaleGuestPost,
    isSaleBanner,
    discountPackService,
    discountGuestPostService,
    discountTextLinkService,
    discountBannerService,
    type,
  } = data;
  if (typePack === SERVICE_TYPE_PACK.PACK) {
    return (
      <>
        <RenderDiscoutService type={t("price.original")} price={price} />
        <RenderDiscoutService
          type={t("price.discount")}
          price={discountPackService}
        />
        <RenderDiscoutService
          type={t("price.final")}
          className="font-bold text-[#066102]"
          price={Number(price) - Number(discountPackService)}
        />
      </>
    );
  }
  if (typePack === SERVICE_TYPE_PACK.DOMAIN) {
    return (
      <div className="col gap-1">
        {isSaleGuestPost && (
          <>
            <RenderPriceServicePack
              type={SERVICE_TYPE.GP}
              price={guestPostPrice}
            />
            <RenderDiscoutService
              type={t("price.discount")}
              price={discountGuestPostService}
            />
            <RenderDiscoutService
              type={t("price.final")}
              className="font-bold text-[#066102]"
              price={Number(guestPostPrice) - Number(discountGuestPostService)}
            />
          </>
        )}
        {isSaleTextLink && (
          <>
            {isSaleGuestPost && <Divider />}
            <RenderPriceServicePack
              type={SERVICE_TYPE.TEXTLINK}
              price={textLinkPrice}
            />
            <RenderDiscoutService
              type={t("price.discount")}
              price={discountTextLinkService}
            />
            <RenderDiscoutService
              type={t("price.final")}
              className="font-bold text-[#066102]"
              price={Number(textLinkPrice) - Number(discountTextLinkService)}
            />
          </>
        )}
        {isSaleBanner && (
          <>
            {(isSaleTextLink || isSaleGuestPost) && <Divider />}
            <RenderPriceServicePack
              type={SERVICE_TYPE.BANNER}
              price={bannerPrice}
            />
            <RenderDiscoutService
              type={t("price.discount")}
              price={discountBannerService}
            />
            <RenderDiscoutService
              className="font-bold text-[#066102]"
              type={t("price.final")}
              price={Number(bannerPrice) - Number(discountBannerService)}
            />
          </>
        )}
      </div>
    );
  }
};

export const RenderDiscoutService = ({
  type,
  price,
  className,
}: {
  type?: string;
  price?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between gap-3 ", className)}>
      <p className={cn("w-[180px] text-left text-base font-medium", className)}>
        {type}
      </p>
      <p
        className={cn(
          "line-clamp-1 w-full text-right text-base font-medium",
          className,
        )}
      >
        {formatCurrency(Number(price))}
      </p>
    </div>
  );
};

export const RenderDiscoutSeoerService = ({
  type,
  price,
  className,
}: {
  type?: string;
  price?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between gap-3 ", className)}>
      {/* <p className={cn("w-[180px] text-left text-base font-medium", className)}>
        {type}
      </p> */}
      <p
        className={cn(
          "line-clamp-1 w-full text-right text-base font-medium",
          className,
        )}
      >
        {formatCurrency(Number(price))}
      </p>
    </div>
  );
};

const RenderPriceServicePack = ({
  type,
  price,
}: {
  type: SERVICE_TYPE;
  price?: number;
}) => {
  const t = useTranslations("ServiceManagement");
  return (
    <>
      <div className="flex justify-between gap-3">
        <p className="w-[180px] text-left text-base font-medium">
          {t("price.original")} {t(`serviceTypes.${type.toLowerCase()}`)}:
        </p>
        <p className="line-clamp-1 w-full text-right text-base font-medium">
          {formatCurrency(Number(price))}
        </p>
      </div>
    </>
  );
};
