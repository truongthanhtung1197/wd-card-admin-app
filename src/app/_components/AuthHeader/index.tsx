"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useCartDetail } from "@/hook/useCartDetail";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { AuthSelector } from "@/store/Auth";
import { clearAllAuthData } from "@/utils/auth.utils";
import { getImageUrl } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import AvatarV2 from "../common/AvatarV2";
import CartIcon from "../icons/CartIcon";
import { getSideBar } from "../layout/SetupLayout/setup.constant";
import { LocaleLink } from "../LocaleLink";
import NotificationComponent from "./NotificationComponent";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const AuthHeader = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);
  const auth = useSelector(AuthSelector.selectAuthState);
  const dataSideBar = useMemo(() => {
    return getSideBar({ admin: auth.admin as any });
  }, []);
  const router = useLocaleRouter();

  const handleConfirmLogout = () => {
    clearAllAuthData();

    const currentLocale = getCurrentLocale();
    window.location.href = `/${currentLocale}/auth/login`;
  };

  const getCurrentLocale = () => {
    const pathname = window.location.pathname;
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})(?=\/|$)/);
    return match ? match[1] : "vi";
  };

  const onAction = (key: any) => {
    if (String(key) === "logout") {
      handleConfirmLogout();
    }
    if (String(key) === "profile") {
      router.push(ROUTERS.MY_PROFILE);
    }
  };

  const { totalCartStr } = useCartDetail({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 3000);
  }, [totalCartStr]);

  const handleClickCartIcon = () => {
    router.push(ROUTERS.SEO_MY_CART);
  };

  const isShowCartIcon = useMemo(() => {
    return auth.admin?.role?.roleName === ADMIN_ROLE.SEOER;
  }, [auth.admin]);

  const avatar = useMemo(() => {
    const lastIndexFile = auth.admin?.fileRelations?.length - 1;
    return auth.admin?.fileRelations?.[lastIndexFile]?.file?.path || null;
  }, [auth.admin]);

  return (
    <Navbar
      className="z-[49] min-h-20 bg-white"
      classNames={{
        base: [
          "w-full shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] bg-white font-quicksand",
        ],
        wrapper: ["max-w-max mx-auto"],
      }}
    >
      <NavbarBrand>
        <LocaleLink
          href="/"
          className="font-pacifico text-3xl font-bold text-brand-primary"
        >
          Wedding Day
        </LocaleLink>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="inline-flex h-20 items-center justify-center gap-6 px-10"
      >
        {dataSideBar?.map((item, i) => (
          <div key={i} className="group relative">
            <NavbarItem className="relative flex flex-col items-center">
              <LocaleLink
                href={item.link || "#"}
                className={twMerge(
                  "text-md font-quicksand font-bold text-primary",
                  (pathname.includes(item.link) ||
                    item.children?.some((child: any) =>
                      pathname.includes(child.link),
                    )) &&
                    "text-brand-primary",
                )}
              >
                {item.text}
              </LocaleLink>
              {(pathname.includes(item.link) ||
                item.children?.some((child: any) =>
                  pathname.includes(child.link),
                )) && (
                <span className="absolute bottom-0 h-0.5 w-4/5 translate-y-2 rounded-full bg-brand-primary"></span>
              )}
            </NavbarItem>
          </div>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {isShowCartIcon && (
          <motion.div
            className="relative mr-4 cursor-pointer"
            onClick={handleClickCartIcon}
            id="header-cart-icon"
            animate={
              animate
                ? {
                    scale: [1, 1.8, 1.5, 1],
                    rotate: [0, -10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 1,
            }}
          >
            <CartIcon className="h-6 w-6 text-gray-600" />
            <span className="absolute right-[-8px] top-[-8px] text-[11px] font-bold text-red-500">
              {totalCartStr}
            </span>
          </motion.div>
        )}
        {/* <NotificationComponent /> */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button
              type="button"
              className="border-none bg-transparent p-0 outline-none"
              aria-haspopup="menu"
              aria-label="Open profile menu"
            >
              <AvatarV2
                src={getImageUrl(avatar)}
                avgRating={auth.admin?.avgRating ?? 0}
                userName={auth.admin?.displayName || auth.admin?.username}
                className="h-12 w-12"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={onAction}
          >
            <DropdownItem key="profile">{"Profile"}</DropdownItem>
            <DropdownItem key="logout" color="danger">
              {t("logout")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default memo(AuthHeader);
