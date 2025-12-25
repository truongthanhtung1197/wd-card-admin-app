"use client";

import React, { memo } from "react";
import Image from "next/image";

import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import { ROUTERS } from "@/constant";
import { User } from "@/model";
import { getFullName } from "@/utils/common.util";

interface TUserInformationProps {
  user?: User;
  agencyId?: string;
}

const UserInformation = ({ user, agencyId }: TUserInformationProps) => {
  const userDetailRoute = ROUTERS.USER_DETAIL.replace(
    ":userId",
    agencyId as string,
  );

  return (
    <div className="row w-fit max-w-full items-start gap-3">
      <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-gray-300">
        {user?.imagePath ? (
          <Image
            src={user?.imagePath}
            alt="User Avatar"
            fill
            className="object-cover object-center"
          />
        ) : (
          <LetterAvatar letter={user?.firstName || ""} size={24} />
        )}
      </div>
      <div className="flex-1 truncate">{getFullName(user)}</div>
    </div>
  );
};

export default memo(UserInformation);
