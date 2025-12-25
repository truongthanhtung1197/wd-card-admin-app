import { LOAN_PURPOSES_OPTIONS, OCCUPANCY_TYPE_OPTIONS } from "./Loan.constant";

export enum CONDITION_DOC_TYPE {
  "4506T" = "4506-T",
  APPRAISAL = "APPRAISAL",
  ACH_PAYMENT = "ACH_PAYMENT",
  BANK_STATEMENTS = "BANK_STATEMENTS",
  BANKRUPTCY_PAPERWORK = "BANKRUPTCY_PAPERWORK",
  BPO = "BPO",
  CLOSING_DISCLOSURES = "CLOSING_DISCLOSURES",
  CREDIT_REPORT = "CREDIT_REPORT",
  DEPOSIT = "DEPOSIT",
  E_DISCLOSURE_CONSENT = "E_DISCLOSURE_CONSENT",
  FLOOD_CERT = "FLOOD_CERT",
  HAZARD_INSURANCE = "HAZARD_INSURANCE",
  IDENTIFICATION = "IDENTIFICATION",
  INCOME = "INCOME",
  LETTER_OF_EXPLANATION = "LETTER_OF_EXPLANATION",
  LIABILITY = "LIABILITY",
  MISC = "MISC",
  MISC_ASSETS = "MISC_ASSETS",
  MISC_INCOME = "MISC_INCOME",
  MORTGAGE_STATEMENTS = "MORTGAGE_STATEMENTS",
  PAY_STUBS = "PAY_STUBS",
  PROFIT_AND_LOSS = "PROFIT_AND_LOSS",
  PROPERTY_ADDRESS = "PROPERTY_ADDRESS",
  PURCHASE_AGREEMENT = "PURCHASE_AGREEMENT",
  SCHEDULE_K_1 = "SCHEDULE_K_1",
  TAX_RETURNS = "TAX_RETURNS",
  TITLE_POLICY = "TITLE_POLICY",
  W2 = "W2",
  PROVIDE_CONSENTS = "PROVIDE_CONSENTS",
}

export const CONDITION_DOC_TYPE_OPTIONS = [
  {
    label: "4506-T",
    key: CONDITION_DOC_TYPE["4506T"],
  },
  {
    label: "Appraisal",
    key: CONDITION_DOC_TYPE["APPRAISAL"],
  },
  {
    label: "ACH payment",
    key: CONDITION_DOC_TYPE["ACH_PAYMENT"],
  },
  {
    label: "Bank statements",
    key: CONDITION_DOC_TYPE["BANK_STATEMENTS"],
  },
  {
    label: "Bankruptcy Paperwork",
    key: CONDITION_DOC_TYPE["BANKRUPTCY_PAPERWORK"],
  },
  {
    label: "BPO",
    key: CONDITION_DOC_TYPE["BPO"],
  },
  {
    label: "Closing disclosures",
    key: CONDITION_DOC_TYPE["CLOSING_DISCLOSURES"],
  },
  {
    label: "Credit report",
    key: CONDITION_DOC_TYPE["CREDIT_REPORT"],
  },
  {
    label: "Deposit",
    key: CONDITION_DOC_TYPE["DEPOSIT"],
  },
  {
    label: "E-disclosure consent",
    key: CONDITION_DOC_TYPE["E_DISCLOSURE_CONSENT"],
  },
  {
    label: "Flood cert",
    key: CONDITION_DOC_TYPE["FLOOD_CERT"],
  },
  {
    label: "Hazard insurance",
    key: CONDITION_DOC_TYPE["HAZARD_INSURANCE"],
  },
  {
    label: "Identification",
    key: CONDITION_DOC_TYPE["IDENTIFICATION"],
  },
  {
    label: "Income",
    key: CONDITION_DOC_TYPE["INCOME"],
  },
  {
    label: "Letter of explanation",
    key: CONDITION_DOC_TYPE["LETTER_OF_EXPLANATION"],
  },
  {
    label: "Liability",
    key: CONDITION_DOC_TYPE["LIABILITY"],
  },
  {
    label: "Misc",
    key: CONDITION_DOC_TYPE["MISC"],
  },
  {
    label: "Misc assets",
    key: CONDITION_DOC_TYPE["MISC_ASSETS"],
  },
  {
    label: "Misc income",
    key: CONDITION_DOC_TYPE["MISC_INCOME"],
  },
  {
    label: "Mortgage statements",
    key: CONDITION_DOC_TYPE["MORTGAGE_STATEMENTS"],
  },
  {
    label: "Pay stubs",
    key: CONDITION_DOC_TYPE["PAY_STUBS"],
  },
  {
    label: "Profit and Loss",
    key: CONDITION_DOC_TYPE["PROFIT_AND_LOSS"],
  },
  {
    label: "Property address",
    key: CONDITION_DOC_TYPE["PROPERTY_ADDRESS"],
  },
  {
    label: "Purchase agreement",
    key: CONDITION_DOC_TYPE["PURCHASE_AGREEMENT"],
  },
  {
    label: "Schedule K-1",
    key: CONDITION_DOC_TYPE["SCHEDULE_K_1"],
  },
  {
    label: "Tax Returns",
    key: CONDITION_DOC_TYPE["TAX_RETURNS"],
  },
  {
    label: "Title Policy",
    key: CONDITION_DOC_TYPE["TITLE_POLICY"],
  },
  {
    label: "W2",
    key: CONDITION_DOC_TYPE["W2"],
  },
  {
    label: "Provide consents",
    key: CONDITION_DOC_TYPE["PROVIDE_CONSENTS"],
  },
];

export enum CONDITION_LOAN_STAGE {
  "PTF" = "PTF",
  "PTD" = "PTD",
}

export const CONDITION_LOAN_STAGE_OPTIONS = [
  {
    label: "PTF",
    key: CONDITION_LOAN_STAGE.PTF,
  },
  {
    label: "PTD",
    key: CONDITION_LOAN_STAGE.PTD,
  },
];

export enum CONDITION_LOAN_TYPE {
  All = "All",
  Conventional = "Conventional",
  VA = "VA",
  FHA = "FHA",
  USDA = "USDARuralHousing",
  SECOND_LOAN = "SECOND_LOAN",
}

export const CONDITION_LOAN_TYPE_OPTIONS = [
  {
    label: "All",
    key: CONDITION_LOAN_TYPE.All,
  },
  {
    label: "Conventional",
    key: CONDITION_LOAN_TYPE.Conventional,
  },
  {
    label: "VA",
    key: CONDITION_LOAN_TYPE.VA,
  },
  {
    label: "USDA",
    key: CONDITION_LOAN_TYPE.USDA,
  },
  {
    label: "FHA",
    key: CONDITION_LOAN_TYPE.FHA,
  },
  {
    label: "Second loan",
    key: CONDITION_LOAN_TYPE.SECOND_LOAN,
  },
];

export const CONDITION_OCCUPANCY_TYPE_OPTIONS = [
  {
    label: "All",
    key: "All",
  },
  ...OCCUPANCY_TYPE_OPTIONS,
];

export const CONDITION_LOAN_PURPOSES_OPTIONS = [
  {
    label: "All",
    key: "All",
  },
  ...LOAN_PURPOSES_OPTIONS,
];

export enum CONDITION_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const CONDITION_STATUS_OPTIONS = [
  {
    label: "Active",
    key: CONDITION_STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    key: CONDITION_STATUS.INACTIVE,
  },
];

export enum DOC_CONDITION_OWNER {
  ALL = "ALL",
  BORROWER = "BORROWER",
  CO_BORROWER = "CO_BORROWER",
}

export const DOC_CONDITION_OWNER_OPTIONS = [
  {
    label: "Main borrower",
    key: DOC_CONDITION_OWNER.BORROWER,
  },
  {
    label: "Co-borrower",
    key: DOC_CONDITION_OWNER.CO_BORROWER,
  },
  {
    label: "All borrowers",
    key: DOC_CONDITION_OWNER.ALL,
  },
];
