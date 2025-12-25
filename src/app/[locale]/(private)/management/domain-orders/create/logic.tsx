"use client";
import { useCallback, useMemo, useRef, useState } from "react";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { DOMAIN_TYPE } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useAppSelector } from "@/store";
import { useOrderDomainsMutation } from "@/store/Apis/Domain.api";
import { useGetTeamsQuery } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";
import { apiResponseHandle, formatDomain } from "@/utils/common.util";

import { FormikProps } from "formik";
import { uniq } from "lodash";
import * as Yup from "yup";

export interface FormValues {
  domainsText: string;
  domainType: string;
  description: string;
  teamId?: string;
}

export const useCreateAdminLogic = () => {
  const [orderDomain, { isLoading }] = useOrderDomainsMutation();

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const router = useLocaleRouter();
  const ValidationSchema = createValidationSchema(formRef);
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const userRole = admin?.role?.roleName as ADMIN_ROLE | undefined;

  // Show team select for these roles
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

  // Fetch all teams when showing select
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
      history[ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST] ||
        ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST,
    );
  }, [setLeavePage, formRef]);

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      const tokens = (values.domainsText || "")
        .trim()
        .split(/\s+/)
        .filter((s) => !!s);

      // check unique domains name
      const domainNames = tokens;
      const uniqueDomainNames = new Set(domainNames);

      if (uniqueDomainNames.size !== domainNames.length) {
        const duplicateDomains = domainNames.filter(
          (domainName) =>
            domainNames.indexOf(domainName) !==
            domainNames.lastIndexOf(domainName),
        );
        toast.error(
          `Domain bị trùng nhau: ${uniq(duplicateDomains).join(", ")}`,
        );
        return;
      }

      const formattedDomains = tokens.map((name) => ({
        domainType: values.domainType || DOMAIN_TYPE.NORMAL,
        domainName: formatDomain(name),
      }));
      const formData: any = {
        orderItems: formattedDomains,
        description: values.description,
      };

      if (values.teamId) {
        formData.teamId = Number(values.teamId);
      }

      const res: any = await orderDomain(formData);

      apiResponseHandle({
        res,
        onSuccess: () => router.push(ROUTERS.MANAGEMENT_DOMAIN_ORDER_LIST),
      });
    } catch (err: any) {
      toast.error(`Something went wrong`);
    }
  }, []);

  const initialFormValues = useMemo(() => {
    return {
      domainsText: "",
      domainType: DOMAIN_TYPE.NORMAL,
      description: "",
      teamId: "",
    };
  }, []);

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
    isShowTeamSelect,
    getFilteredTeamsData,
  };
};

const createValidationSchema = (formRef: any) => {
  return Yup.object({
    domainsText: Yup.string()
      .required("Required")
      .test("validDomains", "Invalid domain name", (value) => {
        const tokens = (value || "").trim().split(/\s+/).filter(Boolean);
        if (tokens.length === 0) return false;
        return tokens.every((t) => isValidDomainOrUrl(t));
      })
      .test("uniqueDomains", function (value) {
        const tokens = (value || "").trim().split(/\s+/).filter(Boolean);
        const duplicates = tokens.filter((d, i, arr) => arr.indexOf(d) !== i);
        if (duplicates.length === 0) return true;
        return this.createError({
          message: `Bạn nhập trùng domain: ${uniq(duplicates).join(", ")}`,
        });
      }),

    domainType: Yup.string()
      .required("Required")
      .oneOf(Object.values(DOMAIN_TYPE) as string[]),

    description: Yup.string().required("Required"),
  });
};

export function isValidDomainOrUrl(input: string): boolean {
  if (!input) return false;

  let hostname = input.trim();

  try {
    // Nếu có protocol thì parse bằng URL
    const hasProtocol = /^https?:\/\//i.test(hostname);
    const url = new URL(hasProtocol ? hostname : `http://${hostname}`);
    hostname = url.hostname;
  } catch {
    // fallback: tự lấy domain (bỏ http, https, www, path)
    hostname = hostname
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/\/.*$/, "");
  }

  // Regex domain hợp lệ
  const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
  return regex.test(hostname);
}
