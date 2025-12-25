"use client";

import React, { memo, useMemo, useState } from "react";

import { ROUTERS } from "@/constant";
import { ModuleEnum, PermissionEnum } from "@/constant/Permission.constant";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { cn } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import Text from "../../common/Text";
import LinkAltIcon from "../../icons/LinkAltIcon";
import SettingIcon2 from "../../icons/SettingIcon2";

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);

  const systemRouter = useMemo(() => {
    if (
      checkPermission({
        permission: rolePermission,
        accessKeys: [ModuleEnum.USER_MGMT],
      })
    ) {
      return ROUTERS.USER_ACTIVE;
    }
    if (
      checkPermission({
        permission: rolePermission,
        accessKeys: [
          PermissionEnum.ALL_TEAM_MGMT_VIEW,
          PermissionEnum.ALL_TEAM_MGMT_EDIT,
          PermissionEnum.ALL_TEAM_MGMT_DELETE,
        ],
      })
    ) {
      return ROUTERS.TEAM_ACTIVE;
    }
    if (
      checkPermission({
        permission: rolePermission,
        accessKeys: [
          PermissionEnum.USER_ROLE_MGMT,
          PermissionEnum.ALL_TEAM_ROLE_MGMT,
        ],
      })
    ) {
      return ROUTERS.ROLE_LIST;
    }
    return "";
  }, [rolePermission]);

  return (
    <div className="row gap-4">
      <Dropdown
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        classNames={{
          content: "min-w-[160px] px-0 rounded-md",
          base: "px-0",
        }}
      >
        <DropdownTrigger>
          <div
            className={cn(
              "center relative h-[36px] w-[36px] cursor-pointer rounded-full bg-neutral-surface",
              isOpen && "border border-neutral-element-primary",
            )}
          >
            <SettingIcon2 />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Setup"
          classNames={{
            base: "w-[195px] px-0",
          }}
          itemClasses={{
            base: "data-[hover=true]:!bg-neutral-surface",
          }}
        >
          <DropdownItem
            onClick={() => {
              window.open(systemRouter, "_blank");
            }}
            key="user"
            className="h-12 rounded-none px-4"
          >
            <div className="flex items-center justify-between">
              <Text variant="body2-regular">Admin dashboard</Text>
              <LinkAltIcon />
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default memo(Setting);
