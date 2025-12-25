"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Admin } from "@/model/Admin.mode";
import { CommonActions, CommonSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";
import { clearAllAuthData } from "@/utils/auth.utils";
import { checkIncludesUrl, cn } from "@/utils/common.util";

import LeftIcon from "../../icons/LeftIcon";
import { LocaleLink } from "../../LocaleLink";
import ConfirmUnsavedModal from "../../modal/ConfirmUnsavedModal";
import LogoutConfirmModal from "../../modal/LogoutConfirmModal";
import { getSideBar } from "./setup.constant";

import { useToggle } from "usehooks-ts";

const SetupSidebar = memo(() => {
  const t = useTranslations("sidebar");
  const [isFullSize, setIsFullSize] = useState(true);
  const pathname = usePathname();
  const hasFormChanged = useSelector(CommonSelector.selectHasFormChanged);
  const [selectedLink, setSelectedLink] = useState<string>("#");
  const dispatch = useDispatch();
  const router = useLocaleRouter();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

  const [showConfirmUnsavedModal, toggleShowConfirmUnsavedModal] =
    useToggle(false);

  const handleConfirm = useCallback(() => {
    toggleShowConfirmUnsavedModal();
    dispatch(CommonActions.setHasFormChanged(false));
    router.push(selectedLink);
  }, [selectedLink]);

  const onClickLink = useCallback(
    (link: string): React.MouseEventHandler<HTMLAnchorElement> =>
      (e) => {
        if (hasFormChanged) {
          e.preventDefault();
          setSelectedLink(link);
          toggleShowConfirmUnsavedModal();
          return;
        }
      },

    [hasFormChanged],
  );

  const handleConfirmLogout = () => {
    clearAllAuthData();

    setIsModalLogoutOpen(false);
    window.location.href = ROUTERS.LOGIN;
  };

  const auth = useSelector(AuthSelector.selectAuthState);

  const dataSideBar = useMemo(() => {
    return getSideBar({ admin: auth.admin as Admin });
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          "relative h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden border-r-[0.5px] border-neutral-stroke-light bg-white duration-400",
          isFullSize ? "w-[280px]" : "w-[93px]",
        )}
      >
        {/* <div
          className={cn(
            "row mx-auto h-[1px] justify-between bg-neutral-stroke-light",
            isFullSize ? "w-[240px]" : "w-[53px]",
          )}
        >
          <div className="h-[5px] w-[5px] rounded-full bg-neutral-stroke-light" />
          <div className="h-[5px] w-[5px] rounded-full bg-neutral-stroke-light" />
        </div> */}
        <div className="mt-5 h-[calc(100vh_-_165px)] overflow-y-auto px-2">
          {dataSideBar.map((value) => {
            return (
              <LocaleLink
                onClick={onClickLink(value?.link)}
                href={value?.link}
                key={value.title}
                className={cn(
                  "row h-[48px] w-full gap-3 rounded-lg px-3",
                  checkIncludesUrl(pathname, value.activeKeys)
                    ? "border-[.5px] border-neutral-stroke-bold bg-neutral-on-surface-2"
                    : "cursor-pointer hover:bg-neutral-on-surface-2",
                )}
              >
                <div className={cn(!isFullSize && "center w-full")}>
                  {value?.icon}
                </div>
                {isFullSize && (
                  <div className="truncate whitespace-nowrap">
                    {t(value.text)}
                  </div>
                )}
              </LocaleLink>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setIsFullSize(!isFullSize)}
        className={cn(
          "center absolute bottom-6 right-0 z-10 h-7 w-7 translate-x-1/2 cursor-pointer rounded-full border-[.5px] border-neutral-stroke-light bg-white shadow-sm delay-500 duration-300",
          !isFullSize && "rotate-180",
        )}
      >
        <LeftIcon />
      </div>
      {showConfirmUnsavedModal && (
        <ConfirmUnsavedModal
          onCancel={toggleShowConfirmUnsavedModal}
          funcConfirm={handleConfirm}
        />
      )}
      {isModalLogoutOpen && (
        <LogoutConfirmModal
          open={isModalLogoutOpen}
          onClose={() => setIsModalLogoutOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
});

export default SetupSidebar;
