import { CMS_TEMPLATE, CMS_THEME } from "@/constant/cms.constant";

export interface AgentCmsCommon {
  updatedBy: string;
  profileImagePath: string;
  id: string;
  userId: string;
  certificate: string;
  numberOfClosedLoan: 0;
  // loanFundedIn: string;
  averageLoanAmount: 0;
  loanVolume: 0;
  totalLoanFunded: 0;
  aboutMe: string;
  applyFor: string;
  whyChooseUs: string;
  additionalInformation: "string";
  hideAchievement: false;
  flagCalendly: false;
  calendly: string;
  flagSaleforce: false;
  salesforce: string;
  sourceReview: string;
  flagMLS: false;
  mls: string;
  besmartee: string;
  userCustomSiteCms: UserCustomSiteCms;
  userOnPacificCms: UserOnPacificCms;
}

export interface UserCustomSiteCms {
  updatedBy: string;
  id: string;
  userCmsCommonId: string;
  bio: string;
  website: string;
  heroImagePath: string;
  logoPath: string;
  theme: CMS_THEME;
  template: CMS_TEMPLATE;
  modulePermission: string;
  isEnableWebsite: boolean;
  isPublished: false;
}

export interface UserOnPacificCms {
  updatedBy: string;
  id: string;
  agentCmsCommonId: string;
  headerBannerPath: string;
  isEnableWebsite: boolean;
  isPublished: false;
}
