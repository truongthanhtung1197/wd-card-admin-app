/* eslint-disable simple-import-sort/imports */
import { io, Socket } from "socket.io-client";

import type {
  INotification,
  NotificationResponse,
} from "@/model/Notification.model";

export type NotificationInitCallback = (items: INotification[]) => void;
export type NotificationItemCallback = (item: INotification) => void;

export type ConnectOptions = {
  onInit?: NotificationInitCallback;
  onNotification?: NotificationItemCallback;
};

export function connectNotifications(
  baseUrl: string,
  token: string,
  options?: ConnectOptions,
) {
  const socket: Socket = io(`${removeTrailingSlash(baseUrl)}/notifications`, {
    transports: ["websocket"],
    auth: { token }, // ưu tiên
    extraHeaders: { Authorization: `Bearer ${token}` }, // fallback
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    autoConnect: true,
  });

  if (options?.onInit) {
    socket.on("notification.init", (list: INotification[]) => {
      options.onInit?.(Array.isArray(list) ? list : []);
    });
  }

  if (options?.onNotification) {
    socket.on("notification", (n: INotification) => {
      if (n && typeof n === "object") options.onNotification?.(n);
    });
  }

  return socket;
}

export async function fetchNotifications(
  baseUrl: string,
  token: string,
  params?: Partial<{
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
    type: string;
    search: string;
  }>,
): Promise<NotificationResponse> {
  const url = new URL(`${removeTrailingSlash(baseUrl)}/notifications`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch notifications: ${res.status}`);
  }

  const data = (await res.json()) as NotificationResponse;
  return data;
}

export async function readNotification(
  baseUrl: string,
  token: string,
  id: number,
) {
  const res = await fetch(
    `${removeTrailingSlash(baseUrl)}/notifications/read/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Failed to mark as read: ${res.status}`);
  return res.json().catch(() => ({}));
}

export async function readAllNotifications(baseUrl: string, token: string) {
  const res = await fetch(
    `${removeTrailingSlash(baseUrl)}/notifications/read-all`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Failed to mark all as read: ${res.status}`);
  return res.json().catch(() => ({}));
}

export function removeTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}
