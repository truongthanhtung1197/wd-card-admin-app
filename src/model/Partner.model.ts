import {
  SERVICE_FIELD_TYPE,
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";

import { Admin } from "./Admin.mode";

export interface Service {
  id?: number;
  name?: string; // domain/name
  type?: SERVICE_TYPE; // onLy for SERVICE_TYPE_PACK = PACK
  typePack?: SERVICE_TYPE_PACK;
  price?: number; // onLy for SERVICE_TYPE_PACK = PACK
  description?: string;
  status?: SERVICE_STATUS; // DOMAIN/PACK
  fieldType?: SERVICE_FIELD_TYPE; // onLy for SERVICE_TYPE_PACK = DOMAIN
  urlDemo?: string; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isIndex?: boolean;
  isShow?: boolean; // DOMAIN/PACK
  isSaleTextLink?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  textLinkPrice?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  textLinkDuration?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  textLinkNote?: string; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isFollowTextLink?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isHomeTextLink?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isFooterTextLink?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isSaleGuestPost?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  guestPostPrice?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  guestPostNote?: string; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isFollowGuestPost?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isIndexGuestPost?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  isSaleBanner?: boolean; // onLy for SERVICE_TYPE_PACK = DOMAIN
  bannerPrice?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  bannerDuration?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  complimentaries?: { name: string; id: number }[];
  user?: Admin;
  note?: string; // onLy for SERVICE_TYPE_PACK = PACK
  serviceType?: SERVICE_TYPE;
  dr: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  organicTraffic: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  refDomain: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  discountTextLinkService?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  discountGuestPostService?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  discountBannerService?: number; // onLy for SERVICE_TYPE_PACK = DOMAIN
  discountPackService?: number;
}

export interface CreateOrEditService {
  id?: number;
  name?: string;
  type?: SERVICE_TYPE; // onLy for SERVICE_TYPE_PACK = PACK
  typePack?: SERVICE_TYPE_PACK;
  price?: number; // onLy for SERVICE_TYPE_PACK = PACK
  description?: string;
  status?: SERVICE_STATUS;
  fieldType?: SERVICE_FIELD_TYPE;
  urlDemo?: string;
  isIndex?: boolean;
  isShow?: boolean;
  isSaleTextLink?: boolean;
  textLinkPrice?: number;
  textLinkDuration?: number;
  textLinkNote?: string;
  isFollowTextLink?: boolean;
  isHomeTextLink?: boolean;
  isFooterTextLink?: boolean;
  isSaleGuestPost?: boolean;
  guestPostPrice?: number;
  guestPostNote?: string;
  isFollowGuestPost?: boolean;
  isIndexGuestPost?: boolean;
  isSaleBanner?: boolean;
  bannerPrice?: number;
  bannerDuration?: number;
  complimentaries?: string[];
  note?: string;
  discountPackService?: number;
}
