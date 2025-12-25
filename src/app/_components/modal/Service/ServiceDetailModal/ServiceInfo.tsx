import { FaGift } from "react-icons/fa";
import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { ServiceType } from "@/constant/Manager.constant";
import {
  SERVICE_STATUS_OPTIONS,
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { Service } from "@/model/Partner.model";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

import { RenderFiledValue } from "../../../common/RenderFiledValue";
import Text from "../../../common/Text";

export default function ServiceInfo({
  service,
  cartDetailData,
}: {
  service?: Service;
  cartDetailData?: {
    quantity: number;
    serviceType: SERVICE_TYPE;
  };
}) {
  const t = useTranslations("DetailModal");
  const tService = useTranslations("SeoerDomain.services");

  const { quantity, serviceType: serviceTypeCart } = cartDetailData || {};

  const {
    type,
    typePack,
    price,
    status,
    fieldType,
    urlDemo,
    isShow,
    isSaleTextLink,
    isSaleGuestPost,
    isSaleBanner,
    complimentaries,
    note,
    serviceType,
    discountPackService,
  } = service || {};

  const tFieldType = useTranslations("serviceFieldType");
  const tEditService = useTranslations("Partner.domain.createEdit");

  const { admin } = useAppSelector(AuthSelector.selectAuthState);

  return (
    <>
      <div className="space-y-2">
        <MyCard
          className="bg-[#b8d7f8]/30  shadow-lg"
          label={"Service details"}
        >
          <div className="grid grid-cols-3 gap-2 gap-x-[30px]">
            {admin?.role?.roleName === ADMIN_ROLE.PARTNER && (
              <RenderFiledValue
                filedName={"Status"}
                value={getLabelFromOptions(
                  status || "",
                  SERVICE_STATUS_OPTIONS,
                )}
              />
            )}
            {service?.typePack === SERVICE_TYPE_PACK.DOMAIN && (
              <RenderFiledValue filedName={"Domain"} value={service?.name} />
            )}

            {service?.typePack === SERVICE_TYPE_PACK.PACK && (
              <RenderFiledValue
                filedName={"Service name"}
                value={service?.name}
              />
            )}
            {quantity && (
              <RenderFiledValue filedName={t("quantity")} value={quantity} />
            )}
            {typePack !== SERVICE_TYPE_PACK.CONTENT && (
              <RenderFiledValue
                filedName={"Service Type"}
                value={
                  typePack === SERVICE_TYPE_PACK.DOMAIN
                    ? "GP/Textlink/Banner"
                    : getLabelFromOptions(type || "", SERVICE_TYPE_OPTIONS)
                }
              />
            )}
            {typePack === SERVICE_TYPE_PACK.CONTENT && (
              <>
                <RenderFiledValue
                  filedName={"Service Type"}
                  value={"Contents"}
                />
                <RenderFiledValue filedName={"Name"} value={service?.name} />
                <RenderFiledValue
                  filedName={"URL Demo"}
                  value={service?.urlDemo}
                />
                <RenderFiledValue filedName={"Note"} value={service?.note} />
              </>
            )}
            {typePack === SERVICE_TYPE_PACK.PACK && (
              <>
                <RenderFiledValue
                  filedName={"Price"}
                  value={formatCurrency(price)}
                />
                <RenderFiledValue
                  filedName={"Discount"}
                  value={formatCurrency(discountPackService)}
                />
                <RenderFiledValue
                  filedName={"Final price"}
                  value={formatCurrency(
                    (Number(price) || 0) - (Number(discountPackService) || 0),
                  )}
                  valueClassName="text-[#820202] font-bold text-lg"
                />

                <RenderFiledValue filedName={"Link demo"} value={urlDemo} />
                <RenderFiledValue filedName={"Note"} value={note} />
              </>
            )}

            {service?.typePack === SERVICE_TYPE_PACK.DOMAIN && (
              <RenderFiledValue
                filedName={tService("search.fieldType")}
                value={tFieldType(fieldType || "")}
              />
            )}
            {service?.typePack === SERVICE_TYPE_PACK.DOMAIN && (
              <RenderFiledValue filedName={"URL Demo"} value={urlDemo || "-"} />
            )}

            {admin?.role?.roleName === ADMIN_ROLE.PARTNER && (
              <RenderFiledValue
                filedName={tEditService("labels.showOnMarket")}
                value={isShow ? "Yes" : "No"}
              />
            )}

            {serviceType === ServiceType.GP && (
              <>
                <RenderFiledValue
                  filedName={"index"}
                  value={service?.isIndexGuestPost ? "Index" : "Noindex"}
                />
                <RenderFiledValue
                  filedName={"follow"}
                  value={service?.isFollowGuestPost ? "Dofollow" : "Nofollow"}
                />
              </>
            )}
          </div>
          <div className="col mt-2 gap-2">
            {!!isSaleTextLink && !serviceTypeCart && (
              <TextLinkInfo service={service} />
            )}
            {!!isSaleGuestPost && !serviceTypeCart && (
              <GuestPostInfo service={service} />
            )}
            {!!isSaleBanner && !serviceTypeCart && (
              <BannerInfo service={service} />
            )}

            {serviceTypeCart === SERVICE_TYPE.TEXTLINK && (
              <TextLinkInfo service={service} />
            )}
            {serviceTypeCart === SERVICE_TYPE.GP && (
              <GuestPostInfo service={service} />
            )}
            {serviceTypeCart === SERVICE_TYPE.BANNER && (
              <BannerInfo service={service} />
            )}
          </div>

          {complimentaries && complimentaries.length > 0 && (
            <div className="rounded-md p-3">
              <div className="mb-2 flex items-center">
                <h3 className="mb-1 flex items-center text-base font-bold text-[#066102]">
                  {t("complimentaryServices")}{" "}
                  <FaGift className="ml-2 text-green-500" size={15} />
                </h3>
              </div>
              <div className="pl-6">
                <ul className="col gap-3">
                  {complimentaries.map((item: any, index: number) => (
                    <li key={index} className="flex gap-3 text-[#6e6e6e]">
                      <Text variant="body1-regular">{index + 1}:</Text>
                      <p>{item.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </MyCard>
      </div>
    </>
  );
}
const BannerInfo = ({ service }: { service?: Service }) => {
  const { bannerPrice, bannerDuration, discountBannerService } = service || {};

  return (
    <MyCard label="Banner" className="mt-4 bg-[#ffe8f2]">
      <div className="mt-2 grid grid-cols-3 gap-2 gap-x-[30px]">
        <RenderFiledValue
          filedName={"Banner price"}
          value={formatCurrency(bannerPrice)}
        />
        <RenderFiledValue
          filedName={"Discount banner"}
          value={formatCurrency(discountBannerService)}
        />
        <RenderFiledValue
          filedName={"Final banner price"}
          value={formatCurrency(
            (Number(bannerPrice) || 0) - (Number(discountBannerService) || 0),
          )}
          valueClassName="text-[#820202] font-bold text-lg"
        />
        <RenderFiledValue
          filedName={"Banner duration"}
          value={bannerDuration + " month"}
        />
      </div>
    </MyCard>
  );
};

const GuestPostInfo = ({ service }: { service?: Service }) => {
  const {
    guestPostPrice,
    guestPostNote,
    isFollowGuestPost,
    isIndexGuestPost,
    discountGuestPostService,
  } = service || {};

  return (
    <MyCard label="Guest post" className="mt-4 bg-[#ffe8f2]">
      <div className="mt-2 grid grid-cols-3 gap-2 gap-x-[30px]">
        <>
          <RenderFiledValue
            filedName={"Guest post price"}
            value={formatCurrency(guestPostPrice)}
          />
          <RenderFiledValue
            filedName={"Discount guest post"}
            value={formatCurrency(discountGuestPostService)}
          />
          <RenderFiledValue
            filedName={"Final guest post price"}
            value={formatCurrency(
              (Number(guestPostPrice) || 0) -
                (Number(discountGuestPostService) || 0),
            )}
            valueClassName="text-[#820202] font-bold text-lg"
          />
          <RenderFiledValue
            filedName={"Follow"}
            value={isFollowGuestPost ? "Yes" : "No"}
          />
          <RenderFiledValue
            filedName={"Index"}
            value={isIndexGuestPost ? "Yes" : "No"}
          />
          <RenderFiledValue
            filedName={"Guest post note"}
            value={guestPostNote}
          />
        </>
      </div>
    </MyCard>
  );
};

const TextLinkInfo = ({ service }: { service?: Service }) => {
  const {
    textLinkPrice,
    textLinkNote,
    isFollowTextLink,
    isHomeTextLink,
    isFooterTextLink,
    discountTextLinkService,
  } = service || {};
  return (
    <MyCard label="Textlink" className="mt-4 bg-[#ffe8f2]">
      <div className="mt-2 grid grid-cols-3 gap-2 gap-x-[30px]">
        <RenderFiledValue
          filedName={"Textlink price"}
          value={formatCurrency(textLinkPrice)}
        />
        <RenderFiledValue
          filedName={"Discount textlink"}
          value={formatCurrency(discountTextLinkService)}
        />
        <RenderFiledValue
          filedName={"Final textlink price"}
          value={formatCurrency(
            (Number(textLinkPrice) || 0) -
              (Number(discountTextLinkService) || 0),
          )}
          valueClassName="text-[#820202] font-bold text-lg"
        />

        <RenderFiledValue
          filedName={"Follow"}
          value={isFollowTextLink ? "Yes" : "No"}
        />
        <RenderFiledValue
          filedName={"Home"}
          value={isHomeTextLink ? "Yes" : "No"}
        />
        <RenderFiledValue
          filedName={"Footer"}
          value={isFooterTextLink ? "Yes" : "No"}
        />
        <RenderFiledValue filedName={"Textlink note"} value={textLinkNote} />
      </div>
    </MyCard>
  );
};
