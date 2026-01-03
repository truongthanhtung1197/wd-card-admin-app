"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { INotification } from "@/model/Notification.model";
import { useAppSelector } from "@/store";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/store/Apis/Notification.api";
import { AuthSelector } from "@/store/Auth";

import { connectNotifications } from "./utils";

import Cookies from "js-cookie";

export type FetchParams = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  type?: string;
  search?: string;
};

export function useNotifications() {
  const { accessToken } = useAppSelector(AuthSelector.selectAuthState);
  const token = accessToken || Cookies.get("accessToken") || "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const [params, setParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const { data, isFetching, isLoading, refetch } = useGetNotificationsQuery(
    params,
    { refetchOnMountOrArgChange: true },
  );

  const [items, setItems] = useState<INotification[]>([]);
  const socketRef = useRef<ReturnType<typeof connectNotifications> | null>(
    null,
  );
  const [markAllAsReadMutation] = useMarkAllAsReadMutation();
  const [markAsReadMutation] = useMarkAsReadMutation();

  const unreadCount = useMemo(
    () => items.filter((n) => !n.readAt).length,
    [items],
  );

  const upsertMany = useCallback((incoming: INotification[]) => {
    if (!incoming?.length) return;
    setItems((prev) => {
      const map = new Map<number, INotification>();
      prev.forEach((n) => map.set(n.id, n));
      incoming.forEach((n) => {
        if (!map.has(n.id)) {
          map.set(n.id, n);
        }
      });
      // Keep newest first by createdAt desc
      return Array.from(map.values()).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    });
  }, []);

  const prependOne = useCallback((n: INotification) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === n.id)) return prev;
      return [n, ...prev];
    });
  }, []);

  // Merge RTK Query page results into local state
  useEffect(() => {
    if (!data) return;
    if (params.page === 1) {
      setItems(data.data || []);
      return;
    }
    setItems((prev) => {
      const map = new Map<number, INotification>();
      prev.forEach((n) => map.set(n.id, n));
      (data.data || []).forEach((n) => {
        if (!map.has(n.id)) map.set(n.id, n);
      });
      return Array.from(map.values()).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    });
  }, [data, params.page]);

  const markAsRead = useCallback(
    async (id: number) => {
      const socket = socketRef.current;
      try {
        // Emit via socket first for realtime fan-out
        socket?.emit?.("markAsRead", { id });
        // Ensure backend consistency
        await markAsReadMutation(id)
          .unwrap()
          .catch(() => undefined);
      } catch (_e) {
        // noop
      } finally {
        const now = new Date().toISOString();
        setItems((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, readAt: n.readAt || now } : n,
          ),
        );
      }
    },
    [markAsReadMutation],
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await markAllAsReadMutation()
        .unwrap()
        .catch(() => undefined);
    } catch (_e) {
      // noop
    } finally {
      const now = new Date().toISOString();
      setItems((prev) => prev.map((n) => ({ ...n, readAt: n.readAt || now })));
    }
  }, [markAllAsReadMutation]);

  const resetAndRefresh = useCallback(() => {
    setParams((p) => ({ ...p, page: 1 }));
    refetch();
  }, [refetch]);

  const hasMore = useMemo(() => {
    if (!data) return true;
    const total = data.total ?? data.count ?? 0;
    return items.length < total;
  }, [data, items.length]);

  const loadNextPage = useCallback(() => {
    if (isFetching || !hasMore) return;
    setParams((p) => ({ ...p, page: p.page + 1 }));
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (!baseUrl || !token) return;
    const socket = connectNotifications(baseUrl, token, {
      onInit: (list) => {
        upsertMany(list);
      },
      onNotification: (n) => {
        prependOne(n);
      },
    });
    socketRef.current = socket;
    return () => {
      socket?.disconnect?.();
      socketRef.current = null;
    };
  }, [baseUrl, token, upsertMany, prependOne]);

  return {
    items,
    loading: isLoading || isFetching,
    unreadCount,
    resetAndRefresh,
    loadNextPage,
    hasMore,
    markAsRead,
    markAllAsRead,
  };
}
