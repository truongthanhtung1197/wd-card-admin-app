"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { mappingDataOptions } from "@/app/_components/formik/FSelectInput/fSelectInput.utils";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { Role } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import { useGetRolesQuery } from "@/store/Apis/Admin.api";
import {
  useEditDomainByIdMutation,
  useGetDomainByIdQuery,
} from "@/store/Apis/Domain.api";
import {
  useGetTeamsLeadByMeQuery,
  useGetTeamsQuery,
} from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";
import { formatBudgetToNumber } from "@/utils/format.util";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FormValues {
  name: string;
  status: string;
  type: string;
  budget: string;
  teamId?: string; // For all roles now - Manager uses all teams, Team Leader uses their teams
}

export const useEditDomainLogic = () => {
  const t = useTranslations("EditDomain");
  const [editDomainsById, { isLoading }] = useEditDomainByIdMutation();
  const params = useParams<{ domainId: string }>();
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const { data: DomainEdit, refetch } = useGetDomainByIdQuery(
    params?.domainId,
    {
      skip: !params?.domainId,
      refetchOnMountOrArgChange: true,
    },
  );

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );
  const userRole = admin?.role?.roleName as any;

  // Determine role-based behavior
  const isManagerRole = [
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.SUPER_ADMIN,
  ].includes(userRole);
  const isTeamLeaderRole = [
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ].includes(userRole);

  // Set selectedTeamId when domain data loads (for Team Leaders only)
  useEffect(() => {
    if (isTeamLeaderRole && DomainEdit?.data?.teamId) {
      setSelectedTeamId(DomainEdit.data.teamId.toString());
    }
  }, [DomainEdit, isTeamLeaderRole]);

  const { data: roles = [] } = useGetRolesQuery();

  // Get teams for Manager/Assistant roles (all teams) - OLD LOGIC
  const { data: allTeamsData } = useGetTeamsQuery(
    {
      limit: 10,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isManagerRole, // Only for Manager roles
    },
  );

  // Get teams that I lead for Team Leader/Vice Team Leader roles
  const { data: myTeamsData } = useGetTeamsLeadByMeQuery(
    {
      limit: 10,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isTeamLeaderRole,
    },
  );

  // Removed useGetTeamMembersQuery - no longer needed since Team Leaders only assign to teams

  // Use appropriate teams data based on role
  const teamsData = isTeamLeaderRole ? myTeamsData : allTeamsData;

  // Get current team info from teamsData using teamId
  const currentTeam = useMemo(() => {
    if (!DomainEdit?.data?.teamId || !teamsData?.data) return null;
    return teamsData.data.find(
      (team: any) => team.id === DomainEdit.data.teamId,
    );
  }, [DomainEdit?.data?.teamId, teamsData?.data]);

  // Filter teams data based on search - for SearchableSelect
  const getFilteredTeamsData = useCallback(
    (searchTerm?: string) => {
      // Use correct data source based on role
      const sourceData = isManagerRole ? allTeamsData : myTeamsData;

      if (!sourceData?.data) return { data: [], total: 0 };

      const filtered = sourceData.data.filter((team: any) => {
        if (!searchTerm) return true;
        return (
          team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      return {
        data: filtered,
        total: filtered.length,
      };
    },
    [isManagerRole, allTeamsData, myTeamsData],
  );

  // Removed getFilteredUsersData - no longer needed since Team Leaders only assign to teams

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const router = useLocaleRouter();
  const ValidationSchema = createValidationSchema(t);
  const handleButtonClick = useCallback(() => {
    avatarRef.current?.click();
  }, [avatarRef]);

  const { history } = useUrlHistory();
  const handleGoBack = useCallback(() => {
    if (formRef?.current?.dirty) {
      setLeavePage(true);
      return;
    }
    router.push(
      history[ROUTERS.MANAGEMENT_DOMAINS] || ROUTERS.MANAGEMENT_DOMAINS,
    );
  }, [setLeavePage, formRef]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const formData: any = {
          name: values?.name,
          status: values.status ?? "",
          type: values?.type,
          budget: formatBudgetToNumber(values?.budget),
        };

        // OLD LOGIC: Add teamId for Manager/Assistant roles
        if (isManagerRole && values.teamId) {
          formData.teamId = Number(values.teamId);
        }

        // NEW LOGIC: For Team Leader roles - simplified to only team assignment
        if (isTeamLeaderRole && selectedTeamId) {
          formData.teamId = Number(selectedTeamId);
        }

        const res: any = await editDomainsById({
          id: String(params?.domainId) || "",
          data: formData,
        });
        if (res.error) {
          toast.error(res.error?.data?.message || "");
          return;
        }

        toast.success(t("messages.editSuccess"));
        router.push(
          history[ROUTERS.MANAGEMENT_DOMAINS] || ROUTERS.MANAGEMENT_DOMAINS,
        );
        refetch();
      } catch (err: any) {
        toast.error(t("messages.editError"));
      }
    },
    [refetch, t, isManagerRole, isTeamLeaderRole, selectedTeamId],
  );

  const initialFormValues = useMemo(() => {
    const baseValues = {
      name: DomainEdit?.data?.name || "",
      status: DomainEdit?.data.status || "",
      type: DomainEdit?.data.type || "",
      budget: formatBudgetToNumber(DomainEdit?.data.budget) || "",
      teamId: DomainEdit?.data?.teamId?.toString() || "", // Both roles use teamId now
    };

    return baseValues;
  }, [DomainEdit?.data]);

  const roleOptions = useMemo(() => {
    const omitRoles = [ADMIN_ROLE.SUPER_ADMIN];
    if (
      admin?.role?.roleName === ADMIN_ROLE.MANAGER ||
      admin?.role?.roleName === ADMIN_ROLE.VICE_TEAM_LEADER ||
      admin?.role?.roleName === ADMIN_ROLE.TEAM_LEADER ||
      admin?.role?.roleName === ADMIN_ROLE.ASSISTANT
    ) {
      omitRoles.push(
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.ASSISTANT,
      );
    }
    const result: Role[] = roles?.data?.filter(
      (role: Role) => !omitRoles.includes(role.roleName as ADMIN_ROLE),
    );

    return mappingDataOptions({
      data: result,
      keyName: "id",
      labelName: "roleName",
    });
  }, [admin, roles]);

  // Team options for Manager/Assistant (OLD LOGIC)
  const teamOptions = useMemo(() => {
    if (!isManagerRole || !allTeamsData?.data) return [];

    return mappingDataOptions({
      data: allTeamsData.data,
      keyName: "id",
      labelName: "name",
    });
  }, [allTeamsData, isManagerRole]);

  return {
    onSubmit,
    isLoading: isLoading,
    handleButtonClick,
    avatarRef,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory: history,
    roleOptions,
    teamOptions,
    allTeamsData,
    myTeamsData,
    getFilteredTeamsData,
    selectedTeamId,
    setSelectedTeamId,
    currentTeam,
    userRole,
    isManagerRole,
    isTeamLeaderRole,
    DomainEdit,
    t,
  };
};

const createValidationSchema = (t: ReturnType<typeof useTranslations>) => {
  return Yup.object({
    name: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.nameRequired")),
    type: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.typeRequired")),
    status: Yup.string()
      .transform((value) => value.trim())
      .required(t("validation.statusRequired")),
    budget: Yup.number()
      .typeError(t("validation.budgetInvalid"))
      .required(t("validation.budgetRequired"))
      .max(99999999999, t("validation.budgetMax")),
  });
};
