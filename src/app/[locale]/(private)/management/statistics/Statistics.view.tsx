"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import Loading from "@/app/_components/common/Loading";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import { DOMAIN_STATUS } from "@/constant/domain.constant";
import { ORDER_STATUS } from "@/store/Apis/Order.api";

import FilterSection from "./FilterSection";
import { useStatisticsLogic } from "./logic";
import {
  ALL_CHART_COLORS,
  CHART_COLORS,
  createBarChartOptions,
  createCompleteData,
  createExpenseChartOptions,
  createPieChartOptions,
  normalizeData2Array,
} from "./statistics.utils";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Đăng ký các components cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  ChartDataLabels,
);

const StatisticsView = () => {
  const {
    data,
    loading,
    calculateMonthYearRange,
    calculateDateRange,
    finalTimeBegin,
    finalTimeEnd,
    data2,
  } = useStatisticsLogic();

  const t = useTranslations("statistics");
  const tStatusOrder = useTranslations("statusOrder");
  const tDomainStatus = useTranslations("domainStatus");
  const searchParams = useSearchParams();
  const router = useRouter();
  const tSidebar = useTranslations("sidebar");

  // State cho filter tháng/năm
  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(
      searchParams.get("month") || (new Date().getMonth() + 1).toString(),
    ),
  );
  const [selectedYear, setSelectedYear] = useState(
    parseInt(searchParams.get("year") || new Date().getFullYear().toString()),
  );

  // State cho filter tab
  const [activeTab, setActiveTab] = useState<string | null>(
    searchParams.get("tab") || "thisMonth",
  );

  // Đồng bộ state với URL params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    if (tabParam) {
      setActiveTab(tabParam);
    }
    if (monthParam) {
      setSelectedMonth(parseInt(monthParam));
    }
    if (yearParam) {
      setSelectedYear(parseInt(yearParam));
    }
  }, [searchParams]);

  // Memoized data processing
  const allOrderStatuses = useMemo(() => Object.values(ORDER_STATUS), []);
  const allDomainStatuses = useMemo(() => Object.values(DOMAIN_STATUS), []);

  const orderData = useMemo(
    () =>
      createCompleteData(data?.order?.data || [], allOrderStatuses, (status) =>
        tStatusOrder(status),
      ),
    [data?.order?.data, allOrderStatuses, tStatusOrder],
  );

  const domainData = useMemo(
    () =>
      createCompleteData(
        data?.domain?.data || [],
        allDomainStatuses,
        (status) => tDomainStatus(status),
      ),
    [data?.domain?.data, allDomainStatuses, tDomainStatus],
  );

  const expenseData = useMemo(
    () => data?.expenseWithOrderStatus?.data || [],
    [data?.expenseWithOrderStatus?.data],
  );

  const expenseLabels = useMemo(
    () => expenseData.map((item: any) => tStatusOrder(item.status)),
    [expenseData, tStatusOrder],
  );

  const expenseValues = useMemo(
    () => expenseData.map((item: any) => parseFloat(item.totalAmount)),
    [expenseData],
  );

  const expenseTeam1NewData = useMemo(
    () => data?.expenseTeam1NewWithOrderStatus?.data || [],
    [data?.expenseTeam1NewWithOrderStatus?.data],
  );

  const expenseTeam1NewLabels = useMemo(
    () => expenseTeam1NewData.map((item: any) => tStatusOrder(item.status)),
    [expenseTeam1NewData, tStatusOrder],
  );

  const expenseTeam1NewValues = useMemo(
    () => expenseTeam1NewData.map((item: any) => parseFloat(item.totalAmount)),
    [expenseTeam1NewData],
  );

  const data2Array = useMemo(() => normalizeData2Array(data2), [data2]);

  // Memoized chart data
  const orderChartData = useMemo(
    () => ({
      labels: orderData.labels,
      datasets: [
        {
          data: orderData.values,
          backgroundColor: ALL_CHART_COLORS,
          borderColor: ALL_CHART_COLORS,
          borderWidth: 1,
          paddingBottom: 40,
          marginBottom: 50,
        },
      ],
    }),
    [orderData],
  );

  const domainChartData = useMemo(
    () => ({
      labels: domainData.labels,
      datasets: [
        {
          data: domainData.values,
          backgroundColor: [
            CHART_COLORS.secondary,
            CHART_COLORS.danger,
            CHART_COLORS.accent,
            CHART_COLORS.purple,
          ],
          borderColor: [
            CHART_COLORS.secondary,
            CHART_COLORS.danger,
            CHART_COLORS.accent,
            CHART_COLORS.purple,
          ],
          borderWidth: 2,
          borderSkipped: false,
          paddingBottom: 40,
          marginBottom: 50,
        },
      ],
    }),
    [domainData],
  );

  const expenseChartData = useMemo(
    () => ({
      labels: expenseLabels,
      datasets: [
        {
          data: expenseValues,
          backgroundColor: ALL_CHART_COLORS,
          borderColor: ALL_CHART_COLORS,
          borderWidth: 2,
          borderSkipped: false,
          paddingBottom: 40,
        },
      ],
    }),
    [expenseLabels, expenseValues],
  );

  const expenseChartDataTeam1New = useMemo(
    () => ({
      labels: expenseTeam1NewLabels,
      datasets: [
        {
          data: expenseTeam1NewValues,
          backgroundColor: ALL_CHART_COLORS,
          borderColor: ALL_CHART_COLORS,
          borderWidth: 2,
          borderSkipped: false,
          paddingBottom: 40,
        },
      ],
    }),
    [expenseTeam1NewLabels, expenseTeam1NewValues],
  );

  const expenseByDomainBranchChartData = useMemo(
    () => ({
      labels: data2Array.map((item: any) => item?.patternType || ""),
      datasets: [
        {
          data: data2Array.map((item: any) =>
            parseFloat(item?.totalAmount || "0"),
          ),
          backgroundColor: [
            CHART_COLORS.primary,
            CHART_COLORS.secondary,
            CHART_COLORS.accent,
            CHART_COLORS.purple,
          ],
          borderColor: [
            CHART_COLORS.primary,
            CHART_COLORS.secondary,
            CHART_COLORS.accent,
            CHART_COLORS.purple,
          ],
          borderWidth: 1,
        },
      ],
    }),
    [data2Array],
  );

  const teamChartData = useMemo(
    () => ({
      labels: data?.teamExpense?.data?.map((t: any) => t.teamName) || [],
      datasets: [
        {
          label: "Spending",
          data:
            data?.teamExpense?.data?.map((t: any) => Number(t.totalAmount)) ||
            [],
          backgroundColor: ALL_CHART_COLORS,
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    }),
    [data?.teamExpense?.data],
  );

  // Memoized chart options
  const orderChartOptions = useMemo(
    () =>
      createBarChartOptions(t("totalOrder"), {
        formatter: (value: any) => value,
      }),
    [t],
  );

  const domainChartOptions = useMemo(
    () =>
      createBarChartOptions(t("totalDomain"), {
        formatter: (value: any) => value,
        tooltipFormatter: (context: any) =>
          `${context.label}: ${context.parsed.y}`,
      }),
    [t],
  );

  const expenseByDomainBranchChartOptions = useMemo(
    () =>
      createBarChartOptions(t("expenseByDomainBranch"), {
        formatter: (value: any) => {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value);
        },
      }),
    [t],
  );

  const teamChartOptions = useMemo(
    () => createPieChartOptions("Team statistic"),
    [],
  );

  const expenseChartOptions = useCallback(
    (text: string) => createExpenseChartOptions(text),
    [],
  );

  // Handlers
  const handleMonthYearFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const { start, end } = calculateMonthYearRange(selectedMonth, selectedYear);
    params.set("start", start);
    params.set("end", end);
    params.delete("tab");
    setActiveTab(null);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    searchParams,
    selectedMonth,
    selectedYear,
    calculateMonthYearRange,
    router,
  ]);

  const handleTabFilter = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      const params = new URLSearchParams(searchParams);
      const { start, end } = calculateDateRange(tab);
      params.set("start", start);
      params.set("end", end);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, calculateDateRange, router],
  );

  const onStartDateChange = useCallback(
    (date: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("start", date);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const onEndDateChange = useCallback(
    (date: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("end", date);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <SetupSubHeader label={tSidebar("statistics")} />
      <div className="space-y-6">
        <FilterSection
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          activeTab={activeTab}
          finalTimeBegin={finalTimeBegin}
          finalTimeEnd={finalTimeEnd}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onTabFilter={handleTabFilter}
          onMonthYearFilter={handleMonthYearFilter}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          t={t}
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md 2xl:col-span-1">
            <Bar
              data={expenseChartData}
              options={expenseChartOptions(t("expenseByOrderStatus"))}
            />
          </div>
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md 2xl:col-span-1">
            <Bar
              data={expenseChartDataTeam1New}
              options={expenseChartOptions(t("expenseByOrderStatusTeam1New"))}
            />
          </div>

          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md 2xl:col-span-1">
            <Bar data={orderChartData} options={orderChartOptions} />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <Pie data={teamChartData} options={teamChartOptions} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <Bar
              data={expenseByDomainBranchChartData}
              options={expenseByDomainBranchChartOptions}
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <Bar data={domainChartData} options={domainChartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsView;
