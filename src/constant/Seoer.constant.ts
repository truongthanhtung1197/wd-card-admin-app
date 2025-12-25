import { SERVICE_TYPE } from "./service.constant";

export interface ICartDetails {
  id: number;
  service: any;
  priceService: any;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  total: number;
  serviceType: SERVICE_TYPE;
  url1?: string;
  url2?: string;
  anchorText1?: string;
  anchorText2?: string;
  linkDrive?: string;
  orderAt?: string;
  expiredAt?: string;
  newOrRenew?: string;
  warrantyPeriod?: string;
  isPartnerRow?: boolean;
  parentIds?: string;
}
