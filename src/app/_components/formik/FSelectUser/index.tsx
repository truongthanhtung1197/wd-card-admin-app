import React, { memo } from "react";
import Image from "next/image";

import { cn } from "@/utils/common.util";
import { Divider, Select, SelectItem, SelectProps } from "@nextui-org/react";

import LetterAvatar from "../../common/LetterAvatar/LetterAvatar";
import Text from "../../common/Text";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

const getDefaultClassNames = (isInvalid?: boolean) => ({
  trigger: `bg-white border border-neutral-stroke-light hover:!bg-white hover:!border-brand-primary active:!border-brand-primary !px-4 !py-[8px] font-quicksand !h-[60px] shadow-none data-[disabled=true]:bg-neutral-on-surface-2 ${isInvalid && "border border-input-error"}`,
  label: "text-neutral-element-secondary font-medium text-base font-quicksand ",
  input: "font-quicksand font-medium text-lg leading-[18px]",
  errorMessage: "text-sm font-medium text-accent-error",
  innerWrapper: "group-data-[has-label=true]:!pt-0",
  listbox: "!px-0 !py-2 !rounded-lg",
  popoverContent: "!p-0 !rounded-lg",
  selectorIcon: "!size-5",
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

function SelectUser({
  options,
  name,
  renderValue,
  editable = true,
  isDivider = false,
  isRequired = false,
  classNames,
  ...restProps
}: MyInputProps) {
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
            const item = options?.find((item) => item.key === field?.value);

            return (
              <div className="flex flex-col">
                <p className="leading-5 text-neutral-element-secondary">
                  {restProps.label}
                </p>
                <p className="mt-1 leading-6">
                  <div className="flex flex-row items-center gap-[6px]">
                    {!item?.label ? (
                      "-"
                    ) : item?.imagePath ? (
                      <div className="relative size-[24px] overflow-hidden">
                        <Image
                          src={item?.imagePath}
                          alt="User Avatar"
                          fill
                          className="rounded-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <LetterAvatar letter={item?.firstName || ""} size={24} />
                    )}
                    <Text variant="body2-regular">{item?.label ?? ""}</Text>
                  </div>
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
              onChange={(e) => {
                setFieldValue(name, e.target.value);
              }}
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
                              <div className="flex flex-row items-center gap-[6px]">
                                <Text variant="body2-regular">
                                  {item.textValue}
                                </Text>
                              </div>
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
                  //@ts-ignore
                  imagePath={option?.imagePath}
                  className="!rounded-none data-[hover=true]:!bg-neutral-surface data-[selectable=true]:focus:!bg-neutral-surface"
                >
                  <div className="flex flex-row items-center gap-[6px]">
                    <Text variant="body2-regular">{option.label}</Text>
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

export default memo(SelectUser);
