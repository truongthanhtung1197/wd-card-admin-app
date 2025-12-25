"use client";
import React, { memo, useCallback } from "react";

import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import GoBackIcon from "@/app/_components/icons/GoBackIcon";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";

const SubHeaderV2 = memo(
  ({
    goBack,
    label,
    className,
  }: {
    goBack?: () => void;
    label: string;
    className?: string;
  }) => {
    const router = useLocaleRouter();

    const onGoBack = useCallback(() => {
      if (goBack) {
        goBack();
        return;
      }
      router.back();
    }, [goBack]);

    return (
      <div className={cn("center relative w-full py-4 ", className)}>
        <MyButton
          bType="ghost"
          bSize="xs"
          onClick={onGoBack}
          startContent={<GoBackIcon />}
          className="absolute left-0 gap-2 pl-[10px] pr-[14px]"
        >
          Back
        </MyButton>
        <Text variant="h2">{label}</Text>
      </div>
    );
  },
);

export default SubHeaderV2;
