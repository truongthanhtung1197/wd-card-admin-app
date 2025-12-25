import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocaleRouter } from "./useLocaleRouter";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GetPathParams {
  history: any;
  setHistory: (key: string, value: string) => void;
}

export const useGetParamsPath = create<GetPathParams>()(
  devtools((set) => ({
    history: {},

    setHistory: (key, value) =>
      set((state) => ({
        history: {
          ...state.history,
          [key]: value,
        },
      })),
  })),
);

export const useMyRouter = (key: string) => {
  const router = useLocaleRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setHistory = useGetParamsPath((state) => state.setHistory);

  const updateRouteCache = useCallback(() => {
    const params: any = new URLSearchParams(searchParams);

    setHistory(key, `?${params.toString()}`);
  }, [pathname, searchParams, key]);

  const handlePush = useCallback(
    (
      newRouter: string,
      { isCachePrevRoute = false }: { isCachePrevRoute?: boolean },
    ) => {
      if (isCachePrevRoute) {
        updateRouteCache();
      }
      router.push(newRouter);
    },
    [updateRouteCache],
  );

  return {
    ...router,
    push: handlePush,
    updateRouteCache,
  };
};

// function getAllParams() {
//   const result = {} as any;
//   for (const key of params.keys()) {
//     result[key] = params.getAll(key);
//   }
//   return result;
// }
