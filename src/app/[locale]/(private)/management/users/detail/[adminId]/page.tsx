"use client";

import SubHeader from "@/app/_components/common/SubHeader";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";

import BasicInformation from "./_components/BasicInformation";
import { AdminDetailLogic } from "./AdminDetail.logic";

interface UserDetailProps {}

const UserDetail = ({}: UserDetailProps) => {
  const { admin: adminDetail, refetch } = AdminDetailLogic();
  const router = useLocaleRouter();
  const { history } = useUrlHistory();
  return (
    <div className="mx-auto mt-4 w-full max-w-[640px] overflow-y-auto bg-neutral-surface pb-7">
      <SubHeader
        label={`Detail admin`}
        isBack
        goBack={() =>
          router.push(
            history[ROUTERS.MANAGEMENT_ADMIN] || ROUTERS.MANAGEMENT_ADMIN,
          )
        }
        className="row base-layout top-0 h-[88px]"
      />
      <div className="col base-layout gap-3">
        <BasicInformation data={adminDetail} refetch={refetch} />
      </div>
    </div>
  );
};

export default UserDetail;
