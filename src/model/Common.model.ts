export interface TimeStamp {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface GetListResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  limit: number;
  length: any;
}

export interface GetRoleList {
  data: Role[];
}

interface Role {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  roleName: string;
}
