"use client";

import { Admin } from "@/model/Admin.mode";

import { UserDomainLogic } from "./UserDomain.logic";
import UserDomainView from "./UserDomain.view";

const UserDomain = ({
  data,
  refetch,
}: {
  data: Admin;
  refetch: () => void;
}) => {
  const props = UserDomainLogic({
    refetch,
    data,
  });

  return <UserDomainView {...props} adminDetail={data} refetch={refetch} />;
};

export default UserDomain;
