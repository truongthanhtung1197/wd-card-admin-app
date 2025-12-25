import { EMPLOYMENT_STATUS } from "@/constant";
import {
  CONDITION_DOC_TYPE,
  CONDITION_LOAN_STAGE,
  DOC_CONDITION_OWNER,
} from "@/constant/DocCondition.constant";
import {
  LOAN_PURPOSES,
  LOAN_TYPE,
  OCCUPANCY_TYPE,
} from "@/constant/Loan.constant";

import { TimeStamp } from "./Common.model";

export interface DocCondition extends TimeStamp {
  id?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  applyAutomatically?: boolean;
  loanStage?: CONDITION_LOAN_STAGE | null;
  docType?: CONDITION_DOC_TYPE | null;
  loanPurpose?: LOAN_PURPOSES | null;
  loanType?: LOAN_TYPE | null;
  occupancyType?: OCCUPANCY_TYPE | null;
  employmentStatus?: EMPLOYMENT_STATUS[];
  minimumLoanAmount?: number | string;
  conditionOwner?: DOC_CONDITION_OWNER;
  permanentResidencyCheck?: boolean;
  useVaCompensation?: boolean;
  receiveAlimonyOrChildSupport?: boolean;
  payAlimonyOrChildSupport?: boolean;
  dependentsUnder18?: boolean;
  hasAnyReo?: boolean;
  hasBankruptcy?: boolean;
  shortSaleCheck?: boolean;
  borrowerClosingCosts?: number | string;
  discountPoints?: number | string;
  financedMortgageInsuranceAmount?: number | string;
  sellerCredits?: number | string;
}

export interface DocConditionOtherCredits extends TimeStamp {
  loanTransactionDetailId?: string;
  creditsAmount?: number;
  creditsType?: string;
}
