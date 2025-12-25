"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import { toast } from "@/app/_components/common/Toaster";
import TextareaInput from "@/app/_components/formik/FTextareaInput";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import {
  TEAM_MEMBER_ROLE,
  TEAM_MEMBER_ROLE_OPTIONS,
} from "@/constant/Team.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import {
  CreateTeamDto,
  TeamMember,
  useCreateTeamMutation,
} from "@/store/Apis/Team.api";
import { apiResponseHandle } from "@/utils/common.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { Avatar, Select, SelectItem } from "@nextui-org/react";

import AddMemberModal from "../_components/AddMemberModal";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const CreateTeamView = () => {
  const t = useTranslations("Teams");
  const router = useLocaleRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddLeaderModalOpen, setIsAddLeaderModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<
    (TeamMember & { user?: any })[]
  >([]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("createEdit.validation.nameRequired")),
    telegramId: Yup.string().notRequired(),
  });

  const [createTeam] = useCreateTeamMutation();

  // Get users as fallback (reduced limit since we store user info from modal)
  const { data: usersData } = useGetAdminsQuery(
    {
      limit: 5,
      page: 1,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // Helper function to check if user is SEOER
  const isUserSeoer = (user: any): boolean => {
    if (!user) return false;

    // Check by role ID first (most reliable)
    const roleId = user?.role?.id || user?.roleId || user?.role_id;
    if (roleId === 2 || roleId === "2") {
      return true;
    }

    // Fallback to role name check
    const userRoleName = user?.role?.roleName;
    if (!userRoleName) return false;

    return (
      userRoleName === ADMIN_ROLE.SEOER ||
      userRoleName.toUpperCase() === "SEOER" ||
      userRoleName.toLowerCase() === "seoer" ||
      userRoleName === "Seoer"
    );
  };

  // Helper function to get available role options based on user's current role
  const getAvailableRoleOptions = (user: any) => {
    if (!user) {
      return TEAM_MEMBER_ROLE_OPTIONS;
    }

    const isSeoer = isUserSeoer(user);

    // If user is SEOER, only show Member role
    if (isSeoer) {
      return TEAM_MEMBER_ROLE_OPTIONS.filter(
        (option) => option.key === TEAM_MEMBER_ROLE.MEMBER,
      );
    }

    // For other roles, show all options
    return TEAM_MEMBER_ROLE_OPTIONS;
  };

  const handleSubmit = async (values: {
    name: string;
    description: string;
    telegramId?: string;
  }) => {
    if (teamMembers.length === 0) {
      toast.error(t("createEdit.validation.membersRequired"));
      return;
    }

    try {
      setIsLoading(true);

      // Ensure teamMembers only contains userId and role (strip user info)
      const cleanTeamMembers: TeamMember[] = teamMembers.map((member) => ({
        userId: member.userId,
        role: member.role,
      }));

      const teamData: CreateTeamDto = {
        name: values.name,
        description: values.description,
        teamMembers: cleanTeamMembers,
        ...(values.telegramId && values.telegramId.trim()
          ? { telegramId: values.telegramId.trim() }
          : {}),
      };

      const response = await createTeam(teamData);

      apiResponseHandle({
        res: response,
        onSuccess: () => {
          toast.success(t("createEdit.messages.createSuccess"));
          router.push(ROUTERS.MANAGEMENT_TEAMS);
        },
      });
    } catch (error) {
      toast.error(t("createEdit.messages.createError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = (userId: number, role: string, userInfo?: any) => {
    const newMember = {
      userId,
      role: role as TEAM_MEMBER_ROLE,
      user: userInfo, // Store user info from modal
    };

    setTeamMembers((prev) => [...prev, newMember]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMemberRole = (index: number, role: string) => {
    const member = teamMembers[index];
    // Use stored user info from member if available, fallback to API data
    const user =
      member.user || usersData?.data?.find((u: any) => u.id === member.userId);

    // Check if the new role is valid for the user's current role
    const availableOptions = getAvailableRoleOptions(user);
    const isValidRole = availableOptions.some((option) => option.key === role);

    if (!isValidRole) {
      toast.error(t("createEdit.validation.invalidRole"));
      return;
    }

    setTeamMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, role: role as TEAM_MEMBER_ROLE } : member,
      ),
    );
  };

  const handleGoBack = () => {
    router.push(ROUTERS.MANAGEMENT_TEAMS);
  };

  const existingMemberIds = teamMembers.map((member) => member.userId);

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto max-w-[800px] px-4 pt-6">
        <Formik
          initialValues={{ name: "", description: "", telegramId: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className="col relative w-full">
              {/* Basic Information */}
              <div className="mb-3 flex flex-col gap-5 rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                <h5>{t("createEdit.fields.basicInfo")}</h5>
                <div className="grid grid-cols-1 gap-4">
                  <TextInput
                    label={`${t("createEdit.fields.teamName")}`}
                    name="name"
                    placeholder={t("createEdit.placeholders.teamName")}
                    isRequired
                  />
                  <TextInput
                    label="Telegram ID"
                    name="telegramId"
                    placeholder="Enter Telegram ID (optional)"
                  />
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
                {teamMembers.length > 0 ? (
                  <div className="space-y-4">
                    <h6 className="text-base font-medium text-neutral-element-secondary">
                      {t("createEdit.messages.currentMembers")} (
                      {teamMembers.length})
                    </h6>
                    {teamMembers.map((member, index) => {
                      // Use stored user info from member if available, fallback to API data
                      const user =
                        member.user ||
                        usersData?.data?.find(
                          (u: any) => u.id === member.userId,
                        );

                      const availableRoleOptions =
                        getAvailableRoleOptions(user);

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border bg-gray-50 p-4"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar
                              size="md"
                              name={user?.username}
                              src={(user as any)?.avatar || undefined}
                            />
                            <div>
                              <p className="text-lg font-medium">
                                {user?.username || `User ${member.userId}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                {user?.email}
                              </p>
                              <p className="!text-xs !text-gray-500">
                                (
                                {getLabelFromOptions(
                                  user?.role?.roleName,
                                  ADMIN_ROLE_OPTIONS,
                                )}
                                )
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Select
                              placeholder={t("createEdit.fields.selectRole")}
                              selectedKeys={member.role ? [member.role] : []}
                              onSelectionChange={(keys) => {
                                const selectedKey = Array.from(
                                  keys,
                                )[0] as string;
                                updateMemberRole(index, selectedKey);
                              }}
                              className="w-48"
                              size="md"
                            >
                              {availableRoleOptions.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <button
                              type="button"
                              onClick={() => removeTeamMember(index)}
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

              {/* Action Buttons */}
              <div className="flex w-full justify-end gap-3 bg-neutral-surface py-4">
                <MyButton bSize="small" bType="neutral" onClick={handleGoBack}>
                  {t("createEdit.buttons.cancel")}
                </MyButton>
                <MyButton
                  bSize="small"
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {t("createEdit.buttons.createTeam")}
                </MyButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
        existingMemberIds={existingMemberIds}
        teamId="" // Empty teamId for create mode
        roleType="member"
      />

      {/* Add Leader Modal */}
      <AddMemberModal
        isOpen={isAddLeaderModalOpen}
        onClose={() => setIsAddLeaderModalOpen(false)}
        onAddMember={handleAddMember}
        existingMemberIds={existingMemberIds}
        teamId="" // Empty teamId for create mode
        roleType="leader"
      />
    </div>
  );
};

export default CreateTeamView;
