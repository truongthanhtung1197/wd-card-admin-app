import React, { useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ServiceNameCell } from "@/app/_components/table/_components/ServiceNameCell";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useGetMeQuery } from "@/store/Apis/Auth.api";
import {
  optionsStatusOrder,
  ORDER_STATUS,
  useGetOrdersByDomainIdQuery,
  useGetOrdersQuery,
  useGetTeamOrdersQuery,
} from "@/store/Apis/Order.api";
import {
  useGetTeamsLeadByMeQuery,
  useGetTeamsQuery,
} from "@/store/Apis/Team.api";
import { formatCurrency, getLabelFromKey } from "@/utils/format.util";
import {
  calculateOrderTotalPrice,
  statusOrderClass,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnOrderManager from "./ActionColumnOrder";

// refetch,
export const useAdminLogic = ({
  domainId,
  viewType,
}: {
  domainId?: string; // chỉ dành cho trang chi tiết domain (get all order by domain Id)
  viewType?: "domainDetail";
}) => {
  const t = useTranslations("Orders");
  const tStatus = useTranslations("statusOrder");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;

  const statusParam = searchParams.get("status") || undefined;
  const teamIdParam = searchParams.get("teamId") || undefined;

  const startDate = searchParams.get("start") || undefined;
  const endDate = searchParams.get("end") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const router = useLocaleRouter();
  const pathname = usePathname();
  const orderCode = searchParams.get("orderCode") || "";

  const status =
    (statusParam && ORDER_STATUS[statusParam as keyof typeof ORDER_STATUS]) ||
    undefined;

  // States for team pagination
  const [teamsLimit, setTeamsLimit] = useState(20);
  const [teamsSearch, setTeamsSearch] = useState<string | undefined>("");

  // Get current user to determine role
  const { data: currentUser } = useGetMeQuery({});
  const userRole = currentUser?.role;

  // Determine which API to use based on role
  const isTeamLeaderOrVice = userRole?.roleName
    ? ["TEAM_LEADER", "VICE_TEAM_LEADER"].includes(userRole.roleName)
    : false;
  const isHighLevelRole = userRole?.roleName
    ? ["SUPER_ADMIN", "MANAGER", "ASSISTANT"].includes(userRole.roleName)
    : false;

  // Get teams for dropdown filter - different APIs based on role with pagination
  // High-level roles: get all teams
  const { data: allTeamsData, isLoading: isLoadingAllTeams } = useGetTeamsQuery(
    {
      limit: teamsLimit,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isHighLevelRole, // Only fetch for high-level roles
    },
  );

  // Team leaders/vice leaders: get only teams they lead
  const { data: myTeamsData, isLoading: isLoadingMyTeams } =
    useGetTeamsLeadByMeQuery(
      {
        limit: teamsLimit,
        page: 1,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !isTeamLeaderOrVice, // Only fetch for team leaders/vice leaders
      },
    );

  // Use team orders API for team leaders and vice leaders
  const teamOrdersQuery = useGetTeamOrdersQuery(
    {
      limit: Number(limit),
      page: Number(page),
      timeBegin: startDate,
      timeEnd: endDate,
      status: status,
      orderCode: orderCode,
      teamId: teamIdParam,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isTeamLeaderOrVice || viewType === "domainDetail", // Skip if not team leader/vice
    },
  );

  // Use all orders API by domainId
  const allOrderByDomainId = useGetOrdersByDomainIdQuery(
    {
      limit: Number(limit),
      page: Number(page),
      timeBegin: startDate,
      timeEnd: endDate,
      status: status,
      orderCode: orderCode,
      teamId: teamIdParam,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
      domainId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: viewType !== "domainDetail" || !domainId, // Skip if not domainId
    },
  );

  // Use regular orders API for high-level roles
  const allOrdersQuery = useGetOrdersQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      timeBegin: startDate,
      timeEnd: endDate,
      status: status,
      orderCode: orderCode,
      teamId: teamIdParam,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isHighLevelRole || viewType === "domainDetail", // Skip if not high-level role
    },
  );

  // Use the appropriate query result
  const activeQuery =
    viewType === "domainDetail"
      ? allOrderByDomainId
      : isTeamLeaderOrVice
        ? teamOrdersQuery
        : allOrdersQuery;
  const { data, isLoading: fetching, refetch } = activeQuery;

  // Teams data for SearchableSelect
  const teamsData = isHighLevelRole ? allTeamsData : myTeamsData;
  const isLoadingTeams = isHighLevelRole ? isLoadingAllTeams : isLoadingMyTeams;

  // Add modal state for order details
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [modalDetailData, setModalDetailData] = useState<any>({});

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  // Add function to handle view details
  const handleViewDetails = useCallback((data: any) => {
    if (!data) return;
    setModalDetailData(data);
    setIsModalDetail(true);
  }, []);

  // Add function to handle view service details
  const handleViewServiceDetails = useCallback((data: any) => {
    if (!data?.service) return;
  }, []);

  const showTeamApprovedTotal = useMemo(() => {
    return Boolean(isTeamLeaderOrVice && startDate && endDate && status);
  }, [isTeamLeaderOrVice, startDate, endDate, status]);

  const teamApprovedTotal = useMemo(() => {
    if (!showTeamApprovedTotal) return 0;
    return Number((data as any)?.totalAmount) || 0;
  }, [showTeamApprovedTotal, data]);

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("orderCode", {
        size: 100,
        cell: ({ getValue, row }) => (
          <p
            className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row.original);
            }}
          >
            {getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="orderCode">
            <p className="text-left text-base font-semibold">
              {t("columns.orderCode")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("user", {
        size: 120,
        cell: ({ row }) => <UserInformationV2 user={row.original.user} />,
        header: () => (
          <p className="text-left text-base font-semibold">
            {t("columns.userOrder")}
          </p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("serviceName", {
        size: 140,
        cell: ({ row }) => (
          <ServiceNameCell
            order={row.original}
            handleViewServiceDetails={handleViewServiceDetails}
          />
        ),
        header: () => (
          <p className="text-left text-base font-semibold">
            {t("columns.serviceName")}
          </p>
        ),
        meta: {
          className: "!w-[140px] !min-w-[140px] !max-w-[140px]",
        },
      }),
      // Price columns in the middle
      columnHelper.accessor("price", {
        size: 100,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.price)}
          </p>
        ),
        header: () => (
          <div className="row justify-end text-right">
            <SortableHeader sortKey="price">
              <p className="text-right text-base font-semibold">
                {t("columns.price")}
              </p>
            </SortableHeader>
          </div>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),
      columnHelper.accessor("discount", {
        size: 90,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.discount)}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">
            {t("columns.discount")}
          </p>
        ),
        meta: {
          className: "!w-[90px] !min-w-[90px] !max-w-[90px]",
        },
      }),
      columnHelper.accessor("priceAdjustment", {
        size: 100,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.priceAdjustment)}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">
            {t("columns.priceAdjustment")}
          </p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),
      columnHelper.accessor("totalPrice", {
        size: 120,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(calculateOrderTotalPrice(row.original))}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="totalPrice">
            <p className="text-right text-base font-semibold">
              {t("columns.totalPrice")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("domainName", {
        size: 140,
        cell: ({ row }) => (
          <p className="break-words text-left text-base font-medium">
            {row.original?.domain?.name || "-"}
          </p>
        ),
        header: () => (
          <p className="text-left text-base font-semibold">
            {t("columns.domainName")}
          </p>
        ),
        meta: {
          className: "!w-[140px] !min-w-[140px] !max-w-[140px]",
        },
      }),
    ];

    // Add team column for high-level roles and team leaders/vice leaders
    if (isHighLevelRole || isTeamLeaderOrVice) {
      result.push(
        columnHelper.accessor("teamName", {
          size: 120,
          cell: ({ row }) => (
            <p className="break-words text-left text-base font-medium">
              {row.original?.team?.name || "-"}
            </p>
          ),
          header: () => (
            <p className="text-left text-base font-semibold">
              {t("columns.team")}
            </p>
          ),
          meta: {
            className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
          },
        }),
      );
    }

    result.push(
      columnHelper.accessor("status", {
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue();
          const label = getLabelFromKey(optionsStatusOrder, status);
          return (
            <p
              className={`break-words text-left text-base font-medium ${statusOrderClass[status] || ""}`}
            >
              {tStatus(label)}
            </p>
          );
        },
        header: () => (
          <SortableHeader sortKey="status">
            <p className="text-left text-base font-semibold">
              {t("columns.status")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
    );
    {
      result.push(
        columnHelper.display({
          id: "action",
          size: 70,
          header: () => (
            <p className="text-center text-base font-semibold">Thao tác</p>
          ),
          cell: (cell) => {
            return (
              <ActionColumnOrderManager
                data={cell.row.original}
                refetch={refetch}
                onViewDetails={handleViewDetails}
              />
            );
          },
          meta: {
            className: "!w-[120px] !min-w-[120px] !max-w-[120px] px-1",
          },
        }) as any,
      );
    }
    return result;
  }, [
    data,
    data?.data,
    handleViewDetails,
    handleViewServiceDetails,
    refetch,
    t,
    tStatus,
    isHighLevelRole,
  ]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
    // Teams pagination data
    teamsData,
    isLoadingTeams,
    teamsLimit,
    setTeamsLimit,
    teamsSearch,
    setTeamsSearch,
    isHighLevelRole,
    isTeamLeaderOrVice,
    showTeamApprovedTotal,
    teamApprovedTotal,
    handleClearQueryUrl: handleClearQueryUrl,
    isModalDetail,
    setIsModalDetail,
    modalDetailData,
  };
};
