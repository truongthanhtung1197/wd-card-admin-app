import React, { memo } from "react";
import { usePathname } from "next/navigation";

import { useMyRouter } from "@/hook/useMyRouter";

import { LocaleLink } from "../../LocaleLink";

const MyLink = memo(
  ({ href, className, children, isCacheCurrentRoute, innerRef }: any) => {
    const pathname = usePathname();

    const { updateRouteCache } = useMyRouter(pathname);

    const handleCachePrevRoute = () => {
      if (isCacheCurrentRoute) {
        updateRouteCache();
      }
    };

    return (
      <LocaleLink
        ref={innerRef}
        href={href}
        className={className}
        onClick={handleCachePrevRoute}
      >
        {children}
      </LocaleLink>
    );
  },
);

export default MyLink;
