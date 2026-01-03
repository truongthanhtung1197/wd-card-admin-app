import { USER_STATUS_ENUM } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { Role, User } from "@/model";
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
    roles: ADMIN_ROLE[];
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
