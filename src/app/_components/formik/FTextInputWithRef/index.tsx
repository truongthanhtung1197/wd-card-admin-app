import React, { forwardRef, InputHTMLAttributes, useState } from "react";

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
}
const FTextInputWithRef = forwardRef(
  (
    {
      editable = true,
      isDivider = false,
      classNames,
      isErrorMessage = true,
      valueClassName,
      wrapperClassName,
      detailValueAtView,
      errorMessageClassName,
      endContent,
      ...props
    }: MyInputMaskProps,
    ref,
  ) => {
    const [isValuesOrFocus, setIsValuesOrFocus] = useState(false);
    return (
      <div className={wrapperClassName}>
        <Field name={props.name}>
          {({
            field, // { name, value, onChange, onBlur }
            // eslint-disable-next-line unused-imports/no-unused-vars
            form: { touched, errors, setFieldValue, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: MyFieldProps) => {
            if (!!values?.[props.name]) {
              setIsValuesOrFocus(true);
            }
            return (
              <>
                <div className={cn("flex flex-col", editable && "hidden")}>
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
                <div className={cn(!editable && "hidden")}>
                  <div
                    className={cn(
                      "h-[60px] w-full rounded-lg border border-neutral-stroke-light bg-white px-4 py-2 hover:border-brand-primary",
                      classNames,
                    )}
                  >
                    {props.label && (
                      <label
                        htmlFor={`input-${props.name}`}
                        className={cn(
                          "relative flex h-5 cursor-text gap-1 duration-300",
                          !isValuesOrFocus && "top-[10px]",
                        )}
                      >
                        <Text
                          variant="body3-regular"
                          className={cn(
                            "font-quicksand text-sm/[20px] font-medium !text-neutral-element-secondary duration-300",
                            isValuesOrFocus ? "text-sm" : "text-base",
                          )}
                        >
                          {props.label}
                        </Text>{" "}
                        {props.isRequired && (
                          <span className="text-accent-error">*</span>
                        )}
                      </label>
                    )}
                    <div className="flex gap-2">
                      {" "}
                      <input
                        id={`input-${props.name}`}
                        {...field}
                        {...props}
                        onFocus={() => {
                          setIsValuesOrFocus(true);
                        }}
                        onBlur={(e) => {
                          if (e.target.value) {
                            setIsValuesOrFocus(true);
                          } else {
                            setIsValuesOrFocus(false);
                          }
                          field?.onBlur(e);
                          props?.onBlur?.(e);
                        }}
                        ref={ref as any}
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
              </>
            );
          }}
        </Field>
      </div>
    );
  },
);

export default FTextInputWithRef;
