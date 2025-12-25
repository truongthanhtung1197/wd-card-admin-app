import React, { memo, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import ArrowDownIcon from "@/app/_components/icons/ArrowDownIcon";
import CheckedIcon from "@/app/_components/icons/CheckedIcon";
import SearchIcon from "@/app/_components/icons/SearchIcon";
import UnCheckIcon from "@/app/_components/icons/UnCheckIcon";
import { LOAN_STATUS_MERGE, LOAN_STATUS_STATE } from "@/constant/Loan.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";
import { Input } from "@nextui-org/input";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";

interface MyMultipleSelectProps {
  options: {
    label: string;
    key: any;
    icon?: React.ReactNode;
    subLabel?: string;
    searchKey?: string;
  }[];
  showSearch?: boolean;
  param: string;
  subParam?: string;
  labelContent?: string;
  wrapperClassName?: string;
  selectCheckboxItemClassName?: string;
  popoverContentClassName?: string;
  noUppercase?: boolean;
}

export const MyMultipleSelect: React.FC<MyMultipleSelectProps> = memo(
  ({
    options,
    showSearch = false,
    param,
    subParam,
    labelContent,
    wrapperClassName,
    selectCheckboxItemClassName,
    popoverContentClassName,
    noUppercase = true,
  }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useLocaleRouter();

    const targetParam = searchParams.get(param) || "";
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const getClassNames = useCallback((popoverContentClassName?: string) => {
      return {
        trigger: `relative bg-white border hover:!border-brand-primary hover:!bg-white active:!border-brand-primary !pl-4 !pr-3 !py-2 font-quicksand !h-[40px] shadow-none rounded-3xl ${
          targetParam.toString() !== ""
            ? "border-neutral-element-tertiary"
            : "border-neutral-stroke-light"
        }`,
        label:
          "text-neutral-element-secondary font-medium text-lg font-quicksand ",
        input: "font-quicksand font-medium text-lg leading-[18px]",
        value: "text-neutral-element-primary font-medium text-base",
        listboxWrapper: "!px-0 !max-h-full !h-fit",
        content: "!px-0",
        listbox: "!px-0 !py-2 !rounded-none",
        popoverContent: cn(
          `!max-w-[260px] !p-0 !rounded-lg w-max`,
          popoverContentClassName,
        ),
        selectorIcon: "flex h-5 w-5 items-center justify-center",
      };
    }, []);

    const onSelect = useCallback(
      (e: any) => {
        const params = new URLSearchParams(searchParams);

        const listStatus = e.target.value ? e.target.value?.split(",") : [];

        const updatedStatus = new Set(listStatus);

        const isLoanInitialState = listStatus.some((value: string) =>
          Object.values(LOAN_STATUS_STATE).includes(value as any),
        );
        if (isLoanInitialState) {
          updatedStatus.add(LOAN_STATUS_MERGE.Loan_initiated);
        }

        if (
          updatedStatus.size === 1 &&
          updatedStatus.has(LOAN_STATUS_MERGE.Loan_initiated)
        ) {
          updatedStatus.delete(LOAN_STATUS_MERGE.Loan_initiated);
        }

        setSelectedKeys(updatedStatus as Set<string>);
        params.set(param, Array.from(updatedStatus).join(","));
        params.set("page", "1");

        push(`${pathname}?${params.toString()}`);
      },
      [pathname, searchParams],
    );

    const onClearAll = useCallback(() => {
      const params = new URLSearchParams(searchParams);
      setSelectedKeys(new Set([]));
      params.delete(`${param}`);
      params.set("page", "1");
      push(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname]);

    useEffect(() => {
      const listStatus = targetParam ? targetParam?.split(",") : [];
      setSelectedKeys(new Set(listStatus));
    }, [targetParam]);

    const handleSearchChange = useCallback((event: any) => {
      event.preventDefault();
      setSearchKeyword(event.target.value);
    }, []);

    const filteredOptions = options?.filter((option) =>
      option.label.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return (
      <div className={cn("min-w-[182px]", wrapperClassName)}>
        <Select
          aria-label="MyMultipleSelect"
          radius="full"
          selectionMode="multiple"
          // isLoading={isLoading}
          placeholder={`All ${labelContent ?? param}`}
          classNames={{
            ...getClassNames(popoverContentClassName),
            trigger: `${getClassNames().trigger} group`,
          }}
          selectedKeys={selectedKeys}
          selectorIcon={
            <div
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              <ArrowDownIcon />
            </div>
          }
          disableSelectorIconRotation={false}
          onChange={onSelect}
          renderValue={(items) => {
            return (
              <p className="text-base font-medium">
                {items?.length
                  ? `${items?.length} ${labelContent ?? param}`
                  : `All ${labelContent ?? param}`}
              </p>
            );
          }}
          listboxProps={{
            classNames: {
              list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
            },
            topContent: showSearch
              ? ((
                  <div className="">
                    <SelectCheckboxSearchInput
                      value={searchKeyword}
                      placeholder="Search"
                      onChange={handleSearchChange}
                    />
                  </div>
                ) as any)
              : undefined,

            bottomContent: (
              <div className="h-fit px-3 pb-1">
                <button
                  onClick={onClearAll}
                  className={`!h-7 rounded-md border border-neutral-stroke-bold px-3 text-sm leading-[16px]`}
                >
                  Clear All
                </button>
              </div>
            ),
          }}
          onOpenChange={setIsOpen}
        >
          <SelectSection
            classNames={{
              heading: "!pl-0",
            }}
          >
            {filteredOptions?.map((option) => (
              <SelectItem
                key={option?.subLabel ? option.subLabel : option.key}
                hideSelectedIcon
                textValue={option.label}
                className={`!rounded-[0px] px-4 py-3 data-[hover=true]:!bg-neutral-surface data-[selectable=true]:focus:!bg-neutral-surface`}
              >
                <SelectCheckboxItem
                  selectCheckboxItemClassName={selectCheckboxItemClassName}
                  checked={
                    option?.subLabel
                      ? selectedKeys.has(option.subLabel)
                      : selectedKeys.has(option.key)
                  }
                  label={option.label}
                  subLabel={option.subLabel || undefined}
                  icon={option?.icon}
                  noUppercase={noUppercase}
                />
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      </div>
    );
  },
);

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (event: any) => void;
}

export const SelectCheckboxSearchInput = memo(
  ({ className, placeholder, value, onChange }: SearchInputProps) => {
    return (
      <div className={cn("w-full px-2 pb-1", className)}>
        <Input
          radius="sm"
          classNames={{
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90 font-quicksand font-medium",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-white",
              "border",
              "border-neutral-stroke-light",
              "hover:!bg-white",
              "hover:!border-brand-primary",
              "group-data-[focus=true]:bg-white",
              "group-data-[focus=true]:border-brand-primary",
              "!shadow-none",
            ],
          }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          endContent={<SearchIcon />}
        />
      </div>
    );
  },
);

const SelectCheckboxItem = memo(
  ({
    checked,
    label,
    subLabel,
    selectCheckboxItemClassName,
    icon,
    noUppercase = false,
  }: {
    checked: boolean;
    label: string;
    subLabel?: string;
    selectCheckboxItemClassName?: string;
    icon?: React.ReactNode;
    noUppercase?: boolean;
  }) => {
    return (
      <div className="row items-start gap-3">
        <div>
          {checked ? <CheckedIcon size="20" /> : <UnCheckIcon size="20" />}
        </div>
        <div className="row gap-3">
          {icon}
          <div>
            <p
              className={cn(
                `whitespace-break-spaces text-base font-medium`,
                !noUppercase && "uppercase",
                selectCheckboxItemClassName,
              )}
            >
              {label}
            </p>
            {subLabel && (
              <p className="mt-1 text-base font-medium text-neutral-element-secondary">
                {subLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default MyMultipleSelect;
