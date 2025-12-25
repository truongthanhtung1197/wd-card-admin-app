import { Role } from "@/model";
import { Admin } from "@/model/Admin.mode";
import { Service } from "@/model/Partner.model";
import { ORDER_STATUS } from "@/store/Apis/Order.api";
import { Team } from "@/store/Apis/Team.api";

import { AdminRoleType } from "./admin.constant";
import { SERVICE_TYPE } from "./service.constant";

//  Service
export const ServiceStatus = {
  Approved: "APPROVED",
  Rejected: "REJECTED",
  Pending: "PENDING",
} as const;

export enum EnumServiceStatus {
  Approved = "APPROVED",
  Rejected = "REJECTED",
  Pending = "PENDING",
}

export const SERVICE_ORDER_STATUS_OPTIONS = [
  {
    label: "statusService.APPROVED",
    key: ServiceStatus.Approved,
  },
  {
    label: "statusService.REJECTED",
    key: ServiceStatus.Rejected,
  },
  {
    label: "statusService.PENDING",
    key: ServiceStatus.Pending,
  },
];

export const ServiceStatusValues = [
  ServiceStatus.Approved,
  ServiceStatus.Rejected,
  ServiceStatus.Pending,
] as const;

export type ServiceStatusType =
  (typeof ServiceStatus)[keyof typeof ServiceStatus];

export const ServiceType = {
  GP: "GP",
  TEXTLINK: "TEXTLINK",
  ENTITY: "ENTITY",
  BACKLINK: "BACKLINK",
  BANNER: "BANNER",
  TRAFFIC: "TRAFFIC",
} as const;

export const ServiceTypeValues = [
  ServiceType.GP,
  ServiceType.TEXTLINK,
  ServiceType.ENTITY,
  ServiceType.BACKLINK,
  ServiceType.BANNER,
] as const;

export type ServiceTypeEnum = (typeof ServiceType)[keyof typeof ServiceType];

// Order
export const OrderStatus = {
  Approved: "APPROVED",
  Rejected: "REJECTED",
  Pending: "PENDING",
} as const;

export const OrderStatusValues = [
  OrderStatus.Pending,
  OrderStatus.Approved,
  OrderStatus.Rejected,
] as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

// Domain
export const DomainType = {
  Normal: "normal",
  Redirect301: "301",
} as const;

export const DomainTypeValues = [
  DomainType.Normal,
  DomainType.Redirect301,
] as const;

export type DomainTypeEnum = (typeof DomainType)[keyof typeof DomainType];

export enum ORDER_HISTORY_TYPE {
  CREATE_ORDER = "CREATE_ORDER",
  CHANGE_STATUS = "CHANGE_STATUS",
  EDIT_PRICE = "EDIT_PRICE",
}

// Interface Manager
export interface IDomain {
  domain_id: number;
  price: number;
  name: string;
  status: OrderStatusType;
  type: DomainTypeEnum;
  team?: Team;
  teamId?: number;
  budget?: number;
  userDomains?: IUserDomain[];
  createdAt?: string;
}

export interface IOrder {
  id?: number;
  orderId?: number;
  orderCode?: string;
  userId?: number;
  serviceId?: number;
  domainId?: number;
  status?: ORDER_STATUS;
  createdAt?: string;
  orderDetails?: IOrderDetail[];
  user?: Admin;
  domain?: IDomain;
  price?: number;
  discount?: number;
  priceAdjustment?: number;
  recentChangeStatusHistory?: IOrderHistory;
  partner?: Admin;
  partnerId?: number;
}

export interface IUserDomain {
  id?: number;
  userId: number;
  domainId: number;
  user?: Admin;
  domain?: IDomain;
}

export interface IOrderHistory {
  id?: number;
  orderId: number;
  type: ORDER_HISTORY_TYPE;
  metadata?: string | null | any;
  createdAt?: string;
}

export interface IOrderDetail {
  id?: number;
  orderId: number;
  serviceId: number;
  quantity: number;
  serviceType: SERVICE_TYPE;
  anchorText1?: string;
  anchorText2?: string;
  url1?: string;
  url2?: string;
  linkDrive?: string;
  expiredAt?: Date;
  newOrRenew?: string;
  warrantyPeriod?: string;
  discount: number;
  price: number;
  serviceMetadata?: any;
  service?: Service;
  order?: IOrder;
}

export interface IUserStatistics {
  id: number;
  role: Role;
  user_id: number;
  username: string;
  displayName: string;
  email: string;
  roleId: number;
  roleName: AdminRoleType;
  orders_count: number;
  services_created: number;
  wallet_balance: number;
  createdAt?: string;
  updatedAt?: string;
  totalBudget: number;
}
