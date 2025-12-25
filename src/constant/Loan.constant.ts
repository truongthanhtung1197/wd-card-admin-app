import { range } from "ramda";

export enum LOAN_STATUS {
  "Loan_submitted" = "Loan submitted",
  "Loan_initiated" = "Loan initiated",
}

export enum ENCOMPASS_LOAN_STATUS {
  "File_started" = "File started",
  "Application" = "Application",
  "Pre_approved_finished" = "Pre-approved finished",
  "Submission" = "Submission",
  "Cond_approval_finished" = "Cond.Approval finished",
  "CTC" = "CTC",
  "Docs_out" = "Docs out",
  "Signing_scheduled" = "Signing scheduled",
  "Funding" = "Funding",
  "Recording" = "Recording",
  "Completion" = "Completion",
}

export enum LOAN_STATUS_MERGE {
  "Loan_submitted" = "Loan submitted",
  "Loan_initiated" = "Loan initiated",
  "File_started" = "File started",
  "Application" = "Application",
  "Pre_approved_finished" = "Pre-approved finished",
  "Submission" = "Submission",
  "Cond_approval_finished" = "Cond.Approval finished",
  "CTC" = "CTC",
  "Docs_out" = "Docs out",
  "Signing_scheduled" = "Signing scheduled",
  "Funding" = "Funding",
  "Recording" = "Recording",
  "Completion" = "Completion",
}

export enum LOAN_STATUS_STATE {
  "Provided_loan_info" = "Provided loan info",
  "Provided_personal" = "Provided personal",
  "Provided_income" = "Provided income",
  "Provided_assets" = "Provided assets",
  "Provided_liabilities" = "Provided liabilities",
  "Provided_gift_and_grants" = "Provided gift and grants",
  "Provided_declarations" = "Provided declarations",
  "Provided_demographic" = "Provided demographic",
}

export const LOAN_STATUS_OPTIONS = [
  {
    label: "Loan Submitted",
    key: LOAN_STATUS_MERGE.Loan_submitted,
  },
  {
    label: "Loan Initiated",
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "File started",
    key: LOAN_STATUS_MERGE.File_started,
  },
  {
    label: "Application",
    key: LOAN_STATUS_MERGE.Application,
  },
  {
    label: "Pre-approved finished",
    key: LOAN_STATUS_MERGE.Pre_approved_finished,
  },
  {
    label: "Submission",
    key: LOAN_STATUS_MERGE.Submission,
  },
  {
    label: "Conditional approval finished",
    key: LOAN_STATUS_MERGE.Cond_approval_finished,
  },
  {
    label: "CTC (Clear To Close)",
    key: LOAN_STATUS_MERGE.CTC,
  },
  {
    label: "Docs out",
    key: LOAN_STATUS_MERGE.Docs_out,
  },
  {
    label: "Signing scheduled",
    key: LOAN_STATUS_MERGE.Signing_scheduled,
  },
  {
    label: "Funding",
    key: LOAN_STATUS_MERGE.Funding,
  },
  {
    label: "Recording",
    key: LOAN_STATUS_MERGE.Recording,
  },
  {
    label: "Completion",
    key: LOAN_STATUS_MERGE.Completion,
  },
];

export const LOAN_STATUS_OPTIONS_WITH_STATES = [
  {
    label: "Loan Submitted",
    key: LOAN_STATUS_MERGE.Loan_submitted,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_loan_info,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_personal,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_income,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_assets,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_liabilities,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_gift_and_grants,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_declarations,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "Loan Initiated",
    subLabel: LOAN_STATUS_STATE.Provided_demographic,
    key: LOAN_STATUS_MERGE.Loan_initiated,
  },
  {
    label: "File started",
    key: LOAN_STATUS_MERGE.File_started,
  },
  {
    label: "Application",
    key: LOAN_STATUS_MERGE.Application,
  },
  {
    label: "Pre-approved finished",
    key: LOAN_STATUS_MERGE.Pre_approved_finished,
  },
  {
    label: "Submission",
    key: LOAN_STATUS_MERGE.Submission,
  },
  {
    label: "Conditional approval finished",
    key: LOAN_STATUS_MERGE.Cond_approval_finished,
  },
  {
    label: "CTC (Clear To Close)",
    key: LOAN_STATUS_MERGE.CTC,
  },
  {
    label: "Docs out",
    key: LOAN_STATUS_MERGE.Docs_out,
  },
  {
    label: "Signing scheduled",
    key: LOAN_STATUS_MERGE.Signing_scheduled,
  },
  {
    label: "Funding",
    key: LOAN_STATUS_MERGE.Funding,
  },
  {
    label: "Recording",
    key: LOAN_STATUS_MERGE.Recording,
  },
  {
    label: "Completion",
    key: LOAN_STATUS_MERGE.Completion,
  },
];

export enum PURPOSE_ORIGINAL {
  Purchase = "Purchase",
  Refinance = "Refinance",
  HELOC = "HELOC",
}

export enum LOAN_PURPOSES {
  Purchase = "Purchase",
  LowerRateTermRefinance = "Lower Rate/Term Refinance",
  CashoutRefinance = "Cash-out Refinance",
}

export const LOAN_PURPOSES_OPTIONS = [
  {
    label: "Purchase",
    key: LOAN_PURPOSES.Purchase,
  },
  {
    label: "Lower rate/term Refinance",
    key: LOAN_PURPOSES.LowerRateTermRefinance,
  },
  {
    label: "Cash-out Refinance",
    key: LOAN_PURPOSES.CashoutRefinance,
  },
];

export enum CITIZENSHIP {
  "USCitizen" = "USCitizen",
  "PermanentResidentAlien" = "PermanentResidentAlien",
  "NonPermanentResidentAlien" = "NonPermanentResidentAlien",
}

export const CITIZENSHIP_OPTIONS = [
  {
    label: "US citizen",
    key: CITIZENSHIP.USCitizen,
  },
  {
    label: "Permanent resident alien",
    key: CITIZENSHIP.PermanentResidentAlien,
  },
  {
    label: "Non-permanent resident alien",
    key: CITIZENSHIP.NonPermanentResidentAlien,
  },
];

export enum MARITAL_STATUS {
  "Married" = "Married",
  "Unmarried" = "Unmarried",
  "Separated" = "Separated",
}

export const MARITAL_STATUS_OPTIONS = [
  {
    label: "Unmarried",
    key: MARITAL_STATUS.Unmarried,
  },
  {
    label: "Married",
    key: MARITAL_STATUS.Married,
  },
  {
    label: "Legally separated",
    key: MARITAL_STATUS.Separated,
  },
];

export enum RELATIONSHIP_TYPE {
  "Civil_Union" = "Civil Union",
  "Domestic_partnership" = "Domestic partnership",
  "Registered_reciprocal_beneficiary_relationship" = "Registered reciprocal beneficiary relationship",
  "Other" = "Other",
}

export const RELATIONSHIP_TYPE_OPTIONS = [
  {
    label: "Civil Union",
    key: RELATIONSHIP_TYPE.Civil_Union,
  },
  {
    label: "Domestic partnership",
    key: RELATIONSHIP_TYPE.Domestic_partnership,
  },
  {
    label: "Registered Reciprocal Beneficiary Relationship",
    key: RELATIONSHIP_TYPE.Registered_reciprocal_beneficiary_relationship,
  },
  {
    label: "Other",
    key: RELATIONSHIP_TYPE.Other,
  },
];

export enum LOAN_OCCUPANCY {
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
  Investment = "Investment",
}

export const LOAN_OCCUPANCY_OPTIONS = [
  {
    label: "Primary residence",
    key: LOAN_OCCUPANCY.PrimaryResidence,
  },
  {
    label: "Second home",
    key: LOAN_OCCUPANCY.SecondHome,
  },
  {
    label: "Investment property",
    key: LOAN_OCCUPANCY.Investment,
  },
];

export enum LOAN_TYPE {
  Conventional = "Conventional",
  VA = "VA",
  HELOC = "HELOC",
  USDA = "USDARuralHousing",
  FHA = "FHA",
  SECOND_LOAN = "SECOND_LOAN",
}

export const LOAN_TYPE_OPTIONS = [
  {
    label: "Conventional",
    key: LOAN_TYPE.Conventional,
  },
  {
    label: "VA",
    key: LOAN_TYPE.VA,
  },
  {
    label: "HELOC",
    key: LOAN_TYPE.HELOC,
  },
  {
    label: "USDA",
    key: LOAN_TYPE.USDA,
  },
  {
    label: "FHA",
    key: LOAN_TYPE.FHA,
  },
  {
    label: "Second loan",
    key: LOAN_TYPE.SECOND_LOAN,
  },
];

export enum LOAN_LOCK_PERIOD {
  THIRTY = "30",
  FORTY_FIVE = "45",
  SIXTY = "60",
}

export const LOAN_LOCK_PERIOD_OPTIONS = [
  {
    label: "30 days",
    key: LOAN_LOCK_PERIOD.THIRTY,
  },
  {
    label: "45 days",
    key: LOAN_LOCK_PERIOD.FORTY_FIVE,
  },
  {
    label: "60 days",
    key: LOAN_LOCK_PERIOD.SIXTY,
  },
];

export enum SOURCE_OF_DOWN_PAYMENT {
  BridgeLoan = "BridgeLoan",
  CashOnHand = "CashOnHand",
  CheckingSavings = "CheckingSavings",
  DepositOnSalesContract = "DepositOnSalesContract",
  EquityOnPendingSale = "EquityOnPendingSale",
  EquityOnSoldProperty = "EquityOnSoldProperty",
  GiftFunds = "GiftFunds",
  LifeInsuranceCashValue = "LifeInsuranceCashValue",
  RentWithOptionToPurchase = "RentWithOptionToPurchase",
  SaleOfChattel = "SaleOfChattel",
  SecuredLoan = "SecuredLoan",
  StocksAndBonds = "StocksAndBonds",
  SweatEquity = "SweatEquity",
  TradeEquity = "TradeEquity",
  LotEquity = "LotEquity",
  TrustFunds = "TrustFunds",

  // tempo data. BE no this data
  RentWithOptionToPuchase = "RentWithOptionToPuchase",
  RetirementFunds = "RetirementFunds",
}

export const SOURCE_OF_DOWN_PAYMENT_OPTIONS = [
  {
    label: "Bridge loan",
    key: SOURCE_OF_DOWN_PAYMENT.BridgeLoan,
  },
  {
    label: "Cash on hand",
    key: SOURCE_OF_DOWN_PAYMENT.CashOnHand,
  },
  {
    label: "Checking/Savings",
    key: SOURCE_OF_DOWN_PAYMENT.CheckingSavings,
  },
  {
    label: "Deposit on sales contract",
    key: SOURCE_OF_DOWN_PAYMENT.DepositOnSalesContract,
  },
  {
    label: "Equity from pending sale",
    key: SOURCE_OF_DOWN_PAYMENT.EquityOnPendingSale,
  },
  {
    label: "Equity on sold property",
    key: SOURCE_OF_DOWN_PAYMENT.EquityOnSoldProperty,
  },
  {
    label: "gift funds",
    key: SOURCE_OF_DOWN_PAYMENT.GiftFunds,
  },
  {
    label: "deposit on sales contract",
    key: SOURCE_OF_DOWN_PAYMENT.LifeInsuranceCashValue,
  },
  {
    label: "life insurance cash value",
    key: SOURCE_OF_DOWN_PAYMENT.RentWithOptionToPurchase,
  },
  {
    label: "lot equity",
    key: SOURCE_OF_DOWN_PAYMENT.LotEquity,
  },
  {
    label: "rent with option to purchase",
    key: SOURCE_OF_DOWN_PAYMENT.RentWithOptionToPuchase,
  },
  {
    label: "retirement funds",
    key: SOURCE_OF_DOWN_PAYMENT.RetirementFunds,
  },
  {
    label: "sales of chattel",
    key: SOURCE_OF_DOWN_PAYMENT.SaleOfChattel,
  },
  {
    label: "secured loan",
    key: SOURCE_OF_DOWN_PAYMENT.SecuredLoan,
  },
  {
    label: "stocks and bonds",
    key: SOURCE_OF_DOWN_PAYMENT.StocksAndBonds,
  },
  {
    label: "Sweat equity",
    key: SOURCE_OF_DOWN_PAYMENT.SweatEquity,
  },
  {
    label: "Trade equity",
    key: SOURCE_OF_DOWN_PAYMENT.TradeEquity,
  },
  {
    label: "Trust funds",
    key: SOURCE_OF_DOWN_PAYMENT.TrustFunds,
  },
];

export enum OCCUPANCY_TYPE {
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
  InvestorProperty = "Investor",
}

export const OCCUPANCY_TYPE_OPTIONS = [
  {
    label: "Primary residence",
    key: OCCUPANCY_TYPE.PrimaryResidence,
  },
  {
    label: "Second home",
    key: OCCUPANCY_TYPE.SecondHome,
  },
  {
    label: "Investment property",
    key: OCCUPANCY_TYPE.InvestorProperty,
  },
];

export enum PROPERTY_TYPE {
  Attached = "Attached",
  Condominium = "Condominium",
  CoOperative = "Cooperative",
  Detached = "Detached",
  HighRiseCondominium = "HighRiseCondominium",
  ManufacturedHousing = "ManufacturedHousing",
  PUD = "PUD",
  DetachedCondo = "DetachedCondo",
  ManufacturedHomeCondoPUDCoOp = "ManufacturedHomeCondoPUDCoOp",
  MH_CHICEHome = "MH HomeChoice",
  MH_Select = "MHSelect",
  MH_Advantage = "MHAdvantage",
}

export const PROPERTY_TYPE_OPTIONS = [
  { label: "Attached", key: PROPERTY_TYPE.Attached },
  { label: "Condominium", key: PROPERTY_TYPE.Condominium },
  { label: "Co-Operative", key: PROPERTY_TYPE.CoOperative },
  { label: "Detached", key: PROPERTY_TYPE.Detached },
  { label: "High-Rise Condominium", key: PROPERTY_TYPE.HighRiseCondominium },
  { label: "Manufactured Housing", key: PROPERTY_TYPE.ManufacturedHousing },
  { label: "PUD", key: PROPERTY_TYPE.PUD },
  { label: "Detached Condo", key: PROPERTY_TYPE.DetachedCondo },
  {
    label: "MFD  Home/Condo/PUD/Co-Op",
    key: PROPERTY_TYPE.ManufacturedHomeCondoPUDCoOp,
  },
  { label: "MH CHICEHome", key: PROPERTY_TYPE.MH_CHICEHome },
  { label: "MH Select", key: PROPERTY_TYPE.MH_Select },
  { label: "MH Advantage", key: PROPERTY_TYPE.MH_Advantage },
];

export enum GSE_PROPERTY_TYPE {
  SingleFamily = "SingleFamily",
  Condominium = "Condominium",
  Townhouse = "Townhouse",
  Cooperative = "Cooperative",
  TwoToFourUnitProperty = "TwoToFourUnitProperty",
  MultifamilyMoreThanFourUnits = "MultifamilyMoreThanFourUnits",
  ManufacturedMobileHome = "ManufacturedMobileHome",
  CommercialNonResidential = "CommercialNonResidential",
  HomeAndBusinessCombined = "HomeAndBusinessCombined",
  MixedUseResidential = "MixedUseResidential",
  Farm = "Farm",
  Land = "Land",
}

export const GSE_PROPERTY_TYPE_OPTIONS = [
  {
    label: "Single family",
    key: GSE_PROPERTY_TYPE.SingleFamily,
  },
  {
    label: "Condominium",
    key: GSE_PROPERTY_TYPE.Condominium,
  },
  {
    label: "Townhouse",
    key: GSE_PROPERTY_TYPE.Townhouse,
  },
  {
    label: "Cooperative",
    key: GSE_PROPERTY_TYPE.Cooperative,
  },
  {
    label: "Two to four unit property",
    key: GSE_PROPERTY_TYPE.TwoToFourUnitProperty,
  },
  {
    label: "Multifamily more than four units",
    key: GSE_PROPERTY_TYPE.MultifamilyMoreThanFourUnits,
  },
  {
    label: "Manufactured mobile home",
    key: GSE_PROPERTY_TYPE.ManufacturedMobileHome,
  },
  {
    label: "Commercial non-residential",
    key: GSE_PROPERTY_TYPE.CommercialNonResidential,
  },
  {
    label: "Home and business combined",
    key: GSE_PROPERTY_TYPE.HomeAndBusinessCombined,
  },
  {
    label: "Mixed use residential",
    key: GSE_PROPERTY_TYPE.MixedUseResidential,
  },
  {
    label: "Farm",
    key: GSE_PROPERTY_TYPE.Farm,
  },
  {
    label: "Land",
    key: GSE_PROPERTY_TYPE.Land,
  },
];

export enum UNIT_TYPE {
  Apartment = "Apartment",
  Basement = "Basement",
  Building = "Building",
  Condo = "Condo",
  Department = "Department",
  Floor = "Floor",
  Front = "Front",
  Hangar = "Hangar",
  Key = "Key",
  Lobby = "Lobby",
  Lot = "Lot",
  Lower = "Lower",
  Office = "Office",
  Penthouse = "Penthouse",
  Pier = "Pier",
  Rear = "Rear",
  Room = "Room",
  Side = "Side",
  Space = "Space",
  Stop = "Stop",
  Suite = "Suite",
  Trailer = "Trailer",
  Unit = "Unit",
  Upper = "Upper",
}

export const UNIT_TYPE_OPTIONS = [
  {
    label: "Primary residence",
    key: UNIT_TYPE.Apartment,
  },
  {
    label: "Basement",
    key: UNIT_TYPE.Basement,
  },
  {
    label: "Building",
    key: UNIT_TYPE.Building,
  },
  {
    label: "Condo",
    key: UNIT_TYPE.Condo,
  },
  {
    label: "Department",
    key: UNIT_TYPE.Department,
  },
  {
    label: "Floor",
    key: UNIT_TYPE.Floor,
  },
  {
    label: "Front",
    key: UNIT_TYPE.Front,
  },
  {
    label: "Hangar",
    key: UNIT_TYPE.Hangar,
  },
  {
    label: "Key",
    key: UNIT_TYPE.Key,
  },
  {
    label: "Lobby",
    key: UNIT_TYPE.Lobby,
  },
  {
    label: "Lot",
    key: UNIT_TYPE.Lot,
  },
  {
    label: "Lower",
    key: UNIT_TYPE.Lower,
  },
  {
    label: "Office",
    key: UNIT_TYPE.Office,
  },
  {
    label: "Penthouse",
    key: UNIT_TYPE.Penthouse,
  },
  {
    label: "Pier",
    key: UNIT_TYPE.Pier,
  },
  {
    label: "Rear",
    key: UNIT_TYPE.Rear,
  },
  {
    label: "Room",
    key: UNIT_TYPE.Room,
  },
  {
    label: "Side",
    key: UNIT_TYPE.Side,
  },
  {
    label: "Space",
    key: UNIT_TYPE.Space,
  },
  {
    label: "Stop",
    key: UNIT_TYPE.Stop,
  },
  {
    label: "Suite",
    key: UNIT_TYPE.Suite,
  },
  {
    label: "Trailer",
    key: UNIT_TYPE.Trailer,
  },
  {
    label: "Unit",
    key: UNIT_TYPE.Unit,
  },
  {
    label: "Upper",
    key: UNIT_TYPE.Upper,
  },
];

export enum CONSTRUCTION_METHOD {
  SiteBuild = "Site Built",
  ManufacturedHome = "Manufactured",
}

export const CONSTRUCTION_METHOD_OPTIONS = [
  {
    label: "Site-built",
    key: CONSTRUCTION_METHOD.SiteBuild,
  },
  {
    label: "Manufactured home",
    key: CONSTRUCTION_METHOD.ManufacturedHome,
  },
];

export const getYearBuildOptions = () => {
  const currentYear = new Date().getFullYear();
  return range(currentYear - 199, currentYear + 1)
    ?.sort((a, b) => b - a)
    ?.map((i) => {
      return {
        label: i,
        key: String(i),
      };
    });
};

export enum REFERRAL_SOURCE {
  Internet = "Internet",
  RepeatCustomer = "Repeat customer",
  FriendFamily = "Friend/Family",
  CondoPreferredLender = "Condo preferred lender",
  Builder = "Builder",
  Other = "Other",
}

export const REFERRAL_SOURCE_OPTIONS = [
  {
    label: "Internet",
    key: REFERRAL_SOURCE.Internet,
  },
  {
    label: "Repeat customer",
    key: REFERRAL_SOURCE.RepeatCustomer,
  },
  {
    label: "Friend/Family",
    key: REFERRAL_SOURCE.FriendFamily,
  },
  {
    label: "Condo preferred lender",
    key: REFERRAL_SOURCE.CondoPreferredLender,
  },
  {
    label: "Builder",
    key: REFERRAL_SOURCE.Builder,
  },
  {
    label: "Other",
    key: REFERRAL_SOURCE.Other,
  },
];

export enum LOAN_AMOUNT_TYPE {
  percentage = "percentage",
  currency = "currency",
}

export enum VETERAN_TYPE {
  "Active_duty" = "Active duty",
  "Veteran" = "Veteran",
  "Reserves" = "Reserves",
  "Surviving_spouse" = "Surviving spouse",
}

export const VETERAN_TYPE_OPTIONS = [
  {
    label: "Active duty",
    key: VETERAN_TYPE.Active_duty,
  },
  {
    label: "Veteran",
    key: VETERAN_TYPE.Veteran,
  },
  {
    label: "Reserves",
    key: VETERAN_TYPE.Reserves,
  },
  {
    label: "Surviving spouse",
    key: VETERAN_TYPE.Surviving_spouse,
  },
];

export enum BRANCH_OF_SERVICE {
  "Army" = "Army",
  "Navy" = "Navy",
  "Marines" = "Marines",
  "AirForce" = "AirForce",
  "CoastGuard" = "CoastGuard",
  "SpaceForce" = "SpaceForce",
  "Other" = "Other",
}

export const BRANCH_OF_SERVICE_OPTIONS = [
  {
    label: "Army",
    key: BRANCH_OF_SERVICE.Army,
  },
  {
    label: "Navy",
    key: BRANCH_OF_SERVICE.Navy,
  },
  {
    label: "Marines",
    key: BRANCH_OF_SERVICE.Marines,
  },
  {
    label: "AirForce",
    key: BRANCH_OF_SERVICE.AirForce,
  },
  {
    label: "CoastGuard",
    key: BRANCH_OF_SERVICE.CoastGuard,
  },
  {
    label: "Space force",
    key: BRANCH_OF_SERVICE.SpaceForce,
  },
  {
    label: "Other",
    key: BRANCH_OF_SERVICE.Other,
  },
];

export enum OWN_OR_RENT {
  "Rent" = "Rent",
  "Own" = "Own",
}

export const getMonthLivingAtPrimaryAddressOptions = () => {
  return range(0, 13)?.map((i) => {
    return {
      label: String(i),
      key: String(i),
    };
  });
};

export enum OWNER_TYPE {
  Borrower = "Borrower",
  CoBorrower = "CoBorrower",
  Both = "Both",
}

export const OWNER_TYPE_OPTIONS = [
  {
    label: "Borrower",
    key: OWNER_TYPE.Borrower,
  },
  {
    label: "Co-Borrower",
    key: OWNER_TYPE.CoBorrower,
  },
  {
    label: "Both",
    key: OWNER_TYPE.Both,
  },
];

export enum AccountTypes {
  CheckingAccount = "Checking account",
  Account = "account",
  MoneyMarketFund = "money market fund",
  CertificateOfDeposit = "certificate of deposit",
  MutualFunds = "mutual funds",
  Stock = "stock",
  StockOptions = "stock options",
  Bond = "bond",
  RetirementFunds = "retirement funds",
  BridgeLoanNotDeposited = "bridge loan not deposited",
  IndividualDevelopmentAccount = "individual development account",
  LifeInsurance = "life insurance",
  TrustAccount = "trust account",
}

export const ACCOUNT_TYPE_OPTIONS = [
  {
    label: "Checking account",
    key: AccountTypes.CheckingAccount,
  },
  {
    label: "Account",
    key: AccountTypes.Account,
  },
  {
    label: "Money market fund",
    key: AccountTypes.MoneyMarketFund,
  },
  {
    label: "Certificate of deposit",
    key: AccountTypes.CertificateOfDeposit,
  },
  {
    label: "Mutual funds",
    key: AccountTypes.MutualFunds,
  },
  {
    label: "Stock",
    key: AccountTypes.Stock,
  },
  {
    label: "Stock options",
    key: AccountTypes.StockOptions,
  },
  {
    label: "Bond",
    key: AccountTypes.Bond,
  },
  {
    label: "Retirement funds",
    key: AccountTypes.RetirementFunds,
  },
  {
    label: "Bridge loan not deposited",
    key: AccountTypes.BridgeLoanNotDeposited,
  },
  {
    label: "Individual development account",
    key: AccountTypes.IndividualDevelopmentAccount,
  },
  {
    label: "Life insurance",
    key: AccountTypes.LifeInsurance,
  },
  {
    label: "Trust account",
    key: AccountTypes.TrustAccount,
  },
];

export enum OtherAssetTypes {
  Annuity = "Annuity",
  Automobile = "Automobile",
  Boat = "Boat",
  BorrowerPrimaryHome = "BorrowerPrimaryHome",
  BridgeLoanNotDeposited = "BridgeLoanNotDeposited",
  CashOnHand = "CashOnHand",
  EarnestMoney = "EarnestMoney",
  EmployerAssistedHousing = "EmployerAssistedHousing",
  LeasePurchaseFund = "LeasePurchaseFund",
  NetWorthOfBusinessOwned = "NetWorthOfBusinessOwned",
  PendingNetSaleProceedsFromRealEstateAssets = "PendingNetSaleProceedsFromRealEstateAssets",
  ProceedsFromSaleOfNonRealEstateAsset = "ProceedsFromSaleOfNonRealEstateAsset",
  ProceedsFromSecuredLoan = "ProceedsFromSecuredLoan",
  ProceedsFromUnsecuredLoan = "ProceedsFromUnsecuredLoan",
  LeasePurchaseCredit = "LeasePurchaseCredit",
  LotEquity = "LotEquity",
  Other = "Other",
  RecreationalVehicle = "RecreationalVehicle",
  RelocationFunds = "RelocationFunds",
  SavingsBond = "SavingsBond",
  SeverancePackage = "SeverancePackage",
  SweatEquity = "SweatEquity",
  TradeEquityFromPropertySwap = "TradeEquityFromPropertySwap",
}

export const OTHER_ASSET_TYPE_OPTIONS = [
  {
    label: "Annuity (FHA/VA)",
    key: OtherAssetTypes.Annuity,
  },
  {
    label: "Automobile (FHA/VA)",
    key: OtherAssetTypes.Automobile,
  },
  {
    label: "Boat (FHA/VA)",
    key: OtherAssetTypes.Boat,
  },
  {
    label: "Borrower primary home (FHA/VA)",
    key: OtherAssetTypes.BorrowerPrimaryHome,
  },
  {
    label: "Bridge loan not deposited (FHA/VA)",
    key: OtherAssetTypes.BridgeLoanNotDeposited,
  },
  {
    label: "Cash on hand",
    key: OtherAssetTypes.CashOnHand,
  },
  {
    label: "Earnest money",
    key: OtherAssetTypes.EarnestMoney,
  },
  {
    label: "Lease purchase fund",
    key: OtherAssetTypes.LeasePurchaseFund,
  },
  {
    label: "Lot equity",
    key: OtherAssetTypes.LotEquity,
  },
  {
    label: "Net worth of business owned (FHA/VA)",
    key: OtherAssetTypes.NetWorthOfBusinessOwned,
  },
  {
    label: "Proceeds from secured loan",
    key: OtherAssetTypes.ProceedsFromSecuredLoan,
  },
  {
    label: "Proceeds from unsecured loan",
    key: OtherAssetTypes.ProceedsFromUnsecuredLoan,
  },
  {
    label: "Other",
    key: OtherAssetTypes.Other,
  },
  {
    label: "Recreational vehicle (FHA/VA)",
    key: OtherAssetTypes.RecreationalVehicle,
  },
  {
    label: "Relocation funds",
    key: OtherAssetTypes.RelocationFunds,
  },
  {
    label: "Savings bond (FHA/VA)",
    key: OtherAssetTypes.SavingsBond,
  },
  {
    label: "Severance package (FHA/VA)",
    key: OtherAssetTypes.SeverancePackage,
  },
  {
    label: "Sweat equity",
    key: OtherAssetTypes.SweatEquity,
  },
  {
    label: "Trade equity from property swap",
    key: OtherAssetTypes.TradeEquityFromPropertySwap,
  },
];

export enum INCOME_TYPE {
  "AccessoryUnitIncome" = "AccessoryUnitIncome",

  "Alimony" = "Alimony",

  "AutomobileAllowance" = "AutomobileAllowance",
  "BoarderIncome" = "BoarderIncome",

  "CapitalGains" = "CapitalGains",
  "ChildSupport" = "ChildSupport",
  "DefinedContributionPlan" = "DefinedContributionPlan",
  "Disability" = "Disability",

  "DividendsInterest" = "DividendsInterest",
  "EmploymentRelatedAccount" = "EmploymentRelatedAccount",
  "FosterCare" = "FosterCare",
  "HousingAllowance" = "HousingAllowance",

  "HousingChoiceVoucherProgram" = "HousingChoiceVoucherProgram",
  "MortgageCreditCertificate" = "MortgageCreditCertificate",
  "MortgageDifferential" = "MortgageDifferential",
  "NonBorrowerHouseholdIncome" = "NonBorrowerHouseholdIncome",

  "NotesReceivableInstallment" = "NotesReceivableInstallment",
  "Retirement" = "Retirement",
  "PublicAssistance" = "PublicAssistance",
  "Royalties" = "Royalties",

  "SeparateMaintenance" = "SeparateMaintenance",
  "SocialSecurity" = "SocialSecurity",
  "TemporaryLeave" = "TemporaryLeave",
  "TipIncome" = "TipIncome",

  "Trust" = "Trust",
  "Unemployment" = "Unemployment",
  "VABenefitsNonEducational" = "VABenefitsNonEducational",
  "Other" = "Other",
}

export const INCOME_TYPE_OPTIONS = [
  {
    label: "Accessory unit income",
    key: INCOME_TYPE.AccessoryUnitIncome,
  },
  {
    label: "Alimony",
    key: INCOME_TYPE.Alimony,
  },
  {
    label: "Automobile allowance",
    key: INCOME_TYPE.AutomobileAllowance,
  },
  {
    label: "Boarder income",
    key: INCOME_TYPE.BoarderIncome,
  },
  {
    label: "Capital gains",
    key: INCOME_TYPE.CapitalGains,
  },
  {
    label: "Child support",
    key: INCOME_TYPE.ChildSupport,
  },
  {
    label: "Defined contribution plan",
    key: INCOME_TYPE.DefinedContributionPlan,
  },
  {
    label: "Disability",
    key: INCOME_TYPE.Disability,
  },
  {
    label: "Dividends interest",
    key: INCOME_TYPE.DividendsInterest,
  },
  {
    label: "Employment related account",
    key: INCOME_TYPE.EmploymentRelatedAccount,
  },
  {
    label: "Foster care",
    key: INCOME_TYPE.FosterCare,
  },
  {
    label: "Housing allowance",
    key: INCOME_TYPE.HousingAllowance,
  },
  {
    label: "Housing choice voucher program",
    key: INCOME_TYPE.HousingChoiceVoucherProgram,
  },
  {
    label: "Mortgage credit certificate",
    key: INCOME_TYPE.MortgageCreditCertificate,
  },
  {
    label: "Mortgage differential",
    key: INCOME_TYPE.MortgageDifferential,
  },
  {
    label: "Non-borrower household income",
    key: INCOME_TYPE.NonBorrowerHouseholdIncome,
  },
  {
    label: "Notes receivable installment",
    key: INCOME_TYPE.NotesReceivableInstallment,
  },
  {
    label: "Retirement",
    key: INCOME_TYPE.Retirement,
  },
  {
    label: "Public assistance",
    key: INCOME_TYPE.PublicAssistance,
  },
  {
    label: "Royalties",
    key: INCOME_TYPE.Royalties,
  },
  {
    label: "Separate maintenance",
    key: INCOME_TYPE.SeparateMaintenance,
  },
  {
    label: "Social security",
    key: INCOME_TYPE.SocialSecurity,
  },
  {
    label: "Temporary leave",
    key: INCOME_TYPE.TemporaryLeave,
  },
  {
    label: "Tip income",
    key: INCOME_TYPE.TipIncome,
  },
  {
    label: "Trust",
    key: INCOME_TYPE.Trust,
  },
  {
    label: "Unemployment benefits",
    key: INCOME_TYPE.Unemployment,
  },
  {
    label: "VA compensation",
    key: INCOME_TYPE.VABenefitsNonEducational,
  },
  {
    label: "Other",
    key: INCOME_TYPE.Other,
  },
];

export enum PROPERTY_STATUS_TYPE {
  PROPERTY_IS_UP_FOR_SALE = "PROPERTY_IS_UP_FOR_SALE",
  RETAINED = "RETAINED",
  SOLD = "SOLD",
}

export const PROPERTY_STATUS_OPTIONS = [
  {
    label: "Property is up for sale",
    key: PROPERTY_STATUS_TYPE.PROPERTY_IS_UP_FOR_SALE,
  },
  {
    label: "Retained",
    key: PROPERTY_STATUS_TYPE.RETAINED,
  },
  {
    label: "Sold",
    key: PROPERTY_STATUS_TYPE.SOLD,
  },
];

export enum LIABILITY_TYPE {
  CHILDCARE = "Child Care",
  COLLECTIONS_JUDGMENTS_AND_LIENS = "Collections Judgments And Liens",
  HELOC = "HELOC",
  INSTALLMENT = "Installment",
  LEASE_PAYMENT = "Lease Payment",
  MORTGAGE = "Mortgage",
  OPEN_30_DAYS_CHARGE_ACCOUNT = "Open 30 Days Charge Account",
  OTHER_LIABILITY = "Other Liability",
  REVOLVING = "Revolving",
  TAXES = "Taxes",
  TAX_LIEN = "Tax Lien",
}

export const LIABILITY_OPTIONS = [
  { label: "Child Care", key: LIABILITY_TYPE.CHILDCARE },
  {
    label: "Collections, Judgments, and Liens",
    key: LIABILITY_TYPE.COLLECTIONS_JUDGMENTS_AND_LIENS,
  },
  { label: "HELOC", key: LIABILITY_TYPE.HELOC },
  { label: "Installment", key: LIABILITY_TYPE.INSTALLMENT },
  { label: "Lease Payment", key: LIABILITY_TYPE.LEASE_PAYMENT },
  { label: "Mortgage", key: LIABILITY_TYPE.MORTGAGE },
  {
    label: "Open 30 Days Charge Account",
    key: LIABILITY_TYPE.OPEN_30_DAYS_CHARGE_ACCOUNT,
  },
  { label: "Other Liability", key: LIABILITY_TYPE.OTHER_LIABILITY },
  { label: "Revolving", key: LIABILITY_TYPE.REVOLVING },
  { label: "Taxes", key: LIABILITY_TYPE.TAXES },
  { label: "Tax Lien", key: LIABILITY_TYPE.TAX_LIEN },
];

export enum EXPENSE_TYPE {
  ALIMONY = "Alimony",
  CHILD_SUPPORT = "Child Support",
  JOB_RELATED_EXPENSES = "Job Related Expenses",
  SEPARATE_MAINTENANCE_EXPENSE = "Separate Maintenance Expense",
  OTHER = "Other",
}

export const EXPENSE_TYPE_OPTIONS = [
  { label: "Alimony", key: EXPENSE_TYPE.ALIMONY },
  { label: "Child Support", key: EXPENSE_TYPE.CHILD_SUPPORT },
  { label: "Job Related Expenses", key: EXPENSE_TYPE.JOB_RELATED_EXPENSES },
  {
    label: "Separate Maintenance Expense",
    key: EXPENSE_TYPE.SEPARATE_MAINTENANCE_EXPENSE,
  },
  { label: "Other", key: EXPENSE_TYPE.OTHER },
];

// todo: DECLARATION change to other name
export enum LOAN_DECLARATION_OCCUPANCY_TYPE {
  InvestmentProperty = "InvestmentProperty",
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
}

export const LOAN_DECLARATION_OCCUPANCY_TYPE_OPTIONS = [
  {
    label: "Primary Residence",
    key: LOAN_DECLARATION_OCCUPANCY_TYPE.PrimaryResidence,
  },
  { label: "Second Home", key: LOAN_DECLARATION_OCCUPANCY_TYPE.SecondHome },
  {
    label: "Investment Property",
    key: LOAN_DECLARATION_OCCUPANCY_TYPE.InvestmentProperty,
  },
];

export enum PRIOR_PROPERTY_TITLE_TYPE {
  YOURSELF = "Sole",
  JOINTLY_WITH_SPOUSE = "JointWithSpouse",
  JOINTLY_WITH_ANOTHER = "JointWithOtherThanSpouse",
}

export const PRIOR_PROPERTY_TITLE_TYPE_OPTIONS = [
  { label: "Yourself", key: PRIOR_PROPERTY_TITLE_TYPE.YOURSELF },
  {
    label: "Jointly with spouse",
    key: PRIOR_PROPERTY_TITLE_TYPE.JOINTLY_WITH_SPOUSE,
  },
  {
    label: "Jointly with another person",
    key: PRIOR_PROPERTY_TITLE_TYPE.JOINTLY_WITH_ANOTHER,
  },
];

export enum BANKRUPTCY_TYPE {
  Chapter7 = "Chapter7",
  Chapter11 = "Chapter11",
  Chapter12 = "Chapter12",
  Chapter13 = "Chapter13",
}

export const BANKRUPTCY_TYPE_OPTIONS = [
  { label: "Chapter 7", key: BANKRUPTCY_TYPE.Chapter7 },
  { label: "Chapter 11", key: BANKRUPTCY_TYPE.Chapter11 },
  { label: "Chapter 12", key: BANKRUPTCY_TYPE.Chapter12 },
  { label: "Chapter 13", key: BANKRUPTCY_TYPE.Chapter13 },
];

export enum INTENDED_OCCUPANCY_TYPE {
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
  InvestmentProperty = "InvestmentProperty",
  // FHASecondaryResidence = "FHASecondaryResidence",
}

export const INTENDED_OCCUPANCY_TYPE_OPTIONS = [
  { label: "Primary Residence", key: INTENDED_OCCUPANCY_TYPE.PrimaryResidence },
  { label: "Second Home", key: INTENDED_OCCUPANCY_TYPE.SecondHome },
  {
    label: "Investment Property",
    key: INTENDED_OCCUPANCY_TYPE.InvestmentProperty,
  },
  // {
  //   label: "FHA Secondary Residence",
  //   key: INTENDED_OCCUPANCY_TYPE.FHASecondaryResidence,
  // },
];

export enum CURRENT_OCCUPANCY_TYPE {
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
  InvestmentProperty = "Investment",
}

export const CURRENT_OCCUPANCY_TYPE_OPTIONS = [
  {
    label: "Primary residence",
    key: CURRENT_OCCUPANCY_TYPE.PrimaryResidence,
  },
  {
    label: "Second home",
    key: CURRENT_OCCUPANCY_TYPE.SecondHome,
  },
  {
    label: "Investment property",
    key: CURRENT_OCCUPANCY_TYPE.InvestmentProperty,
  },
];

export enum LOAN_GENERAL_INFO_ACCOUNT_TYPE {
  HELOC = "HELOC",
  Mortgage = "Mortgage",
}

export const OTHER_MORTGAGE_LOANS_ACCOUNT_TYPE_OPTIONS = [
  { label: "HELOC", key: LOAN_GENERAL_INFO_ACCOUNT_TYPE.HELOC },
  { label: "Mortgage", key: LOAN_GENERAL_INFO_ACCOUNT_TYPE.Mortgage },
];

export enum LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE {
  CommunityNonprofit = "CommunityNonprofit",
  Employer = "Employer",
  Institutional = "Institutional",
  FederalAgency = "FederalAgency",
  Lender = "Lender",
  LocalAgency = "LocalAgency",
  NonParentRelative = "NonParentRelative",
  NonProfitInstrumentalityOfGovernment = "NonProfitInstrumentalityOfGovernment",
  Parent = "Parent",
  PropertySeller = "PropertySeller",
  Relative = "Relative",
  ReligiousNonprofit = "ReligiousNonprofit",
  StateAgency = "StateAgency",
  UnmarriedPartner = "UnmarriedPartner",
  UnrelatedFriend = "UnrelatedFriend",
  Other = "Other",
}

export const OTHER_MORTGAGE_LOANS_SOURCE_OF_FUNDS_OPTIONS = [
  {
    label: "Community Nonprofit (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.CommunityNonprofit,
  },
  {
    label: "Employer (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Employer,
  },
  {
    label: "Federal Agency (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.FederalAgency,
  },
  {
    label: "Institutional (FNMA Retired)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Institutional,
  },
  {
    label: "Lender (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Lender,
  },
  {
    label: "Local Agency (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.LocalAgency,
  },
  {
    label: "Non Parent Relative (FNMA Retired)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.NonParentRelative,
  },
  {
    label: "Non Profit Instrumentality Of Government (FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.NonProfitInstrumentalityOfGovernment,
  },
  {
    label: "Other (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Other,
  },
  {
    label: "Parent (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Parent,
  },
  {
    label: "Property Seller (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.PropertySeller,
  },
  {
    label: "Relative (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.Relative,
  },
  {
    label: "Religious Nonprofit (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.ReligiousNonprofit,
  },
  {
    label: "State Agency (FNMA/FRE)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.StateAgency,
  },
  {
    label: "Unmarried Partner (FNMA)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.UnmarriedPartner,
  },
  {
    label: "Unrelated Friend (FNMA)",
    key: LOAN_GENERAL_INFO_FUNDS_SOURCE_TYPE.UnrelatedFriend,
  },
];

export enum LOAN_GIFT_GRANT_TYPE {
  GIFT_OF_CASH = "GiftOfCash",
  GIFT_OF_EQUITY = "GiftOfPropertyEquity",
  GRANT = "GRANT",
}

export const GIFT_AND_GRANTS_TYPE_OPTIONS = [
  { label: "Gift of cash", key: LOAN_GIFT_GRANT_TYPE.GIFT_OF_CASH },
  { label: "Gift of equity", key: LOAN_GIFT_GRANT_TYPE.GIFT_OF_EQUITY },
  { label: "Grant", key: LOAN_GIFT_GRANT_TYPE.GRANT },
];

export enum LOAN_GIFT_GRANT_SOURCE_TYPE {
  BORROWER = "Borrower",
  COMMUNITY_NONPROFIT = "CommunityNonprofit",
  EMPLOYER = "Employer",
  FEDERAL_AGENCY = "FederalAgency",
  INSTITUTIONAL = "Institutional",
  LENDER = "Lender",
  LOCAL_AGENCY = "LocalAgency",
  NON_ORIGINATING_LENDER = "NonOriginatingLender",
  NON_PARENT_RELATIVE = "NonParentRelative",
  OTHER = "Other",
  PARENT = "Parent",
  PROPERTY_SELLER = "PropertySeller",
  RELATIVE = "Relative",
  RELIGIOUS_NONPROFIT = "ReligiousNonprofit",
  STATE_AGENCY = "StateAgency",
  UNMARRIED_PARTNER = "UnmarriedPartner",
  UNRELATED_FRIEND = "UnrelatedFriend",
}

export const GIFT_AND_GRANTS_SOURCE_OF_FUNDS_OPTIONS = [
  { label: "Borrower (FRE)", key: LOAN_GIFT_GRANT_SOURCE_TYPE.BORROWER },
  {
    label: "Community Nonprofit (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.COMMUNITY_NONPROFIT,
  },
  {
    label: "Employer (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.EMPLOYER,
  },
  {
    label: "Federal Agency (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.FEDERAL_AGENCY,
  },
  {
    label: "Institutional (FNMA Retired)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.INSTITUTIONAL,
  },
  {
    label: "Lender (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.LENDER,
  },
  {
    label: "Local Agency (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.LOCAL_AGENCY,
  },
  {
    label: "Non Parent Relative (FNMA Retired)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.NON_PARENT_RELATIVE,
  },
  {
    label: "Other (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.OTHER,
  },
  {
    label: "Parent (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.PARENT,
  },
  {
    label: "Property Seller (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.PROPERTY_SELLER,
  },
  {
    label: "Relative (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.RELATIVE,
  },
  {
    label: "Religious Nonprofit (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.RELIGIOUS_NONPROFIT,
  },
  {
    label: "State Agency (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.STATE_AGENCY,
  },
  {
    label: "Unmarried Partner (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.UNMARRIED_PARTNER,
  },
  {
    label: "Unrelated Friend (FNMA/FRE)",
    key: LOAN_GIFT_GRANT_SOURCE_TYPE.UNRELATED_FRIEND,
  },
];

export enum LOAN_GENERAL_INFO_LIEN_TYPE {
  LIEN_TYPE_1 = 1,
  LIEN_TYPE_2 = 2,
  LIEN_TYPE_3 = 3,
  LIEN_TYPE_4 = 4,
  LIEN_TYPE_5 = 5,
  LIEN_TYPE_6 = 6,
  LIEN_TYPE_7 = 7,
  LIEN_TYPE_8 = 8,
  LIEN_TYPE_9 = 9,
  LIEN_TYPE_10 = 10,
}

export const LOAN_GENERAL_INFO_LIEN_TYPE_OPTIONS = [
  { label: "1", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_1 },
  { label: "2", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_2 },
  { label: "3", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_3 },
  { label: "4", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_4 },
  { label: "5", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_5 },
  { label: "6", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_6 },
  { label: "7", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_7 },
  { label: "8", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_8 },
  { label: "9", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_9 },
  { label: "10", key: LOAN_GENERAL_INFO_LIEN_TYPE.LIEN_TYPE_10 },
];

export enum LOAN_TRANSACTION_DETAIL_CREDIT_TYPE {
  LENDER_CREDIT = "LENDER_CREDIT",
  CASH_DEPOSIT_ON_SALES_CONTRACT = "CASH_DEPOSIT_ON_SALES_CONTRACT",
  RELOCATION_FUNDS = "RELOCATION_FUNDS",
  EMPLOYER_ASSISTED_HOUSING = "EMPLOYER_ASSISTED_HOUSING",
  LEASE_PURCHASE_FUND = "LEASE_PURCHASE_FUND",
  BORROWER_PAID_FEES = "BORROWER_PAID_FEES",
  SWEAT_EQUITY = "SWEAT_EQUITY",
  TRADE_EQUITY = "TRADE_EQUITY",
  EMPLOYER_ASSISTANCE = "EMPLOYER_ASSISTANCE",
  RENT_CREDIT = "RENT_CREDIT",
  LOT_EQUITY = "LOT_EQUITY",
  TITLE_INSURANCE_PREMIUM_ADJUSTMENT = "TITLE_INSURANCE_PREMIUM_ADJUSTMENT",
  OTHER = "OTHER",
}

export const LOAN_TRANSACTION_DETAIL_CREDIT_TYPE_OPTIONS = [
  {
    label: "Lender credit",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.LENDER_CREDIT,
  },
  {
    label: "Cash deposit on sales contract",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.CASH_DEPOSIT_ON_SALES_CONTRACT,
  },
  {
    label: "Relocation funds",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.RELOCATION_FUNDS,
  },
  {
    label: "Employer assisted housing",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.EMPLOYER_ASSISTED_HOUSING,
  },
  {
    label: "Lease purchase fund",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.LEASE_PURCHASE_FUND,
  },
  {
    label: "Borrower paid fees",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.BORROWER_PAID_FEES,
  },
  {
    label: "Sweat equity",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.SWEAT_EQUITY,
  },
  {
    label: "Trade equity",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.TRADE_EQUITY,
  },
  {
    label: "Employer assistance",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.EMPLOYER_ASSISTANCE,
  },
  {
    label: "Rent credit",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.RENT_CREDIT,
  },
  {
    label: "Lot equity",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.LOT_EQUITY,
  },
  {
    label: "Title insurance premium adjustment",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.TITLE_INSURANCE_PREMIUM_ADJUSTMENT,
  },
  {
    label: "Other",
    key: LOAN_TRANSACTION_DETAIL_CREDIT_TYPE.OTHER,
  },
];

export enum DOCUMENT_TYPE {
  FORM_4506_T = "4506-T",
  APPRAISAL = "APPRAISAL",
  ACH_PAYMENT = "ACH_PAYMENT",
  BANK_STATEMENTS = "BANK_STATEMENTS",
  BANKRUPTCY_PAPERWORK = "BANKRUPTCY_PAPERWORK",
  BPO = "BPO",
  CLOSING_DISCLOSURES = "CLOSING_DISCLOSURES",
  CREDIT_REPORT = "CREDIT_REPORT",
  DEPOSIT = "DEPOSIT",
  E_DISCLOSURE_CONSENT = "E-DISCLOSURE_CONSENT",
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
  SCHEDULE_K1 = "SCHEDULE_K-1",
  TAX_RETURNS = "TAX_RETURNS",
  TITLE_POLICY = "TITLE_POLICY",
  W2 = "W2",
  PROVIDE_CONSENTS = "PROVIDE_CONSENTS",
}

export const DOCUMENT_TYPE_OPTIONS = [
  { label: "4506-T", key: DOCUMENT_TYPE.FORM_4506_T },
  { label: "Appraisal", key: DOCUMENT_TYPE.APPRAISAL },
  { label: "ACH payment", key: DOCUMENT_TYPE.ACH_PAYMENT },
  { label: "Bank statements", key: DOCUMENT_TYPE.BANK_STATEMENTS },
  { label: "Bankruptcy Paperwork", key: DOCUMENT_TYPE.BANKRUPTCY_PAPERWORK },
  { label: "BPO", key: DOCUMENT_TYPE.BPO },
  { label: "Closing disclosures", key: DOCUMENT_TYPE.CLOSING_DISCLOSURES },
  { label: "Credit report", key: DOCUMENT_TYPE.CREDIT_REPORT },
  { label: "Deposit", key: DOCUMENT_TYPE.DEPOSIT },
  { label: "E-disclosure consent", key: DOCUMENT_TYPE.E_DISCLOSURE_CONSENT },
  { label: "Flood cert", key: DOCUMENT_TYPE.FLOOD_CERT },
  { label: "Hazard insurance", key: DOCUMENT_TYPE.HAZARD_INSURANCE },
  { label: "Identification", key: DOCUMENT_TYPE.IDENTIFICATION },
  { label: "Income", key: DOCUMENT_TYPE.INCOME },
  { label: "Letter of explanation", key: DOCUMENT_TYPE.LETTER_OF_EXPLANATION },
  { label: "Liability", key: DOCUMENT_TYPE.LIABILITY },
  { label: "Misc", key: DOCUMENT_TYPE.MISC },
  { label: "Misc assets", key: DOCUMENT_TYPE.MISC_ASSETS },
  { label: "Misc income", key: DOCUMENT_TYPE.MISC_INCOME },
  { label: "Mortgage statements", key: DOCUMENT_TYPE.MORTGAGE_STATEMENTS },
  { label: "Pay stubs", key: DOCUMENT_TYPE.PAY_STUBS },
  { label: "Profit and Loss", key: DOCUMENT_TYPE.PROFIT_AND_LOSS },
  { label: "Property address", key: DOCUMENT_TYPE.PROPERTY_ADDRESS },
  { label: "Purchase agreement", key: DOCUMENT_TYPE.PURCHASE_AGREEMENT },
  { label: "Schedule K-1", key: DOCUMENT_TYPE.SCHEDULE_K1 },
  { label: "Tax Returns", key: DOCUMENT_TYPE.TAX_RETURNS },
  { label: "Title Policy", key: DOCUMENT_TYPE.TITLE_POLICY },
  { label: "W2", key: DOCUMENT_TYPE.W2 },
  { label: "Provide consents", key: DOCUMENT_TYPE.PROVIDE_CONSENTS },
];

export enum LOAN_STAGE {
  PTF = "PTF",
  PTD = "PTD",
}

export const LOAN_STAGE_OPTIONS = [
  { label: LOAN_STAGE.PTF, key: LOAN_STAGE.PTF },
  { label: LOAN_STAGE.PTD, key: LOAN_STAGE.PTD },
];

export enum DemographicInformationEnum {
  FaceToFace = "FaceToFace",
  Telephone = "Telephone",
  Mail = "Mail",
  Internet = "Internet",
}

export const DemographicInformationOptions = [
  {
    label: "Face-to-Face Interview",
    value: DemographicInformationEnum.FaceToFace,
  },
  { label: "Telephone Interview", value: DemographicInformationEnum.Telephone },
  { label: "Fax or Mail", value: DemographicInformationEnum.Mail },
  { label: "Email or Internet", value: DemographicInformationEnum.Internet },
];

export enum LOAN_DOC_CONDITION_STATUS {
  WAITING_FOR_UPLOADING = "WAITING_FOR_UPLOADING",
  WAITING_FOR_APPROVAL = "WAITING_FOR_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REMOVED = "REMOVED",
}

export const LOAN_DOC_CONDITION_STATUS_OPTIONS = [
  {
    label: "Waiting for uploading",
    key: LOAN_DOC_CONDITION_STATUS.WAITING_FOR_UPLOADING,
  },
  {
    label: "Waiting for approval",
    key: LOAN_DOC_CONDITION_STATUS.WAITING_FOR_APPROVAL,
  },
  { label: "Approved docs", key: LOAN_DOC_CONDITION_STATUS.APPROVED },
  { label: "Rejected docs", key: LOAN_DOC_CONDITION_STATUS.REJECTED },
  { label: "Removed", key: LOAN_DOC_CONDITION_STATUS.REMOVED },
];

export enum LOAN_PURPOSE_ORIGINAL {
  Purchase = "Purchase",
  Refinance = "Refinance",
  HELOC = "HELOC",
  Second_Loan = "Second_Loan",
}
