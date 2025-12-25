"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import MyButton from "@/app/_components/common/MyButton";
import { toast } from "@/app/_components/common/Toaster";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { useGetDomainsOfAllMyTeamQuery } from "@/store/Apis/Domain.api";
import {
  useGetTeamByIdQuery,
  useGetTeamMembersQuery,
  useUpdateTeamMutation,
} from "@/store/Apis/Team.api";
import {
  useAssignDomainMutation,
  useDeleteUserDomainByIdMutation,
  useGetUserDomainQuery,
} from "@/store/Apis/UserDomain.api";
import { AuthSelector } from "@/store/Auth";

export const useTeamMembersDetailLogic = (teamId: string) => {
  const t = useTranslations("Teams.teamDetail");
  const router = useLocaleRouter();
  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAvailableDomainsModal, setShowAvailableDomainsModal] =
    useState(false);
  const [currentLoadingMemberId, setCurrentLoadingMemberId] = useState<
    number | null
  >(null);
  const [lastLoadedMemberId, setLastLoadedMemberId] = useState<number | null>(
    null,
  );

  // Pending operations state for loading indicators
  const [pendingOperations, setPendingOperations] = useState<Set<number>>(
    new Set(),
  );

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
    data: teamData,
    isLoading: isLoadingTeam,
    error: teamError,
    refetch: refetchTeam,
  } = useGetTeamByIdQuery(teamId, {
    skip: !teamId || !canAccessPage,
  });

  const {
    data: teamMembersData,
    isLoading: isLoadingTeamMembers,
    refetch: refetchTeamMembers,
  } = useGetTeamMembersQuery(
    {
      teamId,
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !teamId || !canAccessPage,
    },
  );

  const [searchDomain, setSearchDomain] = useState<string | undefined>(
    undefined,
  );
  const {
    data: domainsData,
    isFetching: isFetchingDomains,
    refetch: refetchDomains,
  } = useGetDomainsOfAllMyTeamQuery(
    {
      page: 1,
      limit: 10, // Get all domains for selection
      teamId,
      search: searchDomain || undefined,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !teamId || !canAccessPage,
    },
  );

  const [assignDomain, { isLoading: isAssigningDomain }] =
    useAssignDomainMutation();

  const [deleteUserDomainById, { isLoading: isDeletingUserDomain }] =
    useDeleteUserDomainByIdMutation();

  // Update team basic info (telegramId)
  const [updateTeam, { isLoading: isSavingTelegram }] = useUpdateTeamMutation();

  // Telegram ID local state
  const [telegramId, setTelegramId] = useState<string>("");
  const [telegramThreadId, setTelegramThreadId] = useState<string>("");

  useEffect(() => {
    const team = (teamData as any)?.data || teamData;
    const tg = team?.telegramId || "";
    const threadId = team?.telegramThreadId || "";
    setTelegramId(tg || "");
    setTelegramThreadId(threadId || "");
  }, [teamData]);

  const canEditTelegramId = useMemo(() => {
    return [
      ADMIN_ROLE.TEAM_LEADER,
      ADMIN_ROLE.VICE_TEAM_LEADER,
      ADMIN_ROLE.SUPER_ADMIN,
      ADMIN_ROLE.MANAGER,
      ADMIN_ROLE.ASSISTANT,
    ].includes(userRole);
  }, [userRole]);

  const handleSaveTelegramId = useCallback(async () => {
    if (!teamId || !canEditTelegramId) return;
    try {
      const payload: any = {
        name: teamData?.data?.name,
      };
      if (telegramId && telegramId.trim()) {
        payload.telegramId = telegramId.trim();
      } else {
        payload.telegramId = "";
      }
      if (telegramThreadId && telegramThreadId.trim()) {
        payload.telegramThreadId = telegramThreadId.trim();
      } else {
        payload.telegramThreadId = "";
      }
      const res: any = await updateTeam({
        id: teamId,
        data: payload,
      });
      if (res?.error) {
        toast.error(
          (res.error as any)?.data?.message || "Updated" || "Update failed",
        );
        return;
      }
      toast.success("Updated successfully");
      refetchTeam();
    } catch (e) {
      toast.error("Update failed");
    }
  }, [
    teamId,
    teamData,
    canEditTelegramId,
    telegramId,
    telegramThreadId,
    updateTeam,
    t,
    refetchTeam,
  ]);

  // Get user domains for selected member using API
  const {
    data: userDomainsData,
    isLoading: isLoadingUserDomains,
    refetch: refetchUserDomains,
  } = useGetUserDomainQuery(
    {
      page: 1,
      limit: 100,
      assignedUserId: selectedMember?.userId?.toString(),
      sortBy: "createdAt",
      sortOrder: "DESC",
    },
    {
      skip: !selectedMember?.userId,
      refetchOnMountOrArgChange: true,
    },
  );

  // Handle loading state for member selection - always show loading when switching
  useEffect(() => {
    if (selectedMember?.userId && showAssignModal) {
      // Always set loading when modal opens, regardless of previous member
      setCurrentLoadingMemberId(selectedMember.userId);
      setLastLoadedMemberId(selectedMember.userId);
    }
  }, [selectedMember?.userId, showAssignModal]);

  // Reset loading state when data is received for the current member
  useEffect(() => {
    if (
      userDomainsData &&
      currentLoadingMemberId === selectedMember?.userId &&
      !isLoadingUserDomains
    ) {
      setCurrentLoadingMemberId(null);
    }
  }, [
    userDomainsData,
    currentLoadingMemberId,
    selectedMember?.userId,
    isLoadingUserDomains,
  ]);

  // Get user domains for selected member - use API data directly but only when not loading
  const userDomains = useMemo(() => {
    // Always show empty array when loading to prevent stale data
    if (
      currentLoadingMemberId ||
      isLoadingUserDomains ||
      !selectedMember?.userId
    )
      return [];
    // Only show data if it's for the current selected member
    if (lastLoadedMemberId !== selectedMember?.userId) return [];
    return userDomainsData?.data || [];
  }, [
    userDomainsData?.data,
    currentLoadingMemberId,
    isLoadingUserDomains,
    selectedMember?.userId,
    lastLoadedMemberId,
  ]);

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

  const handleGoBack = useCallback(() => {
    router.push("/management/my-team");
  }, [router]);

  const handleOpenAssignModal = useCallback((member: any) => {
    setSelectedMember(member);
    setShowAssignModal(true);
    // Loading state will be set automatically by useEffect
  }, []);

  const handleOpenAvailableDomainsModal = useCallback(
    (member: any) => {
      setSelectedMember(member);
      setShowAvailableDomainsModal(true);
      // Trigger domain search when opening modal - set empty string to fetch all
      setSearchDomain("");
      // Refetch domains when opening modal
      setTimeout(() => {
        refetchDomains();
      }, 100);
    },
    [refetchDomains],
  );

  const handleCloseAvailableDomainsModal = useCallback(() => {
    setShowAvailableDomainsModal(false);
    setSearchDomain("");
  }, []);

  const handleCloseAssignModal = useCallback(() => {
    setSelectedMember(null);
    setShowAssignModal(false);
    // Reset loading states when closing modal to prevent stale data
    setCurrentLoadingMemberId(null);
    setLastLoadedMemberId(null);
    // Clear pending operations
    setPendingOperations(new Set());
  }, []);

  // Computed values
  const team = useMemo(() => teamData || null, [teamData]);
  const teamMembers = useMemo(
    () => teamMembersData?.data || [],
    [teamMembersData],
  );
  const domains = useMemo(() => domainsData?.data || [], [domainsData]);
  const totalMembers = useMemo(
    () => teamMembersData?.total || 0,
    [teamMembersData],
  );

  // Get available domains for assignment (domains not assigned to current member)
  const availableDomains = useMemo(() => {
    if (!selectedMember || !domains.length) return [];

    const assignedDomainIds = userDomains.map((ud: any) => ud.domainId);
    return domains.filter(
      (domain: any) => !assignedDomainIds.includes(domain.id),
    );
  }, [domains, userDomains, selectedMember]);

  const handleAssignDomain = useCallback(
    async (domainId: number) => {
      if (!selectedMember) return;

      // Add to pending operations
      setPendingOperations((prev) => new Set(prev).add(domainId));

      try {
        const result: any = await assignDomain({
          domainId,
          userId: Number(selectedMember.userId),
        });

        if (result.error) {
          toast.error(
            (result.error as any)?.data?.message || t("messages.assignError"),
          );
          return;
        }

        // Show success toast first
        toast.success(t("messages.assignSuccess"));

        // Force immediate refetch for current member data
        await refetchUserDomains();
        refetchTeamMembers();
        // Refetch domains to update available list
        if (showAvailableDomainsModal) {
          refetchDomains();
        }

        // Don't close modal - let user continue assigning
      } catch (error) {
        toast.error(t("messages.assignError"));
      } finally {
        // Remove from pending operations
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(domainId);
          return newSet;
        });
      }
    },
    [
      selectedMember,
      assignDomain,
      refetchTeamMembers,
      refetchUserDomains,
      refetchDomains,
      showAvailableDomainsModal,
      t,
    ],
  );

  const handleUnassignDomain = useCallback(
    async (userDomainId: number) => {
      if (!selectedMember) return;

      // Add to pending operations
      setPendingOperations((prev) => new Set(prev).add(userDomainId));

      try {
        const result: any = await deleteUserDomainById(userDomainId);

        if (result.error) {
          toast.error(
            (result.error as any)?.data?.message || t("messages.unassignError"),
          );
          return;
        }

        // Show success toast first
        toast.success(t("messages.unassignSuccess"));

        // Force immediate refetch for current member data
        await refetchUserDomains();
        refetchTeamMembers();

        // Don't close modal - let user continue managing domains
      } catch (error) {
        toast.error(t("messages.unassignError"));
      } finally {
        // Remove from pending operations
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userDomainId);
          return newSet;
        });
      }
    },
    [
      selectedMember,
      deleteUserDomainById,
      refetchTeamMembers,
      refetchUserDomains,
      t,
    ],
  );

  // Table columns for team members
  const memberColumns = useMemo(
    () => [
      {
        id: "user",
        header: <div className="text-left">{t("table.member")}</div>,
        size: 250,
        cell: ({ row }: any) => {
          const member = row.original;
          const user = member.user;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user?.username || `User ${member.userId}`}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        id: "role",
        header: <div className="text-left">{t("table.role")}</div>,
        size: 120,
        cell: ({ row }: any) => {
          const member = row.original;
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                member.role === "LEADER"
                  ? "bg-yellow-100 text-yellow-800"
                  : member.role === "VICE_LEADER"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {member.role === "LEADER" && (
                <svg
                  className="mr-1 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
              {member.role}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: <div className="text-left">{t("table.actions")}</div>,
        size: 120,
        cell: ({ row }: any) => {
          const member = row.original;
          return (
            <MyButton
              bType="primary"
              bSize="xs"
              onClick={() => handleOpenAssignModal(member)}
            >
              {t("table.manageDomains")}
            </MyButton>
          );
        },
        meta: {
          disableRowClick: true,
        },
      },
    ],
    [handleOpenAssignModal, t],
  );

  return {
    // Data
    team,
    teamMembers,
    domains,
    userDomains,
    availableDomains,
    selectedMember,
    totalMembers,

    // State
    currentPage,
    pageSize,
    searchTerm,
    showAssignModal,
    showAvailableDomainsModal,
    pendingOperations,
    isLoadingMemberDomains: !!currentLoadingMemberId || isLoadingUserDomains,

    // Loading states
    isLoadingTeam,
    isLoadingTeamMembers,
    isLoadingDomains: isFetchingDomains,
    isLoadingUserDomains,
    isAssigningDomain,
    isDeletingUserDomain,

    // Error states
    teamError,

    // Handlers
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleGoBack,
    handleOpenAssignModal,
    handleOpenAvailableDomainsModal,
    handleCloseAssignModal,
    handleCloseAvailableDomainsModal,
    handleAssignDomain,
    handleUnassignDomain,

    // Table configs
    memberColumns,

    // Permissions
    canAccessPage,
    canEditTelegramId,
    userRole,
    setSearchDomain,
    refetchDomains,
    refetchUserDomains,
    // Telegram editing
    telegramId,
    setTelegramId,
    telegramThreadId,
    setTelegramThreadId,
    handleSaveTelegramId,
    isSavingTelegram,

    // Translations
    t,
  };
};
