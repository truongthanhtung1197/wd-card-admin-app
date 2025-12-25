import React, { memo, ReactNode } from "react";

import ChevronIcon from "@/app/_components/icons/ChevronIcon";
import { cn } from "@/utils/common.util";
import { Accordion, AccordionItem } from "@nextui-org/react";

import MyCard from "./MyCard";

const MyAccordion = memo(
  ({
    children,
    title,
    subTitle,
    wrapperClassName,
    bodyClassName,
    isCollapse = true,
    childrenClassName,
    defaultExpandedKeys = ["1"],
    indicatorClassName,
  }: {
    children?: ReactNode;
    title?: string | ReactNode;
    subTitle?: string | ReactNode;
    wrapperClassName?: string;
    bodyClassName?: string;
    isCollapse?: boolean;
    childrenClassName?: string;
    defaultExpandedKeys?: string[];
    indicatorClassName?: string;
  }) => {
    return (
      <MyCard>
        <Accordion defaultExpandedKeys={defaultExpandedKeys}>
          <AccordionItem
            key="1"
            aria-label="1"
            isDisabled={!isCollapse}
            indicator={isCollapse ? <ChevronIcon /> : <></>}
            classNames={{
              trigger: "!p-0",
              content: "!p-0",
              indicator: cn("!p-0", indicatorClassName),
              startContent: "!p-0",
              base: "!p-0",
            }}
            title={
              <div className="row w-full justify-between">
                {typeof title === "string" ? (
                  <h5 className="">{title}</h5>
                ) : (
                  title
                )}
                {subTitle}
              </div>
            }
          >
            {children && (
              <div className={cn("pt-5", childrenClassName)}>{children}</div>
            )}
          </AccordionItem>
        </Accordion>
      </MyCard>
    );
  },
);

export default MyAccordion;
