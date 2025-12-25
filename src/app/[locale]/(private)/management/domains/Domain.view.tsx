"use client";
import React, { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import SearchInput from "@/app/_components/common/SearchInput";
import MyMultipleSelect from "@/app/_components/form/MyMultipleSelect";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import PlusIcon from "@/app/_components/icons/PlusIcon";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { DOMAIN_STATUS_OPTIONS } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { useAdminLogic } from "./logic";

const AdminView = () => {
  const {
    data,
    fetching,
    total,
    columns,
    userRole,
    isManagerRole,
    isTeamLeaderRole,
    teamsData,
    isLoadingTeams,
    teamsLimit,
    setTeamsLimit,
    setTeamsSearch,
  } = useAdminLogic();
  const router = useLocaleRouter();
  const t = useTranslations("Domain");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State for selected team
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  // Get selected team from URL on load
  React.useEffect(() => {
    const teamIdParam = searchParams.get("teamId");
    if (teamIdParam && teamsData?.data) {
      const team = teamsData.data.find(
        (t: any) => t.id.toString() === teamIdParam,
      );
      if (team) {
        setSelectedTeam(team);
      }
    }
  }, [searchParams, teamsData]);

  // Handle team selection
  const handleTeamSelect = useCallback(
    (team: any) => {
      setSelectedTeam(team);
      const params = new URLSearchParams(searchParams);
      if (team) {
        params.set("teamId", team.id.toString());
      } else {
        params.delete("teamId");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  // Determine if user can create domains
  const canCreateAndOrderDomain = [
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ].includes(userRole);
  return (
    <>
      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex justify-between gap-2">
          <SearchInput
            className="h-[44px] !w-[500px]"
            placeholder={t("search.placeholder")}
          />
          <div className="row gap-2">
            {canCreateAndOrderDomain && (
              <MyButton
                onClick={() => router.push(ROUTERS.MANAGEMENT_DOMAINS_CREATE)}
                bType="secondary"
              >
                <PlusIcon /> Domains
              </MyButton>
            )}
            {canCreateAndOrderDomain && (
              <MyButton
                onClick={() =>
                  router.push(ROUTERS.MANAGEMENT_DOMAIN_ORDER_CREATE)
                }
                bType="secondary"
              >
                <PlusIcon /> Order Domains
              </MyButton>
            )}
            <MyButton
              onClick={() => router.push(ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST)}
              bType="secondary"
            >
              Order List management
            </MyButton>
          </div>
        </div>
        <div className="flex gap-4">
          <MyMultipleSelect
            options={DOMAIN_STATUS_OPTIONS}
            param="status"
            selectCheckboxItemClassName="lowercase first-letter:uppercase"
            wrapperClassName="w-[200px]"
            labelContent={t("search.status")}
          />
          {/* Team filter - show for manager roles and team leader roles */}
          {(isManagerRole || isTeamLeaderRole) && (
            <div className="w-[250px]">
              <SearchableSelect
                limit={teamsLimit}
                setLimit={setTeamsLimit}
                setSearch={setTeamsSearch}
                setValueSelected={(team) => handleTeamSelect(team)}
                valueSelected={selectedTeam}
                data={teamsData}
                isLoading={isLoadingTeams}
                placeholder={t("search.filterByTeam")}
                renderItem={({ item, onClick, onRemove }) => (
                  <div
                    onClick={onClick}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-50"
                  >
                    <p className="font-medium">{(item as any)?.name}</p>
                    {onRemove && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>
      <MyTable
        {...{
          data: data || [],
          fetching,
          columns,
          NoDataProps: {
            title: isTeamLeaderRole
              ? t("search.noDomainsForTeamLeader")
              : t("search.title"),
          },
          tableClassName: "min-w-[800px]",
        }}
      />
      <MyPagination total={total} />
    </>
  );
};

export default AdminView;
