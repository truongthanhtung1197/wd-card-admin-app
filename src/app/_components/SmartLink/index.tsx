"use client";
import { memo, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";

import { insertObjectIf } from "@/utils/common.util";

interface ISmartLinkProps extends Omit<LinkProps, "href"> {
  children: ReactNode;
  href: string | any[];
  className?: string;
  target?: string;
  skip?: boolean;
  style?: Object;
  soundType?: any;
}

const SmartLink = ({
  children,
  href,
  onClick,
  className,
  target,
  style,
  soundType,
  ...rest
}: ISmartLinkProps) => {
  const params = useParams();
  const locale = !!params.locale ? "/" + params.locale : "";

  const _href = `${locale}${href}`;

  // if (soundType) {
  // 	GlobalDispatch(AudioActions.playAudioRequest(soundType));
  // }

  return (
    <Link
      href={_href}
      onClick={onClick}
      className={className}
      target={target}
      style={style}
      {...insertObjectIf(target === "_blank", {
        rel: "noopener noreferrer",
      })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default memo(SmartLink);
