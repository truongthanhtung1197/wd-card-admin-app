/* eslint-disable simple-import-sort/imports */
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

import EmptyState from "../../icons/EmptyState";
import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import { NotificationIcon } from "@/app/_components/icons/NotificationIcon";
import { useNotifications } from "./useNotifications";
import { INotification, NOTIFICATION_TYPE } from "@/model/Notification.model";

import { cn, getImageUrl, getUserName } from "@/utils/common.util";
import { timeFromNow } from "@/utils/format.util";
import AvatarV2 from "../../common/AvatarV2";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

const NotificationComponent = memo(() => {
  const router = useLocaleRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [_filter, _setFilter] = useState({ page: 1, limit: 10 });

  const {
    items,
    unreadCount,
    loadNextPage,
    hasMore,
    markAsRead,
    markAllAsRead,
    loading,
    resetAndRefresh,
  } = useNotifications();

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [_hasMore, _setHasMore] = useState(true);

  const _observer = useRef<IntersectionObserver | null>(null);

  const lastNotificationElementRef = useCallback(
    (node: Element | null) => {
      if (loading || !hasMore) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      });
      if (node) _observer.current.observe(node);
    },
    [loading, hasMore, loadNextPage],
  );

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleMarkAsRead = async (selectedId: number) => {
    await markAsRead(selectedId);
  };

  const getHref = (n: INotification) => {
    if (n.type === NOTIFICATION_TYPE.MENTION) {
      return {
        href: ROUTERS.ORDER_DETAIL.replace(
          ":id",
          n.metadata?.orderId?.toString() || "",
        ),
        queryParams: null,
      };
    }

    const queryParams = new URLSearchParams();

    const href = "";

    return {
      href,
      queryParams,
    };
  };
  const handleSeeNotification = async (n: INotification) => {
    try {
      setIsOpen(false);
      const { href, queryParams } = getHref(n);

      router.push(`${href}?${queryParams?.toString() || ""}`);
      markAsRead(n.id);
    } catch (_error) {
      // ignore
    }
  };

  const renderNotificationItem = useCallback(
    (n: INotification, index: number) => (
      <div
        key={n.id}
        ref={
          index === notifications.length - 1
            ? (lastNotificationElementRef as any)
            : undefined
        }
        className={cn(
          "flex w-full cursor-pointer flex-row justify-between gap-4 px-5 py-3",
          !n.readAt &&
            "border-l-[4px] border-brand-primary bg-neutral-on-surface-1a",
          "hover:bg-neutral-on-surface-1a",
        )}
      >
        <div onClick={() => handleSeeNotification(n)}>
          <div className="relative h-10 w-10 cursor-pointer">
            {getNotificationAvatar(n)}
          </div>
        </div>
        <div
          className="col flex flex-1"
          onClick={() => handleSeeNotification(n)}
        >
          {getNotificationContent(n)}
          <p className="text-sm text-neutral-element-secondary">
            {timeFromNow(n.createdAt)}
          </p>
        </div>
        {!n.readAt && (
          <button
            onClick={() => handleMarkAsRead(n.id)}
            className="my-auto h-3 w-3 rounded-full bg-brand-primary"
          />
        )}
      </div>
    ),
    [handleMarkAsRead, notifications.length, lastNotificationElementRef],
  );

  useEffect(() => {
    setNotifications(items);
  }, [items]);

  useEffect(() => {
    if (isOpen) {
      _setFilter({ page: 1, limit: 10 });
      resetAndRefresh();
    }
  }, [isOpen, resetAndRefresh]);

  return (
    <div>
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{
          base: "max-h-[610px] bg-neutral-on-surface-1 shadow-[0px_32px_64px_-8px_rgba(0,0,0,0.24)]",
        }}
      >
        <PopoverTrigger>
          <button
            className={cn(
              "center relative !h-9 !w-9 rounded-full bg-neutral-surface  hover:border hover:border-neutral-stroke-bold",
              isOpen && "border !border-black",
            )}
          >
            <NotificationIcon />
            {unreadCount > 0 && (
              <span className="index-10 absolute right-[8px] top-[6px] h-2 w-2 rounded-full bg-accent-error" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="col w-[380px] overflow-hidden rounded-lg bg-neutral-on-surface-1 !p-0">
          <div className="row-between w-full border-b border-neutral-stroke-light px-5 pb-3 pt-5">
            <h4>NOTIFICATION</h4>
            <button
              className={
                unreadCount > 0
                  ? "text-accent-link"
                  : "text-neutral-element-tertiary"
              }
              disabled={unreadCount === 0}
              onClick={handleMarkAllAsRead}
            >
              <p>Mark all as read</p>
            </button>
          </div>
          <div className="max-h-[542px] w-full overflow-y-auto">
            {!notifications?.length && (
              <div className="center h-[300px]">
                {" "}
                <EmptyState />
              </div>
            )}
            {notifications.map((n, idx) => renderNotificationItem(n, idx))}
            {loading && (
              <div className="center w-full py-3 text-sm text-neutral-element-secondary">
                Loading...
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default NotificationComponent;

function getNotificationContent(n: INotification): JSX.Element {
  if (n.type === NOTIFICATION_TYPE.MENTION) {
    return (
      <p>
        <strong>{getUserName(n?.sender)}</strong> mentioned you in an order
      </p>
    );
  }

  // If no match is found, return the content as it is
  return <p>Incoming</p>;
}

export const getNotificationAvatar = (n: INotification) => {
  if (n.type === NOTIFICATION_TYPE.MENTION) {
    return (
      <div className="center h-10 w-10 rounded-full bg-[#DBF3F9]">
        <AvatarV2
          src={getImageUrl(n?.sender?.fileRelations?.[0]?.file?.path)}
          userName={n?.sender?.displayName || n?.sender?.username || "U"}
        />
      </div>
    );
  }

  return <LetterAvatar letter={n?.sender?.firstName || ""} size={40} />;
};
