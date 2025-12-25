import React, { memo } from "react";

import { TextInput } from "@/app/_components";
import { CustomErrorMessage } from "@/app/_components/common/CustomErrorMessage";
import MySwitch from "@/app/_components/form/MySwitch";
import { cn } from "@/utils/common.util";

import AchievementViewDetail from "./AchievementViewDetail";

import { FormikProps } from "formik";

interface AchievementFieldsProps {
  className?: string;
  wrapperFieldsClassName?: string;
}

export interface AchievementFormValues {
  hideAchievement?: boolean;
  numberOfClosedLoan?: string;
  // loanFundedIn?: string;
  totalLoanFunded?: string;
  loanVolume?: string;
  averageLoanAmount?: string;
}

const AchievementFields = (
  props: AchievementFieldsProps &
    FormikProps<AchievementFormValues> &
    any & {
      isEdit: boolean;
    },
) => {
  const {
    setFieldValue,
    values,
    validateField,
    className,
    wrapperFieldsClassName,
    isEdit,
  } = props;

  if (!isEdit) {
    return <AchievementViewDetail />;
  }
  return (
    <div className={cn("col gap-5", className)}>
      <div className="row justify-between">
        <h5>Achievement</h5>
      </div>
      {!values?.hideAchievement && (
        <div className={cn("col gap-5", wrapperFieldsClassName)}>
          <div className="text-right">
            <div className="row justify-between">
              <p>
                Number of closed loans
                <span className="text-accent-error">*</span>
              </p>
              <TextInput
                name="numberOfClosedLoan"
                isRequired
                type="number"
                onBlur={() => {
                  validateField("numberOfClosedLoan");
                }}
                inputWrapperClassName="!min-h-[44px] w-[160px]"
                isErrorMessage={false}
              />
            </div>
            <CustomErrorMessage name={"numberOfClosedLoan"} />
          </div>
          <div className="text-right">
            <div className="row justify-between">
              <p>
                Total loans funded in the last year
                <span className="text-accent-error">*</span>
              </p>
              <TextInput
                name="totalLoanFunded"
                isRequired
                type="number"
                onBlur={() => {
                  validateField("totalLoanFunded");
                }}
                inputWrapperClassName="!min-h-[44px] w-[160px]"
                isErrorMessage={false}
              />
            </div>
            <CustomErrorMessage name={"totalLoanFunded"} />
          </div>

          <div className="text-right">
            <div className="row justify-between">
              <p>
                Loan volume in the last year (million dollars)
                <span className="text-accent-error">*</span>
              </p>
              <TextInput
                name="loanVolume"
                isRequired
                type="number"
                onBlur={() => {
                  validateField("loanVolume");
                }}
                inputWrapperClassName="!min-h-[44px] w-[160px]"
                isErrorMessage={false}
              />
            </div>
            <CustomErrorMessage name={"loanVolume"} />
          </div>

          <div className="text-right">
            <div className="row justify-between">
              <p>
                Average loan amount in the last year (million dollars)
                <span className="text-accent-error">*</span>
              </p>
              <TextInput
                name="averageLoanAmount"
                isRequired
                type="number"
                onBlur={() => {
                  validateField("averageLoanAmount");
                }}
                inputWrapperClassName="!min-h-[44px] w-[160px]"
                isErrorMessage={false}
              />
            </div>
            <CustomErrorMessage name={"averageLoanAmount"} />
          </div>
        </div>
      )}
      <div className="row gap-3">
        <MySwitch
          className="!h-[24px]"
          isSelected={!values.hideAchievement}
          onChange={(e) => {
            setFieldValue("hideAchievement", !e.target?.checked);
          }}
        />
        <span>Show on team website</span>
      </div>
    </div>
  );
};

export default memo(AchievementFields);
