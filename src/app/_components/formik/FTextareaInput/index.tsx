import React, { memo } from "react";

import { Divider, Textarea, TextAreaProps } from "@nextui-org/react";

import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";

const defaultClassNames = {
  // innerWrapper: "!items-center",
  inputWrapper:
    "bg-white border border-neutral-stroke-light hover:!border-brand-primary active:!border-brand-primary px-5 py-[10px] font-quicksand min-h-[68px] shadow-none group-data-[focus=true]:!border-brand-primary group-data-[disabled=true]:bg-neutral-on-surface-2",
  label: "text-neutral-element-secondary font-medium text-base font-quicksand z-0",
  input: "font-quicksand font-medium text-base leading-[18px]",
  errorMessage: "text-sm font-medium text-accent-error",
  helperWrapper: "!p-0",
};

export interface MyFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

export interface MyInputProps extends TextAreaProps {
  placeholder?: string;
  type?: string;
  name: string;
  className?: string;
  label?: string;
  isClear?: boolean;
  editable?: boolean;
  isDivider?: boolean;
  wrapperClassName?: string;
}
const TextareaInput = memo(
  ({
    isClear = false,
    editable = true,
    isDivider = false,
    classNames = defaultClassNames,
    wrapperClassName,
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
              return (
                <div className="flex flex-col">
                  <p className="font-quicksand text-base leading-5 text-neutral-element-secondary">
                    {props.label}
                  </p>
                  <p className="mt-1 leading-6">{field.value || "-"}</p>
                  {isDivider && <Divider className="mt-2" />}
                </div>
              );
            }
            return (
              <Textarea
                isClearable={isClear}
                {...(isClear
                  ? { onClear: () => setFieldValue(props.name, "") }
                  : {})}
                {...field}
                {...props}
                fullWidth
                autoComplete="new-password"
                color="primary"
                variant="bordered"
                classNames={classNames}
                isInvalid={!!(meta.touched && meta.error)}
                errorMessage={meta.error}
              />
            );
          }}
        </Field>
      </div>
    );
  },
);

export default TextareaInput;
