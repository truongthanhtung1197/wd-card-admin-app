import React, { memo } from "react";

import MyModal from "@/app/_components/common/MyModal";
import { IDomain } from "@/constant/Manager.constant";
import { useGetDomainByIdQuery } from "@/store/Apis/Domain.api";

import { DomainDetailView } from "./DomainDetailView";

interface EventModalProps {
  onCancel: () => void;
  isOpen: boolean;
  domainId?: IDomain;
}

const DomainDetailModal = memo((props: EventModalProps) => {
  const { domainId } = props;
  const {
    data: domainDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetDomainByIdQuery(domainId?.toString() || "", {
    refetchOnMountOrArgChange: true,
    skip: !domainId,
  });

  return (
    <MyModal
      size="4xl"
      isOpen={props.isOpen}
      onClose={props.onCancel}
      header={"Domain Details"}
      body={
        <DomainDetailView
          isLoading={isLoading}
          isFetching={isFetching}
          domainDetail={domainDetail?.data || ({} as IDomain)}
          totalDomainSpending={domainDetail?.totalDomainSpending || 0}
          refetch={refetch}
        />
      }
    />
  );
});

export default DomainDetailModal;
