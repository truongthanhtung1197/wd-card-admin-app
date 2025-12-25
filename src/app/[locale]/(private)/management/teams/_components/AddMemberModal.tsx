"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import { toast } from "@/app/_components/common/Toaster";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  TEAM_MEMBER_ROLE,
  TEAM_MEMBER_ROLE_OPTIONS,
} from "@/constant/Team.constant";
import { User69vn } from "@/model/User.model";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { useAddMemberToTeamMutation } from "@/store/Apis/Team.api";
import { apiResponseHandle } from "@/utils/common.util";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import SearchUserItem from "../../../seoer/services/_components/SearchUserItem";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember?: (userId: number, role: string, userInfo?: any) => void;
  existingMemberIds: number[];
  teamId: string;
  onSuccess?: () => void;
  roleType?: "member" | "leader"; // New prop to control filtering
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
  existingMemberIds,
  teamId,
  onSuccess,
  roleType = "member",
}) => {
  const t = useTranslations("Teams");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(
    roleType === "member" ? TEAM_MEMBER_ROLE.MEMBER : TEAM_MEMBER_ROLE.LEADER,
  );
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState<string | undefined>("");
  const [isAddingMember, setIsAddingMember] = useState(false);

  const [addMemberToTeam] = useAddMemberToTeamMutation();

  // Determine role filter based on roleType prop
  const roleFilter = useMemo(() => {
    if (roleType === "member") {
      // For members, only show SEOERs
      return [ADMIN_ROLE.SEOER];
    } else {
      // For leaders, show all roles except SEOER
      return [
        ADMIN_ROLE.TEAM_LEADER,
        ADMIN_ROLE.VICE_TEAM_LEADER,
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.ASSISTANT,
      ];
    }
  }, [roleType]);
  const { data: usersData, isLoading: isLoadingUsers } = useGetAdminsQuery(
    {
      limit: limit,
      page: 1,
      role: roleFilter,
      search: search,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // Filter out users that are already team members
  const filteredUsersData = usersData
    ? {
        ...usersData,
        data: usersData.data.filter(
          (user: any) => !existingMemberIds.includes(user.id),
        ),
      }
    : undefined;

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

  // Get available role options based on selected user's current role
  const availableRoleOptions = useMemo(() => {
    if (!selectedUser) {
      return TEAM_MEMBER_ROLE_OPTIONS;
    }

    const isSeoer = isUserSeoer(selectedUser);

    // If selected user is SEOER, only show Member role
    if (isSeoer) {
      return TEAM_MEMBER_ROLE_OPTIONS.filter(
        (option) => option.key === TEAM_MEMBER_ROLE.MEMBER,
      );
    }

    // For other roles, show all options
    return TEAM_MEMBER_ROLE_OPTIONS;
  }, [selectedUser]);

  // Reset selected role when user changes and if current role is not available
  React.useEffect(() => {
    if (selectedUser && isUserSeoer(selectedUser)) {
      setSelectedRole(TEAM_MEMBER_ROLE.MEMBER);
    }
  }, [selectedUser]);

  // Set initial role based on roleType
  React.useEffect(() => {
    setSelectedRole(
      roleType === "member" ? TEAM_MEMBER_ROLE.MEMBER : TEAM_MEMBER_ROLE.LEADER,
    );
  }, [roleType]);

  const handleAddMember = async () => {
    if (!selectedUser || !selectedRole) {
      toast.error(t("modal.addMember.selectFullInfo"));
      return;
    }

    // If teamId is empty/not provided, this is create mode - just call callback
    if (!teamId || teamId === "") {
      if (onAddMember) {
        onAddMember(selectedUser.id, selectedRole, selectedUser);
        handleClose();
      }
      return;
    }

    // Edit mode - call API directly
    try {
      setIsAddingMember(true);

      const memberData = {
        teamMembers: [
          {
            userId: selectedUser.id,
            role: selectedRole as TEAM_MEMBER_ROLE,
          },
        ],
      };

      const addResponse = await addMemberToTeam({
        id: teamId,
        memberData,
      });

      apiResponseHandle({
        res: addResponse,
        onSuccess: () => {
          onSuccess?.();
          handleClose();

          toast.success(t("modal.addMember.addMemberSuccess"));
        },
      });
    } catch (error) {
      toast.error(t("modal.addMember.addMemberError"));
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleClose = () => {
    setSelectedUser(null);
    setSelectedRole(
      roleType === "member" ? TEAM_MEMBER_ROLE.MEMBER : TEAM_MEMBER_ROLE.LEADER,
    );
    setSearch("");
    setLimit(20);
    onClose();
  };

  const modalTitle =
    roleType === "member"
      ? t("modal.addMember.titleMember")
      : t("modal.addMember.titleLeader");
  const userTypeLabel = roleType === "member" ? "SEOER" : "Leader/Vice Leader";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-w-3xl min-h-[60vh] max-h-[75vh]",
        body: "py-6 px-8 min-h-[35vh]",
        header: "px-8 py-6",
        footer: "px-8 py-6",
      }}
    >
      <ModalContent className="min-h-[60vh]">
        <ModalHeader className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{modalTitle}</h3>
        </ModalHeader>
        <ModalBody className="flex-1">
          <div className="h-full space-y-8">
            {/* User Selection with SearchableSelect */}
            <div className="space-y-4">
              <div className="w-full">
                <SearchableSelect
                  renderItem={({ item, onClick, onRemove }) => {
                    const _onRemove = onRemove
                      ? () => {
                          onRemove?.();
                          setSelectedUser(null);
                        }
                      : undefined;
                    return (
                      <SearchUserItem
                        data={item as User69vn}
                        onClick={onClick}
                        onRemove={_onRemove}
                      />
                    );
                  }}
                  placeholder={
                    roleType === "member"
                      ? t("modal.addMember.searchSeoer")
                      : t("modal.addMember.searchLeader")
                  }
                  limit={limit}
                  setLimit={setLimit}
                  setSearch={setSearch}
                  setValueSelected={(value: any) => {
                    setSelectedUser(value);
                  }}
                  valueSelected={selectedUser}
                  data={filteredUsersData}
                  isLoading={isLoadingUsers}
                  inputClassname="!w-full !h-12 !text-base"
                />
              </div>
            </div>

            {/* Role Selection for Leaders */}
            {roleType === "leader" && selectedUser && (
              <div className="space-y-4">
                <label className="block text-base font-medium">
                  {t("modal.addMember.selectRole")}
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(TEAM_MEMBER_ROLE.LEADER)}
                    className={`flex-1 rounded-lg border-2 px-6 py-3 text-center font-medium transition-all ${
                      selectedRole === TEAM_MEMBER_ROLE.LEADER
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Leader
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRole(TEAM_MEMBER_ROLE.VICE_LEADER)
                    }
                    className={`flex-1 rounded-lg border-2 px-6 py-3 text-center font-medium transition-all ${
                      selectedRole === TEAM_MEMBER_ROLE.VICE_LEADER
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Vice Leader
                  </button>
                </div>
              </div>
            )}

            {/* Selected User Preview */}
            {selectedUser && (
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
                <p className="mb-4 text-base font-medium">
                  {t("modal.addMember.memberInfo")}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar
                    size="md"
                    name={selectedUser.username}
                    src={selectedUser.avatar}
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium">
                      {selectedUser.username}
                    </p>
                    <p className="mb-1 text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                    <p className="mb-2 text-sm text-gray-500">
                      {t("modal.addMember.systemRole")}{" "}
                      {selectedUser.role?.roleName}
                    </p>
                    <p className="text-base font-medium text-blue-600">
                      {t("modal.addMember.teamRole")}{" "}
                      {
                        TEAM_MEMBER_ROLE_OPTIONS.find(
                          (opt) => opt.key === selectedRole,
                        )?.label
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="gap-4 pt-6">
          <MyButton
            bType="neutral"
            onClick={handleClose}
            className="px-8 py-3 text-base"
            disabled={isAddingMember}
          >
            {t("modal.addMember.cancel")}
          </MyButton>
          <MyButton
            bType="primary"
            onClick={handleAddMember}
            isDisabled={!selectedUser || !selectedRole || isAddingMember}
            isLoading={isAddingMember}
            className="px-8 py-3 text-base"
          >
            {modalTitle}
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberModal;
