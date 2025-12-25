import {
  DOMAIN_ORDER_STATUS,
  DOMAIN_STATUS,
  DOMAIN_TYPE,
} from "@/constant/domain.constant";

import { Admin } from "./Admin.mode";
import { TimeStamp } from "./Common.model";
import { User } from "./User.model";

export interface Domain extends TimeStamp {
  budget: string;
  id: number;
  name: string;
  status: DOMAIN_STATUS;
  type: DOMAIN_TYPE;
  user: User;
  userId: number;
  price: number;
}

export interface DomainOrderBody {
  orderItems: {
    domainName: string;
    domainType: DOMAIN_TYPE;
  };
}

export interface DomainTldSummary {
  type: string; // ".com", ".com.vn", ".co.uk", ...
  quantity: number;
  amount: number; // tổng price
}
export interface DomainOrder {
  id: number;
  status: DOMAIN_ORDER_STATUS;
  orderCode: string;
  description: string;
  price: number;
  orderByUserId: number;
  user: Admin;
  domains: Domain[];
  createdAt: string;
  domainsCount: number;
  proposeCode?: string;
  summarizeDomains?: DomainTldSummary[];
}
