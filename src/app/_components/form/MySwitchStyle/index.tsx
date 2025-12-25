"use client";

import { ReactNode, useMemo } from "react";

import { cn } from "@/utils/common.util";

interface MySwitchStyleData {
  key: string;
  content: string | ReactNode;
}

export default function MySwitchStyle({
  data,
  selectedKey,
  onChangeKey,
}: {
  data: MySwitchStyleData[];
  selectedKey: string;
  onChangeKey: (i: MySwitchStyleData) => void;
}) {
  const _data = useMemo(() => data?.splice(0, 2), [data]);
  return (
    <div className="my-[1px] h-10 rounded-lg border-[.5px] border-x-neutral-stroke-bold bg-neutral-on-surface-2 p-[2px]">
      <div className="flex h-full">
        {_data?.map((i: MySwitchStyleData) => {
          return (
            <div
              onClick={() => onChangeKey(i)}
              key={i.key}
              className={cn(
                "center h-full flex-1 cursor-pointer rounded-lg border-[.5px] px-[10px] duration-400",
                selectedKey === i.key
                  ? "border-neutral-stroke-bold bg-white"
                  : "border-transparent",
              )}
            >
              {typeof i.content === "string" ? (
                <p className="text-sm font-medium">{i.content}</p>
              ) : (
                i.content
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
