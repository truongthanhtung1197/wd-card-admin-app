"use client";

import { useMemo } from "react";
import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";

interface LocaleLinkProps extends Omit<LinkProps, "href"> {
  href: string | any[];
  className?: string;
  target?: string;
  skip?: boolean;
  style?: Object;
  soundType?: any;
}

export const LocaleLink = ({
  href,
  locale,
  children,
  ...rest
}: LocaleLinkProps & any) => {
  const currentLocale = useLocale();
  const effectiveLocale = locale || currentLocale;

  const localizedHref = useMemo(() => {
    if (typeof href !== "string") return href;

    if (
      href.startsWith(`/${effectiveLocale}/`) ||
      href === `/${effectiveLocale}`
    ) {
      return href;
    }

    if (href === "/") return `/${effectiveLocale}`;
    return `/${effectiveLocale}${href.startsWith("/") ? "" : "/"}${href}`;
  }, [href, effectiveLocale]);

  return (
    <Link href={localizedHref} {...rest}>
      {children}
    </Link>
  );
};

// Example

// import { LocaleLink } from './components/LocaleLink';

// <LocaleLink href="/about">About Us</LocaleLink>

// <LocaleLink href="/contact" locale="en">Contact</LocaleLink>

// <LocaleLink href="/services" scroll={false}>Our Services</LocaleLink>
