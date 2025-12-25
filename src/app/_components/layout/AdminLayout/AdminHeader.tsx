import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { ROUTERS } from "@/constant";
import { ModuleEnum } from "@/constant/Permission.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { CommonActions, CommonSelector, useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { insertObjectIf } from "@/utils/common.util";

import MyImage from "../../image/Image";
import UserInformation from "./UserInformation";

import { isNotNilOrEmpty } from "ramda-adjunct";
import { useToggle } from "usehooks-ts";

const AdminHeader = memo(() => {
  const pathname = usePathname();
  const router = useLocaleRouter();
  const dispatch = useDispatch();

  const hasFormChanged = useSelector(CommonSelector.selectHasFormChanged);

  const [showConfirmUnsavedModal, toggleShowConfirmUnsavedModal] =
    useToggle(false);

  const [selectedLink, setSelectedLink] = useState<string>("#");

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

  const handleConfirm = useCallback(() => {
    toggleShowConfirmUnsavedModal();
    dispatch(CommonActions.setHasFormChanged(false));
    router.push(selectedLink);
  }, [selectedLink]);

  const { rolePermission } = useAppSelector(AuthSelector.selectAuthState);

  const dataHeader = useMemo(() => {
    const result = [
      {
        title: "Dashboard",
        link: ROUTERS.DASHBOARD,
        activeKeys: ["dashboard"],
      },
      {
        title: "Leads",
        link: ROUTERS.LEAD,
        activeKeys: ["lead", "tag"],
      },
      insertObjectIf(
        checkPermission({
          permission: rolePermission,
          accessKeys: [ModuleEnum.LOAN_MGMT, ModuleEnum.ALL_LOAN_MGMT],
        }),
        {
          title: "Loans",
          link: ROUTERS.LOAN,
          activeKeys: ["loan"],
        },
      ),
      // insertObjectIf(
      //   checkPermission({
      //     permission: rolePermission,
      //     accessKeys: [ModuleEnum.ACCOUNT_MGMT],
      //   }),
      //   {
      //     title: "Accounts",
      //     link: ROUTERS.ACCOUNTS_LIST,
      //     activeKeys: ["accounts"],
      //   },
      // ),
      {
        title: "My team",
        link: ROUTERS.MY_TEAM,
        activeKeys: ["my-team"],
      },
    ];
    return result.filter((i) => isNotNilOrEmpty(i));
  }, [rolePermission]);

  return (
    <header className="sticky top-0 z-[49] flex h-[60px] w-full flex-row items-center justify-between bg-white px-6 min-[1440px]:px-8 min-[1920px]:px-10">
      <div className="relative h-[60px] !w-[141px]">
        <MyImage
          src={"/images/logo.png"}
          fill
          className="object-cover object-center"
        />
      </div>
      {/* <ul className="flex flex-1 items-center justify-center gap-5 pt-5">
        {dataHeader?.map((item) => (
          <li
            className={cn(
              `border-b-2 border-transparent pb-3 text-lg font-medium hover:border-b-2 hover:border-brand-primary`,
              checkUrl(pathname, item.activeKeys) &&
                "border-b-2 border-brand-primary",
            )}
            key={item.title}
          >
            <LocaleLink onClick={onClickLink(item?.link)} href={item?.link}>
            {item?.title}
            </LocaleLink>
          </li>
        ))}
      </ul> */}
      <div className="flex flex-1 flex-row items-center justify-end gap-4 py-[10px]">
        {/* {checkPermission({
          permission: rolePermission,
          accessKeys: [
            ModuleEnum.USER_GENERAL,
            ModuleEnum.USER_MGMT,
            ModuleEnum.ALL_TEAM_MGMT,
          ],
        }) && <Setting />}
        <Notification />
        <div className="h-8 w-[1px] bg-neutral-stroke-light"></div> */}
        <UserInformation />
      </div>
      {/* {showConfirmUnsavedModal && (
        <ConfirmUnsavedModal
          onCancel={toggleShowConfirmUnsavedModal}
          funcConfirm={handleConfirm}
        />
      )} */}
    </header>
  );
});

function checkUrl(url: string, keywords: string[]) {
  // Split the URL into segments based on the '/' delimiter
  const urlSegments = url.split("/");

  // Check if all keywords are present in the URL segments
  return isNotNilOrEmpty(
    keywords.find((keyword: string) => urlSegments.includes(keyword)),
  );
}

export default AdminHeader;
