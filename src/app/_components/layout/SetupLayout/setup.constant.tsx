import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { Admin } from "@/model/Admin.mode";

import { isNilOrEmpty } from "ramda-adjunct";

const definedRouters = [
  // {
  //   text: "Statistics",
  //   link: ROUTERS.MANAGEMENT_STATISTICS,
  //   allowAllRoles: [ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.MANAGER],
  //   children: [],
  // },
  {
    text: "Admins",
    link: ROUTERS.MANAGEMENT_ADMIN,
    allowAllRoles: [ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.MANAGER],
    children: [],
  },
  {
    text: "Packages",
    link: ROUTERS.MANAGEMENT_PACKAGES,
    allowAllRoles: [ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.MANAGER],
    children: [],
  },
];

export const getSideBar = ({ admin }: { admin: Admin }) => {
  const roles = admin.userRoles?.map((role) => role.role.roleName) || [];
  if (isNilOrEmpty(roles)) {
    return [];
  }
  return definedRouters.filter((item) =>
    item.allowAllRoles.some((role) => roles.includes(role)),
  );
};
