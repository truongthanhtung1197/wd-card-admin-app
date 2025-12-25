"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import { toast } from "@/app/_components/common/Toaster";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import TextareaInput from "@/app/_components/formik/FTextareaInput";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  TEAM_MEMBER_ROLE,
  TEAM_MEMBER_ROLE_OPTIONS,
} from "@/constant/Team.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import {
  TeamMember,
  useAddMemberToTeamMutation,
  useGetTeamByIdQuery,
  useRemoveMemberFromTeamMutation,
  useUpdateTeamMutation,
} from "@/store/Apis/Team.api";
import { apiResponseHandle } from "@/utils/common.util";
import { Select, SelectItem } from "@nextui-org/react";

import AddMemberModal from "../../_components/AddMemberModal";
import TelegramIdGuideModal from "../../_components/TelegramIdGuideModal";

import { Form, Formik } from "formik";
import * as Yup from "yup";

// Extended type to include user data from API response
type TeamMemberWithUser = TeamMember & {
  user: any;
};

const DeleteConfirmModal = dynamic(
  () => import("@/app/_components/common/DeleteConfirmModal"),
  {
    ssr: false,
  },
);

interface EditTeamViewProps {
  teamId: string;
}

const EditTeamView = ({ teamId }: EditTeamViewProps) => {
  const t = useTranslations("Teams");
  const router = useLocaleRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddLeaderModalOpen, setIsAddLeaderModalOpen] = useState(false);
  const [memberActionLoading, setMemberActionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  // Delete confirmation state
  const [deleteConfirmMember, setDeleteConfirmMember] = useState<{
    member: TeamMemberWithUser;
    index: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("createEdit.validation.nameRequired")),
    telegramId: Yup.string().optional(),
    telegramThreadId: Yup.string().optional(),
  });

  const [updateTeam] = useUpdateTeamMutation();
  const [addMemberToTeam] = useAddMemberToTeamMutation();
  const [removeMemberFromTeam] = useRemoveMemberFromTeamMutation();

  const {
    data: teamData,
    isLoading: isLoadingTeam,
    error,
    refetch: refetchTeam,
  } = useGetTeamByIdQuery(teamId, {
    skip: !teamId,
    refetchOnMountOrArgChange: true,
  });

  // No need to fetch users separately - team API returns user data

  const initialValues = useMemo(() => {
    const team = (teamData as any)?.data || teamData;
    return {
      name: team?.name || "",
      description: team?.description || "",
      telegramId: team?.telegramId || "",
      telegramThreadId: team?.telegramThreadId || "",
    };
  }, [teamData]);

  const [teamMembers, setTeamMembers] = useState<TeamMemberWithUser[]>([]);

  const sortedTeamMembers = useMemo(() => {
    const roleOrder: Record<TeamMemberWithUser["role"], number> = {
      [TEAM_MEMBER_ROLE.LEADER]: 0,
      [TEAM_MEMBER_ROLE.VICE_LEADER]: 1,
      [TEAM_MEMBER_ROLE.MEMBER]: 2,
    };

    return [...teamMembers].sort(
      (a, b) => (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99),
    );
  }, [teamMembers]);

  // Helper function to extract role name from user data (handles multiple API formats)
  const getUserRoleName = (user: any): string | null => {
    if (!user) return null;

    // Try different possible paths for role data
    const rolePaths = [
      user?.role?.roleName, // Standard format
      user?.roleData?.roleName, // Alternative format
      user?.role?.name, // Another format
      user?.roleName, // Direct property
      user?.role, // Direct role string
      user?.userRole, // Another alternative
      user?.adminRole, // Admin role format
    ];

    for (const rolePath of rolePaths) {
      if (rolePath && typeof rolePath === "string") {
        return rolePath;
      }
    }

    return null;
  };

  // Helper function to check if user is SEOER (handles multiple formats)
  const isUserSeoer = (user: any): boolean => {
    if (!user) return false;

    // Check by role ID first (most reliable)
    const roleId = user?.role?.id || user?.roleId || user?.role_id;
    if (roleId === 2 || roleId === "2") {
      return true;
    }

    // Fallback to role name check
    const userRoleName = getUserRoleName(user);
    if (!userRoleName) return false;

    // Check multiple formats of SEOER role (case insensitive)
    return (
      userRoleName === ADMIN_ROLE.SEOER ||
      userRoleName.toUpperCase() === "SEOER" ||
      userRoleName.toLowerCase() === "seoer" ||
      userRoleName === "Seoer"
    );
  };

  // Helper function to get available role options based on user's current role
  const getAvailableRoleOptions = (user: any) => {
    const isSeoer = isUserSeoer(user);

    if (!user) {
      return TEAM_MEMBER_ROLE_OPTIONS;
    }

    // If user is SEOER, only show Member role
    if (isSeoer) {
      return TEAM_MEMBER_ROLE_OPTIONS.filter(
        (option) => option.key === TEAM_MEMBER_ROLE.MEMBER,
      );
    }

    // For other roles, show all options
    return TEAM_MEMBER_ROLE_OPTIONS;
  };

  // Helper function to extract clean member data with user info
  const extractCleanMember = (member: any): TeamMemberWithUser | null => {
    const userId = member.userId || member.user?.id || member.id;
    const role = member.role;
    const user = member.user;

    if (!userId || !role) return null;

    return {
      userId: Number(userId),
      role: role as TEAM_MEMBER_ROLE,
      user: user, // Include user data
    };
  };

  // Populate teamMembers from teamData, ensuring clean format
  useEffect(() => {
    if (teamData) {
      // Handle both direct Team object and wrapped response
      const team = (teamData as any)?.data || teamData;
      const members = team?.teamMembers;
      if (members && Array.isArray(members)) {
        // Transform to clean format using helper function
        const cleanMembers = members
          .map((member: any) => extractCleanMember(member))
          .filter((member): member is TeamMemberWithUser => member !== null);

        setTeamMembers(cleanMembers);
      } else {
        setTeamMembers([]);
      }
    }
  }, [teamData]);

  // Handle form submit - only update basic info (name, description)
  const handleSubmit = async (values: {
    name: string;
    description: string;
    telegramId?: string;
    telegramThreadId?: string;
  }) => {
    try {
      setIsLoading(true);

      // Only update basic team information (name, description)
      const basicUpdateData = {
        name: values.name,
        description: values.description,
        ...(values.telegramId && values.telegramId.trim()
          ? { telegramId: values.telegramId.trim() }
          : {}),
        ...(values.telegramThreadId && values.telegramThreadId.trim()
          ? { telegramThreadId: values.telegramThreadId.trim() }
          : {}),
      };

      const basicUpdateResponse = await updateTeam({
        id: teamId,
        data: basicUpdateData,
      });

      if ("error" in basicUpdateResponse) {
        toast.error(t("createEdit.messages.updateError"));
        return;
      }

      toast.success(t("createEdit.messages.updateSuccess"));
      router.push(ROUTERS.MANAGEMENT_TEAMS);
    } catch (error) {
      console.error("❌ Submit error:", error);
      toast.error(t("createEdit.messages.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful member addition from modal
  const handleMemberAddSuccess = async () => {
    // Refetch team data to get updated member list
    await refetchTeam();
  };

  // Show delete confirmation modal
  const showDeleteConfirm = (member: TeamMemberWithUser, index: number) => {
    setDeleteConfirmMember({ member, index });
  };

  // Close delete confirmation modal
  const closeDeleteConfirm = () => {
    setDeleteConfirmMember(null);
  };

  // Remove member - call API after confirmation
  const confirmRemoveTeamMember = async () => {
    if (!deleteConfirmMember) return;

    const { member } = deleteConfirmMember;

    try {
      setIsDeleting(true);

      const removeResponse = await removeMemberFromTeam({
        id: teamId,
        memberId: String(member.userId),
      });

      apiResponseHandle({
        res: removeResponse,
        onSuccess: async () => {
          refetchTeam();
          closeDeleteConfirm();
          toast.success(t("createEdit.messages.removeMemberSuccess"));
        },
      });

      // Refetch team data to get updated member list
    } catch (error) {
      console.error("❌ Error removing member:", error);
      toast.error(t("createEdit.messages.removeMemberError"));
    } finally {
      setIsDeleting(false);
    }
  };

  // Update member role - call API immediately (remove + add with new role)
  const updateMemberRole = async (
    member: TeamMemberWithUser,
    newRole: string,
    index: number,
  ) => {
    if (member.role === newRole) return; // No change needed

    // Check if the new role is valid for the user's current role
    const user = member.user;
    const availableOptions = getAvailableRoleOptions(user);
    const isValidRole = availableOptions.some(
      (option) => option.key === newRole,
    );

    if (!isValidRole) {
      toast.error(t("createEdit.validation.invalidRole"));
      return;
    }

    try {
      setMemberActionLoading({ [`role-${member.userId}`]: true });

      // First remove the member
      const removeResponse = await removeMemberFromTeam({
        id: teamId,
        memberId: String(member.userId),
      });

      if ("error" in removeResponse) {
        console.error(
          "❌ Error removing member for role change:",
          removeResponse.error,
        );
        toast.error(t("createEdit.messages.updateRoleError"));
        return;
      }

      // Then add them back with new role
      const addResponse = await addMemberToTeam({
        id: teamId,
        memberData: {
          teamMembers: [
            {
              userId: member.userId,
              role: newRole as TEAM_MEMBER_ROLE,
            },
          ],
        },
      });

      if ("error" in addResponse) {
        console.error(
          "❌ Error re-adding member with new role:",
          addResponse.error,
        );
        toast.error(t("createEdit.messages.updateRoleError"));
        return;
      }

      // Refetch team data to get updated member list
      await refetchTeam();
      toast.success(t("createEdit.messages.updateRoleSuccess"));
    } catch (error) {
      console.error("❌ Error updating member role:", error);
      toast.error(t("createEdit.messages.updateRoleError"));
    } finally {
      setMemberActionLoading((prev) => ({
        ...prev,
        [`role-${member.userId}`]: false,
      }));
    }
  };

  const handleGoBack = () => {
    router.push(ROUTERS.MANAGEMENT_TEAMS);
  };

  const existingMemberIds = teamMembers.map((member) => member.userId);

  if (isLoadingTeam) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-neutral-surface">
        <p>{t("createEdit.messages.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-neutral-surface">
        <p>{t("createEdit.messages.errorLoadingTeam")}</p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-neutral-surface">
        <p>{t("createEdit.messages.noTeamData")}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto max-w-[800px] px-4 pt-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <Form className="col relative w-full">
              {/* Basic Information */}
              <div className="mb-3 flex flex-col gap-5 rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                <div className="flex items-center justify-between">
                  <h5>{t("createEdit.fields.basicInfo")}</h5>
                  <div className="flex gap-3">
                    <MyButton
                      bSize="small"
                      bType="neutral"
                      onClick={handleGoBack}
                    >
                      {t("createEdit.buttons.cancel")}
                    </MyButton>
                    <MyButton
                      bSize="small"
                      type="submit"
                      disabled={isLoading}
                      isLoading={isLoading}
                    >
                      {t("createEdit.buttons.update")}
                    </MyButton>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <TextInput
                    label={`${t("createEdit.fields.teamName")}`}
                    name="name"
                    placeholder={t("createEdit.placeholders.teamName")}
                    isRequired
                  />
                  <div className="flex flex-col gap-2">
                    <TelegramIdGuideModal />
                    <TextInput
                      name="telegramId"
                      placeholder="Enter Telegram Group ID"
                    />
                    <TextInput
                      name="telegramThreadId"
                      placeholder="Enter Telegram Thread ID (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-base font-medium text-neutral-element-secondary">
                      {t("createEdit.fields.description")}
                    </label>
                    <TextareaInput
                      name="description"
                      placeholder={t("createEdit.placeholders.description")}
                    />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-3 flex flex-col gap-5 rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                <div className="flex items-center justify-between">
                  <h5>{t("createEdit.fields.teamMembers")} *</h5>
                  <div className="flex gap-3">
                    <MyButton
                      type="button"
                      bType="secondary"
                      bSize="small"
                      onClick={() => setIsAddMemberModalOpen(true)}
                    >
                      {t("createEdit.buttons.addMemberButton")}
                    </MyButton>
                    <MyButton
                      type="button"
                      bType="primary"
                      bSize="small"
                      onClick={() => setIsAddLeaderModalOpen(true)}
                    >
                      {t("createEdit.buttons.addLeaderButton")}
                    </MyButton>
                  </div>
                </div>
                {/* Current Members */}
                {sortedTeamMembers.length > 0 ? (
                  <div className="space-y-4">
                    <h6 className="text-base font-medium text-neutral-element-secondary">
                      {t("createEdit.messages.currentMembers")} (
                      {sortedTeamMembers.length})
                    </h6>
                    {sortedTeamMembers.map((member, index) => {
                      const user = (member as any).user;
                      const isRoleLoading =
                        memberActionLoading[`role-${member.userId}`];

                      const userRoleName = getUserRoleName(user);
                      const isSeoer = isUserSeoer(user);

                      let availableRoleOptions = getAvailableRoleOptions(user);

                      // Safety check: Force Member-only for SEOER users
                      if (isSeoer && availableRoleOptions.length > 1) {
                        availableRoleOptions = TEAM_MEMBER_ROLE_OPTIONS.filter(
                          (option) => option.key === TEAM_MEMBER_ROLE.MEMBER,
                        );
                      }

                      return (
                        <div
                          key={`${member.userId}-${index}`}
                          className="flex items-center justify-between rounded-lg border bg-gray-50 p-4"
                        >
                          <div className="flex items-center gap-4">
                            <UserInformationV2 user={user} />

                            {/* <div>
                              <p className="text-lg font-medium">
                                {user?.username || `User ${member.userId}`}
                                {userRoleName && (
                                  <span className="ml-1 text-sm font-normal text-gray-500">
                                    ({userRoleName})
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                {user?.email}
                              </p>
                            </div> */}
                          </div>
                          <div className="flex items-center gap-4">
                            <Select
                              placeholder={t("createEdit.fields.selectRole")}
                              selectedKeys={member.role ? [member.role] : []}
                              onSelectionChange={(keys) => {
                                const selectedKey = Array.from(
                                  keys,
                                )[0] as string;
                                updateMemberRole(member, selectedKey, index);
                              }}
                              className="w-48"
                              size="md"
                              isDisabled={isRoleLoading}
                              isLoading={isRoleLoading}
                            >
                              {availableRoleOptions.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <button
                              type="button"
                              onClick={() => showDeleteConfirm(member, index)}
                              className="rounded-lg p-3 text-red-500 transition-colors hover:bg-red-50"
                              title="Remove member"
                            >
                              <TrashIcon color="#ef4444" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center text-gray-500">
                    <p className="text-lg">
                      {t("createEdit.messages.noMembers")}
                    </p>
                    <p className="text-base">
                      {t("createEdit.messages.addMemberInstruction")}
                    </p>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        teamId={teamId}
        onSuccess={handleMemberAddSuccess}
        existingMemberIds={existingMemberIds}
        roleType="member"
      />

      {/* Add Leader Modal */}
      <AddMemberModal
        isOpen={isAddLeaderModalOpen}
        onClose={() => setIsAddLeaderModalOpen(false)}
        teamId={teamId}
        onSuccess={handleMemberAddSuccess}
        existingMemberIds={existingMemberIds}
        roleType="leader"
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmMember && (
        <DeleteConfirmModal
          onConfirm={confirmRemoveTeamMember}
          onClose={closeDeleteConfirm}
          isLoading={isDeleting}
          open={!!deleteConfirmMember}
          title={t("modal.deleteMember.title")}
          message={t("modal.deleteMember.message")}
        />
      )}
    </div>
  );
};

export default EditTeamView;
