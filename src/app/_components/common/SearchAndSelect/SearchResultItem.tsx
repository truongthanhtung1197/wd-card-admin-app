import { memo } from "react";

import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import RemoveXIcon from "@/app/_components/icons/RemoveXIcon";
import MyImage from "@/app/_components/image/Image";
import { User } from "@/model/User.model";
import { cn, getFullName } from "@/utils/common.util";

const SearchResultItem = ({
  user,
  onClick,
  onRemove,
  disabled,
}: {
  user: User;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "row w-full items-center gap-3 px-4 py-[2px]",
        onRemove
          ? "h-[44px] w-[276px] rounded-lg border pl-2"
          : "cursor-pointer hover:bg-neutral-surface",
        disabled && "cursor-not-allowed opacity-35",
      )}
    >
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
      <div className="w-[180px]">
        <p className="line-clamp-1 block truncate text-base font-bold text-neutral-element-primary">
          {getFullName(user)}
        </p>
        <p className="line-clamp-1 block truncate text-sm font-medium text-neutral-element-secondary">
          {user?.email}
        </p>
      </div>
      {onRemove && (
        <div
          className="absolute right-1 top-[50%] -translate-y-1/2 cursor-pointer"
          onClick={onRemove}
        >
          <RemoveXIcon />
        </div>
      )}
    </div>
  );
};

export default memo(SearchResultItem);
