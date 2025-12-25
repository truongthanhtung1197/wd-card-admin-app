import { TimeStamp } from "./Common.model";

export interface Account extends TimeStamp {
  id?: string;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  email?: string;
  avatarUrl?: string | null;
  primaryPhone?: string;
  secondPhone?: string | null;
  receiveOtpPhone?: string | null;
  mobileType?: string;
  enable2FA?: boolean;
  method2FA?: string | null;
  isAccountActived?: boolean;
  isEmailVerified?: boolean;
  isPrimaryPhoneVerified?: boolean;
  isSecondPhoneVerified?: boolean;
  isQuestionVerified?: boolean;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  company?: string | null;
  questionAnswers?: any[];
  associatedAgents?: any[];
}
