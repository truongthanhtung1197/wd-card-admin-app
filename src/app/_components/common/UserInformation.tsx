"use client";

import React, { memo } from "react";
import Image from "next/image";

import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import { cn } from "@/utils/common.util";

interface TUserInformationProps {
  name?: string;
  imagePath?: string;
  nameClassName?: string;
  onNameClick?: () => void;
}

const UserInformation = ({
  name,
  imagePath,
  nameClassName,
  onNameClick,
}: TUserInformationProps) => {
  return (
    <div className="row w-fit max-w-full items-start gap-3">
      <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-300">
        <p className="h-full w-full overflow-hidden rounded-full">
          {imagePath ? (
            <Image
              src={imagePath}
              alt="User Avatar"
              fill
              className="object-cover object-center"
            />
          ) : (
            <LetterAvatar letter={name || ""} size={24} />
          )}
        </p>
      </div>
      <p
        className={cn(
          "line-clamp-1 block w-full flex-1 truncate text-base font-bold",
          nameClassName,
        )}
        onClick={onNameClick}
      >
        {name}
      </p>
    </div>
  );
};

export default memo(UserInformation);
