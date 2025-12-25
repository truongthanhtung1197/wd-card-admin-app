import React, { memo, useEffect } from "react";

import CalendarIcon from "@/app/_components/icons/CalendarIcon";
import { cn } from "@/utils/common.util";
import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  parseDate,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { DatePicker, Divider } from "@nextui-org/react";

import moment from "moment";

interface Props {
  name?: string;
  label?: string;
  isRequired?: boolean;
  editable?: boolean;
  isDivider?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  onBlur?: () => void;
  maxValue?: CalendarDate | undefined;
  minValue?: CalendarDate;
}
const DateInput = memo(
  ({
    label = "",
    value = "",
    isDivider,
    editable = true,
    isRequired = false,
    onChange,
    onBlur,
    maxValue,
    minValue = undefined,
  }: Props) => {
    const [date, setDate] = React.useState<
      CalendarDate | CalendarDateTime | ZonedDateTime | null
    >();
    const _onChange = (
      value: CalendarDate | CalendarDateTime | ZonedDateTime,
    ) => {
      setDate(value);
      onChange?.(value ? value?.toString() : "");
    };
    useEffect(() => {
      if (value) {
        setDate(parseDate(value || ""));
        return;
      }
      setDate(null);
    }, [value]);

    return (
      <div className="date-input">
        {!editable ? (
          <div className="flex flex-col">
            <p className="!text-base !font-medium text-neutral-element-secondary">
              {label}
            </p>
            <p className={cn("mt-1 leading-6")}>
              {date ? moment(date).format("MM/DD/YYYY") : "-"}
            </p>
            {isDivider && <Divider className="mt-3" />}
          </div>
        ) : (
          <DatePicker
            isInvalid={false}
            errorMessage={null}
            aria-label="date"
            selectorIcon={<CalendarIcon />}
            minValue={minValue}
            maxValue={
              maxValue === undefined || maxValue
                ? maxValue
                : today(getLocalTimeZone())
            }
            className="w-full"
            onChange={_onChange as any}
            visibleMonths={1}
            pageBehavior="single"
            variant="bordered"
            value={date as any}
            label={label}
            calendarWidth={318}
            isRequired={isRequired}
            classNames={{
              base: "!h-[60px] !bg-white",
              label: "!text-[14px]",
            }}
            onBlur={onBlur}
            calendarProps={{
              classNames: {
                gridHeaderCell: "!w-10",
              },
            }}
          />
        )}
      </div>
    );
  },
);

export default DateInput;
