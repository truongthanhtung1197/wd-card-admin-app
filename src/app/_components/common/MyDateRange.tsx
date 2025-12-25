import React, { memo, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { DatePicker, DatePickerProps } from "@nextui-org/react";

import CalendarIcon from "../icons/CalendarIcon";
import Text from "./Text";

const classNames = {
  segment: "font-medium text-base",
  innerWrapper: "gap-x-0",
  cell: "!w-[318px] !bg-red-500",
  inputWrapper: "!border-none",
};

interface MyDateRangeProps extends DatePickerProps {
  onSearch?: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
  startKey?: string;
  endKey?: string;

  defaultValues?: {
    startDate?: string;
    endDate?: string;
  };
}

const MyDateRange = memo(
  ({
    onSearch,
    startKey = "start",
    endKey = "end",
    defaultValues,
  }: MyDateRangeProps) => {
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useLocaleRouter();
    const t = useTranslations("common.dateRange");

    const defaultStart =
      defaultValues?.startDate || searchParams.get(startKey) || "";
    const defaultEnd = defaultValues?.endDate || searchParams.get(endKey) || "";

    const onStartDateChange = useCallback(
      (value: any) => {
        setStartDate(value);
        if (onSearch) {
          return;
        }
        const params = new URLSearchParams(searchParams);
        params.set(startKey, value?.toString());
        params.set("page", "1");
        push(`${pathname}?${params.toString()}`, { scroll: false });
      },
      [searchParams, pathname, push, onSearch],
    );
    const onEndDateChange = useCallback(
      (value: any) => {
        setEndDate(value);
        if (onSearch) {
          return;
        }
        const params = new URLSearchParams(searchParams);
        params.set(endKey, value?.toString());
        params.set("page", "1");
        push(`${pathname}?${params.toString()}`, { scroll: false });
      },
      [searchParams, pathname, push, onSearch],
    );

    useEffect(() => {
      if (defaultStart) {
        setStartDate(parseDate(defaultStart));
      } else {
        setStartDate(null);
      }
      if (defaultEnd) {
        setEndDate(parseDate(defaultEnd));
      } else {
        setEndDate(null);
      }
    }, [defaultStart, defaultEnd]);

    useEffect(() => {
      if (startDate && endDate && onSearch) {
        onSearch?.({ startDate, endDate });
      }
    }, [startDate, endDate, onSearch]);

    return (
      <div
        id="my-range-input"
        className="flex !h-[40px] w-max items-center divide-solid rounded-3xl border border-neutral-stroke-light bg-white font-quicksand shadow-none hover:!border-brand-primary hover:bg-white"
      >
        <DatePicker
          CalendarTopContent={
            <div className="flex w-full items-center justify-center bg-white pt-2">
              <Text variant="body2-emphasized">{t("startDate")}</Text>
            </div>
          }
          onChange={onStartDateChange}
          aria-label="date"
          aria-hidden={false}
          id="my-date-range-input1"
          itemID="my-date-range-input1"
          isInvalid={false}
          errorMessage={null}
          selectorIcon={<CalendarIcon />}
          visibleMonths={1}
          pageBehavior="single"
          variant="bordered"
          value={startDate}
          calendarWidth={318}
          dateInputClassNames={{ ...classNames }}
          maxValue={endDate ? endDate : today(getLocalTimeZone())}
        />
        <div>-</div>
        <DatePicker
          CalendarTopContent={
            <div className="flex w-full items-center justify-center bg-white pt-2">
              <Text variant="body2-emphasized">{t("endDate")}</Text>
            </div>
          }
          isInvalid={false}
          errorMessage={null}
          selectorIcon={<CalendarIcon />}
          minValue={startDate ? startDate : undefined}
          maxValue={today(getLocalTimeZone())}
          aria-hidden={false}
          onChange={onEndDateChange}
          visibleMonths={1}
          pageBehavior="single"
          variant="bordered"
          value={endDate}
          calendarWidth={318}
          dateInputClassNames={classNames}
          popoverTargetAction="hide"
          id="my-date-range-input2"
          itemID="my-date-range-input2"
          aria-label="date"
        />
        {/* {startDate && endDate && onSearch && (
          <div
            onClick={onSearch}
            className="center mr-[6px] cursor-pointer rounded-full bg-brand-primary p-[6px] text-base text-white"
          >
            <SearchIcon fill="#fff" size={15} />
          </div>
        )} */}
      </div>
    );
  },
);

export default MyDateRange;
