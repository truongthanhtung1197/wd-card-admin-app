import { useTranslations } from "next-intl";

import {
  DOMAIN_STATUS_OPTIONS,
  DOMAIN_TYPE_OPTIONS,
} from "@/constant/domain.constant";
import { IDomain } from "@/constant/Manager.constant";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

import Loading from "../../common/Loading";
import { RenderFiledValue } from "../../common/RenderFiledValue";
import UserInformationV2 from "../../common/UserInformationV2";

export const DomainDetailView = ({
  isFetching,
  domainDetail,
  totalDomainSpending,
}: {
  isLoading: boolean;
  isFetching: boolean;
  domainDetail: IDomain;
  totalDomainSpending: number;
  refetch: () => void;
}) => {
  const t = useTranslations("Domain");
  return (
    <div className="relative flex flex-col gap-4">
      {isFetching && (
        <div className="center absolute inset-0 z-20 bg-black/10">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        <RenderFiledValue
          filedName={t("columns.name")}
          value={domainDetail.name}
        />
        <RenderFiledValue
          filedName={"Giá mua"}
          value={formatCurrency(domainDetail.price)}
        />
        <RenderFiledValue
          filedName={t("columns.type")}
          value={getLabelFromOptions(domainDetail.type, DOMAIN_TYPE_OPTIONS)}
        />
        <RenderFiledValue
          filedName={t("columns.status")}
          value={getLabelFromOptions(
            domainDetail.status,
            DOMAIN_STATUS_OPTIONS,
          )}
        />
        <RenderFiledValue
          filedName={"Assignee"}
          value={
            <UserInformationV2 user={domainDetail.userDomains?.[0]?.user} />
          }
        />
        <RenderFiledValue
          filedName={t("columns.team")}
          value={domainDetail?.team?.name}
        />
        <RenderFiledValue
          filedName={t("columns.createdAt")}
          value={formatDateTime(domainDetail.createdAt)}
        />
        <RenderFiledValue
          filedName={"Ngân sách (SEO)"}
          value={formatCurrency(domainDetail.budget)}
        />
        <RenderFiledValue
          filedName={"Đã chi tiêu (SEO)"}
          value={formatCurrency(totalDomainSpending)}
        />
        <RenderFiledValue
          filedName={"Khả dụng (SEO)"}
          value={formatCurrency(
            (Number(domainDetail.budget) || 0) - (totalDomainSpending || 0),
          )}
          valueClassName="text-xl font-bold text-[#820202]"
        />

        <RenderFiledValue
          filedName={"Tổng chi phí Domain"}
          value={formatCurrency(
            (Number(domainDetail.price) || 0) + (totalDomainSpending || 0),
          )}
          valueClassName="text-xl font-bold text-[#820202]"
        />
      </div>
    </div>
  );
};
