import React, { memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import MyButton from "@/app/_components/common/MyButton";
import MyMultipleSelect from "@/app/_components/form/MyMultipleSelect";
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth/Auth.redux";

const FilterUser = memo(() => {
  const router = useLocaleRouter();
  const pathname = usePathname();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("Users");

  const handleClearQueryUrl = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);
  if (![ADMIN_ROLE.SUPER_ADMIN].includes(admin?.role?.roleName as ADMIN_ROLE)) {
    return null;
  }
  return (
    <div className="flex gap-2">
      <MyMultipleSelect
        options={ADMIN_ROLE_OPTIONS?.filter(
          (item) =>
            item.key === ADMIN_ROLE.PARTNER || item.key === ADMIN_ROLE.SEOER,
        )}
        param="role"
        selectCheckboxItemClassName="lowercase first-letter:uppercase"
      />

      <MyButton
        onClick={handleClearQueryUrl}
        bType="neutral"
        className="!h-[40px] !w-[134px]"
      >
        {t("buttons.clearFilter")}
      </MyButton>
      {/* <ManageFilter
  {...{
    setFilters: setFilters,
    filters: filters,
  }}
/> */}
    </div>
  );
});

export default FilterUser;
