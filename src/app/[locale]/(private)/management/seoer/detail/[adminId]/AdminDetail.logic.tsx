"use client";
import { useParams } from "next/navigation";

import { useGetAdminByIdQuery } from "@/store/Apis/Admin.api";

export const AdminDetailLogic = () => {
  const params = useParams<{ adminId: string }>();
  const { data: admin, refetch } = useGetAdminByIdQuery(params?.adminId, {
    skip: !params?.adminId,
    refetchOnMountOrArgChange: true,
  });

  return {
    admin: admin?.data || [],
    refetch,
  };
};
