import React, { memo } from "react";

import { AGENCY_STATUS, LEAD_STATUS } from "@/constant";
import { cn } from "@/utils/common.util";
import { Divider, Select, SelectItem, SelectProps } from "@nextui-org/react";

import Text from "../../common/Text";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

const getDefaultClassNames = (isInvalid?: boolean) => ({
  trigger: `bg-white border border-neutral-stroke-light hover:!bg-white hover:!border-brand-primary active:!border-brand-primary !px-4 !py-[8px] font-quicksand !h-[60px] shadow-none data-[disabled=true]:bg-neutral-surface ${isInvalid && "border border-input-error"}`,
  label: "text-neutral-element-secondary font-medium text-base font-quicksand ",
  input: "font-quicksand font-medium text-lg leading-[18px]",
  errorMessage: "text-sm font-medium text-accent-error",
  innerWrapper: "group-data-[has-label=true]:!pt-0",
  listbox: "!px-0 !py-2 !rounded-lg",
  popoverContent: "!p-0 !rounded-lg",
  selectorIcon: "!size-5",
  base: "!opacity-100",
});

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
  options: any[];
  isRequired?: boolean;
}

function SelectInputChip({
  options,
  name,
  renderValue,
  editable = true,
  isDivider = false,
  isRequired = false,
  classNames,
  ...restProps
}: MyInputProps) {
  const getStatusClassBackground = (status: string): string => {
    const statusClassMap: any = {
      [LEAD_STATUS.NEW]: "status-new",
      [LEAD_STATUS.PRIME]: "status-prime",
      [LEAD_STATUS.PENDING]: "status-pending",
      [LEAD_STATUS.ARCHIVED]: "status-archived",
      [LEAD_STATUS.CLOSE]: "status-close",
      [LEAD_STATUS.JUNK]: "status-close",
      [LEAD_STATUS.DO_NOT_CONTACT]: "status-blocked",
      [LEAD_STATUS.BLOCKED]: "status-blocked",
      [AGENCY_STATUS.ACTIVE]: "status-new",
      [AGENCY_STATUS.INACTIVE]: "status-close",
      [AGENCY_STATUS.LOCKED]: "status-blocked",
    };

    return statusClassMap[status] || "";
  };

  const getStatusClassCirle = (status: string): string => {
    const statusClassMap: any = {
      [LEAD_STATUS.NEW]: "status-new-active",
      [LEAD_STATUS.PRIME]: "status-prime-active",
      [LEAD_STATUS.PENDING]: "status-pending-active",
      [LEAD_STATUS.ARCHIVED]: "status-archived-active",
      [LEAD_STATUS.CLOSE]: "status-close-active",
      [LEAD_STATUS.JUNK]: "status-close-active",
      [LEAD_STATUS.DO_NOT_CONTACT]: "status-blocked-active",
      [LEAD_STATUS.BLOCKED]: "status-blocked-active",
      [AGENCY_STATUS.ACTIVE]: "status-new-active",
      [AGENCY_STATUS.INACTIVE]: "status-close-active",
      [AGENCY_STATUS.LOCKED]: "status-blocked-active",
    };

    return statusClassMap[status] || "";
  };

  return (
    <div className="w-full">
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          // eslint-disable-next-line unused-imports/no-unused-vars
          form: { setFieldValue, validateField, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: MyFieldProps) => {
          if (!editable) {
            return (
              <div className="flex flex-col">
                <p className="leading-5 text-neutral-element-secondary">
                  {restProps.label}
                </p>
                <p className="mt-1 leading-6">
                  {options?.find((item) => item.key === field?.value)?.label ||
                    "-"}
                </p>
                {isDivider && <Divider className="mt-2" />}
              </div>
            );
          }

          return (
            <Select
              onClose={() => {
                // Wait for the value to be assigned before re-validating.
                setTimeout(() => {
                  validateField(name);
                  setFieldTouched(name, true);
                }, 0);
              }}
              isRequired={isRequired}
              label={restProps.label}
              isDisabled={restProps.isDisabled}
              fullWidth
              classNames={
                classNames
                  ? classNames
                  : getDefaultClassNames(
                      !!meta.error && (meta.touched || !field.value),
                    )
              }
              onChange={(e) => setFieldValue(name, e.target.value)}
              selectedKeys={
                new Set(field.value ? String(field.value)?.split(",") : [])
              }
              isInvalid={!!meta.error && (meta.touched || !field.value)}
              errorMessage={meta.error}
              selectorIcon={
                <div>
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
            >
              {options.map((option) => (
                <SelectItem
                  key={option.key}
                  content={option?.content}
                  hideSelectedIcon
                  textValue={option.label}
                  className="!rounded-none data-[hover=true]:!bg-neutral-surface data-[selectable=true]:focus:!bg-neutral-surface"
                >
                  <div className="!px-4 !py-3">
                    <Text
                      variant="body2-regular"
                      className={cn(
                        getStatusClassBackground(option.key.toUpperCase()),
                        " inline-block divide-solid rounded-[28px] border px-4 py-1",
                      )}
                    >
                      <span
                        className={cn(
                          getStatusClassCirle(option.key.toUpperCase()),
                          " mr-2 inline-block h-[10px] w-[10px] rounded-full",
                        )}
                      ></span>
                      {option.label?.toUpperCase()}
                    </Text>
                  </div>
                </SelectItem>
              ))}
            </Select>
          );
        }}
      </Field>
    </div>
  );
}

export default memo(SelectInputChip);
