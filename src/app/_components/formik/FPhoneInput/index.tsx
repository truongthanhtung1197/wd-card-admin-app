import { memo } from "react";
import PhoneInput from "react-phone-input-2";

import { CustomErrorMessage } from "../../common/CustomErrorMessage";

import "react-phone-input-2/lib/material.css";
import { Field } from "formik";

const DefaultClassNames = {
  containerClass:
    "max-h-[44px] min-w-[132px] bg-white border border-neutral-stroke-light rounded-lg group-data-[focus=true]:!border-brand-primary hover:!border-brand-primary active:!border-brand-primary font-quicksand !min-h-11 shadow-none pl-2",
  inputClass:
    "h-[44px] !pl-[35px] !pr-[0px] font-quicksand font-medium text-base !bg-transparent text-neutral-element-primary focus:outline-none !border-none focus:!border-none focus:!shadow-none !w-auto",
  buttonClass: "!ml-[-10px]",
  dropdownClass:
    "absolute z-90 country-list:!py-[10px] country-list:rounded-lg country-list-scrollbar:w-[0px] country-list:shadow-country-list country:font-quicksand country:text-base country:font-medium country:text-neutral-element-primary country:!py-3 country:!pr-3 country:!pl-[46px] country-hover:!bg-bg-tag-recipients country-hover:outline country-hover:outline-neutral-stroke-light country-span:text-base country-span:font-medium country-span:!text-neutral-element-primary country-highlight country-highlight:!bg-bg-super-light",
  wrapper: `flex max-h-[60px] flex-col justify-center rounded-lg border px-4 py-2 border-neutral-stroke-light text-neutral-element-secondary`,
};

export interface PhoneInputProps {
  placeholder?: string;
  name: string;
  className?: any;
}
const FPhoneInput = memo(
  ({ name, className = DefaultClassNames }: PhoneInputProps) => {
    return (
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          // eslint-disable-next-line unused-imports/no-unused-vars
          form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: any) => {
          const combinedClassNamesError = `${
            errors?.leads?.length > 0 ? `${className.errorMessage}` : ""
          }`;

          const combinedClassNames = `${className.inputWrapper} ${className.input} ${className.label} ${combinedClassNamesError}`;

          return (
            <div className="">
              <PhoneInput
                {...field}
                onChange={(phone) => setFieldValue(name, phone)}
                onBlur={() => setFieldTouched(name, true)}
                country={"us"}
                onlyCountries={["us"]}
                disableDropdown
                containerClass={DefaultClassNames.containerClass}
                inputClass={DefaultClassNames.inputClass}
                buttonClass={DefaultClassNames.buttonClass}
                specialLabel=""
                dropdownClass={DefaultClassNames.dropdownClass}
              />
              {!!meta.error && !!meta.touched && (
                <CustomErrorMessage name={name} />
              )}
            </div>
          );
        }}
      </Field>
    );
  },
);

export default memo(FPhoneInput);
