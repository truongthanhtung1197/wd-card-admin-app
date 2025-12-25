"use client";
import React from "react";

import AccessDenied from "@/app/_components/common/AccessDenied";
import SearchInput from "@/app/_components/common/SearchInput";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";

import { useTeamMembersLogic } from "./TeamMembers.logic";

const TeamMembersView = () => {
  const {
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

    // Table configs
    teamColumns,

    // Permissions
    canAccessPage,

    // Translations
    t,
  } = useTeamMembersLogic();

  if (!canAccessPage) {
    return <AccessDenied />;
  }

  return (
    <>
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <SearchInput
            className="h-[44px] !w-[500px]"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <MyTable
        data={teams}
        columns={teamColumns as any}
        fetching={isLoadingTeams}
        NoDataProps={{
          title: t("noData.title"),
        }}
        tableClassName="min-w-[800px]"
        onRowClick={(row) => {
          // Navigation handled by button in table
        }}
      />
      {totalTeams > 0 && (
        <MyPagination
          total={totalTeams}
          customPage={currentPage}
          customLimit={pageSize}
          setCustomPage={handlePageChange}
          setCustomLimit={handlePageSizeChange}
        />
      )}
    </>
  );
};

export default TeamMembersView;
