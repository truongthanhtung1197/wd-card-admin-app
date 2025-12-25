"use client";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { useCreateDomainMutation } from "@/store/Apis/Domain.api";
import {
  useGetTeamsLeadByMeQuery,
  useGetTeamsQuery,
} from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";
import { formatDomain } from "@/utils/common.util";
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

export const useCreateAdminLogic = () => {
  const t = useTranslations("CreateDomain");
  const [createDomain, { isLoading }] = useCreateDomainMutation();

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const router = useLocaleRouter();
  const ValidationSchema = createValidationSchema(t);

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );
  const userRole = admin?.role?.roleName;

  // Determine role-based behavior
  const isManagerRole = [
    ADMIN_ROLE.MANAGER,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.SUPER_ADMIN,
  ].includes(userRole as ADMIN_ROLE);
  const isTeamLeaderRole = [
    ADMIN_ROLE.TEAM_LEADER,
    ADMIN_ROLE.VICE_TEAM_LEADER,
  ].includes(userRole as ADMIN_ROLE);

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
          name: formatDomain(values?.name),
          status: values.status ?? "",
          type: values?.type,
          budget: formatBudgetToNumber(values?.budget),
        };

        // Add teamId for Manager/Assistant roles (OLD LOGIC)
        if (isManagerRole && values.teamId) {
          formData.teamId = Number(values.teamId);
        }

        // Add teamId for Team Leader roles when they select a team (NEW LOGIC - simplified)
        if (isTeamLeaderRole && selectedTeamId) {
          formData.teamId = Number(selectedTeamId);
        }

        const res: any = await createDomain(formData);
        if (res.error) {
          toast.error(res.error?.data?.message || "");
          return;
        }

        toast.success(t("success"));
        router.push(ROUTERS.MANAGEMENT_DOMAINS);
      } catch (err: any) {
        toast.error(t("error"));
      }
    },
    [t, isManagerRole, isTeamLeaderRole, selectedTeamId],
  );

  const initialFormValues = useMemo(() => {
    return {
      name: "",
      status: "",
      type: "",
      budget: "",
      teamId: "", // Both Manager and Team Leader use teamId now
    };
  }, []);

  // Get teams for Manager/Assistant roles (all teams)
  const { data: allTeamsData } = useGetTeamsQuery(
    {
      limit: 10,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isManagerRole,
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

  const { data: roles = [] } = useGetRolesQuery();

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

  // Team options for Manager/Assistant
  const teamOptions = useMemo(() => {
    if (!allTeamsData?.data) return [];

    return mappingDataOptions({
      data: allTeamsData.data,
      keyName: "id",
      labelName: "name",
    });
  }, [allTeamsData]);

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
    userRole,
    isManagerRole,
    isTeamLeaderRole,
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
