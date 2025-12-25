"use client";
import React, { memo, ReactNode, useCallback } from "react";

import { cn } from "@/utils/common.util";
import {
  Cell,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Loading from "../../common/Loading";
import NoData, { NoDataProps } from "../NoData";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData = unknown, TValue = unknown> {
    disableRowClick?: boolean;
    className?: string;
  }
}
interface TableProps {
  data: any[];
  fetching?: boolean;
  columns: any[];
  rowSelection?: any;
  columnVisibility?: any;
  NoDataProps?: NoDataProps;
  className?: string;
  TableNoData?: string | ReactNode;
  onRowClick?: (row: any) => void;
  tableClassName?: string;
  tableBodyClassName?: string;
  tableBody?: ReactNode;
  getRowClassName?: (row: any) => string;
}
function MyTable({
  data,
  fetching,
  columns,
  rowSelection,
  columnVisibility,
  NoDataProps,
  className,
  TableNoData,
  onRowClick,
  tableClassName,
  tableBodyClassName,
  tableBody,
  getRowClassName,
}: TableProps) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row?.id,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true, //enable row selection for all rows
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  const handleRowClick = useCallback(
    (cell: Cell<any, unknown>) => {
      if (cell?.column?.columnDef?.meta?.disableRowClick) {
        return;
      }
      if (onRowClick) {
        onRowClick(cell?.row?.original);
      }
    },
    [onRowClick],
  );

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-neutral-stroke-bold bg-white",
        className,
      )}
    >
      <table className={cn("relative w-full table-fixed", tableClassName)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="min-h-[44px] w-full rounded-t-lg border-b border-neutral-stroke-bold bg-brand-primary"
            >
              {headerGroup.headers.map((header) => (
                <th
                  style={{
                    width: header.column.getSize(),
                  }}
                  key={header.id}
                  className={cn(
                    "border-r border-neutral-stroke-light px-4 py-3 align-top text-base font-medium text-white",
                    header?.column?.columnDef?.meta?.className,
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody
          className={cn(
            "relative divide-gray-200 bg-white",
            !data?.length && "h-[300px]",
            tableBodyClassName,
          )}
        >
          {fetching && (
            <div className="center absolute inset-0">
              <Loading />
            </div>
          )}

          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={cn(
                  "transition-all duration-200 hover:bg-neutral-on-surface-1a",
                  rowSelection?.[row.id] && "!bg-brand-super-light",
                  getRowClassName?.(row?.original),
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      style={{
                        width: cell.column.getSize(),
                      }}
                      key={cell.id}
                      className={cn(
                        "border-r border-t border-neutral-stroke-light p-4 align-top text-base font-medium text-primary",
                        // Default to nowrap unless overridden by meta className
                        !cell?.column?.columnDef?.meta?.className?.includes("break-words") && "whitespace-nowrap",
                        cell?.column?.columnDef?.meta?.className,
                        onRowClick &&
                          !cell?.column?.columnDef?.meta?.disableRowClick &&
                          "cursor-pointer",
                      )}
                      onClick={() => handleRowClick(cell)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {tableBody}
          {!data?.length &&
            !fetching &&
            (TableNoData ? TableNoData : <NoData {...NoDataProps} />)}
        </tbody>
      </table>
    </div>
  );
}

export default memo(MyTable);
