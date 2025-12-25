import Text from "@/app/_components/common/Text";
import DoubleArrowUp from "@/app/_components/icons/DoubleArrowUp";
import HightIcon from "@/app/_components/icons/HightIcon";
import LowestIcon from "@/app/_components/icons/LowestIcon";
import LowIcon from "@/app/_components/icons/LowIcon";
import MediumIcon from "@/app/_components/icons/MediumIcon";

export enum ACTIVITY_STATUS {
  send_me_tip = "send_me_tip",
  contact_us = "contact_us",
  fill_pre_qualification = "fill_pre_qualification",
  chatbot = "chatbot",
  fill_form_calendly = "fill_form_calendly",
  tracking_rate = "tracking_rate",
  shared_rate = "shared_rate",
  signed_up = "signed_up",
  add_review = "add_review",
  use_tool_home_buying_power = "use_tool_home_buying_power",
  give_rates = "give_rates",
  search_rate = "search_rate", // search multiple rate
  share_rate_special_rate = "share_rate_special_rate", // share 1 rate
}

export const ACTIVITY_STATUS_OPTIONS = [
  {
    label: 'Requested "Send me tips"',
    key: ACTIVITY_STATUS.send_me_tip,
  },
  {
    label: "Filled the contact us form",
    key: ACTIVITY_STATUS.contact_us,
  },
  {
    label: "Filled the contact us form in chatbot",
    key: ACTIVITY_STATUS.chatbot,
  },
  {
    label: "Filled the pre-qualifcation form",
    key: ACTIVITY_STATUS.fill_pre_qualification,
  },
  {
    label: "Set a schedule by Calendly",
    key: ACTIVITY_STATUS.fill_form_calendly,
  },
  {
    label: "Shared a rate",
    key: ACTIVITY_STATUS.shared_rate,
  },
  {
    label: "Set rate tracking",
    key: ACTIVITY_STATUS.tracking_rate,
  },
  {
    label: "Signed up",
    key: ACTIVITY_STATUS.signed_up,
  },
  {
    label: "Shared home buying power",
    key: ACTIVITY_STATUS.use_tool_home_buying_power,
  },
  {
    label: "Submitted a review form",
    key: ACTIVITY_STATUS.add_review,
  },
  {
    label: "Was given rates",
    key: ACTIVITY_STATUS.give_rates,
  },
];

export enum LOAN_TERM {
  ThirtyYear = "ThirtyYear",
  TwentyFiveYear = "TwentyFiveYear",
  TwentyYear = "TwentyYear",
  FifteenYear = "FifteenYear",
  TenYear = "TenYear",
  SevenYear = "SevenYear",

  FiveYear = "FiveYear",
  FourYear = "FourYear",
  TwoYear = "TwoYear",
  ThreeMonth = "ThreeMonth",
  SixMonth = "SixMonth",
  NineMonth = "NineMonth",

  ThreeYear = "ThreeYear",
  NineYear = "NineYear",
  EightYear = "EightYear",
  SixYear = "SixYear",
  OneYear = "OneYear",
  TwelveYear = "TwelveYear",
  NonStandardTerm = "NonStandardTerm",
  TenYear_6_ARM = "TenYear_6_ARM",
  SevenYear_6_ARM = "SevenYear_6_ARM",
  FiveYear_6_ARM = "FiveYear_6_ARM",
}

export const LOAN_TERM_OPTIONS = [
  {
    label: "30-Year Fixed",
    key: LOAN_TERM.ThirtyYear,
  },
  {
    label: "25-Year Fixed",
    key: LOAN_TERM.TwentyFiveYear,
  },
  {
    label: "20-Year Fixed",
    key: LOAN_TERM.TwentyYear,
  },
  {
    label: "15-Year Fixed",
    key: LOAN_TERM.FifteenYear,
  },
  {
    label: "5-Year Fixed",
    key: LOAN_TERM.FiveYear,
  },
  {
    label: "5/6 ARM",
    key: LOAN_TERM.FiveYear_6_ARM,
  },
  {
    label: "10/6 ARM",
    key: LOAN_TERM.TenYear_6_ARM,
  },
  {
    label: "7/6 ARM",
    key: LOAN_TERM.SevenYear_6_ARM,
  },
  {
    label: "10-Yr Fixed",
    key: LOAN_TERM.TenYear,
  },
  {
    label: "5-Yr Fixed",
    key: LOAN_TERM.FiveYear,
  },
  {
    label: "3-Mon Fixed",
    key: LOAN_TERM.ThreeMonth,
  },
  {
    label: "6-Mon Fixed",
    key: LOAN_TERM.SixMonth,
  },
  {
    label: "9-Mon Fixed",
    key: LOAN_TERM.NineMonth,
  },
];

export enum OCCUPANCY_TYPE {
  InvestmentProperty = "InvestmentProperty",
  PrimaryResidence = "PrimaryResidence",
  SecondHome = "SecondHome",
}
export const OCCUPANCY_TYPE_OPTIONS = [
  {
    label: "Investment Property",
    key: OCCUPANCY_TYPE.InvestmentProperty,
  },
  {
    label: "Primary Residence",
    key: OCCUPANCY_TYPE.PrimaryResidence,
  },
  {
    label: "Second Home",
    key: OCCUPANCY_TYPE.SecondHome,
  },
];

export enum PROPERTY_TYPE {
  SingleFamily = "SingleFamily",
  Condo = "Condo",
  ManufacturedDoubleWide = "ManufacturedDoubleWide",
  Condotel = "Condotel",
  Modular = "Modular",
  PUD = "PUD",
  Timesharer = "Timesharer",
  ManufacturedSingleWide = "ManufacturedSingleWide",
  Coop = "Coop",
  NonWarrantableCondo = "NonWarrantableCondo",
  Townhouse = "Townhouse",
  DetachedCondo = "DetachedCondo",
}

export const PROPERTY_TYPE_OPTIONS = [
  {
    label: "Single Family",
    key: PROPERTY_TYPE.SingleFamily,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Condominium",
    key: PROPERTY_TYPE.Condo,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Manufactured Double Wide",
    key: PROPERTY_TYPE.ManufacturedDoubleWide,
    unitName: 2,
    unitValue: "TwoUnits",
  },
  {
    label: "Condotel",
    key: PROPERTY_TYPE.Condotel,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Modular",
    key: PROPERTY_TYPE.Modular,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "PUD",
    key: PROPERTY_TYPE.PUD,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Timesharer",
    key: PROPERTY_TYPE.Timesharer,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Manufactured Single Wide",
    key: PROPERTY_TYPE.ManufacturedSingleWide,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Coop",
    key: PROPERTY_TYPE.Coop,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Non Warrantable Condo",
    key: PROPERTY_TYPE.NonWarrantableCondo,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Townhouse",
    key: PROPERTY_TYPE.Townhouse,
    unitName: 1,
    unitValue: "OneUnit",
  },
  {
    label: "Detached Condo",
    key: PROPERTY_TYPE.DetachedCondo,
    unitName: 1,
    unitValue: "OneUnit",
  },
];

export enum AGENT_REVIEW_STATUS {
  PUBLISH = "PUBLISH",
  HIDE = "HIDE",
  PENDING = "PENDING",
}

export enum TASK_STATUS {
  NEW = "NEW",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  SKIP = "SKIP",
}

export const TASK_STATUS_OPTIONS = [
  {
    label: "New",
    key: TASK_STATUS.NEW,
  },
  {
    label: "In Progress",
    key: TASK_STATUS.IN_PROGRESS,
  },
  {
    label: "Pending",
    key: TASK_STATUS.PENDING,
  },
  {
    label: "Completed",
    key: TASK_STATUS.COMPLETED,
  },
];

export enum TASK_PRIORITY {
  HIGHEST = "HIGHEST",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  LOWEST = "LOWEST",
}

export const TASK_PRIORITY_OPTIONS = [
  {
    label: "Highest",
    key: TASK_PRIORITY.HIGHEST,
    icon: (
      <div className="center mt-1 w-4">
        <DoubleArrowUp />
      </div>
    ),
  },
  {
    label: "High",
    key: TASK_PRIORITY.HIGH,
    icon: (
      <div className="center mt-1 w-4">
        <HightIcon />
      </div>
    ),
  },
  {
    label: "Medium",
    key: TASK_PRIORITY.MEDIUM,
    icon: (
      <div className="center mt-1 w-4">
        <MediumIcon />
      </div>
    ),
  },
  {
    label: "Low",
    key: TASK_PRIORITY.LOW,
    icon: (
      <div className="center mt-1 w-4">
        <LowIcon />
      </div>
    ),
  },
  {
    label: "Lowest",
    key: TASK_PRIORITY.LOWEST,
    icon: (
      <div className="center mt-1 w-4">
        <LowestIcon />
      </div>
    ),
  },
];

export const TASK_PRIORITY_OPTIONS_2 = [
  {
    label: (
      <div className="row gap-2">
        <div className="center w-4">
          <DoubleArrowUp />
        </div>
        <Text variant="body2-regular">Highest</Text>
      </div>
    ),
    key: TASK_PRIORITY.HIGHEST,
  },
  {
    label: (
      <div className="row gap-2">
        <div className="center w-4">
          <HightIcon />
        </div>
        <Text variant="body2-regular">High</Text>
      </div>
    ),
    key: TASK_PRIORITY.HIGH,
  },
  {
    label: (
      <div className="row gap-2">
        <div className="center w-4">
          <MediumIcon />
        </div>
        <Text variant="body2-regular">Medium</Text>
      </div>
    ),
    key: TASK_PRIORITY.MEDIUM,
  },
  {
    label: (
      <div className="row gap-2">
        <div className="center w-4">
          <LowIcon />
        </div>
        <Text variant="body2-regular">Low</Text>
      </div>
    ),
    key: TASK_PRIORITY.LOW,
  },
  {
    label: (
      <div className="row gap-2">
        <div className="center w-4">
          <LowestIcon />
        </div>
        <Text variant="body2-regular">Lowest</Text>
      </div>
    ),
    key: TASK_PRIORITY.LOWEST,
  },
];
