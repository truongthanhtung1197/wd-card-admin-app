import { USER_STATUS_ENUM } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";

import { USER_ROLES } from "@/constant/User.constant";
import { TimeStamp } from "./Common.model";

export interface Admin extends TimeStamp {
  // wd
  id?: number;
  email?: string;
  status?: USER_STATUS_ENUM;
  userRoles?: UserRole[];

  // old
  username?: string;
  role?: Role;
  roleId?: any;
  createdAt?: string;
  telegramUsername?: string;
  phone?: string;
  bankName?: string;
  bankNumber?: string;
  bankNameInCard?: string;
  file?: any;
  fileRelations?: any;
  displayName?: string;
  usdt?: string;
  avgRating?: number;
  telegramId?: string;
  telegramThreadId?: string;
}

export interface UserRole {
  // wd
  user_id: string;
  role_id: string;
  role: Role;
  user: Admin;
}
export interface AdminResponse {
  data: Admin;
}

export interface Role {
  // wd
  id?: number;
  roleName?: ADMIN_ROLE;
}

export interface CreateAdmin extends Admin {
  password?: string;
  email?: string;
  roles?: USER_ROLES[];
}
