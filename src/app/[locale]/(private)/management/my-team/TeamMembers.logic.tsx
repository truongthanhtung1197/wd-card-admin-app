"use client";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { useGetTeamsLeadByMeQuery } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";

export const useTeamMembersLogic = () => {
  const t = useTranslations("Teams");
  const router = useLocaleRouter();
  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // User role checking
  const userRole = admin?.role?.roleName as ADMIN_ROLE;
  const canAccessPage = [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ].includes(userRole);

  // API calls
  const {
    data: teamsData,
    isLoading: isLoadingTeams,
    refetch: refetchTeams,
  } = useGetTeamsLeadByMeQuery(
    {
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !canAccessPage,
    },
  );

  // Handlers
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleViewTeamMembers = useCallback(
    (teamId: string) => {
      router.push(`/management/my-team/${teamId}`);
    },
    [router],
  );

  // Computed values
  const teams = useMemo(() => teamsData?.data || [], [teamsData]);
  const totalTeams = useMemo(() => teamsData?.total || 0, [teamsData]);

  // Table columns for teams - navigate to team members page
  const teamColumns = useMemo(
    () => [
      {
        id: "name",
        header: t("columns.name"),
        accessorKey: "name",
        size: 200,
        cell: ({ getValue }: any) => (
          <div className="font-medium text-gray-900">{getValue()}</div>
        ),
      },
      {
        id: "description",
        header: t("columns.description"),
        accessorKey: "description",
        size: 300,
        cell: ({ getValue }: any) => (
          <div className="line-clamp-2 text-gray-600">{getValue() || "—"}</div>
        ),
      },
      {
        id: "totalMember",
        header: t("columns.memberCount"),
        accessorKey: "totalMember",
        size: 150,
        cell: ({ getValue }: any) => (
          <div className="text-center">
            <span className="rounded-full  px-2 py-1 text-sm font-medium ">
              {getValue()}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: t("columns.action"),
        size: 100,
        cell: ({ row }: any) => (
          <div className="flex justify-center">
            <button
              onClick={() => handleViewTeamMembers(row.original.id.toString())}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-gray-100"
              title={t("actions.editTeam")}
            >
              <svg
                className="h-4 w-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        ),
        meta: {
          disableRowClick: true,
        },
      },
    ],
    [t, handleViewTeamMembers],
  );

  return {
    // Data
    teams,
    totalTeams,

    // State
    currentPage,
    pageSize,
    searchTerm,

    // Loading states
    isLoadingTeams,

    // Handlers
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleViewTeamMembers,

    // Table configs
    teamColumns,

    // Permissions
    canAccessPage,
    userRole,

    // Translations
    t,
  };
};
