import { memo } from "react";
import PhoneInput from "react-phone-input-2";

import { cn, formatPhoneNumberWithCountryCode } from "@/utils/common.util";

import Text from "../../common/Text";

import "react-phone-input-2/lib/material.css";

interface PhoneInputComponentProps {
  onChange?: (phone: string) => void;
  onBlur?: (phone: any) => void;
  label?: string;
  value?: string;
  isEdit?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  isDivider?: boolean;
  wrapperClassName?: string;
  name?: string;
  disableDropdown?: boolean;
  arrCountry?: string[];
  endIconOfValue?: React.ReactNode;
}

const PhoneInputComponent = memo(
  ({
    onChange,
    onBlur,
    label,
    value,
    isEdit,
    isRequired,
    isError,
    isDivider = true,
    wrapperClassName,
    disableDropdown = true,
    arrCountry = ["us"],
    endIconOfValue,
  }: PhoneInputComponentProps) => {
    const listClassName = {
      containerClass: "border-none max-h-[60px]",
      inputClass:
        "w-full !border-none !py-[12px] !pr-[0px] !pl-[50px] max-h-[24px] max-w-[264px] !font-quicksand !text-base !font-medium leading-5 !text-neutral-element-primary focus:!shadow-none !bg-transparent",
      buttonClass: "!ml-[-10px]",
      dropdownClass:
        "z-90 country-list:!py-[10px] country-list:rounded-lg country-list-scrollbar:w-[0px] country-list:shadow-country-list country:font-quicksand country:text-base country:font-medium country:text-neutral-element-primary country:!py-3 country:!pr-3 country:!pl-[46px] country-hover:!bg-bg-tag-recipients country-hover:outline country-hover:outline-neutral-stroke-light country-span:text-base country-span:font-medium country-span:!text-neutral-element-primary country-highlight country-highlight:!bg-bg-super-light",
      wrapper: cn(
        `flex flex-col justify-center`,
        isEdit
          ? "rounded-lg border px-4 py-2 max-h-[60px]"
          : isDivider
            ? "rounded-none border-b-1 px-0 py-2 !h-[65px]"
            : "!h-[65px]",
        "border-neutral-stroke-light text-neutral-element-secondary",
        isError && "!border-input-error",
        wrapperClassName,
      ),
      editText:
        "font-quicksand text-base font-medium leading-5 !text-neutral-element-primary",
      label:
        "py-3 pl-6 pr-4 font-quicksand !text-base font-medium leading-5 !text-neutral-element-secondary outline outline-neutral-stroke-light  ",
    };
    return (
      <div className={listClassName.wrapper}>
        {label && (
          <Text className={isError ? "!text-input-error" : ""}>
            {label} {isRequired && <span className="!text-input-error">*</span>}
          </Text>
        )}
        {isEdit ? (
          <PhoneInput
            country={"us"}
            onlyCountries={arrCountry ? arrCountry : ["us"]}
            value={value}
            onChange={(phone) => onChange?.(phone)}
            onBlur={(phone) => {
              onBlur?.(phone);
            }}
            containerClass={listClassName.containerClass}
            containerStyle={{
              border: "none",
            }}
            inputClass={listClassName.inputClass}
            buttonClass={listClassName.buttonClass}
            specialLabel=""
            dropdownClass={listClassName.dropdownClass}
            disableDropdown={disableDropdown}
          />
        ) : (
          <div className="row items-center gap-2">
            <p className={listClassName.editText}>
              {formatPhoneNumberWithCountryCode(value || "") || "-"}
            </p>
            {endIconOfValue}
          </div>
        )}
      </div>
    );
  },
);

export default PhoneInputComponent;
