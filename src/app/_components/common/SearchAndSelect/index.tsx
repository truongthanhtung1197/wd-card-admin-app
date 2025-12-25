import React, { memo, useCallback, useMemo, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useParams } from "next/navigation";

import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import MyInput from "@/app/_components/form/MyInput";
import MySelect, { MySelectOption } from "@/app/_components/form/MySelect";
import SearchIcon from "@/app/_components/icons/SearchIcon";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import MyImage from "@/app/_components/image/Image";
import { TEAM_ROLE } from "@/constant/Team.constant";
import { useVisibility } from "@/hook";
import { User } from "@/model";
// import { useGetUsersByTeamIdQuery } from "@/store/Apis/Lead.api";
// import {
//   useGetAgentTeamRolesQuery,
//   useGetTeamRoleByTeamIdQuery,
// } from "@/store/Apis/Role.api";
import { cn, getFullName } from "@/utils/common.util";

import SearchResultItem from "./SearchResultItem";

import { debounce } from "lodash";

function SearchAndSelect({
  newMemberSelect: _newMemberSelect = [],
  handleAddNewMember,
  handleChangeRoleMember,
  setNewMemberSelect,
  oldMemberSelect = [],
}: {
  newMemberSelect?: any[];
  oldMemberSelect: any[];
  setNewMemberSelect?: (newMember: any[]) => void;
  handleAddNewMember?: (newMember: any) => void;
  handleChangeRoleMember?: (member: any, roleId: string) => void;
}) {
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [userSelectInput, setUserSelectInput] = useState<User | null>(null);
  const [roleSelected, setRoleSelected] = useState("");
  const { isVisible, hide, show } = useVisibility();

  const userMemberSelectedIds = useMemo(() => {
    return [...oldMemberSelect, ..._newMemberSelect]?.map((v) => v.id) || [];
  }, [oldMemberSelect, _newMemberSelect]);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      hide();
    },
  });
  const { teamId } = useParams<{ teamId: string }>();
  // const { data: users, isLoading } = useGetUsersByTeamIdQuery(
  //   {
  //     teamId: teamId || "",
  //     limit: limit,
  //     page: 1,
  //     status: AGENCY_STATUS.ACTIVE,
  //     search: trim(search),
  //   },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   },
  // );

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      setLimit(20);
    }, 500),
    [],
  );

  const handleSelectUser = useCallback(
    (user: User) => {
      setUserSelectInput(user);
      hide();
    },
    [setUserSelectInput, hide],
  );

  const onAddToList = useCallback(() => {
    if (!userSelectInput) return;
    handleAddNewMember?.({
      ...userSelectInput,
      roleId: roleSelected || "",
    });
    setUserSelectInput(null);
    setRoleSelected("");
  }, [userSelectInput, roleSelected, setRoleSelected]);

  const handleRemoveMember = useCallback(
    (member: any) => {
      setNewMemberSelect?.(
        _newMemberSelect?.filter((v) => v.id !== member.id) || [],
      );
    },
    [_newMemberSelect, setNewMemberSelect],
  );

  const userMemberSelectedrender = useMemo(() => {
    return (
      _newMemberSelect?.filter((v) => v.teamRole !== TEAM_ROLE.LEADER) || []
    );
  }, [_newMemberSelect]);

  return (
    <div>
      <div className="row gap-3">
        <div className="relative" ref={ref}>
          {userSelectInput ? (
            <SearchResultItem
              user={userSelectInput}
              onRemove={() => {
                setUserSelectInput(null);
              }}
            />
          ) : (
            <MyInput
              endContent={<SearchIcon />}
              className="h-[44px] !w-[276px]"
              placeholder="Search by name or email"
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => show()}
            />
          )}
          {/* {isVisible && (
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={users?.data?.length || 0}
              next={() => setLimit(limit + 20)}
              hasMore={(users?.total || 0) > (users?.data?.length || 0)}
              loader={isLoading && <p>Loading...</p>}
            >
              <div
                id="scrollableDiv"
                className="col absolute left-0 right-0 top-[calc(100%+4px)] z-10 h-[304px] w-[276px] gap-2 overflow-y-auto rounded-lg border border-neutral-stroke-bold bg-white py-3"
              >
                {users?.data?.map((v) => (
                  <SearchResultItem
                    disabled={userMemberSelectedIds.includes(v.id)}
                    user={v}
                    key={v.id}
                    onClick={() => handleSelectUser(v)}
                  />
                ))}
                {!users?.data?.length && !isLoading && (
                  <div className="center h-full">
                    <p className="text-neutral-element-secondary">
                      No user found
                    </p>
                  </div>
                )}
              </div>
            </InfiniteScroll>
          )} */}
        </div>
      </div>
      <div className="min-h-[350px] w-full">
        {!userMemberSelectedrender?.length && (
          <div className="center min-h-[350px]">
            <p className="text-neutral-element-secondary">No selected user</p>
          </div>
        )}
        {!!userMemberSelectedrender?.length && (
          <div className="mt-[30px] min-h-[350px]">
            <p>Total {userMemberSelectedrender?.length} users</p>
            <div className="my-2 h-[1px] w-full bg-neutral-stroke-light"></div>
            <div className="col gap-2">
              {userMemberSelectedrender?.map((v) => (
                <UserItem
                  key={`user-selected-` + v.id}
                  user={v}
                  onRemove={handleRemoveMember}
                  // teamRoleOptions={teamRoleOptions}
                  handleChangeRoleMember={handleChangeRoleMember}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const UserItem = ({
  user,
  onRemove,
  teamRoleOptions,
  handleChangeRoleMember,
}: {
  user: User;
  onRemove?: (member: any) => void;
  teamRoleOptions?: MySelectOption[];
  handleChangeRoleMember?: (member: any, roleId: string) => void;
}) => {
  const { teamId } = useParams<{ teamId: string }>();
  return (
    <>
      <div className={cn("row w-full items-center gap-3")}>
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          {user?.imagePath ? (
            <MyImage
              src={user?.imagePath}
              alt="User Avatar"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          ) : (
            <LetterAvatar letter={user?.firstName || ""} size={32} />
          )}
        </div>
        <div className="flex-1">
          <p className="line-clamp-1 block truncate text-base font-bold text-neutral-element-primary">
            {getFullName(user)}
          </p>
          <p className="line-clamp-1 block truncate text-sm font-medium text-neutral-element-secondary">
            {user?.email}
          </p>
        </div>
        <div>
          <MySelect
            isDisabled={!teamId}
            disallowEmptySelection={true}
            className="!w-[160px]"
            triggerClassName="h-[44px]"
            options={teamRoleOptions || []}
            selectedKeys={[user?.roleId || ""]}
            onChange={(e) => handleChangeRoleMember?.(user, e.target.value)}
          />
        </div>
        <div className="w-8 cursor-pointer" onClick={() => onRemove?.(user)}>
          <TrashIcon />
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-stroke-light"></div>
    </>
  );
};

export default memo(SearchAndSelect);
