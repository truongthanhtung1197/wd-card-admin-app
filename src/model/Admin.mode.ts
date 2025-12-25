import { ADMIN_ROLE } from "@/constant/admin.constant";

import { TimeStamp } from "./Common.model";

export interface Admin extends TimeStamp {
  id?: number;
  email?: string;
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

export interface AdminResponse {
  data: Admin;
}

export interface Role {
  id?: number;
  roleName?: ADMIN_ROLE;
}

export interface CreateAdmin extends Admin {
  password?: string;
  fileId?: string;
}
