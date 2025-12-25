import React from "react";

import { CustomErrorMessage } from "../../common/CustomErrorMessage";

import { Field } from "formik";

interface FInputCustomProps {
  name: string;
  className?: any;
  onBlur?: any;
  type?: string;
  index?: number;
  disabled?: boolean;
}

const DefaultClassNames = {
  inputWrapper:
    "bg-white border border-neutral-stroke-light rounded-lg group-data-[focus=true]:!border-brand-primary hover:!border-brand-primary active:!border-brand-primary !px-4 !py-2 font-quicksand !min-h-[60px] shadow-none",
  label: "text-neutral-element-primary font-medium text-base font-quicksand",
  input:
    "font-quicksand font-medium text-base outline-none text-neutral-element-primary",
  errorMessage: "text-sm font-medium text-accent-error",
  helperWrapper: "!p-0",
};

const FInputCustom: React.FC<FInputCustomProps> = ({
  name,
  className = DefaultClassNames,
  type,
  errors,
  onBlur,
  disabled,
}: any) => {
  const combinedClassNamesError = `${
    errors?.leads?.length > 0 ? `${className.errorMessage}` : ""
  }`;
  const combinedClassNames = `${className.inputWrapper} ${className.input} ${className.label} ${combinedClassNamesError} outline-none`;

  return (
    <Field name={name}>
      {({ field, meta, form }: any) => {
        return (
          <div>
            <input
              disabled={disabled}
              type={type}
              {...field}
              className={combinedClassNames}
              onBlur={(e) => {
                onBlur?.(e);
                field?.onBlur?.(e);
              }}
            />
            {!!meta.error && !!meta.touched && (
              <CustomErrorMessage name={name} />
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FInputCustom;
