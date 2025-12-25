"use client";
import React, { useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyDateRange from "@/app/_components/common/MyDateRange";
import MyModal from "@/app/_components/common/MyModal";
import SearchInput from "@/app/_components/common/SearchInput";
import { toast } from "@/app/_components/common/Toaster";
import MySingleSelectSearch from "@/app/_components/form/MySingleSelectSearch";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import OrderDetailModal from "@/app/_components/modal/Order/OrderDetailModal";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { optionsStatusOrder, ORDER_STATUS } from "@/store/Apis/Order.api";
import { AuthSelector } from "@/store/Auth";
import { formatCurrency } from "@/utils/format.util";

import { useAdminLogic } from "./logic";

import Cookies from "js-cookie";

const OrdersView = ({
  domainId,
  viewType,
}: {
  domainId?: string;
  viewType?: "domainDetail";
}) => {
  const t = useTranslations("Orders");

  const {
    data,
    fetching,
    total,

    columns,

    teamsData,
    isLoadingTeams,
    teamsLimit,
    setTeamsLimit,

    setTeamsSearch,
    isHighLevelRole,
    isTeamLeaderOrVice,

    handleClearQueryUrl,
    isModalDetail,
    setIsModalDetail,
    modalDetailData,

    showTeamApprovedTotal,
    teamApprovedTotal,
  } = useAdminLogic({ domainId, viewType });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useLocaleRouter();

  // State for selected team
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  // Export modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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

  const { admin } = useAppSelector(AuthSelector.selectAuthState);

  const tStatus = useTranslations("statusOrder");
  const optionsStatusOrderMultileLanguage = useMemo(() => {
    let result = optionsStatusOrder.map((item) => ({
      ...item,
      label: tStatus(item.key),
    }));

    if (
      [ADMIN_ROLE.TEAM_LEADER, ADMIN_ROLE.VICE_TEAM_LEADER].includes(
        admin?.role?.roleName as ADMIN_ROLE,
      )
    ) {
      result = result.filter(
        (i) => ![ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER].includes(i.key),
      );
    }

    return result;
  }, [tStatus, admin]);

  const buildExportParams = useCallback(() => {
    const params: Record<string, any> = {};
    const start = searchParams.get("start") || undefined;
    const end = searchParams.get("end") || undefined;
    const status = searchParams.get("status") || undefined;
    const orderCode = searchParams.get("orderCode") || undefined;
    const teamId = searchParams.get("teamId") || undefined;
    const sortBy = searchParams.get("sortBy") || undefined;
    const sortOrder = searchParams.get("sortOrder") || undefined;

    if (start) params.timeBegin = start;
    if (end) params.timeEnd = end;
    if (status) params.status = status;
    if (orderCode) params.orderCode = orderCode;
    if (teamId) params.teamId = teamId;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    if (domainId) params.domainId = domainId;
    return params;
  }, [searchParams, domainId]);

  const handleOpenExport = useCallback(() => {
    setIsExportModalOpen(true);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true);
      const params = buildExportParams();
      const query = new URLSearchParams(params as any).toString();
      const baseUrl =
        (process.env.NEXT_PUBLIC_API_URL || "") +
        "/" +
        (process.env.NEXT_PUBLIC_API_PREFIX || "");
      const url = `${baseUrl}/orders/export?${query}`;
      const token = Cookies.get("accessToken");
      const res = await fetch(url, {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to export");
      }
      const blob = await res.blob();
      // Try to extract filename from headers
      const disposition = res.headers.get("Content-Disposition") || "";
      const match =
        disposition.match(/filename\*=UTF-8''([^;\n]+)/) ||
        disposition.match(/filename="?([^";\n]+)"?/);
      const fileName =
        match && match[1] ? decodeURIComponent(match[1]) : "orders-export.xlsx";

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setIsExportModalOpen(false);
    } catch (e: any) {
      toast.error("Failed to export");
    } finally {
      setIsExporting(false);
    }
  }, [buildExportParams]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-2">
          <SearchInput
            placeholder={t("search.orderCodePlaceholder")}
            size="lg"
            className="w-[250px]"
            param="orderCode"
          />
          <MyDateRange />
          <div className="w-[270px]">
            <MySingleSelectSearch
              param="status"
              options={optionsStatusOrderMultileLanguage}
              myVariant="v2"
              placeholder={t("filters.status")}
            />
          </div>
          {/* Team filter - show for high-level roles and team leaders/vice leaders */}
          {(isHighLevelRole || isTeamLeaderOrVice) && (
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
              />
            </div>
          )}

          {viewType !== "domainDetail" && (
            <MyButton
              onClick={handleOpenExport}
              bType="primary"
              className="!h-[40px] !w-[160px]"
            >
              Export Excel
            </MyButton>
          )}

          <MyButton
            onClick={handleClearQueryUrl}
            bType="neutral"
            className="!h-[40px] !w-[134px]"
          >
            {t("filters.clearFilters")}
          </MyButton>
        </div>
      </div>
      {showTeamApprovedTotal && (
        <div className="mb-3 inline-flex min-w-[330px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-base font-semibold leading-none">
            {t("summary.totalApprovedCost")}
          </p>
          <p className="whitespace-nowrap text-lg font-bold leading-none text-accent-error">
            {formatCurrency(teamApprovedTotal)}
          </p>
        </div>
      )}
      <MyTable
        {...{
          data: data || [],
          fetching,
          columns,
          NoDataProps: {
            title: t("table.noData"),
          },
          tableClassName: "min-w-[1100px] border border-gray-200 rounded-lg",
          rowClassName: "border-b border-gray-100 hover:bg-gray-50",
          headerClassName: "bg-gray-50 border-b-2 border-gray-200",
        }}
      />
      <MyPagination total={total} />

      <MyModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        header={"Xác nhận export orders?"}
        body={
          <div className="space-y-3 px-5 py-4">
            <p className="text-base">
              Bạn đang xuất{" "}
              <span className="text-lg font-bold text-accent-error">
                {total}
              </span>{" "}
              đơn hàng với các điều kiện lọc sau:
            </p>

            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
              {!searchParams.get("orderCode") &&
                !searchParams.get("start") &&
                !searchParams.get("status") &&
                !selectedTeam && <p>Chưa áp dụng bộ lọc nào</p>}

              {!!searchParams.get("orderCode") && (
                <p>
                  <span className="font-medium">Mã đơn hàng:</span>{" "}
                  {searchParams.get("orderCode") || "-"}
                </p>
              )}

              {!!searchParams.get("start") && (
                <p>
                  <span className="font-medium">Khoảng thời gian:</span>{" "}
                  {(searchParams.get("start") || "-") +
                    " → " +
                    (searchParams.get("end") || "-")}
                </p>
              )}

              {!!searchParams.get("status") && (
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {(() => {
                    const s = searchParams.get("status");
                    if (!s) return "-";
                    const found = optionsStatusOrderMultileLanguage.find(
                      (o) => o.key === s,
                    );
                    return found ? tStatus(found.key as any) : s;
                  })()}
                </p>
              )}

              {(isHighLevelRole || isTeamLeaderOrVice) && !!selectedTeam && (
                <p>
                  <span className="font-medium">Team:</span>{" "}
                  {selectedTeam?.name || "-"}
                </p>
              )}
            </div>

            <p className="text-sm text-yellow-600">
              <span className="font-bold ">Lưu ý: </span>
              Hãy chọn đúng bộ lọc trước khi xuất dữ liệu của bạn để tiết kiệm
              thời gian truy xuất dữ liệu không mong muốn.
            </p>
          </div>
        }
        footer={
          <div className="flex w-full justify-end gap-2 px-5">
            <MyButton
              bType="neutral"
              onClick={() => setIsExportModalOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </MyButton>
            <MyButton
              bType="primary"
              isLoading={isExporting}
              onClick={handleExport}
            >
              Export
            </MyButton>
          </div>
        }
        size="md"
      />

      {isModalDetail && (
        <OrderDetailModal
          isOpen={isModalDetail}
          onCancel={() => setIsModalDetail(false)}
          orderData={modalDetailData}
        />
      )}
    </>
  );
};

export default OrdersView;
