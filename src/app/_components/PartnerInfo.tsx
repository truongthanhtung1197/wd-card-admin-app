import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Admin } from "@/model/Admin.mode";

import UserInformationV2 from "./common/UserInformationV2";

export default function PartnerInfo({ partner }: { partner?: Admin }) {
  const t = useTranslations("DetailModal");
  const router = useLocaleRouter();

  return (
    <MyCard
      label={t("partnerInfo")}
      className="border border-yellow-600 bg-yellow-50"
    >
      {partner?.id ? (
        <div className="grid grid-cols-4 gap-3 gap-x-[30px]">
          <RenderFiledValue
            filedName={t("partner")}
            value={
              <UserInformationV2
                user={partner || {}}
                onNameClick={() =>
                  router.push(
                    `${ROUTERS.MANAGEMENT_PARTNER_DETAIL.replace(":id", partner?.id?.toString() || "")} `,
                  )
                }
              />
            }
          />
          <RenderFiledValue
            filedName={t("telegram")}
            value={partner?.telegramUsername || ""}
          />
          <RenderFiledValue
            filedName={t("phone")}
            value={partner?.phone || ""}
          />
          <RenderFiledValue
            filedName={t("bankName")}
            value={partner?.bankName || ""}
          />
          <RenderFiledValue
            filedName={t("accountName")}
            value={partner?.bankNameInCard || ""}
          />
          <RenderFiledValue
            filedName={t("accountNumber")}
            value={partner?.bankNumber || ""}
          />
        </div>
      ) : (
        <div className="center p-4">Đối tác này không còn tồn tại</div>
      )}
    </MyCard>
  );
}
