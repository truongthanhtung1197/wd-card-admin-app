import React, { memo } from "react";

import { cn } from "@/utils/common.util";
import { formatCurrency2Decimal } from "@/utils/format.util";
import { Divider, Input, InputProps } from "@nextui-org/react";

import { CustomErrorMessage } from "../../common/CustomErrorMessage";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

const getDefaultClassNames = ({
  inputWrapperClassName,
  innerWrapperClassName,
  inputClassName,
}: {
  inputWrapperClassName?: string;
  innerWrapperClassName?: string;
  inputClassName?: string;
}) => {
  return {
    innerWrapper: cn(innerWrapperClassName),
    inputWrapper: cn(
      "bg-white border border-neutral-stroke-light rounded-lg group-data-[focus=true]:!border-brand-primary hover:!border-brand-primary active:!border-brand-primary !px-4 !py-2 !min-h-[60px] font-quicksand shadow-none",
      inputWrapperClassName,
    ),
    label:
      "!text-neutral-element-secondary font-medium text-base font-quicksand",
    input: cn("font-quicksand font-medium text-base", inputClassName),
    errorMessage: "text-sm font-medium text-accent-error",
    helperWrapper: "!p-0",
  };
};

export interface MyFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

export interface MyInputProps extends InputProps {
  placeholder?: string;
  type?: string;
  name: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  editable?: boolean;
  isDivider?: boolean;
  inputWrapperClassName?: string;
  isErrorMessage?: boolean;
  valueClassName?: string;
  wrapperClassName?: string;
  detailValueAtView?: string;
  innerWrapperClassName?: string;
  inputClassName?: string;
  errorMessageClassName?: string;
}
const TextInput = memo(
  ({
    isClear = false,
    editable = true,
    isDivider = false,
    classNames,
    inputWrapperClassName,
    isErrorMessage = true,
    valueClassName,
    wrapperClassName,
    detailValueAtView,
    innerWrapperClassName,
    inputClassName,
    errorMessageClassName,
    ...props
  }: MyInputProps) => {
    return (
      <div className={wrapperClassName}>
        <Field name={props.name}>
          {({
            field, // { name, value, onChange, onBlur }
            // eslint-disable-next-line unused-imports/no-unused-vars
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: MyFieldProps) => {
            if (!editable) {
              const getValue = () => {
                if (props?.type === "password")
                  return detailValueAtView || "*******";

                if (detailValueAtView) return detailValueAtView;

                if (props?.startContent === "$") {
                  if (field.value || field.value === 0 || field.value === "0") {
                    return (
                      props.startContent + formatCurrency2Decimal(field.value)
                    );
                  }
                  return (
                    props.startContent + formatCurrency2Decimal(field.value)
                  );
                }

                if (field.value) {
                  return field.value;
                }

                return "-";
              };
              return (
                <div className="flex flex-col">
                  <p className="!text-base !font-medium text-neutral-element-secondary">
                    {props.label}
                  </p>
                  <p className={cn("mt-1 leading-6", valueClassName)}>
                    {getValue()}
                  </p>
                  {isDivider && <Divider className="mt-3" />}
                </div>
              );
            }
            return (
              <Input
                // isClearable={isClear}
                // {...(isClear
                //   ? { onClear: () => setFieldValue(props.name, "") }
                //   : {})}
                {...field}
                {...props}
                onBlur={(e) => {
                  field.onBlur(e);
                  props?.onBlur?.(e);
                }}
                onChange={(e) => {
                  field.onChange(e);
                  props?.onChange?.(e);
                }}
                fullWidth
                autoComplete="new-password"
                color="primary"
                variant="bordered"
                classNames={
                  classNames ||
                  getDefaultClassNames({
                    inputClassName,
                    inputWrapperClassName: `${inputWrapperClassName} ${props?.disabled && "!bg-neutral-surface"}`,
                    innerWrapperClassName,
                  })
                }
                // isInvalid={!!(meta.touched && meta.error)}
                isInvalid={!!meta.error && (meta.touched || !field.value)}
                errorMessage={
                  meta.error &&
                  isErrorMessage && (
                    <CustomErrorMessage
                      name={props.name}
                      className={errorMessageClassName}
                    />
                  )
                }
              />
            );
          }}
        </Field>
      </div>
    );
  },
);

export default TextInput;
