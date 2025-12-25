import React, { memo, ReactNode, useCallback, useEffect } from "react";

import { useVisibility } from "@/hook";
import { cn } from "@/utils/common.util";
import { CardBody } from "@nextui-org/react";

import ChevronIcon from "../icons/ChevronIcon";
import MyCard from "./MyCard";
import Text from "./Text";

const MyAccordion2 = memo(
  ({
    defaultExpanded = false,
    title,
    rightTitle,
    children,
    isWithCard = true,
  }: {
    defaultExpanded?: boolean;
    title?: string | ReactNode;
    rightTitle?: ReactNode;
    children?: ReactNode;
    isWithCard?: boolean;
  }) => {
    const {
      isVisible: isCollapse,
      toggle: toggleCollapse,
      hide: hideCollapse,
      show: isShow,
    } = useVisibility(defaultExpanded);

    useEffect(() => {
      if (defaultExpanded) {
        isShow();
      } else {
        hideCollapse();
      }
    }, [defaultExpanded]);

    const renderTitle = useCallback(() => {
      return (
        <div className="mb-3 flex w-full justify-between gap-2">
          <div className="row cursor-pointer gap-2" onClick={toggleCollapse}>
            <div
              className={cn(
                "mt-1 -rotate-90 duration-300",
                isCollapse ? "rotate-90" : "",
              )}
            >
              <ChevronIcon color="#1A1A1A" />
            </div>
            <Text variant="body1-emphasized" className="font-bold">
              {title}
            </Text>
          </div>
          {rightTitle && <div className="flex">{rightTitle}</div>}
        </div>
      );
    }, [isCollapse, children, rightTitle, title, toggleCollapse]);

    return isWithCard ? (
      <MyCard>
        <CardBody className="overflow-hidden !p-0">
          {renderTitle()}
          {isCollapse ? children : null}
        </CardBody>
      </MyCard>
    ) : (
      <div>
        {renderTitle()}
        {isCollapse ? children : null}
      </div>
    );
  },
);

export default MyAccordion2;
