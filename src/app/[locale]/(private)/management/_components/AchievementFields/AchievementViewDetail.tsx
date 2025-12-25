import React, { memo } from "react";

import { TextInput } from "@/app/_components";

const AchievementViewDetail = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="col gap-5">
        <div className="row gap-4">
          <h5>Achievement</h5>
          <div className="center border-neutral-bold h-[24px] w-[157px] rounded-[4px] border bg-neutral-surface text-sm font-medium">
            Hiding on User’s page{" "}
          </div>
        </div>
        {
          <div className="grid grid-cols-3 gap-4 3xl:grid-cols-5">
            <div className="text-left">
              <div className="row justify-between gap-4">
                <TextInput
                  editable={false}
                  label="Number of closed loans"
                  name="numberOfClosedLoan"
                  isRequired
                  type="number"
                  inputWrapperClassName="!min-h-[44px] w-[160px]"
                  isErrorMessage={false}
                />
              </div>
            </div>
            <div className="text-left">
              <div className="row justify-between gap-4">
                <TextInput
                  label="Total loans funded in the last year"
                  editable={false}
                  startContent={<>$</>}
                  name="totalLoanFunded"
                  isRequired
                  type="number"
                  inputWrapperClassName="!min-h-[44px] w-[160px]"
                  isErrorMessage={false}
                />
              </div>
            </div>

            <div className="text-left">
              <div className="row justify-between gap-4">
                <TextInput
                  label="Loan volume in the last year (million dollars)"
                  editable={false}
                  name="loanVolume"
                  isRequired
                  type="number"
                  inputWrapperClassName="!min-h-[44px] w-[160px]"
                  isErrorMessage={false}
                />
              </div>
            </div>

            <div className="text-left">
              <div className="row justify-between gap-4">
                <TextInput
                  label="Average loan amount in the last year (million dollars)"
                  editable={false}
                  name="averageLoanAmount"
                  isRequired
                  type="number"
                  inputWrapperClassName="!min-h-[44px] w-[160px]"
                  isErrorMessage={false}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default memo(AchievementViewDetail);
