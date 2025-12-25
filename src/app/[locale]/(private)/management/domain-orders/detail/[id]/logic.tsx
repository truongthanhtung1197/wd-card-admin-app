"use client";
import { useCallback, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { DOMAIN_ORDER_STATUS } from "@/constant/domain.constant";
import { useVisibility } from "@/hook";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useAppSelector } from "@/store";
import {
  useEditDomainOrderByIdMutation,
  useGetDomainsOfDomainOrdersQuery,
  useGetDomainsOrdersByIdQuery,
} from "@/store/Apis/Domain.api";
import { useGetTeamsQuery } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  price: string;
  status: DOMAIN_ORDER_STATUS;
  description?: string;
  proposeCode?: string;
  teamId?: string;
}

export const useEditDomainLogic = () => {
  const t = useTranslations("EditDomain");
  const [editDomainOrderById, { isLoading }] = useEditDomainOrderByIdMutation();
  const params = useParams<{ id: string }>();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const {
    data: detail,
    refetch: refetchDomainOrderDetail,
    isFetching,
  } = useGetDomainsOrdersByIdQuery(
    { id: params?.id },
    {
      skip: !params?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: domains,
    refetch: refetchDomainsList,
    isLoading: isLoadingDomains,
  } = useGetDomainsOfDomainOrdersQuery(
    { domainOrderId: params?.id },
    {
      skip: !params?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  const { isVisible: isEdit, toggle: toggleEdit } = useVisibility();

  const { history } = useUrlHistory();

  // Role-based visibility for team select
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const userRole = admin?.role?.roleName as ADMIN_ROLE | undefined;
  const isShowTeamSelect = useMemo(
    () =>
      [
        ADMIN_ROLE.DOMAIN_BUYER,
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.SUPER_ADMIN,
        ADMIN_ROLE.ASSISTANT,
      ].includes(userRole as ADMIN_ROLE),
    [userRole],
  );

  // Teams for selector
  const { data: allTeamsData } = useGetTeamsQuery(
    { limit: 50, page: 1 },
    { skip: !isShowTeamSelect, refetchOnMountOrArgChange: true },
  );

  const getFilteredTeamsData = useCallback(
    (searchTerm?: string) => {
      if (!allTeamsData?.data) return { data: [], total: 0 } as any;
      const filtered = allTeamsData.data.filter((team: any) => {
        if (!searchTerm) return true;
        return (
          team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      return { data: filtered, total: filtered.length } as any;
    },
    [allTeamsData],
  );

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const formData: any = {
          // price: Number(values?.price) || undefined, tự động tính dựa trên các domain chi tiết không cho nhập
          status: values.status,
          proposeCode: values.proposeCode,
        };

        if (values.teamId) {
          formData.teamId = Number(values.teamId);
        }

        const res: any = await editDomainOrderById({
          id: String(params?.id) || "",
          data: formData,
        });
        if (res.error) {
          toast.error(res.error?.data?.message || "");
          return;
        }
        toggleEdit();
        toast.success("Updated");
        refetchDomainOrderDetail();
      } catch (err: any) {
        toast.error("Update failed");
      }
    },
    [refetchDomainOrderDetail, editDomainOrderById, toggleEdit],
  );

  const initialFormValues = useMemo(() => {
    return {
      status: detail?.status || "",
      price: (Number(detail?.price) || "") as any,
      description: detail?.description || "",
      proposeCode: detail?.proposeCode || "",
      teamId: (detail as any)?.teamId ? String((detail as any).teamId) : "",
    };
  }, [detail]);

  return {
    onSubmit,
    isLoading: isLoading,
    ValidationSchema,
    initialFormValues,
    urlHistory: history,
    t,
    formRef,
    detail,
    isEdit,
    toggleEdit,
    isFetching,
    domains,
    refetchDomainOrderDetail,
    isLoadingDomains,
    refetchDomainsList,
    isShowTeamSelect,
    getFilteredTeamsData,
  };
};

export const ValidationSchema = Yup.object({
  status: Yup.string()
    .transform((value) => value.trim())
    .required("Required"),
  description: Yup.string()
    .transform((value) => value.trim())
    .required("Required"),
  price: Yup.string()
    .transform((value) => value.trim())
    .test("Required", "Must be a number", (value) => !value || !!Number(value)),
});
