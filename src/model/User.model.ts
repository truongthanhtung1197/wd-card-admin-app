import { USER_STATUS_ENUM } from "@/constant";
import { PermissionEnum } from "@/constant/Permission.constant";

import { AgentCmsCommon } from "./AgentCms.model";
import { GetListResponse, TimeStamp } from "./Common.model";
import { Role } from "./Role.model";

export interface User extends TimeStamp {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userCode?: string;
  username?: string;
  position?: string;
  zipcode?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  imagePath?: string;
  status?: USER_STATUS_ENUM;
  roleId?: string;
  resetPasswordDefault?: boolean;
  updatedBy?: string;
  role?: UserRole;
  userCmsCommon?: AgentCmsCommon;
  userRoles?: {
    roleId?: string;
    userId?: string;
    role?: Role;
  }[];
  rolePermission?: RolePermission | null;
  teamMembers?: TeamMember[];
  fileId?: string;
  fileRelations?: any;
  displayName?: string;
}

export interface User69vn extends TimeStamp {
  username?: string;
  id?: string;
  email?: string;
  password?: string;
  role?: Role;
  roleId?: number;
  telegramUsername?: string;
  phone?: string;
  bankNameInCard?: string;
  bankNumber?: string;
  bankName?: string;
  usdt?: string;
  fileId?: string;
  displayName?: string;
}

export interface Player extends TimeStamp {
  parent: string; // parent (user_username)

  username: string;

  joinTime: Date;

  state: number;

  stateDisplay: string;

  user: User;
}

export interface TeamMember {
  id: string;
  role: string;
  userId: string;
  teamId: string;
}

export type RolePermission = {
  [key: string]: PermissionEnum;
};

export interface UserRole {
  roleName: string;
  status: string;
  description: string;
}

export interface UserRoleResponse extends GetListResponse<UserRole> {}

export interface EditUserRequestBody {
  username: string;
  password: string;
}
