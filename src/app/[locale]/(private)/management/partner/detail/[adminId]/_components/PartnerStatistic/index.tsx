import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";
import { formatCurrency } from "@/utils/format.util";

export default function PartnerStatistic({ staticData }: { staticData: any }) {
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  return (
    <MyCard label="Partner Statistic">
      <div className="grid grid-cols-4 gap-4">
        <RenderFiledValue
          filedName={"Total Service"}
          value={staticData?.totalService}
        />
        {![
          ADMIN_ROLE.SEOER,
          ADMIN_ROLE.TEAM_LEADER,
          ADMIN_ROLE.VICE_TEAM_LEADER,
        ]?.includes(admin?.role?.roleName as ADMIN_ROLE) && (
          <RenderFiledValue
            filedName={"Total Amount Received"}
            value={formatCurrency(staticData?.totalAmountReceived)}
          />
        )}
      </div>
    </MyCard>
  );
}
