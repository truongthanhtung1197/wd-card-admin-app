"use client";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { Admin } from "@/model/Admin.mode";
import { formatRatingHalfFloor } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

interface BasicInformationViewProps {
  data?: Admin;
}

const BasicInformationView = ({ data }: BasicInformationViewProps & any) => {
  const t = useTranslations("BasicInformation");

  return (
    <div>
      <MyCard label="Basic Information">
        <div className="grid grid-cols-4 gap-4">
          <RenderFiledValue
            filedName={t("fields.username")}
            value={data?.username}
          />
          <RenderFiledValue
            filedName={t("fields.displayName")}
            value={data?.displayName}
          />
          {data?.role?.roleName === ADMIN_ROLE.PARTNER && (
            <RenderFiledValue
              filedName="Rating"
              value={
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>{formatRatingHalfFloor(data?.avgRating)}</span>
                </div>
              }
            />
          )}
          <RenderFiledValue
            filedName={t("fields.role")}
            value={getLabelFromOptions(
              data?.role?.roleName,
              ADMIN_ROLE_OPTIONS,
            )}
          />

          <RenderFiledValue filedName={t("fields.email")} value={data?.email} />
          <RenderFiledValue filedName={t("fields.phone")} value={data?.phone} />
          <RenderFiledValue
            filedName={t("fields.telegramUsername")}
            value={data?.telegramUsername}
          />
          <RenderFiledValue
            filedName={t("fields.bankName")}
            value={data?.bankName}
          />
          <RenderFiledValue
            filedName={t("fields.bankNameInCard")}
            value={data?.bankNameInCard}
          />
          <RenderFiledValue
            filedName={t("fields.bankNumber")}
            value={data?.bankNumber}
          />
        </div>
      </MyCard>
    </div>
  );
};

export default BasicInformationView;
