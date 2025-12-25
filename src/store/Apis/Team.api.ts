import { TEAM_MEMBER_ROLE } from "@/constant/Team.constant";
import { GetListResponse } from "@/model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

// Team interfaces based on the API documentation
export interface TeamMember {
  userId: number;
  role: TEAM_MEMBER_ROLE;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  telegramId?: string;
  teamMembers: TeamMember[];
  createdAt: string;
  updatedAt: string;
  totalMember: number;
}

export interface CreateTeamDto {
  name: string;
  description: string;
  telegramId?: string;
  teamMembers: TeamMember[];
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
  telegramId?: string;
  telegramThreadId?: string;
  teamMembers?: TeamMember[];
}

export interface AddMemberToTeamDto {
  teamMembers: TeamMember[];
}

export interface GetTeamsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
}

export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
  teamId: string;
}

// Define a service using a base URL and expected endpoints
export const teamSlice = createApi({
  reducerPath: "team",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // Get all teams
    getTeams: builder.query<GetListResponse<Team>, GetTeamsParams>({
      query: (params) => {
        return `/teams?${covertObjectToSearchParams(params)}`;
      },
      providesTags: ["Team"],
    }),

    // Get teams that I lead (for Team Leaders)
    getTeamsLeadByMe: builder.query<GetListResponse<Team>, GetTeamsParams>({
      query: (params) => {
        return `/teams/lead-by-me?${covertObjectToSearchParams(params)}`;
      },
      providesTags: ["Team"],
    }),

    // Get team members by team ID
    getTeamMembers: builder.query<GetListResponse<any>, GetTeamMembersParams>({
      query: (params) => {
        return `/team-members?${covertObjectToSearchParams(params)}`;
      },
    }),

    // Get team by ID
    getTeamById: builder.query<
      {
        data: Team;
      },
      string
    >({
      query: (id) => {
        return {
          url: `/teams/${id}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Team", id }],
    }),

    // Create new team
    createTeam: builder.mutation<Team, CreateTeamDto>({
      query: (teamData) => {
        return {
          url: "/teams",
          method: "POST",
          body: teamData,
        };
      },
      invalidatesTags: ["Team"],
    }),

    // Update team by ID
    updateTeam: builder.mutation<Team, { id: string; data: UpdateTeamDto }>({
      query: ({ id, data }) => {
        return {
          url: `/teams/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        "Team",
      ],
    }),

    // Delete team by ID
    deleteTeam: builder.mutation<any, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),

    // Add member to team
    addMemberToTeam: builder.mutation<
      any,
      { id: string; memberData: AddMemberToTeamDto }
    >({
      query: ({ id, memberData }) => {
        return {
          url: `/teams/${id}/add-member`,
          method: "PATCH",
          body: memberData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        "Team",
      ],
    }),

    // Remove member from team
    removeMemberFromTeam: builder.mutation<
      any,
      { id: string; memberId: string }
    >({
      query: ({ id, memberId }) => ({
        url: `/teams/${id}/remove-member/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        "Team",
      ],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamsLeadByMeQuery,
  useGetTeamMembersQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useAddMemberToTeamMutation,
  useRemoveMemberFromTeamMutation,
} = teamSlice;
