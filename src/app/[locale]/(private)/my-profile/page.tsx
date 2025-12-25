"use client";

import { useTranslations } from "next-intl";

import ReviewList from "@/app/_components/reviews/ReviewList";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";

import BasicInformationView from "./BasicInformationView";
import { useMyProfileLogic } from "./useLogic";

const MyProfile = () => {
  const props = useMyProfileLogic();
  const t = useTranslations("MyProfile");
  const auth = useAppSelector((state) => AuthSelector.selectAuthState(state));
  
  return (
    <div className="base-layout w-full pt-5">
      <h1 className="text-3xl font-bold h-[100px] justify-center flex items-center">{t("title")}</h1>
      <BasicInformationView {...props} variant="my-profile" />
      {auth?.admin?.role?.roleName === ADMIN_ROLE.PARTNER && auth?.admin?.id && (
        <div className="mt-6">
          <ReviewList userId={auth.admin.id} title="Đánh giá về tôi" />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
