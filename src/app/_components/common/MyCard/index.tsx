import React, { memo, ReactNode } from "react";

import { cn } from "@/utils/common.util";
import { Card, CardBody } from "@nextui-org/react";

interface IMyCardProps {
  label?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  labelWrapperClassName?: string;
  cardBodyClassName?: string;
}

const MyCard = ({
  label,
  children,
  className,
  labelWrapperClassName,
  cardBodyClassName,
}: IMyCardProps) => {
  return (
    <Card
      className={cn(
        "h-max w-full !rounded-lg border-[0.5px] border-neutral-stroke-light bg-white",
        className,
      )}
      shadow="none"
    >
      <CardBody className={cn("p-5", cardBodyClassName)}>
        {!!label ? (
          <div className={cn("mb-5", labelWrapperClassName)}>
            {typeof label === "string" ? <h5>{label}</h5> : label}
          </div>
        ) : null}
        {children}
      </CardBody>
    </Card>
  );
};

export default memo(MyCard);
