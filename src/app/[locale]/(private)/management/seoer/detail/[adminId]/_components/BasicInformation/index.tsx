"use client";

import { Admin } from "@/model/Admin.mode";

import { AdminDetailLogic } from "./BasicInformation.logic";
import BasicInformationView from "./BasicInformation.view";

interface AdminDetailProps {
  data?: Admin;
  refetch?: () => void;
}
const BasicInformation = ({ data, refetch }: AdminDetailProps) => {
  const props = AdminDetailLogic({ data, refetch });

  return <BasicInformationView {...props} data={data} />;
};

export default BasicInformation;
