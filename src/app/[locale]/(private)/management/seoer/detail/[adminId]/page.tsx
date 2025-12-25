"use client";

import { useTranslations } from "next-intl";

import MyCard from "@/app/_components/common/MyCard";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { formatCurrency } from "@/utils/format.util";

import BasicInformation from "./_components/BasicInformation";
import UserDomain from "./_components/UserDomain";
import { AdminDetailLogic } from "./AdminDetail.logic";

interface UserDetailProps {}

const UserDetail = ({}: UserDetailProps) => {
  const { admin: adminDetail, refetch } = AdminDetailLogic();
  const tProfile = useTranslations("MyProfile");
  return (
    <div className="mt-4 w-full overflow-y-auto bg-neutral-surface pb-7">
      <div className="col base-layout gap-3">
        <MyCard label={tProfile("seoerStatistic.title")}>
          <div className="grid grid-cols-2 gap-4">
            <RenderFiledValue
              filedName={tProfile("seoerStatistic.totalSpent")}
              value={formatCurrency(
                (adminDetail as any)?.statistic?.amountOfMoneySeoerSpent,
              )}
              valueClassName="text-[#820202] font-bold text-lg"
            />
          </div>
        </MyCard>
        <BasicInformation data={adminDetail} refetch={refetch} />
        <UserDomain data={adminDetail} refetch={refetch} />
      </div>
    </div>
  );
};

export default UserDetail;
