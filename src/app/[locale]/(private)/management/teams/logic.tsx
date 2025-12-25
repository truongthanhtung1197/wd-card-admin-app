import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { useAppSelector } from "@/store";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { Team, useGetTeamsQuery } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { formatDateTime } from "@/utils/format.util";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnTeams from "./ActionColumnTeams";

const useTeamsLogic = () => {
  const searchParams = useSearchParams();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("Teams");

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetTeamsQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      sortBy: sortBy as string,
      sortOrder: (sortOrder as "ASC" | "DESC") || "DESC",
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // Get all users to display leader details
  const { data: usersData } = useGetAdminsQuery(
    {
      limit: 10,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<Team>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("name", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.name")}</p>,
        size: 180,
        meta: {
          className: "text-left",
        },
      }),
      columnHelper.accessor("description", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium text-gray-600">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.description")}</p>,
        size: 300,
        meta: {
          className: "text-left",
        },
      }),
      columnHelper.accessor("teamLeaders" as any, {
        cell: (info) => {
          const leaders = (info.getValue() as any[]) || [];
          if (leaders.length === 0) {
            return (
              <p className="text-left text-sm italic text-gray-400">
                {t("columns.noLeaders")}
              </p>
            );
          }

          return (
            <div className="flex flex-col gap-1.5">
              {leaders.map((leader: any, index: number) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <UserInformationV2 user={leader?.user} />
                  </div>
                );
              })}
            </div>
          );
        },
        header: () => <p className="text-left">{t("columns.leaders")}</p>,
        size: 280,
        meta: {
          className: "text-left",
        },
      }),
      columnHelper.accessor("totalMember", {
        cell: (info) => (
          <div className="text-center">
            <span className="rounded-full  px-2 py-1 text-sm font-medium">
              {info.getValue() || 0}
            </span>
          </div>
        ),
        header: () => (
          <p className="whitespace-nowrap text-center">
            {t("columns.memberCount")}
          </p>
        ),
        size: 140,
        meta: {
          className: "text-center",
        },
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <p className="truncate text-sm font-medium text-gray-600">
            {formatDateTime((info.getValue() as unknown as string) || "")}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="createdAt">
            <p className="whitespace-nowrap text-left">
              {t("columns.createdAt")}
            </p>
          </SortableHeader>
        ),
        size: 130,
        meta: {
          className: "text-left",
        },
      }),
    ];
    {
      result.push(
        columnHelper.display({
          id: "action",
          header: () => <>{t("columns.action")}</>,
          cell: (cell) => {
            return (
              <ActionColumnTeams
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.data?.length || 0}
              />
            );
          },
          size: 80,
          meta: {
            className: "text-center px-0",
          },
        }) as any,
      );
    }

    return result;
  }, [admin, t, data?.data?.length, refetch, usersData]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
  };
};

export { useTeamsLogic };
export type { Team };
