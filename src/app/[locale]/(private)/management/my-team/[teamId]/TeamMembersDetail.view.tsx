"use client";
import React from "react";

import AccessDenied from "@/app/_components/common/AccessDenied";
import Loading from "@/app/_components/common/Loading";
import MyCard from "@/app/_components/common/MyCard";
import MyModal from "@/app/_components/common/MyModal";
import SearchInput from "@/app/_components/common/SearchInput";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { formatCurrency } from "@/utils/format.util";

import TelegramIdGuideModal from "../../teams/_components/TelegramIdGuideModal";
import AvailableDomainsModal from "./AvailableDomainsModal";
import { useTeamMembersDetailLogic } from "./TeamMembersDetail.logic";

interface TeamMembersDetailViewProps {
  teamId: string;
}

const TeamMembersDetailView: React.FC<TeamMembersDetailViewProps> = ({
  teamId,
}) => {
  const {
    // Data
    team,
    teamMembers,
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
    isLoadingMemberDomains,
    pendingOperations,

    // Loading states
    isLoadingTeam,
    isLoadingTeamMembers,

    // Error states
    teamError,

    // Handlers
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleGoBack,
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
    setSearchDomain,
    isLoadingDomains,

    // Translations
    t,

    // Telegram
    telegramId,
    setTelegramId,
    telegramThreadId,
    setTelegramThreadId,
    handleSaveTelegramId,
    isSavingTelegram,
  } = useTeamMembersDetailLogic(teamId);
  if (!canAccessPage) {
    return <AccessDenied />;
  }
  if (teamError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {t("page.teamNotFound")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("page.teamNotFoundDescription")}
          </p>
          <button
            onClick={handleGoBack}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {t("page.goBack")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-surface">
      <div className="mx-auto max-w-7xl p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("page.backToTeams")}
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isLoadingTeam
                  ? t("page.loadingTeam")
                  : team?.data?.name || t("page.teamMembers")}
              </h1>
            </div>
          </div>
        </div>
        {/* Team Settings - Telegram ID */}
        <MyCard className="mb-8 ">
          {canEditTelegramId ? (
            <div className="flex max-w-[500px] flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <TelegramIdGuideModal />

                  <input
                    type="text"
                    value={telegramId || ""}
                    onChange={(e) => setTelegramId(e.target.value)}
                    placeholder="Enter Telegram Group ID"
                    className="mt-2 w-full rounded-md border border-neutral-stroke-light px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={telegramThreadId || ""}
                    onChange={(e) => setTelegramThreadId(e.target.value)}
                    placeholder="Enter Telegram Thread ID (optional)"
                    className="mt-2 w-full rounded-md border border-neutral-stroke-light px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:ml-3">
                  <button
                    onClick={handleSaveTelegramId}
                    disabled={isSavingTelegram}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSavingTelegram ? "Saving" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[500px]">
              <label className="mb-1 block text-sm font-medium text-neutral-element-secondary">
                Telegram ID of Team
              </label>
              <div className="rounded-md border border-neutral-stroke-light bg-gray-50 px-3 py-2 text-sm text-gray-700">
                {((team as any)?.data || team)?.telegramId || "—"}
              </div>
            </div>
          )}
        </MyCard>
        {/* Team Members Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("page.teamMembers")} ({totalMembers})
            </h2>
            <div className="w-80">
              <SearchInput
                placeholder={t("search.placeholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {isLoadingTeamMembers ? (
            <Loading />
          ) : (
            <>
              <MyTable
                data={teamMembers}
                columns={memberColumns as any}
                fetching={isLoadingTeamMembers}
                tableClassName="min-w-full"
              />

              {totalMembers > 0 && (
                <div className="mt-4 flex justify-end">
                  <MyPagination
                    total={totalMembers}
                    customPage={currentPage}
                    customLimit={pageSize}
                    setCustomPage={handlePageChange}
                    setCustomLimit={handlePageSizeChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {/* Domain Assignment Modal */}
        {showAssignModal && selectedMember && (
          <MyModal
            isOpen={showAssignModal}
            onClose={() => {
              handleCloseAssignModal();
              setSearchDomain("");
            }}
            header={
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedMember.user?.username || ""} - ({userDomains.length})
                  domains
                </h3>
              </div>
            }
            size="3xl"
            body={
              <div className="px-6 pb-6">
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenAvailableDomainsModal(selectedMember)
                    }
                    className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {"+ Domain"}
                  </button>
                </div>
                {isLoadingMemberDomains ? (
                  <div className="flex items-center justify-center py-8">
                    <Loading />
                    <span className="ml-3 text-gray-600">
                      {t("modal.loadingDomains")}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Currently Assigned Domains */}
                    <div>
                      {userDomains.length > 0 ? (
                        <div className="space-y-2">
                          {userDomains.map((ud: any) => (
                            <div
                              key={ud.id}
                              className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {ud.domain?.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {ud.domain?.type} • {t("modal.budgetLabel")}{" "}
                                    {formatCurrency(ud.domain?.budget)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleUnassignDomain(ud.id)}
                                disabled={pendingOperations.has(ud.id)}
                                className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                              >
                                {pendingOperations.has(ud.id)
                                  ? t("modal.removingButton")
                                  : t("modal.removeButton")}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                          <p className="text-gray-500">
                            {t("modal.noDomainAssigned")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            }
          />
        )}

        {/* Available Domains Modal */}
        {showAvailableDomainsModal && selectedMember && (
          <AvailableDomainsModal
            isOpen={showAvailableDomainsModal}
            onClose={handleCloseAvailableDomainsModal}
            availableDomains={availableDomains}
            isLoadingDomains={isLoadingDomains}
            isLoadingMemberDomains={isLoadingMemberDomains}
            pendingOperations={pendingOperations}
            onAssignDomain={handleAssignDomain}
            onSearch={setSearchDomain}
            selectedMemberUsername={selectedMember.user?.username}
            t={t}
          />
        )}
      </div>
    </div>
  );
};

export default TeamMembersDetailView;
