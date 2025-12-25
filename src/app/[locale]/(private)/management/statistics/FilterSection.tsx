"use client";
import React, { useMemo } from "react";

import MyButton from "@/app/_components/common/MyButton";
import MyDateRangeNotParams from "@/app/_components/common/MyDateRangeNotParams";

interface FilterSectionProps {
  selectedMonth: number;
  selectedYear: number;
  activeTab: string | null;
  finalTimeBegin: string;
  finalTimeEnd: string;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onTabFilter: (tab: string) => void;
  onMonthYearFilter: () => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  t: (key: string) => string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedMonth,
  selectedYear,
  activeTab,
  finalTimeBegin,
  finalTimeEnd,
  onMonthChange,
  onYearChange,
  onTabFilter,
  onMonthYearFilter,
  onStartDateChange,
  onEndDateChange,
  t,
}) => {
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: `${t("filter.month")} ${i + 1}`,
      })),
    [t],
  );

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() - 5 + i;
        return {
          value: year,
          label: year.toString(),
        };
      }),
    [],
  );

  const tabOptions = useMemo(
    () => [
      { key: "thisWeek", label: t("filter.thisWeek") },
      { key: "lastWeek", label: t("filter.lastWeek") },
      { key: "thisMonth", label: t("filter.thisMonth") },
      { key: "lastMonth", label: t("filter.lastMonth") },
    ],
    [t],
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{t("filter.title")}</h3>

      <div className="flex flex-wrap items-end gap-4">
        {/* Tab Filter */}
        <div className="flex-1">
          <h4 className="text-md mb-3 font-medium">{t("filter.timeRange")}</h4>
          <div className="flex space-x-2">
            {tabOptions.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabFilter(tab.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Month/Year Filter */}
        <div className="flex-1">
          <h4 className="text-md mb-3 font-medium">{t("filter.monthYear")}</h4>
          <div className="flex items-end space-x-4">
            <div>
              <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(parseInt(e.target.value))}
                className="w-32 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                className="w-32 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <MyButton
              onClick={onMonthYearFilter}
              bType="primary"
              className="!h-[40px]"
            >
              {t("filter.apply")}
            </MyButton>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex-1">
          <h4 className="text-md mb-3 font-medium">
            {t("filter.customDateRange")}
          </h4>
          <MyDateRangeNotParams
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <div className="w-full rounded-lg border border-yellow-600 bg-yellow-50 px-4 py-3 font-medium text-yellow-800">
          <span className="text-sm">{t("filter.searchFrom")} </span>
          <span className="font-bold text-blue-900">{finalTimeBegin}</span>
          <span className="text-sm"> {t("filter.to")} </span>
          <span className="font-bold text-blue-900">{finalTimeEnd}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
