import {
  ModuleEnum,
  PERMISSION_MODULE_USE_FOR,
  PermissionEnum,
} from "@/constant/Permission.constant";

export interface Permission {
  id: string;
  code: PermissionEnum;
  name: string;
  teamPermissions: TeamPermission[];
}

export interface TeamPermission {
  id: string;
  permissionId: string;
  teamId: string;
}
export interface PermissionModule {
  id: string;
  name: string;
  code: ModuleEnum;
  useFor: PERMISSION_MODULE_USE_FOR;
  permissions: Permission[];
}
