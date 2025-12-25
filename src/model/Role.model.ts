import { TeamModulePermission } from "@/constant/Permission.constant";

import { GetListResponse } from "./Common.model";
import { PermissionModule } from "./Permission.model";

import { capitalize } from "lodash";

export enum RoleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const RoleStatusOptions = Object.values(RoleStatus).map((status) => ({
  label: capitalize(status),
  key: status,
}));

export interface Role {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  roleName: string;
}

export interface TeamRole {
  id: string;
  teamId: string;
  roleName: string;
  description: string;
  status: string;
  userCount: number;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  teamRolePermissions: TeamRolePermission;
  team: {
    id: string;
    teamName: string;
  };
  permissionModules: PermissionModule[];
}

export type TeamRolePermission = typeof TeamModulePermission;

export interface RoleCreateForm {
  role?: {
    roleName: string;
    description: string;
  };
  teamRolePermissions?: {
    teamPermissionId?: string;
  }[];
}

export interface RoleUpdateForm {
  roleName?: string;
  description?: string;
  status?: RoleStatus;
}

export interface RoleUpdatePermissionForm {
  teamRolePermissions?: {
    teamPermissionId?: string;
  }[];
}

export interface AgencyRoleCreateForm {
  role: {
    roleName: string;
    description: string;
    teamId?: string;
  };
  permissions: Array<{ permission: string }>;
}

export type GetTeamRoleByTeamIdResponse = GetListResponse<TeamRole>;
export interface GetTeamRoleByTeamIdParams {
  teamId: string;
  page?: number;
  limit?: number;
  includeDefaultRole?: boolean;
}
