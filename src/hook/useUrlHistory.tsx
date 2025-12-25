import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocaleRouter } from "./useLocaleRouter";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GetPathParams {
  history: any;
  setHistory: (key: string, value: string) => void;
}

export const useUrlHistoryStore = create<GetPathParams>()(
  devtools(
    persist(
      (set) => ({
        history: {},
        setHistory: (key, value) =>
          set((state) => ({
            history: { ...state.history, [key]: value },
          })),
      }),
      {
        name: "url-history",
        getStorage: () => sessionStorage,
      },
    ),
    { name: "UrlHistory" },
  ),
);

export const useUrlHistory = () => {
  const { history, setHistory } = useUrlHistoryStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useLocaleRouter();

  const updateRouteCache = useCallback(
    (key: string) => {
      const params: any = new URLSearchParams(searchParams);
      setHistory(key, `${pathname}/?${params.toString()}`);
    },
    [searchParams, pathname, setHistory],
  );

  return { history, updateRouteCache, router };
};
