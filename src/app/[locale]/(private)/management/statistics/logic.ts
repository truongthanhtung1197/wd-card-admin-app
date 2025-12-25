"use client";

import { useEffect, useRef } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";

import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import {
  useGetStatistics2Query,
  useGetStatisticsQuery,
} from "@/store/Apis/Statistics.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";

import moment from "moment";

export const useStatisticsLogic = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  const { admin, accessToken } = useAppSelector(AuthSelector.selectAuthState);
  if (accessToken && admin?.role?.roleName !== ADMIN_ROLE.SUPER_ADMIN) {
    notFound();
  }

  const timeBegin = searchParams.get("start");
  const timeEnd = searchParams.get("end");
  const tab = searchParams.get("tab");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  // Hàm tính toán ngày tháng dựa trên tab
  const calculateDateRange = (tabType: string) => {
    const today = moment();

    switch (tabType) {
      case "thisWeek":
        return {
          start: today.clone().startOf("week").format("YYYY-MM-DD"),
          end: today.clone().endOf("week").format("YYYY-MM-DD"),
        };
      case "lastWeek":
        return {
          start: today
            .clone()
            .subtract(1, "week")
            .startOf("week")
            .format("YYYY-MM-DD"),
          end: today
            .clone()
            .subtract(1, "week")
            .endOf("week")
            .format("YYYY-MM-DD"),
        };
      case "thisMonth":
        return {
          start: today.clone().startOf("month").format("YYYY-MM-DD"),
          end: today.clone().endOf("month").format("YYYY-MM-DD"),
        };
      case "lastMonth":
        return {
          start: today
            .clone()
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          end: today
            .clone()
            .subtract(1, "month")
            .endOf("month")
            .format("YYYY-MM-DD"),
        };
      default:
        return {
          start: today.clone().startOf("month").format("YYYY-MM-DD"),
          end: today.clone().endOf("month").format("YYYY-MM-DD"),
        };
    }
  };

  const calculateMonthYearRange = (monthValue: number, yearValue: number) => {
    const startDate = moment(
      `${yearValue}-${monthValue?.toString().padStart(2, "0")}-01`,
    );
    const endDate = startDate.clone().endOf("month");

    return {
      start: startDate.format("YYYY-MM-DD"),
      end: endDate.format("YYYY-MM-DD"),
    };
  };

  useEffect(() => {
    isInitialized.current = false;

    if (timeBegin && timeEnd && !tab && !month && !year) {
      isInitialized.current = true;
      return;
    }

    let dateRange = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().endOf("month").format("YYYY-MM-DD"),
    };

    if (!isInitialized.current) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("start", dateRange.start);
      newParams.set("end", dateRange.end);
      router.replace(`?${newParams.toString()}`);
      isInitialized.current = true;
    }
  }, []);

  const finalTimeBegin =
    timeBegin || moment().startOf("month").format("YYYY-MM-DD");
  const finalTimeEnd = timeEnd || moment().endOf("month").format("YYYY-MM-DD");

  const { data: statisticsData, isLoading: loading } = useGetStatisticsQuery(
    {
      timeBegin: finalTimeBegin,
      timeEnd: finalTimeEnd,
    },
    {
      skip: !finalTimeBegin || !finalTimeEnd,
    },
  );

  const { data: statisticsData2, isLoading: loading2 } = useGetStatistics2Query(
    {
      timeBegin: finalTimeBegin,
      timeEnd: finalTimeEnd,
    },
    {
      skip: !finalTimeBegin || !finalTimeEnd,
    },
  );

  return {
    finalTimeBegin,
    finalTimeEnd,
    data: statisticsData,
    data2: statisticsData2,
    loading,
    loading2,
    calculateMonthYearRange,
    calculateDateRange,
  };
};
