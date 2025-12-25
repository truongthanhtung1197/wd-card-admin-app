import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  DOMAIN_STATUS_OPTIONS,
  DOMAIN_TYPE_OPTIONS,
} from "@/constant/domain.constant";
import { PermissionEnum } from "@/constant/Permission.constant";
import { useAppSelector } from "@/store";
import {
  useGetDomainsOfAllMyTeamQuery,
  useGetDomainsQuery,
} from "@/store/Apis/Domain.api";
import {
  useGetTeamsLeadByMeQuery,
  useGetTeamsQuery,
} from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { createColumnHelper } from "@tanstack/react-table";

import ActionDomainColumn from "./ActionColumnDomain";

import { isNilOrEmpty } from "ramda-adjunct";

const useAdminLogic = () => {
  const t = useTranslations("Domain");
  const searchParams = useSearchParams();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const userRole = admin?.role?.roleName as ADMIN_ROLE;

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const status = searchParams.get("status") || undefined;
  const teamIdParam = searchParams.get("teamId") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  // States for team pagination
  const [teamsLimit, setTeamsLimit] = useState(20);
  const [teamsSearch, setTeamsSearch] = useState<string | undefined>("");

  // Determine which API to use based on role
  const isTeamLeaderRole =
    userRole &&
    [ADMIN_ROLE.TEAM_LEADER, ADMIN_ROLE.VICE_TEAM_LEADER].includes(userRole);
  const isManagerRole =
    userRole &&
    [ADMIN_ROLE.MANAGER, ADMIN_ROLE.ASSISTANT, ADMIN_ROLE.SUPER_ADMIN].includes(
      userRole,
    );

  // Get teams for dropdown filter - different APIs based on role with pagination
  // Manager roles: get all teams
  const { data: allTeamsData, isLoading: isLoadingAllTeams } = useGetTeamsQuery(
    {
      limit: teamsLimit,
      page: 1,
      search: teamsSearch,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isManagerRole, // Only fetch for manager roles
    },
  );

  // Team leaders/vice leaders: get only teams they lead
  const { data: myTeamsData, isLoading: isLoadingMyTeams } =
    useGetTeamsLeadByMeQuery(
      {
        limit: teamsLimit,
        page: 1,
        search: teamsSearch,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !isTeamLeaderRole, // Only fetch for team leaders/vice leaders
      },
    );

  // Use different API endpoints based on role
  const domainsQuery = useGetDomainsQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      status: status ? status.split(",") : undefined,
      teamId: teamIdParam,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: isTeamLeaderRole, // Skip for team leaders
    },
  );

  // Use new API for Team Leaders and Vice Team Leaders
  const domainsOfAllMyTeamQuery = useGetDomainsOfAllMyTeamQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      status: status ? status.split(",") : undefined,
      teamId: teamIdParam,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isTeamLeaderRole, // Only for team leaders
    },
  );

  // Use appropriate data and loading state
  const data = isTeamLeaderRole
    ? domainsOfAllMyTeamQuery.data
    : domainsQuery.data;
  const fetching = isTeamLeaderRole
    ? domainsOfAllMyTeamQuery.isLoading
    : domainsQuery.isLoading;
  const refetch = isTeamLeaderRole
    ? domainsOfAllMyTeamQuery.refetch
    : domainsQuery.refetch;

  // Teams data for SearchableSelect
  const teamsData = isManagerRole ? allTeamsData : myTeamsData;
  const isLoadingTeams = isManagerRole ? isLoadingAllTeams : isLoadingMyTeams;

  // Transform teams data for dropdown
  const teamOptions = useMemo(() => {
    // Manager roles use all teams data
    if (isManagerRole && allTeamsData?.data) {
      return allTeamsData.data.map((team: any) => ({
        key: team.id.toString(),
        label: team.name,
      }));
    }

    // Team leaders/vice leaders use only their teams data
    if (isTeamLeaderRole && myTeamsData?.data) {
      return myTeamsData.data.map((team: any) => ({
        key: team.id.toString(),
        label: team.name,
      }));
    }

    return [];
  }, [isManagerRole, isTeamLeaderRole, allTeamsData, myTeamsData]);

  const columnHelper = createColumnHelper<any>();
  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("name", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.name")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("type", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_TYPE_OPTIONS)}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.type")}</p>,
        meta: {
          className: "!w-[106px]",
        },
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_STATUS_OPTIONS)}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.status")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("budget", {
        cell: (info) => (
          <p className="truncate text-right text-base font-medium">
            {formatCurrency(Number(info.getValue() || 0) || 0)}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="budget">
            <p className="text-right">{t("columns.budget")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      // Team Column - shows team information
      columnHelper.accessor("team", {
        cell: (info) => {
          const team = info.row.original.team;

          if (!team) {
            return (
              <p className="italic text-gray-400">
                {t("messages.noTeamAssigned")}
              </p>
            );
          }

          return (
            <div className="flex flex-col">
              <p className="text-base font-medium">{team.name}</p>
            </div>
          );
        },
        header: () => <p className="text-left">{t("columns.team")}</p>,
        meta: {
          className: "min-w-[200px]",
        },
      }),
      columnHelper.accessor("assignee", {
        cell: (info) => {
          const assignees = info.row.original.userDomains;

          if (isNilOrEmpty(assignees)) {
            return <p className="italic text-gray-400">-</p>;
          }

          return (
            <div className="flex flex-col">
              {assignees?.map((assignee: any) => {
                return <UserInformationV2 user={assignee?.user} />;
              })}
            </div>
          );
        },
        header: () => <p className="text-left">SEOer</p>,
        meta: {
          className: "min-w-[200px]",
        },
      }),
    ];

    // Add createdAt column
    result.push(
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
          className: "!w-[106px]",
        },
      }),
    );

    // Add action column
    result.push(
      columnHelper.display({
        id: "action",
        header: () => <></>,
        cell: (cell) => {
          return (
            <ActionDomainColumn
              data={cell.row.original}
              refetch={refetch}
              dataLength={data?.length}
            />
          );
        },
        meta: {
          className: "!w-[80px] !min-w-[80px] !max-w-[80px]",
        },
      }) as any,
    );

    return result;
  }, [data, t, userRole, isManagerRole, isTeamLeaderRole, refetch]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
    userRole,
    isManagerRole,
    isTeamLeaderRole,
    teamOptions,
    // Teams pagination data
    teamsData,
    isLoadingTeams,
    teamsLimit,
    setTeamsLimit,
    teamsSearch,
    setTeamsSearch,
    isCanEdit: checkPermission({
      permission: {},
      accessKeys: [PermissionEnum.USER_MGMT_EDIT],
    }),
  };
};

export { useAdminLogic };
