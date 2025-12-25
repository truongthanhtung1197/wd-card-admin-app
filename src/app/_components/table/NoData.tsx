import React, { memo, ReactNode } from "react";

import { cn } from "@/utils/common.util";

import MyButton from "../common/MyButton";
import NoteFoundIcon from "../icons/NoteFoundIcon";
import PlusIcon from "../icons/PlusIcon";
import SearchNotFoundIcon from "../icons/SearchNotFoundIcon";
import { LocaleLink } from "../LocaleLink";

export interface NoDataProps {
  title?: string;
  message?: string;
  className?: string;
  onNextHref?: string;
  onNext?: () => void;
  nextLabel?: string;
  isSearch?: boolean;
  onClearSearch?: () => void;
  icon?: ReactNode;
  button?: ReactNode;
}

const NoData = memo(
  ({
    title = "No Data Found",
    message = "There are no data yet. Let’s add a new data to get started.",
    onNextHref,
    onNext,
    onClearSearch,
    nextLabel = "Add",
    isSearch = false,
    className,
    icon,
    button,
  }: NoDataProps) => {
    return (
      <div
        className={cn(
          "center absolute left-0 right-0 h-full w-full",
          className,
        )}
      >
        <div className="center mx-auto flex-col">
          {icon ? icon : isSearch ? <SearchNotFoundIcon /> : <NoteFoundIcon />}
          {title && <p className="mt-2 font-bold">{title}</p>}
          <p className="mt-2 font-medium">{message}</p>
          <div className="row gap-3">
            {button ? (
              <div className="mt-7">{button}</div>
            ) : (
              <>
                {onClearSearch && (
                  <MyButton
                    bSize="small"
                    bType="neutral"
                    className="mt-7 pl-3 pr-5"
                    onClick={onClearSearch}
                  >
                    {"Clear Search"}
                  </MyButton>
                )}
                {onNextHref && (
                  <LocaleLink href={onNextHref}>
                    <MyButton
                      bSize="small"
                      className="mt-7 pl-3 pr-5"
                      startContent={<PlusIcon fill="#ffffff" />}
                    >
                      {nextLabel}
                    </MyButton>
                  </LocaleLink>
                )}

                {onNext && (
                  <MyButton
                    bSize="small"
                    className="mt-7 pl-3 pr-5"
                    startContent={<PlusIcon fill="#ffffff" />}
                    onClick={onNext}
                  >
                    {nextLabel}
                  </MyButton>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);
export default NoData;
