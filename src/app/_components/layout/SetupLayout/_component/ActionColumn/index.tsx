"use client";
import React, { memo, useMemo } from "react";
import Image from "next/image";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const ActionColumn = memo(({ handleLogout }: { handleLogout: () => void }) => {
  const onAction = (key: string) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  const items = useMemo(() => {
    return [
      {
        key: "logout",
        label: "Logout",
      },
    ];
  }, []);

  return (
    <div>
      <Dropdown
        classNames={{
          base: "!p-0",
          content:
            "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !min-w-[120px] !max-w-[300px] !w-auto",
        }}
      >
        <DropdownTrigger>
          <div className="m-auto h-6 w-6 cursor-pointer">
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/1721/1721936.png"}
              alt="option"
              width={20}
              height={20}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={items}
          classNames={{
            base: "!p-0 ",
          }}
          itemClasses={{
            base: [
              "!rounded-none",
              "!py-3 !px-4",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-brand-super-light",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
          onAction={(key) => onAction(key as string)}
        >
          {(item) => (
            <DropdownItem key={item.key}>
              <p className="text-base font-medium ">{item.label}</p>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
});

export default ActionColumn;
