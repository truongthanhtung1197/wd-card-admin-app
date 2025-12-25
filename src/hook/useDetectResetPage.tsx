import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocaleRouter } from "./useLocaleRouter";

const useDetectResetPage = ({ dataLength }: { dataLength: number }) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const router = useLocaleRouter();
  const pathname = usePathname();

  const detectResetPage = useCallback(() => {
    if (currentPage === "1" || !currentPage) return false;
    if (dataLength !== 1) return false;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params}`);
    return true;
  }, [searchParams, router, pathname, dataLength]);

  return { detectResetPage };
};

export { useDetectResetPage };
