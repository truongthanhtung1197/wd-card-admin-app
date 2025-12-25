import React, { InputHTMLAttributes, memo } from "react";
import InputMask from "react-input-mask";

import { cn } from "@/utils/common.util";
import { Divider } from "@nextui-org/react";

import { CustomErrorMessage } from "../../common/CustomErrorMessage";
import Text from "../../common/Text";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

export interface MyFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

export interface MyInputMaskProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  name: string;
  className?: string;
  label?: string;
  editable?: boolean;
  isDivider?: boolean;
  isErrorMessage?: boolean;
  valueClassName?: string;
  wrapperClassName?: string;
  detailValueAtView?: string;
  errorMessageClassName?: string;
  isRequired?: boolean;
  classNames?: string;
  endContent?: React.ReactNode;
  mask?: string;
}
const FTextInputMask = memo(
  ({
    editable = true,
    isDivider = false,
    classNames,
    isErrorMessage = true,
    valueClassName,
    wrapperClassName,
    detailValueAtView,
    errorMessageClassName,
    mask = "",
    endContent,
    ...props
  }: MyInputMaskProps) => {
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
              return (
                <div className="flex flex-col">
                  <p className="!text-base !font-medium text-neutral-element-secondary">
                    {props.label}
                  </p>
                  <p className={cn("mt-1 leading-6", valueClassName)}>
                    {props?.type === "password"
                      ? detailValueAtView || "*******"
                      : detailValueAtView || field.value || "-"}
                  </p>
                  {isDivider && <Divider className="mt-3" />}
                </div>
              );
            }
            return (
              <div>
                {/* @ts-ignore */}
                <InputMask
                  mask={mask}
                  maskChar=""
                  type={props.type}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur(e);
                    props?.onBlur?.(e);
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    props?.onChange?.(e);
                  }}
                >
                  {(inputProps) => (
                    <div>
                      <div
                        className={cn(
                          "h-[60px] w-full rounded-lg border border-neutral-stroke-light px-4 py-2 hover:border-brand-primary",
                          classNames,
                        )}
                      >
                        <label
                          htmlFor={`input-mask-${props.name}`}
                          className="flex h-5 gap-1"
                        >
                          <Text variant="body3-regular">{props.label}</Text>{" "}
                          {props.isRequired && (
                            <span className="text-accent-error">*</span>
                          )}
                        </label>
                        <div className="flex gap-2">
                          {" "}
                          <input
                            id={`input-mask-${props.name}`}
                            {...inputProps}
                            className="!underline-none h-6 w-full outline-none"
                          />
                          {endContent}
                        </div>
                      </div>
                      {meta.error && isErrorMessage && (
                        <CustomErrorMessage
                          name={props.name}
                          className={errorMessageClassName}
                        />
                      )}
                    </div>
                  )}
                </InputMask>
              </div>
            );
          }}
        </Field>
      </div>
    );
  },
);

export default FTextInputMask;
