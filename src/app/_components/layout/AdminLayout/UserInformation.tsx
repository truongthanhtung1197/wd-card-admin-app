"use client";

import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { AuthSelector } from "@/store/Auth";
import { clearAllAuthData } from "@/utils/auth.utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import Text from "../../common/Text";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

const LogoutConfirmModal = dynamic(
  () => import("../../modal/LogoutConfirmModal"),
  { ssr: false },
);

const UserInformation = () => {
  const auth = useSelector(AuthSelector.selectAuthState);

  const user = auth?.admin;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useLocaleRouter();

  const handleCloseModal = () => setIsModalOpen(false);

  // Helper function to get current locale
  const getCurrentLocale = () => {
    const pathname = window.location.pathname;
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})(?=\/|$)/);
    return match ? match[1] : "vi";
  };

  const handleConfirmLogout = () => {
    // Use enhanced clear function that clears everything
    clearAllAuthData();

    setIsModalOpen(false);

    // Force navigate to login with full page reload to clear all cache
    const currentLocale = getCurrentLocale();
    window.location.href = `/${currentLocale}/auth/login`;
  };

  const handleActions = (key: any) => {
    if (key === "logout") {
      setIsModalOpen(true);
    }
    if (key === "myProfile") {
      router.push(ROUTERS.MY_PROFILE);
    }
  };
  return (
    <div className="row gap-4">
      {/* <div className="flex-1">
        <Text variant="button-xsmall">{getFullName(user)}</Text>
        <Text
          variant="button-xsmall"
          className="text-neutral-element-secondary"
        >
          {getRole(user)}
        </Text>
      </div> */}
      <Dropdown
        classNames={{
          content: "min-w-[160px] px-0 rounded-md",
          base: "px-0",
        }}
      >
        <DropdownTrigger>
          <div className="center relative w-full cursor-pointer gap-3 rounded-full bg-slate-100 pl-4 pr-2">
            {/* {user?.imagePath ? (
              <Image
                src={user?.imagePath}
                alt="User Avatar"
                fill
                className="h-10 w-10 overflow-hidden rounded-full object-cover object-center"
              />
            ) : (
              <LetterAvatar letter={user?.firstName || ""} size={40} />
            )}
             */}
            <Text variant="body2-regular">
              {user?.displayName || user?.username || "-"}
            </Text>
            <div className="center h-4 w-4 rounded-full border border-white bg-neutral-stroke-light">
              <ArrowDownIcon />
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="profile"
          onAction={(key) => handleActions(key)}
          classNames={{
            base: "w-[160px] px-0",
          }}
          itemClasses={{
            base: "data-[hover=true]:!bg-neutral-surface",
          }}
        >
          <DropdownItem key="myProfile" className="h-12 rounded-none px-4">
            <Text variant="body2-regular">My Profile</Text>
          </DropdownItem>
          <DropdownItem key="logout" className="h-12 rounded-none px-4">
            <Text variant="body2-regular">Logout</Text>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {isModalOpen && (
        <LogoutConfirmModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
};

export default memo(UserInformation);
