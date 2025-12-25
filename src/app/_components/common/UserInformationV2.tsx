"use client";

import React, { memo } from "react";
import { FaStar } from "react-icons/fa";

import { Admin } from "@/model/Admin.mode";
import { cn, getImageUrl } from "@/utils/common.util";
import { formatRatingHalfFloor } from "@/utils/format.util";

import AvatarV2 from "./AvatarV2";
import MyTooltip from "./MyTooltip";

interface TUserInformationProps {
  userName?: string;
  imagePath?: string;
  nameClassName?: string;
  onNameClick?: () => void;
  user?: Admin;
  type?: "table" | "normal";
}

const UserInformationV2 = ({
  userName,
  imagePath,
  nameClassName,
  onNameClick,
  user,
  type = "normal",
}: TUserInformationProps) => {
  if (!user && !userName && !imagePath) return "-";

  return (
    <div
      className={cn(
        "row w-fit min-w-0 max-w-full items-center gap-3", // min-w-0 allows children to shrink
        type === "table" && "w-full !flex-col !items-start",
        onNameClick && "cursor-pointer",
      )}
      onClick={(e) => {
        if (!onNameClick) return;
        e.stopPropagation();
        e.preventDefault();
        onNameClick?.();
      }}
    >
      <div className="relative">
        <AvatarV2
          avgRating={user?.avgRating ?? 0}
          src={getImageUrl(user?.fileRelations?.[0]?.file?.path || "")}
          userName={user?.displayName || user?.username || userName}
          className={cn(type === "table" && "h-8 w-8")}
        />
      </div>
      <div className="col min-w-0 flex-1">
        {/* min-w-0 ensures truncate can work in flex */}
        <MyTooltip content={user?.displayName || user?.username || userName}>
          {" "}
          <p
            className={cn(
              // Use truncate for single-line with ellipsis
              "w-full flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-base font-semibold",
              type === "table" && "!text-sm",
              nameClassName,
            )}
          >
            {user?.displayName || user?.username || userName}
          </p>
        </MyTooltip>
        {!!user?.avgRating && (
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" size={10} />
            <span className="text-xs">
              {formatRatingHalfFloor(user?.avgRating)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(UserInformationV2);
