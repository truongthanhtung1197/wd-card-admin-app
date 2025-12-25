import { SERVICE_TYPE } from "@/constant/service.constant";
import { ORDER_STATUS } from "@/store/Apis/Order.api";

import { TimeStamp } from "./Common.model";
import { Service } from "./Partner.model";

export interface SeoerCartDetail extends TimeStamp {
  cartId: number;
  id: number;
  quantity: number;
  serviceId: number;
  serviceType: SERVICE_TYPE;
  service: Service;
}

interface Domain {
  name: string;
  budget: number;
}

interface User {
  email: string;
  phone: string;
  telegramUsername: string;
  bankNameInCard: string;
  bankNumber: string;
  bankName: string;
  usdt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoerMyOrder extends TimeStamp {
  id: string;
  orderCode: string;
  status: ORDER_STATUS;
  creaetedAt: string;
  serviceName: string;
  serviceId: string;
  servicePrice: Service;
  serviceDescription: string;
  domainName: string;
  domainId: string;
  quantity: number;
  domainBudget: number;
  domain: Domain;
  service: Service;
  serviceType: Service;
}
