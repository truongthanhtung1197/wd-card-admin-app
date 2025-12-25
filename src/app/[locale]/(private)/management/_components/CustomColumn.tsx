import React, { memo } from "react";
import { useTranslations } from "next-intl";

import CheckedIcon from "@/app/_components/icons/CheckedIcon";
import PlusIcon from "@/app/_components/icons/PlusIcon";
import UnCheckIcon from "@/app/_components/icons/UnCheckIcon";
import { cn } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { VisibilityState } from "@tanstack/react-table";

const FilterRow = memo(
  ({
    columnVisibility,
    setColumnVisibility,
  }: {
    columnVisibility: VisibilityState;
    setColumnVisibility: any;
  }) => {
    const t = useTranslations("CustomColumn.columns");
    
    const options = [
      {
        key: "createdAt",
        label: t("createdAt"),
      },
      {
        key: "numberOfClosedLoan",
        label: t("numberOfClosedLoan"),
      },
      {
        key: "totalLoanFunded",
        label: t("totalLoanFunded"),
      },
    ];
    const [openDropdown, setOpenDropdown] = React.useState(false);

    const handleSelectionChange = (key: any) => {
      const newColumnVisibility = {
        ...columnVisibility,
        [key]: !columnVisibility[key],
      };
      setColumnVisibility(newColumnVisibility);
    };

    const selectedKeys = new Set(
      Object.keys(columnVisibility).filter((key) => columnVisibility[key]),
    );

    const onOpenChange = (isOpen: boolean) => {
      setOpenDropdown(isOpen);
    };

    return (
      <div>
        <Dropdown
          onOpenChange={onOpenChange}
          classNames={{
            base: "!p-0",
          }}
        >
          <DropdownTrigger>
            <div className=" m-auto h-6 w-6">
              <div
                className={cn(
                  "z-10 cursor-pointer transition-all duration-200",
                  openDropdown && "rotate-45",
                )}
              >
                <PlusIcon
                  fill={`${openDropdown ? "#1A1A1A" : "#757575"}`}
                  size="24"
                />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple Custom Column"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onAction={handleSelectionChange}
            classNames={{
              base: "!px-0",
            }}
            itemClasses={{
              base: ["rounded-none"],
            }}
          >
            {options.map((item) => (
              <DropdownItem key={item.key} hideSelectedIcon>
                <div className="row gap-3">
                  <div>
                    {selectedKeys?.has(item.key) ? (
                      <CheckedIcon />
                    ) : (
                      <UnCheckIcon />
                    )}
                  </div>
                  <p className="font-medium">{item.label}</p>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  },
);

export default FilterRow;
