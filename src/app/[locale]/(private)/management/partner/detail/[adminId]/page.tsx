"use client";

import ReviewList from "@/app/_components/reviews/ReviewList";

import BasicInformation from "./_components/BasicInformation";
import PartnerStatistic from "./_components/PartnerStatistic";
import { AdminDetailLogic } from "./AdminDetail.logic";

interface UserDetailProps {}

const UserDetail = ({}: UserDetailProps) => {
  const { admin: adminDetail, refetch } = AdminDetailLogic();

  return (
    <div className=" w-full overflow-y-auto bg-neutral-surface pb-7">
      <div className="col base-layout gap-3">
        <BasicInformation data={adminDetail} refetch={refetch} />
        <PartnerStatistic staticData={adminDetail?.statisticPartner} />

        {adminDetail?.id && (
          <ReviewList userId={adminDetail.id} title="Đánh giá" />
        )}
      </div>
    </div>
  );
};

export default UserDetail;
