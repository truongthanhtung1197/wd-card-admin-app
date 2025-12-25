"use client";

import React, { useState } from "react";

import ArrowDownIcon from "@/app/_components/icons/ArrowDownIcon";
import CheckedIcon from "@/app/_components/icons/CheckedIcon";
import UnCheckIcon from "@/app/_components/icons/UnCheckIcon";
import { cn } from "@/utils/common.util";
import {
  Divider,
  Select,
  SelectItem,
  SelectProps,
  SelectSection,
} from "@nextui-org/react";

import { Option } from "./FSelectInput";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { isString, upperFirst } from "lodash";

const getClassNames = ({
  isInvalid,
  isDisabled,
  triggerClassName,
}: {
  isInvalid?: boolean;
  isDisabled?: boolean;
  triggerClassName?: string;
}) => ({
  trigger: cn(
    `bg-white rounded-lg border border-neutral-stroke-light data-[hover=true]:bg-white hover:!border-brand-primary active:!border-brand-primary !px-5 !pb-[27px] !pt-4 font-quicksand !h-fit shadow-none`,
    isInvalid && "border border-input-error",
    isDisabled && "!bg-neutral-surface",
    triggerClassName,
  ),
  label:
    "text-neutral-element-secondary font-medium text-lg font-quicksand group-data-[filled=true]:!top-5",
  input: "font-quicksand font-medium text-lg leading-[18px]",
  errorMessage: "text-sm font-medium text-accent-error",
  innerWrapper: "!pt-24px",
  listbox: "!px-0 !py-2 !rounded-lg",
  popoverContent: "!p-0 !rounded-lg",
  base: "!opacity-100",
});

interface MyFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

interface FSelectMultipleProps extends Omit<SelectProps, "children"> {
  placeholder?: string;
  type?: string;
  name: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  options: Option[];
  editable?: boolean;
  triggerClassName?: string;
  renderContentClassName?: string;
  renderContentItemClassName?: string;
  displayCount?: number;
  isDivider?: boolean;
  isUpperCaseItem?: boolean;
}

function FSelectMultiple({
  options,
  name,
  renderValue,
  editable = true,
  triggerClassName,
  displayCount = 3,
  renderContentClassName,
  renderContentItemClassName,
  isDivider,
  isUpperCaseItem,
  ...restProps
}: FSelectMultipleProps) {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  return (
    <div className="w-full">
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          // eslint-disable-next-line unused-imports/no-unused-vars
          form: { setFieldValue, validateField }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: MyFieldProps) => {
          return editable ? (
            <Select
              isOpen={isOpenSelect}
              className="w-full"
              classNames={getClassNames({
                isInvalid: !!(meta.touched && meta.error),
                isDisabled: restProps?.isDisabled,
                triggerClassName,
              })}
              {...restProps}
              onOpenChange={(open) => {
                open !== isOpenSelect && setIsOpenSelect(open);
                restProps?.isRequired && validateField?.(name);
              }}
              selectedKeys={
                new Set(field.value ? String(field.value)?.split(",") : [])
              }
              onChange={(e) => {
                setFieldValue(name, e.target.value);
              }}
              isInvalid={!!(meta.touched && meta.error)}
              errorMessage={meta.error}
              selectorIcon={
                <div className="absolute right-4">
                  <ArrowDownIcon />
                </div>
              }
              listboxProps={{
                classNames: {
                  list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
                },
              }}
              renderValue={
                renderValue
                  ? renderValue
                  : (items) => {
                      return (
                        <div
                          className={cn(
                            "row flex-wrap gap-3",
                            renderContentClassName,
                          )}
                        >
                          {items.map((item: any, index: number) => {
                            if (index > displayCount - 1) return null;
                            return (
                              <div
                                key={item.key}
                                className={cn(
                                  "row mt-[2px] w-fit max-w-full whitespace-break-spaces rounded-[4px] border border-elementIndicator-neutral-bold bg-neutral-surface  px-2 py-1",
                                  renderContentItemClassName,
                                )}
                              >
                                <p
                                  className={cn(
                                    "mr-0 text-sm font-medium leading-4",
                                    isUpperCaseItem && "first-letter:uppercase",
                                  )}
                                >
                                  {item.textValue}
                                </p>
                              </div>
                            );
                          })}
                          {items?.length > displayCount && (
                            <div
                              className={cn(
                                "row mt-[2px] w-fit gap-3 rounded-[4px] border border-elementIndicator-neutral-bold bg-neutral-surface px-2 py-1",
                                renderContentItemClassName,
                              )}
                            >
                              <p className="text-sm font-medium leading-4">
                                + {items?.length - displayCount}{" "}
                                {restProps?.label}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
              }
            >
              <SelectSection
                classNames={{
                  heading: "flex py-3 border-b border-neutral-stroke-light",
                }}
              >
                {options.map((option) => (
                  <SelectItem
                    key={option.key}
                    hideSelectedIcon
                    textValue={String(option.label)}
                    className="!rounded-none data-[hover=true]:!bg-neutral-surface data-[selectable=true]:focus:!bg-neutral-surface"
                  >
                    <div className="row gap-3 px-2 py-1.5">
                      <div>
                        {field.value?.includes(option.key) ? (
                          <CheckedIcon />
                        ) : (
                          <UnCheckIcon />
                        )}
                      </div>

                      <p className="line-clamp-1 flex flex-1 whitespace-break-spaces font-medium">
                        {option.label}
                      </p>
                    </div>
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
          ) : (
            <div className="">
              <p className={cn("text-neutral-element-secondary")}>
                {restProps?.label}
              </p>
              <p className={cn("mt-1")}>
                {meta?.value
                  ? isString(meta?.value) &&
                    meta?.value
                      ?.split(",")
                      .map((item) => {
                        if (isUpperCaseItem) {
                          return upperFirst(
                            (options.find((option) => option.key === item)
                              ?.label || "") as string,
                          );
                        }
                        return options.find((option) => option.key === item)
                          ?.label;
                      })
                      ?.join(", ")
                  : "-"}
              </p>
              {isDivider && <Divider className="mt-3" />}
            </div>
          );
        }}
      </Field>
    </div>
  );
}

export default FSelectMultiple;
