import { EMPLOYMENT_STATUS, INDUSTRY } from "@/constant";
import { CONDITION_LOAN_STAGE } from "@/constant/DocCondition.constant";
import {
  ACCOUNT_TYPE_OPTIONS,
  AccountTypes,
  BANKRUPTCY_TYPE,
  BRANCH_OF_SERVICE,
  CURRENT_OCCUPANCY_TYPE,
  DOCUMENT_TYPE,
  EXPENSE_TYPE,
  GSE_PROPERTY_TYPE,
  GSE_PROPERTY_TYPE_OPTIONS,
  INCOME_TYPE,
  INTENDED_OCCUPANCY_TYPE,
  LIABILITY_TYPE,
  LOAN_AMOUNT_TYPE,
  LOAN_DECLARATION_OCCUPANCY_TYPE,
  LOAN_DOC_CONDITION_STATUS,
  LOAN_GENERAL_INFO_ACCOUNT_TYPE,
  LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE,
  LOAN_GENERAL_INFO_LIEN_TYPE,
  LOAN_GIFT_GRANT_SOURCE_TYPE,
  LOAN_GIFT_GRANT_TYPE,
  LOAN_LOCK_PERIOD,
  LOAN_PURPOSE_ORIGINAL,
  LOAN_PURPOSES,
  LOAN_STAGE,
  LOAN_TRANSACTION_DETAIL_CREDIT_TYPE,
  LOAN_TYPE,
  MARITAL_STATUS,
  OCCUPANCY_TYPE_OPTIONS,
  OTHER_ASSET_TYPE_OPTIONS,
  OtherAssetTypes,
  OWN_OR_RENT,
  OWNER_TYPE,
  OWNER_TYPE_OPTIONS,
  PRIOR_PROPERTY_TITLE_TYPE,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_STATUS_TYPE,
  PROPERTY_TYPE,
  RELATIONSHIP_TYPE,
  SOURCE_OF_DOWN_PAYMENT,
  UNIT_TYPE,
  VETERAN_TYPE,
} from "@/constant/Loan.constant";

import { GetListResponse, TimeStamp } from "./Common.model";
import { User } from "./User.model";

export interface Loan extends TimeStamp {
  action: string;
  id: string;
  loanIdentifierId: string;
  encompassLoanGuiId: string;
  encompassLoanIdentifierId: string;
  loanStatus: string;
  loanStatusStates: string;
  encompassLoanStatus: string;
  sectionIndexSelected: number;
  isPrefill: boolean;
  loanIdPrefill: string;
  realEstateAgentId: string;
  isExternalRealEstateAgent: boolean;
  processorId: string;
  officerId: string;
  realEstateAgent: User;
  loanBorrowers: LoanBorrower[];
  processor: LoanProcessor;
  officer: LoanOfficer;
  loanGeneralInfo: LoanGeneralInfo; // ok
  loanReoAsset?: {
    loanId?: string;
  };
  loanLiability?: {
    loanId?: string;
  };
  loanAdditional?: LoanAdditional;
  loanRateLock?: {
    loanId?: string;
    status?: string;
    expired_time?: string;
  };
  loanReos?: LoanReo[];
  loanOtherAssets?: LoanOtherAsset[];
  loanAssets?: LoanAsset[];
  loanProposedExpense?: LoanProposedExpense;
  loanLiabilityElements?: LiabilityElement[];
  loanOtherLiabilities?: OtherLiability[];
  loanGeneralInfoOtherLoans?: LoanOtherMortgageLoans[];
  loanTransactionDetail?: LoanTransactionDetail;
  customerAccount: CustomerAccount;
}

export interface CustomerAccount extends TimeStamp {
  address?: string | null;
  avatarUrl?: string;
  city?: string | null;
  company?: string | null;
  email?: string;
  enable2FA?: boolean;
  firstName?: string;
  id?: string;
  isAccountActived?: boolean;
  isEmailVerified?: boolean;
  isPrimaryPhoneVerified?: boolean;
  isQuestionVerified?: boolean;
  isSecondPhoneVerified?: boolean;
  lastName?: string;
  method2FA?: string | null;
  middleName?: string | null;
  mobileType?: string;
  password?: string;
  primaryPhone?: string | null;
  receiveOtpPhone?: string | null;
  salt?: string | null;
  secondPhone?: string | null;
  state?: string | null;
  updatedBy?: string | null;
  zipcode?: string | null;
}
export interface LoanOtherMortgageLoans extends TimeStamp {
  id?: string;
  loanId?: string;
  loanInfoAppliedToDownPayment?: number;
  loanInfoCreditorName?: string;
  loanInfoFundsSourceType?: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE | null;
  loanInfoHelocInitialDraw?: number;
  loanInfoLienType?: LOAN_GENERAL_INFO_LIEN_TYPE | null;
  loanInfoLoanAmount?: number;
  loanInfoMonthlyPayment?: number;
  loanInfoMortgageLoanAccountType?: LOAN_GENERAL_INFO_ACCOUNT_TYPE | null;
}

export interface LoanReo extends TimeStamp {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  loanId?: string;
  streetAddress?: string | null;
  city?: string;
  state?: string;
  postalCode?: string;
  participationPercentage?: number;
  lienInstallmentAmount?: number;
  lienUpbAmount?: number;
  gsePropertyType?: GSE_PROPERTY_TYPE | null;
  marketValueAmount?: number;
  rentalIncomeGrossAmount?: number;
  maintenanceExpenseAmount?: number;
  acquiredDate?: string;
  purchasePrice?: number;
  dispositionStatusType?: string;
  reoComments?: string;
  percentageOfRental?: number;
  subjectIndicator?: boolean;
  rentalIncomeNetAmount?: number;
  printAttachIndicator?: boolean;
  title?: string;
  printUserNameIndicator?: boolean;
  propertyUsageType?: INTENDED_OCCUPANCY_TYPE | "";
  titlePhone?: string;
  titleFax?: string;
  owner?: string;
  unitType?: string;
  unitNumber?: string;
  liabilityDoesNotApply?: boolean;
  urla2020StreetAddress?: string;
  countryCode?: string;
  includeInAusExport?: boolean;
  yearBuilt?: string;
  numberOfUnits?: number;
  futurePropertyUsageType?: CURRENT_OCCUPANCY_TYPE | "";
  futureUsageTypeOtherDesc?: string;
  country?: string;
  foreignAddressIndicator?: boolean;
  pendingSaleDate?: string;
  printUserJobTitleIndicator?: boolean;
  noLinkToDocTrackIndicator?: boolean;
  requestDate?: string;
  firstMortgage?: number;
  subordinateLiens?: number;
  homeownersInsurance?: number;
  supplementalPropertyInsurance?: number;
  propertyTaxes?: number;
  mortgageInsurance?: number;
  associationProjectDues?: number;
  other?: number;
  totalExpense?: number;
  propertyStatus?: PROPERTY_STATUS_TYPE | null;
  rentFee?: number;
  loanPropertyOwners?: LoanPropertyOwner[];
  propertyOwnerIds?: any;
}

export interface LoanPropertyOwner extends TimeStamp {
  id?: string;
  loanAssetId?: string | null;
  loanBorrowerId?: string;
  loanOtherAssetId?: string | null;
  loanReoId?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface LoanProposedExpense extends TimeStamp {
  associationProjectDues?: number;
  firstMortgage?: number;
  homeownersInsurance?: number;
  id?: string;
  loanId?: string;
  other?: number;
  propertyTaxes?: number;
  subordinateLiens?: number;
  supplementalPropertyInsurance?: number;
  totalExpense?: number;
  mortgageInsurance?: number;
}

export interface LoanAdditional extends TimeStamp {
  loanId: string;
  monthlyPrincipalAndInterest: number;
  helocCreditLimitAmount: number;
  helocInitialDraw: number;
  amountAppliedToDownPayment: number;
  holderName: string;
  title: string;
  sourceOfFunds: string;
  lienPosition: string;
  accountType: string;
  maximumPrincipalAndInterestIn5Years: number;
  paymentDeferredFirstFiveYears: boolean;
  affordableLoan: boolean;
  linkedPiggybackIndicator: boolean;
  monthlyPiTerm: number;
  monthlyPiLoanAmount: number;
  monthlyPiNoteRate: number;
  maximumPiNoteRate: number;
  maximumPiTerm: number;
  additionalLoanRequestDate: string;
  altId: string;
}
export interface LoanOfficer extends TimeStamp {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userCode: string;
  userName: string;
  password: string;
  salt: string;
  position: string;
  zipcode: string;
  company: string;
  address: string;
  city: string;
  state: string;
  imagePath: string;
  status: string;
  resetPasswordDefault: boolean;
}

export interface LoanProcessor extends TimeStamp {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userCode: string;
  userName: string;
  password: string;
  salt: string;
  position: string;
  zipcode: string;
  company: string;
  address: string;
  city: string;
  state: string;
  imagePath: string;
  status: string;
  resetPasswordDefault: boolean;
}

export interface LoanGeneralInfo extends TimeStamp {
  id: string;
  loanId: string;
  baseLoanAmount: string;
  loanPurposeOriginal: string;
  loanPurposeConvert: LOAN_PURPOSES;
  mortgageType: LOAN_TYPE;
  requestedInterestRatePercent: string;
  loanAmortizationTermMonths: number;
  principalAndInterestMonthlyPaymentAmount: string;
  purchasePriceAmount: string;
  estimatedClosingCostsAmount: string;
  estimatedPrepaidItemsAmount: string;
  subordinateLienAmount: string;
  cashFromToBorrowerAmount: string;
  currentBalanceAmount: string;
  lineOfCreditAmount: string;
  propertyEstimatedValueAmount: string;
  propertyAppraisedValueAmount: string;
  cashOutAmount: string;
  downPaymentAmount: string;
  downPaymentAmountType: LOAN_AMOUNT_TYPE;
  downPaymentType: SOURCE_OF_DOWN_PAYMENT;
  gsePropertyType: PROPERTY_TYPE;
  lockPeriodByDay: LOAN_LOCK_PERIOD;
  propertyUsageType: string;
  propertyMixedUsageIndicator: boolean;
  propertyStreetAddress: string;
  addressLineText: string;
  county: string;
  state: string;
  zipCode: string;
  additionalMortgageLoans: boolean;
  requireImpounds: boolean;
  referralSource: string;
  structureBuiltYear: string;
  financedNumberOfUnits?: string;
  rate: string;
  apr: string;
  beDti: string;
  feDti: string;
  ltv: string;
  combinedLtv: string;
  targetCltv: string;
  targetHcltv: string;
  subjectPropertyUnitType: string;
  subjectPropertyUnitNumber: string;
  constructionMethodType: string;
  loanStory: string;
}

export interface LoanBorrower extends TimeStamp {
  activeDuty?: boolean;
  agreeConditionOne?: boolean;
  agreeConditionThree?: boolean;
  agreeConditionTwo?: boolean;
  birthDate?: string;
  customerAccountId?: string;
  dependentCount?: number;
  dependentsAgesDescription?: null;
  domesticRelationshipType?: string;
  emailAddressText?: string;
  encompassApplicationId?: null;
  everHadAVaLoan?: boolean;
  fannieFirstName?: null;
  firstName?: string;
  fullName?: null;
  fullNameWithSuffix?: null;
  hasUnclaimedDependents?: boolean;
  id?: string;
  isBorrowerPrimary?: boolean;
  isNotLegalSpouse?: boolean;
  lastName?: string;
  lastNameWithSuffix?: null;
  loanId?: string;
  maritalStatus?: MARITAL_STATUS;
  militaryBranchOfService?: BRANCH_OF_SERVICE;
  militaryService?: boolean;
  mobilePhone?: string;
  militaryCombatPay?: number;
  militaryFlightPay?: number;
  militaryHazardPay?: number;
  militaryOverseasPay?: number;
  militaryPropPay?: number;
  clothingAllowance?: number;
  rationsAllowance?: number;
  variableHousingAllowance?: number;
  quartersAllowance?: number;
  reserveNationalGuardReserveActivated?: boolean;
  serviceExpirationTime?: null;
  spousalVaBenefitsEligibilityIndicator?: boolean;
  taxIdentificationIdentifier?: string;
  urla2020CitizenshipResidencyType?: string;
  useVACompensation?: boolean;
  veteran?: null;
  loanBorrowerRelationship1?: {
    id?: string;
    loanBorrowerId1?: string;
    loanBorrowerId2?: string;
  };
  loanBorrowerRelationship2?: {
    id?: string;
    loanBorrowerId1?: string;
    loanBorrowerId2?: string;
  };
  loanBorrowerAddressHistories?: ResidenceHistories[];
  loanBorrowerDependents?: {
    dependentValue?: number;
    id?: string;
    loanBorrowerId?: string;
  }[];
  loanEmploymentHistories?: LoanEmploymentHistory[];
  loanEmploymentIncomeOtherSources?: LoanEmploymentIncomeOtherSource[];
  loanDeclaration?: LoanDeclaration;
  loanDemographic?: LoanDemographic;
  loanGiftGrants?: LoanGiftGrant[];
}

export interface LoanDeclaration extends TimeStamp {
  intentToOccupyIndicator?: boolean;
  homeownerPastThreeYearsIndicator?: boolean | null;
  priorPropertyUsageType?: LOAN_DECLARATION_OCCUPANCY_TYPE | null;
  priorPropertyTitleType?: PRIOR_PROPERTY_TITLE_TYPE | null;
  specialBorrowerSellerRelationshipIndicator?: boolean | null;
  undisclosedBorrowedFundsIndicator?: boolean | null;
  undisclosedBorrowedFundsAmount?: string | null;
  undisclosedMortgageApplicationIndicator?: boolean | null;
  undisclosedCreditApplicationIndicator?: boolean | null;
  propertyProposedCleanEnergyLienIndicator?: boolean | null;
  undisclosedComakerOfNoteIndicator?: boolean | null;
  outstandingJudgmentsIndicator?: boolean | null;
  presentlyDelinquentIndicator?: boolean | null;
  partyToLawsuitIndicator?: boolean | null;
  priorPropertyDeedInLieuConveyedIndicator?: boolean | null;
  priorPropertyShortSaleCompletedIndicator?: boolean | null;
  priorPropertyForeclosureCompletedIndicator?: boolean | null;
  bankruptcyIndicator?: boolean | null;
  bankruptcyType?: BANKRUPTCY_TYPE | null;
}

export interface LoanDemographic extends TimeStamp {
  ethnicityByVisualOrSurname: boolean | null;
  raceByVisualOrSurname: boolean | null;
  sexByVisualOrSurname: boolean | null;
  infoWasProvidedThrough: string | null;
  hmdaEthnicityNotHispanicLatinoIndicator: boolean | null;
  hmdaEthnicityHispanicLatinoIndicator: boolean | null;
  hmdaMexicanIndicator: boolean | null;
  hmdaPuertoRicanIndicator: boolean | null;
  hmdaCubanIndicator: boolean | null;
  hmdaHispanicLatinoOtherOriginIndicator: boolean | null;
  hmdaOtherHispanicLatinoOriginName: string | null;
  hmdaEthnicityDoNotWishIndicator: boolean | null;
  hmdaAmericanIndianIndicator: boolean | null;
  hmdaAmericanIndianTribe: string | null;
  hmdaAsianIndicator: boolean | null;
  hmdaAsianIndianIndicator: boolean | null;
  hmdaChineseIndicator: boolean | null;
  hmdaFilipinoIndicator: boolean | null;
  hmdaJapaneseIndicator: boolean | null;
  hmdaKoreanIndicator: boolean | null;
  hmdaVietnameseIndicator: boolean | null;
  hmdaAsianOtherRaceIndicator: boolean | null;
  hmdaOtherAsianRace: string | null;
  hmdaAfricanAmericanIndicator: boolean | null;
  hmdaPacificIslanderIndicator: boolean | null;
  hmdaNativeHawaiianIndicator: boolean | null;
  hmdaGuamanianOrChamorroIndicator: boolean | null;
  hmdaSamoanIndicator: boolean | null;
  hmdaPacificIslanderOtherIndicator: boolean | null;
  hmdaOtherPacificIslanderRace: string | null;
  hmdaWhiteIndicator: boolean | null;
  hmdaRaceDoNotWishIndicator: boolean | null;
  hmdaGenderTypeFemaleIndicator: boolean | null;
  hmdaGenderTypeMaleIndicator: boolean | null;
  hmdaSexInfoNotProvided: boolean | null;
}

export interface LoanEmploymentIncomeOtherSource extends TimeStamp {
  id?: string;
  incomeType?: INCOME_TYPE;
  loanBorrowerId?: string;
  monthlyIncomeAmount?: number;
}

export interface LoanEmploymentHistory extends TimeStamp {
  id?: string;
  employerName?: string;
  employerStatus?: EMPLOYMENT_STATUS;
  basePayAmount?: number;
  bonusAmount?: number;
  commissionsAmount?: number;
  currentEmploymentIndicator?: boolean;
  positionDescription?: string;
  startDate?: string;
  endDate?: string;
  label?: null;
  industry?: INDUSTRY;
  monthlyIncomeAmount?: number;
  otherAmount?: number;
  overtimeAmount?: number;
  addressStreetLine1?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  phoneNumber?: string;
  hasOwnershipShare?: boolean;
  militaryEmployer?: boolean;
  militaryEntitlement?: number;
  militaryCombatPay?: number;
  militaryFlightPay?: number;
  militaryHazardPay?: number;
  militaryOverseasPay?: number;
  militaryPropPay?: number;
  clothingAllowance?: number;
  rationsAllowance?: number;
  variableHousingAllowance?: number;
  quartersAllowance?: number;
  militaryOtherAllowance?: number;
  specialEmployerRelationshipIndicator?: boolean;
  loanBorrowerId?: string;
}

export interface LoanDocumentsCondition extends TimeStamp {
  id: string;
  docConditionId: string;
  loanId: string;
  name: string;
  description: string;
  loanStage: CONDITION_LOAN_STAGE;
  docType: DOCUMENT_TYPE;
  status: LOAN_DOC_CONDITION_STATUS;
  showToBorrower: boolean;
  sendNotification: boolean;
  loanDocConditionOwners: LoanDocConditionOwner[];
  loanDocConditionNotifications: [];
  loanDocuments: [];
  docCondition: DocCondition;
  updatedByUser: User;
}

export interface DocCondition extends TimeStamp {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  applyAutomatically: boolean;
  loanStage: CONDITION_LOAN_STAGE;
  docType: DOCUMENT_TYPE;
  loanPurpose: null;
  loanType: null;
  occupancyType: null;
  employmentStatus: [];
  minimumLoanAmount: number;
  permanentResidencyCheck: boolean;
  useVaCompensation: boolean;
  receiveAlimonyOrChildSupport: boolean;
  payAlimonyOrChildSupport: boolean;
  dependentsUnder18: boolean;
  hasAnyReo: boolean;
  hasBankruptcy: boolean;
  shortSaleCheck: boolean;
}

export interface LoanDocConditionOwner extends TimeStamp {
  id: string;
  borrowerId: string;
  loanDocConditionId: string;
  loanBorrower: LoanBorrower;
}

export interface LoansResponse extends GetListResponse<Loan> {}

export interface GetLoanParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
  search?: string;
  statuses?: string[];
  purposes?: string[];
  occupancies?: string[];
  sort?: string;
  order?: string;
}

export interface UpdateLoanResponse {}

export interface UpdateLoanRequest {
  general?: {
    loanPurposeConvert?: LOAN_PURPOSES;
    mortgageType?: LOAN_TYPE;
    propertyAppraisedValueAmount?: number;
    propertyEstimatedValueAmount?: number;
    downPaymentAmount?: number;
    downPaymentAmountType?: LOAN_AMOUNT_TYPE;
    lockPeriodByDay?: string;
    currentBalanceAmount?: number;
    cashOutAmount?: number;
    lineOfCreditAmount?: number;
    baseLoanAmount?: string;
    downPaymentType?: SOURCE_OF_DOWN_PAYMENT;
  };
  subjectPropertyInformation?: {
    propertyUsageType?: string;
    propertyMixedUsageIndicator?: boolean;
    gsePropertyType?: PROPERTY_TYPE;
    subjectPropertyUnitNumber?: string;
    financedNumberOfUnits?: number;
    subjectPropertyUnitType?: UNIT_TYPE | null;
    constructionMethodType?: string | null;
    structureBuiltYear?: number;
    propertyStreetAddress?: string;
    county?: string;
    state?: string;
    zipCode?: string;
    realEstateAgentId?: string | null;
    isExternalRealEstateAgent?: boolean;
  };
  additionalLoanOptions?: {
    requireImpounds?: boolean;
    referralSource?: string;
    loanStory?: string;
  };
}

export interface AddResidenceHistoryRequest {
  loanBorrowerId?: string;
  addressStreetLine1?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  residencyBasisType?: OWN_OR_RENT;
  rent?: number;
  durationTermYears?: number;
  durationTermMonths?: number;
  mailAddressIsSame?: boolean;
  mailAddressStreetLine1?: string;
  mailAddressCity?: string;
  mailAddressState?: string;
  mailAddressPostalCode?: string;
}

export interface AddBorrowerRequestBody {
  general?: {
    firstName?: string;
    lastName?: string;
    emailAddressText?: string;
    mobilePhone?: string;
    birthDate?: string;
    taxIdentificationIdentifier?: string;
    urla2020CitizenshipResidencyType?: string;
    maritalStatus?: MARITAL_STATUS;
    isNotLegalSpouse?: boolean;
    domesticRelationshipType?: string | null;
  };
  residenceHistories?: ResidenceHistories[];
  dependents?: {
    dependentValue?: number;
  }[];
  militaryServices?: {
    spousalVaBenefitsEligibilityIndicator?: boolean;
    veteran?: VETERAN_TYPE;
    serviceExpirationTime?: string | null;
    militaryBranchOfService?: string | null;
    everHadAVaLoan?: boolean;
    useVACompensation?: boolean;
  };
}

export interface ResidenceHistories {
  id?: string;
  loanBorrowerId?: string;
  addressHistoryIsPrimary?: boolean;
  addressStreetLine1?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  residencyBasisType?: OWN_OR_RENT;
  rent?: number | null;
  durationTermYears?: number | null;
  durationTermMonths?: number | string | null;
  mailAddressIsSame?: boolean;
  mailAddressStreetLine1?: string;
  mailAddressCity?: string;
  mailAddressState?: string;
  mailAddressPostalCode?: string;
}

export interface UpdateBorrowerBodyRequest {
  general?: {
    firstName?: string;
    lastName?: string;
    emailAddressText?: string;
    mobilePhone?: string;
    birthDate?: string;
    taxIdentificationIdentifier?: string;
    urla2020CitizenshipResidencyType?: string;
    maritalStatus?: MARITAL_STATUS;
    isNotLegalSpouse?: boolean;
    domesticRelationshipType?: RELATIONSHIP_TYPE;
    borrowerRelationships?: BorrowerRelationships[];
  };
  residenceHistories?: ResidenceHistories[];
  dependents?: {
    dependentValue?: number;
  }[];
  militaryServices?: {
    spousalVaBenefitsEligibilityIndicator?: boolean;
    veteran?: string;
    serviceExpirationTime?: string;
    militaryBranchOfService?: BRANCH_OF_SERVICE;
    everHadAVaLoan?: boolean;
    useVACompensation?: boolean;
  };
}

export interface BorrowerRelationships {
  loanBorrowerId1?: string;
  loanBorrowerId2?: string;
}

export interface RealEstateAsset {
  id?: string;
  loanId?: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  propertyStatus: typeof PROPERTY_STATUS_OPTIONS;
  owner: typeof OWNER_TYPE_OPTIONS;
  propertyUsageType?: typeof OCCUPANCY_TYPE_OPTIONS;
  futurePropertyUsageType?: string;
  marketValueAmount?: string;
  gsePropertyType: typeof GSE_PROPERTY_TYPE_OPTIONS;
  rentalIncomeGrossAmount?: string;
  firstMortgage?: string;
  subordinateLiens?: string;
  homeownersInsurance?: string;
  supplementalPropertyInsurance?: string;
  propertyTaxes?: string;
  associationProjectDues?: string;
  rentFee?: string;
  subjectIndicator?: boolean;
}

export interface Assets {
  id?: string;
  loanId?: string;
  type1?: typeof ACCOUNT_TYPE_OPTIONS;
  holderName?: string;
  depositoryAccountName1?: string;
  urla2020CashOrMarketValueAmount1?: string;
  owner?: typeof OWNER_TYPE_OPTIONS;
}

export interface OtherAssets {
  id?: string;
  loanId?: string;
  assetType?: typeof OTHER_ASSET_TYPE_OPTIONS;
  otherDescription?: string;
  cashOrMarketValue?: string;
  borrowerType?: typeof OWNER_TYPE_OPTIONS;
}

export interface AddLoanEmploymentHistoryBodyRequest {
  employerStatus?: EMPLOYMENT_STATUS;
  currentEmploymentIndicator?: boolean;
  startDate?: string;
  endDate?: string;
  employerName?: string;
  industry?: INDUSTRY | null;
  addressStreetLine1?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  phoneNumber?: string;
  positionDescription?: string;
  hasOwnershipShare?: boolean;
  monthlyIncomeAmount?: Number;
  basePayAmount?: Number;
  overtimeAmount?: Number;
  bonusAmount?: Number;
  commissionsAmount?: Number;
  otherAmount?: Number;
  specialEmployerRelationshipIndicator?: boolean;
  militaryCombatPay?: Number;
  militaryFlightPay?: Number;
  militaryHazardPay?: Number;
  militaryOverseasPay?: Number;
  militaryPropPay?: Number;
  clothingAllowance?: Number;
  rationsAllowance?: Number;
  variableHousingAllowance?: Number;
  quartersAllowance?: Number;
}

export type UpdateLoanEmploymentHistoryBodyRequest =
  AddLoanEmploymentHistoryBodyRequest;

export interface AddLoanEmploymentIncomeOtherSourceBodyRequest {
  incomeType?: INCOME_TYPE;
  monthlyIncomeAmount?: Number;
}

export interface AddLoanOtherMortgageLoansBodyRequest {
  loanInfoCreditorName?: string;
  loanInfoMortgageLoanAccountType?: LOAN_GENERAL_INFO_ACCOUNT_TYPE | null;
  lienPosition?: string;
  sourceOfFunds?: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE | null;
  monthlyPayment?: Number;
  loanInfoLoanAmount?: Number;
  monthlyAmountHELOCCreditLimit?: Number;
  helocInitialDraw?: Number;
  appliedToDownPayment?: Number;
}

export type UpdateLoanEmploymentIncomeOtherSourceBodyRequest =
  AddLoanEmploymentIncomeOtherSourceBodyRequest;

export interface UpdateLoanExpenseBodyRequest {
  firstMortgage?: number;
  subordinateLiens?: number;
  homeownersInsurance?: number;
  supplementalPropertyInsurance?: number;
  propertyTaxes?: number;
  associationProjectDues?: number;
  other?: number;
  totalExpense?: number;
}
export interface LoanOtherAsset {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  loanId?: string;
  borrowerType?: OWNER_TYPE | null;
  assetType?: OtherAssetTypes | null;
  cashOrMarketValue?: number;
  otherDescription?: string;
  holderName?: string;
  attention?: string;
  holderAddressStreetLine1?: string;
  holderAddressCity?: string;
  holderAddressState?: string;
  holderAddressPostalCode?: string;
  holderPhone?: string;
  holderFax?: string;
  holderEmail?: string;
  title?: string;
  printUserNameIndicator?: boolean;
  titlePhone?: string;
  titleFax?: string;
  printAttachmentIndicator?: boolean;
  otherAssetDate?: string;
  printUserJobTitleIndicator?: boolean;
  altId?: string;
  propertyOwnerIds?: any;
  loanPropertyOwners?: any;
}

export interface LoanAsset {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  loanId?: string;
  holderName?: string;
  attention?: string;
  holderAddressStreetLine1?: string;
  holderAddressCity?: string;
  holderAddressState?: string;
  holderAddressPostalCode?: string;
  holderPhone?: string;
  holderFax?: string;
  holderEmail?: string;
  holderComments?: string;
  total?: number;
  altId?: string;
  printAttachmentIndicator?: boolean;
  title?: string;
  printUserNameIndicator?: boolean;
  foreignAddressIndicator?: boolean;
  country?: string;
  titlePhone?: string;
  titleFax?: string;
  includeInAusExport?: boolean;
  printUserJobTitleIndicator?: boolean;
  noLinkToDocTrackIndicator?: boolean;
  urla2020CashOrMarketValueAmount1?: string;
  type1?: AccountTypes | null;
  depositoryAccountName1?: string;
  accountIdentifier1?: string;
  cashOrMarketValueAmount1?: number;
  type2?: string;
  depositoryAccountName2?: string;
  accountIdentifier2?: string;
  cashOrMarketValueAmount2?: number;
  type3?: string;
  depositoryAccountName3?: string;
  accountIdentifier3?: string;
  cashOrMarketValueAmount3?: number;
  type4?: string;
  depositoryAccountName4?: string;
  accountIdentifier4?: string;
  cashOrMarketValueAmount4?: number;
  propertyOwnerIds?: any;
  loanPropertyOwners?: any;
}

export interface LiabilityElement extends TimeStamp {
  id?: string;
  loanId?: string;
  ownedBy?: OWNER_TYPE | null;
  mainAccountType?: LIABILITY_TYPE | null;
  mainCompanyName?: string;
  mainAccountNumber?: number;
  mainUnpaidBalance?: number;
  mainMonthlyAmount?: number;
  realEstateAgentId?: string;
  liabilityOwnerIds?: any;
  loanLiabilityOwners?: any;
  paidOff?: boolean;
}

export interface OtherLiability extends TimeStamp {
  id?: string;
  loanId?: string;
  otherOwnedBy?: OWNER_TYPE | null;
  otherExpenseType?: EXPENSE_TYPE | null;
  otherMonthlyAmount?: number;
  otherDescription?: string;
  liabilityOwnerIds?: any;
  loanLiabilityOwners?: any;
}

export interface UpdateLoanDeclarationBodyRequest {
  intentToOccupyIndicator?: boolean;
  homeownerPastThreeYearsIndicator?: boolean | null;
  priorPropertyUsageType?: LOAN_DECLARATION_OCCUPANCY_TYPE | null;
  priorPropertyTitleType?: PRIOR_PROPERTY_TITLE_TYPE | null;
  specialBorrowerSellerRelationshipIndicator?: boolean | null;
  undisclosedBorrowedFundsIndicator?: boolean | null;
  undisclosedBorrowedFundsAmount?: number | null;
  undisclosedMortgageApplicationIndicator?: boolean | null;
  undisclosedCreditApplicationIndicator?: boolean | null;
  propertyProposedCleanEnergyLienIndicator?: boolean | null;
  undisclosedComakerOfNoteIndicator?: boolean | null;
  outstandingJudgmentsIndicator?: boolean | null;
  presentlyDelinquentIndicator?: boolean | null;
  partyToLawsuitIndicator?: boolean | null;
  priorPropertyDeedInLieuConveyedIndicator?: boolean | null;
  priorPropertyShortSaleCompletedIndicator?: boolean | null;
  priorPropertyForeclosureCompletedIndicator?: boolean | null;
  bankruptcyIndicator?: boolean | null;
  bankruptcyType?: BANKRUPTCY_TYPE | null;
}

export type TransactionDetailsBodyRequest = LoanTransactionDetail;

export interface LoanGiftGrant {
  id?: string;
  giftGrantTypes?: LOAN_GIFT_GRANT_TYPE;
  giftGrantSourceTypes?: LOAN_GIFT_GRANT_SOURCE_TYPE;
  giftGrantAmount?: number;
  giftGrantsDeposited?: boolean;
  loanBorrowerId?: string;
}

export interface LoanTransactionDetail extends TimeStamp {
  loanId?: string;
  loanTransactionDetailOtherCredits?: LoanTransactionDetailOtherCredits[];
  salesContractPrice?: number | string;
  improvementsRenovationsRepairsExpense?: number | string;
  rentFeeForLand?: number | string;
  refinanceMortgagePayoff?: number | string;
  creditCardsAndOtherDebts?: number | string;
  borrowerClosingCosts?: number | string;
  discountPoints?: number | string;
  financedMortgageInsuranceAmount?: number | string;
  sellerCredits?: number | string;
}

export interface LoanTransactionDetailOtherCredits {
  createdAt?: string;
  updatedAt?: string;
  loanTransactionDetailId?: string;
  creditsAmount?: number | string;
  creditsType?: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE;
}

export interface GetLoanDocConditionsParams {
  loanId: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
  docTypes?: string[];
  loanStages?: string[];
  statuses?: string[];
}

export interface UpdateLoanDocConditionRequest {
  docConditionId: string;
  name: string;
  description?: string;
  loanStage: string;
  docType: string;
  conditionOwnerIds?: any;
  showToBorrower?: boolean;
  sendNotification?: boolean;
  conditionOwnerId?: string;
}
export interface LoanDocCondition extends TimeStamp {
  docConditionId?: string;
  docType?: DOCUMENT_TYPE | null;
  loanStage?: LOAN_STAGE | null;
  name?: string;
  sendNotification?: boolean;
  showToBorrower?: boolean;
  status?: string;
  description?: string;
  id?: string;
  loanId?: string;
  docCondition?: any;
  loanDocConditionNotifications?: any[];
  loanDocConditionOwners?: any[];
  loanDocuments?: any[];
}

export interface LoanDocument extends TimeStamp {
  id: string;
  fileId: string;
  loanDocConditionId: string;
  file: LoanFile;
  loanDocCondition: LoanDocCondition;
  createdByUser: User;
}

export interface LoanFile extends TimeStamp {
  name: string;
  type: string;
  storage: string;
  path: string;
}

export interface AddLoanManualRequest {
  loanPurposeOriginal: LOAN_PURPOSE_ORIGINAL | null;
  firstName: string;
  lastName: string;
  emailAddressText: string;
  mobilePhone: string;
  propertyEstimatedValueAmount: number | null;
  downPaymentAmount: number | null;
  downPaymentAmountType: LOAN_AMOUNT_TYPE;
  currentBalanceAmount: number | null;
  cashOutAmount: number | null;
  lineOfCreditAmount: number | null;
  baseLoanAmount: number | null;
  totalExistingLoanAmount: number | null;
}
