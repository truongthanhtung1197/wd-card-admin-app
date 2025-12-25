import { USER_STATUS_ENUM } from "@/constant";
import { EmailProvider } from "@/constant/Email.constant";
import { Role, TeamRole, TeamRolePermission, User } from "@/model";
import { Admin } from "@/model/Admin.mode";

export interface ApiError {
  statusCode: number;
  message: string;
  errorName: string;
  details: string;
  path: string;
  requestId: string;
  timestamp: string;
  //
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T | { error: ApiError };
  error?: ApiError;
}

export interface LoginResponse {
  data: {
    id: number;
    email: string;
    username: string;
    role: Role;
    roleId: number;
  };
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetKey: string;
  newPassword: string;
}

export interface ValidateLoginOTPRequest {
  otpCode: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface resendOTPRequest {
  email: string;
}

export interface ValidateLoginOTPResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    admin: Admin;
  };
}

export interface RefreshTokenResponse {
  data: {
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
  };
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  imagePath?: string;
  phone?: string;
  status?: USER_STATUS_ENUM;
}

export interface GetUsersResponse {
  data: User[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetTeamsResponse {
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetAllTeamsResponse {}

export interface GetMyTeamPermissionsResponse {
  permissions: TeamRolePermission;
}

export interface GetLeadParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
  search?: string;
  status?: string[];
  tags?: string[];
  leadOwnerType?: string[];
  sort?: string;
  order?: string;
  isLast7Days?: boolean;
  isUnAssigned?: boolean;
}

export interface SendEmailResponse {
  message: string;
  success: boolean;
}

export interface DeleteEmailRequestIds {
  ids: string[];
  teamId?: string;
}

export interface SendEmailRequest {
  isIncludeSignature: boolean;
  leadId: string;
  subject: string;
  body: string;
  scheduledTime?: string | undefined | null;
  parentId?: string;
  attachments?: any;
  toEmails: Array<{ id?: string; email: string }>;
  ccEmails: Array<{ id?: string; email: string }>;
  bccEmails: Array<{ id?: string; email: string }>;
  teamId?: string;
}

export interface SearchEmailRequest {
  email?: string;
}
export interface Email {
  id: string;
  value: string;
  label: string;
}

export interface SearchEmailResponse {
  emails?: Email[];
  message: string;
  success: string;
}

export interface SendEmailDraftRequest {
  id: string;
  isIncludeSignature: boolean;
  leadId: string;
  subject: string;
  content: string;
  recipientsCc?: string;
  recipientsBcc?: string;
  emails?: string;
  teamId?: string;
}

export interface SendIntegrateEmail {
  email?: string;
  emailProvider: string;
  code?: string | null;
  codeVerifier?: string | null;
}

export interface EmailSignature {
  id: string;
  signature: string;
  userId: string;
}

export interface EmailIntegration {
  id: string;
  email: string;
  emailProvider: EmailProvider;
  isActive: boolean;
}

export interface SmsConnector {
  id: string;
  email: string;
  userId: string;
  status: string;
  platform: string;
  isConnected: boolean;
  error?: any;
}

export interface UpdateEmailSignatureRequest {
  signature: string;
}

export interface UpdateEmailConnectorRequest {
  id: string;
  userId: string;
  status: string;
  platform: string;
  accessToken?: string;
}

export interface SmsHistoryParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  leadId: string;
}

export interface SmsHistoryResponse {
  id: string;
  leadId: string;
  leadPhone: string;
  agentId: string;
  agentPhone: string;
  content: string;

  sentTime: string;
  receivedTime: string;
  createdAt: string;
  updatedAt: string;
  smsAttachments: any[];
  errorMessage?: string;
}

export type RecipientItem = {
  id: string;
  fullName: string;
  email: string;
  type: "primary" | "secondary";
};
export interface SearchRecipientResponse {
  leads: RecipientItem[];
}

export type GetEmailParticipantsParams = {
  leadId: string;
  emailHistoryId: string;
  teamId?: string;
};

export interface GetUserRolesResponse {
  data: Role[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetAgentTeamRolesResponse {
  data: TeamRole[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetAssignableUsersParams {
  limit?: number;
  page?: number;
  search?: string;
  leadId?: string;
  teamId?: string;
}
export interface DoasboardDataResponse {
  totalNewLead: number;
  totalEmailSent: number;
  totalSmsSent: number;
}
