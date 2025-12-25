"use client";
import React, { memo, useEffect, useState } from "react";

import { cn } from "@/utils/common.util";
import { Input } from "@nextui-org/input";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import MyButton from "../../common/MyButton";
import AddLeadIcon from "../../icons/multiple-lead/AddLeadIcon";
import DeleteLeadIcon from "../../icons/multiple-lead/DeleteLeadIcon";
import { NoDataProps } from "../NoData";

import { Field, FieldProps } from "formik";

interface TableProps {
  dataLead: any[];
  fetching?: boolean;
  // columns: any[];
  rowSelection?: any;
  columnVisibility?: any;
  NoDataProps?: NoDataProps;
  className?: string;
}
function MyEditTable({
  dataLead,
  fetching,
  // columns,
  rowSelection,
  columnVisibility,
  NoDataProps,
  className,
}: TableProps) {
  const [idEdit, setIdEdit] = useState("");
  const [data, setData] = useState<any>(dataLead || []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("firstName", {
      id: "firstName",
      header: () => <p className="text-left">First name</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.firstName`}>
              {({ field, form, meta }: FieldProps) => {
                return (
                  <div>
                    <Input
                      {...field} // Spread tất cả các thuộc tính của field vào Input
                      classNames={{
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90 font-quicksand font-medium",
                          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                          "bg-white",
                          "border",
                          "border-neutral-stroke-light",
                          "hover:!bg-white",
                          "hover:!border-brand-primary",
                          "group-data-[focus=true]:bg-white",
                          "group-data-[focus=true]:border-brand-primary",
                          "!shadow-none",
                        ],
                      }}
                      isInvalid={!!(meta.touched && meta.error)}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                    {meta.touched && meta.error && (
                      <div className="text-sm text-red-500">{meta.error}</div>
                    )}
                  </div>
                );
              }}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("lastName", {
      id: "lastName",
      header: () => <p className="text-left">Last name</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.lastName`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("email", {
      header: () => <p className="text-left">Email address</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.email`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("primaryPhone", {
      header: () => <p className="text-left">Phone number</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.primaryPhone`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("street", {
      header: () => <p className="text-left">Street</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.street`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("city", {
      header: () => <p className="text-left">City</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.city`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("state", {
      header: () => <p className="text-left">State</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.state`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("zipCode", {
      header: () => <p className="text-left">Zip code</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.zipCode`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor("leadType", {
      header: () => <p className="text-left">Lead type</p>,
      cell: (info) => {
        return (
          <div className="xl:max-w-[340px] 2xl:max-w-[540px]">
            <Field name={`leads.${info.row.index}.leadType`}>
              {({ field, form }: FieldProps) => (
                <Input
                  {...field} // Spread tất cả các thuộc tính của field vào Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90 font-quicksand font-medium",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-white",
                      "border",
                      "border-neutral-stroke-light",
                      "hover:!bg-white",
                      "hover:!border-brand-primary",
                      "group-data-[focus=true]:bg-white",
                      "group-data-[focus=true]:border-brand-primary",
                      "!shadow-none",
                    ],
                  }}
                />
              )}
            </Field>
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.id, {
      id: "id",
      header: () => <div></div>,
      cell: (info) => {
        return (
          <div
            onClick={() =>
              setData((prev: any[]) =>
                prev.filter((item) => item.id !== info.row.index),
              )
            }
            className="cursor-pointer"
          >
            <DeleteLeadIcon />
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    setData(dataLead);
  }, [dataLead]);

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-neutral-stroke-light bg-white ",
        className,
      )}
    >
      <table className="relative min-w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="min-h-[44px] w-full rounded-t-lg border-b border-neutral-stroke-light bg-neutral-on-surface-1a"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "border-r border-neutral-stroke-light px-4 py-3 text-base font-medium text-primary",
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

        <tbody className="divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                onClick={() => setIdEdit(row.id)}
                key={row.id}
                className={cn(
                  "transition-all duration-200 hover:bg-neutral-on-surface-1a",
                  idEdit == row.id && "!bg-neutral-on-surface-1a",
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap border-r border-t border-neutral-stroke-light p-4 align-top text-base font-medium text-primary"
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
        </tbody>
        <tfoot className="divide-solid border-t border-neutral-stroke-light">
          <div className="px-4 py-3">
            <MyButton
              bType="neutral"
              bSize="small"
              startContent={<AddLeadIcon />}
              className="pl-3 pr-5"
              onClick={() =>
                setData((prev: any[]) => [
                  ...prev,
                  {
                    firstName: "",
                    lastName: "",
                    email: "",
                    primaryPhone: "",
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    leadType: "",
                  },
                ])
              }
            >
              Add Lead
            </MyButton>
          </div>
        </tfoot>
      </table>
      {/* {!data?.length && !fetching && <NoData {...NoDataProps} />} */}
    </div>
  );
}

export default memo(MyEditTable);
