import { memo } from "react";

import { DisplayName } from "@/app/_components/common/DisplayName";
import RemoveXIcon from "@/app/_components/icons/RemoveXIcon";
import { ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { User69vn } from "@/model";
import { cn } from "@/utils/common.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

const SearchUserItem = ({
  data,
  onClick,
  onRemove,
  disabled,
}: {
  data: User69vn;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "row h-[44px] w-full items-center gap-3 !bg-white px-6 py-4",
        onRemove
          ? "rounded-lg border pl-2"
          : "cursor-pointer border-b border-neutral-stroke-light hover:!bg-neutral-surface",
        disabled && "cursor-not-allowed opacity-35",
      )}
    >
      <div className="w-full">
        <p className="line-clamp-1 flex truncate text-base font-bold text-neutral-element-primary">
          <DisplayName
            displayName={data?.displayName}
            username={data?.username}
            isAdmin={false}
            className="leading-3"
          />
          {data?.role?.roleName && (
            <span className="ml-3 text-xs font-normal text-gray-500">
              ({getLabelFromOptions(data?.role?.roleName, ADMIN_ROLE_OPTIONS)})
            </span>
          )}
        </p>
      </div>
      {onRemove && (
        <div
          className="absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer"
          onClick={onRemove}
        >
          <RemoveXIcon />
        </div>
      )}
    </div>
  );
};

const SearchTeamItem = ({
  data,
  onClick,
  onRemove,
  disabled,
}: {
  data: any; // Team data type
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "row h-[44px] w-full items-center gap-3 !bg-white px-6 py-2",
        onRemove
          ? "rounded-lg border pl-2"
          : "cursor-pointer border-b border-neutral-stroke-light hover:!bg-neutral-surface",
        disabled && "cursor-not-allowed opacity-35",
      )}
    >
      <div className="flex-1">
        <p className="line-clamp-1 block truncate text-base font-bold text-neutral-element-primary">
          {data?.name}
        </p>
        {data?.description && (
          <p className="line-clamp-1 text-sm text-gray-500">
            {data.description}
          </p>
        )}
      </div>
      {onRemove && (
        <div
          className="absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer"
          onClick={onRemove}
        >
          <RemoveXIcon />
        </div>
      )}
    </div>
  );
};

export default memo(SearchUserItem);
export { SearchTeamItem };
