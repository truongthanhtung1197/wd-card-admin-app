import React, { memo, ReactNode, useCallback, useMemo, useState } from "react";

import { cn } from "@/utils/common.util";
import {
  Divider,
  Select,
  SelectItem,
  SelectProps,
  SelectSection,
} from "@nextui-org/react";

import Text from "../../common/Text";
import { SelectCheckboxSearchInput } from "../../form/MyMultipleSelect";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

const getClassNames = ({
  isError,
  triggerClassName,
  popoverContentClassName,
}: {
  isError?: boolean;
  triggerClassName?: string;
  popoverContentClassName?: string;
}) => {
  return {
    trigger: cn(
      "bg-white rounded-lg border border-neutral-stroke-light hover:!bg-white hover:!border-brand-primary active:!border-brand-primary !px-4 !py-[8px] font-quicksand !h-[60px] shadow-none data-[disabled=true]:bg-neutral-on-surface-2",
      isError && "border-accent-error",
      triggerClassName,
    ),
    label:
      "text-neutral-element-secondary font-medium text-base font-quicksand z-[1]",
    input: "font-quicksand font-medium text-lg leading-[18px]",
    errorMessage: "text-sm font-medium text-accent-error",
    innerWrapper: "group-data-[has-label=true]:!pt-0",
    listbox: "!px-0 !py-2 !rounded-lg",
    popoverContent: cn("!p-0 !rounded-lg", popoverContentClassName),
    selectorIcon: "!size-5",
    listboxWrapper: "!px-0 !max-h-full !h-fit",
    base: "!opacity-100",
    value: "!text-neutral-element-tertiary !font-medium !text-base",
  };
};

export interface Option {
  label: string | number | ReactNode;
  key: string | number;
  searchKey?: string;
}
interface MyFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

interface MyInputProps extends Omit<SelectProps, "children"> {
  placeholder?: string;
  type?: string;
  name: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  editable?: boolean;
  isDivider?: boolean;
  options: Option[] | any[];
  isRequired?: boolean;
  triggerClassName?: string;
  onChangeSelect?: (v: string) => void;
  showSearch?: boolean;
  bottomContent?: ReactNode;
  popoverContentClassName?: string;
  popoverClassName?: string;
  placement?: "top" | "bottom" | undefined;
  topContent?: ReactNode;
  onChangeHandler?: (v: string) => void;
  contentLabel?: string;
  isModal?: boolean;
}

function SelectInput({
  options,
  name,
  renderValue,
  isModal = false,
  editable = true,
  isDivider = false,
  isRequired = false,
  classNames,
  triggerClassName,
  onChangeSelect,
  showSearch = false,
  bottomContent,
  popoverContentClassName,
  placement,
  popoverClassName,
  topContent,
  selectedKeys,
  placeholder,
  onChangeHandler,
  disallowEmptySelection = false,
  contentLabel = "",
  ...restProps
}: MyInputProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = useCallback((event: any) => {
    event.preventDefault();
    setSearchKeyword(event.target.value);
  }, []);
  const filteredOptions = useMemo(
    () =>
      options?.filter((option) => {
        return (option?.searchKey ? option?.searchKey : String(option?.label))
          ?.toLowerCase()
          .includes(searchKeyword.toLowerCase().trim());
      }),
    [options, searchKeyword],
  );

  return (
    <div className="w-full">
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          // eslint-disable-next-line unused-imports/no-unused-vars
          form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: MyFieldProps) => {
          if (!editable) {
            return (
              <div className="flex flex-col">
                <p className="!text-base !font-medium text-neutral-element-secondary">
                  {restProps.label}
                </p>
                <p className="mt-1 leading-6">
                  {contentLabel ||
                    options?.find((item) => item.key === field?.value)?.label ||
                    "-"}
                </p>
                {isDivider && <Divider className="mt-3" />}
              </div>
            );
          }
          return (
            <Select
              disallowEmptySelection={disallowEmptySelection}
              onBlur={restProps?.onBlur}
              isRequired={isRequired}
              label={restProps.label}
              isDisabled={restProps.isDisabled}
              placeholder={placeholder}
              fullWidth
              classNames={getClassNames({
                isError: !!errors?.[name],
                triggerClassName,
                popoverContentClassName,
              })}
              onChange={(e) => {
                onChangeHandler
                  ? onChangeHandler?.(e.target.value)
                  : setFieldValue(name, e.target.value);
                onChangeSelect?.(e.target.value);
              }}
              onClose={() => {
                setFieldTouched(name, true);
              }}
              selectedKeys={
                selectedKeys
                  ? selectedKeys
                  : new Set(field.value ? String(field.value)?.split(",") : [])
              }
              isInvalid={!!meta.error && !!meta.touched}
              errorMessage={meta.error}
              selectorIcon={
                <div>
                  <ArrowDownIcon />
                </div>
              }
              listboxProps={{
                classNames: {
                  list: cn(
                    "max-h-[300px] overflow-y-auto overflow-x-hidden",
                    popoverClassName,
                  ),
                },
                topContent: (
                  <>
                    {showSearch
                      ? ((
                          <div className="mx-4">
                            <SelectCheckboxSearchInput
                              value={searchKeyword}
                              placeholder="Search"
                              onChange={handleSearchChange}
                            />
                          </div>
                        ) as any)
                      : undefined}
                    {topContent}
                  </>
                ),

                bottomContent: bottomContent,
              }}
              popoverProps={{
                placement: placement,
                portalContainer: isModal
                  ? typeof window !== "undefined" &&
                    document.getElementById("my-modal-container") !== null
                    ? (document.getElementById("my-modal-container") as Element)
                    : undefined
                  : undefined,
              }}
              renderValue={
                renderValue
                  ? renderValue
                  : (items) => {
                      return (
                        <div
                          className={cn(
                            "row gap-3",
                            restProps.label && " pt-5",
                          )}
                        >
                          {items.map((item: any) => {
                            return (
                              <Text variant="body2-regular" key={item.key}>
                                {item.textValue}
                              </Text>
                            );
                          })}
                        </div>
                      );
                    }
              }
              startContent={restProps.startContent}
              endContent={restProps.endContent}
              aria-label={restProps.label || `Select ${name}`}
            >
              <SelectSection
                classNames={{
                  heading: "!pl-0",
                }}
              >
                {filteredOptions?.map((option) => (
                  <SelectItem
                    key={option.key}
                    content={option?.content}
                    hideSelectedIcon
                    textValue={option.label}
                    className="!rounded-none border-y border-y-transparent data-[hover=true]:!bg-neutral-surface data-[selectable=true]:focus:!border-y-neutral-stroke-light data-[selectable=true]:focus:!bg-neutral-surface"
                  >
                    <div className="!px-4 !py-3">
                      <Text
                        variant="body2-regular"
                        className="whitespace-break-spaces"
                      >
                        {option.label}
                      </Text>
                    </div>
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
          );
        }}
      </Field>
    </div>
  );
}

export default memo(SelectInput);
