import React, { memo } from "react";

import Loading from "@/app/_components/common/Loading";
import MyModal from "@/app/_components/common/MyModal";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { Service } from "@/model/Partner.model";
import { useAppSelector } from "@/store";
import { useGetServiceByIdQuery } from "@/store/Apis/Service.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";

import PartnerInfo from "../../../PartnerInfo";
import ServiceInfo from "./ServiceInfo";

interface EventModalProps {
  onCancel: () => void;
  isOpen: boolean;
  serviceDetail?: Service;
}

const ServiceDetailModal = memo((props: EventModalProps) => {
  const auth = useAppSelector((state) => AuthSelector.selectAuthState(state));
  const {
    data: serviceDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetServiceByIdQuery(
    {
      id: props?.serviceDetail?.id?.toString() || "",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !props?.serviceDetail?.id,
    },
  );

  const partner = serviceDetail?.user;

  return (
    <MyModal
      size="6xl"
      isOpen={props.isOpen}
      onClose={props.onCancel}
      header={"Service Details"}
      body={
        <div className="relative max-w-full space-y-6 p-6">
          {(isLoading || isFetching) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/15">
              <Loading />
            </div>
          )}
          {auth?.admin?.role?.roleName !== ADMIN_ROLE.PARTNER && (
            <PartnerInfo partner={partner} />
          )}
          <ServiceInfo service={serviceDetail} />
        </div>
      }
    />
  );
});

export default ServiceDetailModal;
