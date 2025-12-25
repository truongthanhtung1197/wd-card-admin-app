"use client";
import React, { memo, ReactNode } from "react";
import { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { LocaleLink } from "../../LocaleLink";

import { isFunction, isString } from "ramda-adjunct";

interface IProps extends LinkProps {
  children: ReactNode;
  className?: string | ((options: { isActive: boolean }) => string);
}

const NavLink = memo(({ href = "", children, className = "" }: IProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClassName = () => {
    if (isString(className)) return className;

    if (isFunction(className)) return className({ isActive });
  };
  return (
    <LocaleLink href={href} className={handleClassName()}>
      {children}
    </LocaleLink>
  );
});

export default NavLink;
