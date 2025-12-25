import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import MyCheckbox from "@/app/_components/form/MyCheckbox";
import PartnerIcon from "@/app/_components/icons/PartnerIcon";
import { createQuantityCell } from "@/app/_components/table/_components/QuantityCell";
import { ICartDetails } from "@/constant/Seoer.constant";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useDebounceCallback } from "@/hook/useDebounceCallback";
import { useCreateOrdersMutation } from "@/store/Apis/Order.api";
import {
  useDeleteCartDetailsByIdMutation,
  useGetCartDetailsQuery,
} from "@/store/Apis/Seoer.api";
import { apiResponseHandle, cn, getTextLinkLabels } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import {
  getFormattedServicePrice,
  getFormattedTotalPrice,
  getPriceAndDiscountService,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnCustom from "./_component/ActionColumnCustom";

export const AdminDetailLogic = () => {
  const t = useTranslations("MyCart");
  const columnHelper = createColumnHelper<ICartDetails>();
  const [useDeleteAction, { isLoading }] = useDeleteCartDetailsByIdMutation();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const [checkedList, setCheckedList] = useState<any>([]);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [checkedListData, setCheckedListData] = useState<any>([]);
  const [isModalOrder, setIsModalOrder] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalData, setServiceModalData] = useState<any>({});

  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingOrderDetail,
  } = useGetCartDetailsQuery({
    page: Number(page),
    limit: Number(limit),
  });

  const handleSortIds = (ids: string) => {
    return ids
      .split("-")
      .sort((a, b) => Number(b) - Number(a))
      .join("-");
  };

  const handleGroupDataTable = useCallback(() => {
    if (!data?.data) return [];

    const grouped = Object.values(
      data?.data?.reduce((acc: any, item: any) => {
        const key = item?.service?.userId;
        if (!acc[key])
          acc[key] = { ids: [], items: [], user: item?.service?.user };
        acc[key].ids.push(item?.id);
        acc[key].items.push(item);
        return acc;
      }, {}),
    );

    const result = grouped.flatMap((group) => {
      const ids = handleSortIds((group as { ids: string[] }).ids.join("-"));

      const summary = {
        id: `s-${ids}`,
        isPartnerRow: true,
        service: {
          name:
            (group as { user: { displayName: string } })?.user?.displayName ||
            (group as { user: { username: string } })?.user?.username,
          userId: (group as { user: { id: string } })?.user?.id,
        },
      };
      const items = (group as { items: Array<{ service: any }> }).items.map(
        (item) => ({
          ...item,
          parentIds: `s-${ids}`,
          service: {
            ...item.service,
            name: item?.service?.name,
          },
        }),
      );
      return [summary, ...items];
    });

    return result;
  }, [data?.data]);

  const actions = useMemo(() => {
    return [
      {
        label: t("actions.viewDetails"),
        key: "view",
      },
      {
        label: t("actions.delete"),
        key: "delete",
      },
    ];
  }, [tableData, t]);

  const handleToggleCheckAll = useCallback(() => {
    if (checkedList.length === tableData?.length) {
      setCheckedList([]);
      setIsCheckedAll(false);
    } else {
      const allIds = tableData?.map((item: any) => item.id);
      setCheckedList(allIds as any);
      setIsCheckedAll(true);
    }
  }, [tableData, checkedList]);

  const handleCheckedItem = useCallback(
    ({ id, isPartnerRow, parentIds }: any) => {
      if (isPartnerRow) {
        const ids = id.split("-").slice(1).map(Number);
        const isAllInCheckedList = ids.every((item: any) =>
          checkedList.includes(item),
        );
        if (isAllInCheckedList) {
          let newList = checkedList.filter((item: any) => !ids.includes(item));
          newList = newList.filter((item: any) => item !== id);
          setCheckedList(newList);
          if (newList.length < (tableData || []).length) {
            setIsCheckedAll(false);
          }
        } else {
          let newList = [...checkedList];
          ids.forEach((item: any) => {
            if (!newList.includes(item)) {
              newList = [...newList, item];
            }
          });
          newList = [...newList, id];
          setCheckedList(newList);
          if (newList.length === tableData?.length) {
            setIsCheckedAll(true);
          } else {
            setIsCheckedAll(false);
          }
        }
      } else {
        const parentIdsArray = parentIds.split("-").slice(1).map(Number);
        if (checkedList.includes(id)) {
          let newList = checkedList.filter((item: any) => item !== id);
          if (parentIds) {
            const isAllInCheckedList = parentIdsArray.every((item: any) =>
              newList.includes(item),
            );
            if (!isAllInCheckedList) {
              newList = newList.filter((item: any) => item !== parentIds);
            }
          }
          setCheckedList(newList);
          if (newList.length < (tableData || []).length) {
            setIsCheckedAll(false);
          }
        } else {
          let newList = [...checkedList, id];
          if (parentIds) {
            const isAllInCheckedList = parentIdsArray.every((item: any) =>
              newList.includes(item),
            );
            if (isAllInCheckedList) {
              newList = [...newList, parentIds];
            }
          }
          setCheckedList(newList);
          if (newList.length === tableData?.length) {
            setIsCheckedAll(true);
          } else {
            setIsCheckedAll(false);
          }
        }
      }
    },
    [checkedList, tableData],
  );

  const debouncedEditCart = useDebounceCallback(
    (id: number, quantity: number) => {
      // editCartDetailById({
      //   id,
      //   data: { quantity, serviceType: SERVICE_TYPE.GP },
      // });
    },
    2000,
  );

  const debouncedChangeCart = useDebounceCallback(
    (row: any, quantity: number) => {
      setTableData((oldData: any) =>
        oldData.map((rowData: any, index: any) => {
          if (row.index === index) {
            return {
              ...rowData,
              quantity: Number(quantity),
            };
          }
          return rowData;
        }),
      );
    },
    2000,
  );

  const onActionEditCell = useCallback(({ id, row, quantity }: any) => {
    debouncedChangeCart(row, quantity);
    debouncedEditCart(id, quantity);
  }, []);

  const handleViewServiceDetails = useCallback((data: any) => {
    if (!data?.service) return;
    setServiceModalData(data.service);
    setIsServiceModalOpen(true);
  }, []);

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("id", {
        size: 200,
        cell: (info) => {
          return (
            <div className="w-full font-medium">
              <label
                className={cn(
                  "flex w-full items-start",
                  info.row.original.isPartnerRow && "!justify-start",
                  !info.row.original.isPartnerRow && "!justify-end",
                )}
              >
                <MyCheckbox
                  onChecked={() =>
                    handleCheckedItem({
                      id: info.getValue(),
                      isPartnerRow: info.row.original.isPartnerRow,
                      parentIds: info.row.original.parentIds,
                    })
                  }
                  checked={(checkedList as any).includes(
                    info.getValue() as any,
                  )}
                />
                <span className="ml-2">
                  {info.row.original.isPartnerRow && <PartnerIcon />}
                </span>
                {info.row.original.isPartnerRow && (
                  <p className="ml-2 line-clamp-3 w-full break-words text-left font-bold text-red-500">
                    {info.row.original.service?.name}
                  </p>
                )}
              </label>
            </div>
          );
        },
        header: () => (
          <div className="flex w-full justify-start">
            <MyCheckbox
              checked={isCheckedAll}
              onChecked={handleToggleCheckAll}
            />
          </div>
        ),
        meta: {
          className: "max-w-[200px] !w-[200px]",
        },
      }),
      columnHelper.accessor("service", {
        cell: (info) => {
          return (
            <p
              className={cn(
                "line-clamp-3 text-left text-base font-medium",
                info.row.original.isPartnerRow && "flex gap-x-2",
                !info.row.original.isPartnerRow &&
                  "cursor-pointer hover:text-brand-primary",
              )}
              onClick={(e) => {
                if (!info.row.original.isPartnerRow) {
                  e.stopPropagation();
                  handleViewServiceDetails(info.row.original);
                }
              }}
            >
              {!info.row.original.isPartnerRow &&
                info.row.original.service?.name}
            </p>
          );
        },
        header: () => <p className="text-left">{t("columns.serviceName")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      createQuantityCell({
        accessorKey: "quantity",
        isEdit: true,
        onActionEditCell: onActionEditCell,
        condition: "!info.row.original.isPartnerRow",
        header: t("columns.quantity"),
        size: 120,
      }),
      columnHelper.accessor("serviceType", {
        cell: (info) => {
          if (info.row.original.isPartnerRow) return null;
          if (info.row.original.service.typePack === SERVICE_TYPE_PACK.CONTENT)
            return (
              <div className="text-left">
                <p className="text-base font-medium">Contents</p>
              </div>
            );
          const labels = getTextLinkLabels(info.row.original?.service);
          return (
            <div className="text-left">
              <p className="text-base font-medium">
                {getLabelFromOptions(
                  info.getValue() as SERVICE_TYPE,
                  SERVICE_TYPE_OPTIONS,
                )}{" "}
                {labels.length > 0 &&
                  info.getValue() === SERVICE_TYPE.TEXTLINK && (
                    <span className="mt-1 text-xs text-[#6e6e6e]">
                      ({labels.join(", ")})
                    </span>
                  )}
              </p>
            </div>
          );
        },
        header: () => <p className="text-left">{t("columns.serviceType")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.display({
        id: "price",
        cell: (info) => {
          if (info.row.original.isPartnerRow) return null;
          if (info.row.original.service.typePack === SERVICE_TYPE_PACK.CONTENT)
            return null;
          return (
            <div className="truncate text-right text-base font-medium">
              {getFormattedServicePrice(
                info?.row?.original?.serviceType as SERVICE_TYPE,
                info?.row?.original?.service,
              )}
            </div>
          );
        },
        header: () => <p className="text-right">{t("columns.price")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.display({
        id: "totalPrice",
        cell: (info) => {
          if (info.row.original.isPartnerRow) return null;
          if (info.row.original.service.typePack === SERVICE_TYPE_PACK.CONTENT)
            return null;
          return (
            <div className="truncate text-right text-base font-medium">
              {formatCurrency(
                getPriceAndDiscountService(
                  info?.row?.original?.serviceType as SERVICE_TYPE,
                  info?.row?.original?.service,
                )?.price * info?.row?.original?.quantity,
              )}
            </div>
          );
        },
        header: () => <p className="text-right">{t("columns.totalPrice")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.display({
        id: "discount",
        cell: (info) => {
          if (info.row.original.isPartnerRow) return null;
          if (info.row.original.service.typePack === SERVICE_TYPE_PACK.CONTENT)
            return null;
          return (
            <div className="break-words text-right text-base font-medium">
              {formatCurrency(
                getPriceAndDiscountService(
                  info?.row?.original?.serviceType as SERVICE_TYPE,
                  info?.row?.original?.service,
                )?.discount * info?.row?.original?.quantity,
              )}
            </div>
          );
        },
        header: () => (
          <p className="break-words text-right">{t("columns.discount")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px] break-words",
        },
      }),
      columnHelper.accessor("total", {
        cell: (info) => {
          if (info.row.original.isPartnerRow) return null;
          if (info.row.original.service.typePack === SERVICE_TYPE_PACK.CONTENT)
            return null;
          return (
            <p className="truncate text-right text-base font-medium">
              {getFormattedTotalPrice(info?.row?.original)}
            </p>
          );
        },
        header: () => <p className="text-right">{t("columns.finalTotal")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
    ];
    {
      result.push(
        columnHelper.display({
          id: "action",
          header: () => <></>,
          cell: (cell) => {
            if (cell.row.original.isPartnerRow) return null;
            return (
              <ActionColumnCustom
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.length}
                items={actions}
                deleteAction={useDeleteAction}
                isLoading={isLoading}
                setCheckedList={setCheckedList}
              />
            );
          },
          meta: {
            className: "!w-[70px] !min-w-[70px] px-0",
          },
        }) as any,
      );
    }
    return result;
  }, [
    isCheckedAll,
    checkedList,
    tableData,
    data,
    data?.data,
    handleViewServiceDetails,
    refetch,
    t,
  ]);
  const handleShowModalOrder = () => {
    if (!checkedListData.length) {
      toast.error(t("order.selectAtLeastOne"));
      return;
    }
    setIsModalOrder(true);
  };

  const [createOrder, { isLoading: isLoadingCreateOrder }] =
    useCreateOrdersMutation();

  const handleOrderSubmit = async (orderItem: any, onSuccess?: () => void) => {
    try {
      const res = await createOrder(orderItem);

      apiResponseHandle({
        res,
        onSuccess: () => {
          toast.success(t("order.success"));
          refetch();
          setIsModalOrder(false);
          setCheckedList([]);
          setIsCheckedAll(false);
          setCheckedListData([]);
          onSuccess?.();
        },
      });
    } catch (error) {
      toast.error(t("order.failed"));
    }
  };

  useEffect(() => {
    if (checkedList.length === 0) {
      setCheckedListData([]);
      setTotalPrice(0);
    } else {
      const selectedData = tableData.filter(
        (item: any) => checkedList.includes(item.id) && !item.isPartnerRow,
      );
      const total = selectedData?.reduce((acc: number, item: any) => {
        const { priceAfterDiscount } = getPriceAndDiscountService(
          item.serviceType,
          item.service,
        );
        return acc + item.quantity * priceAfterDiscount;
      }, 0);
      setTotalPrice(total || 0);
      setCheckedListData(selectedData);
    }
  }, [checkedList, tableData]);

  useEffect(() => {
    if (data?.data) {
      const newTableData = handleGroupDataTable();
      setTableData(newTableData);
    } else {
      setTableData([]);
    }
  }, [data?.data, handleGroupDataTable]);

  return {
    data: tableData,
    total: data?.total || 0,
    totalPrice: totalPrice,
    refetch,
    columns,
    loadingState: isFetching,
    checkedListData,
    handleShowModalOrder,
    isModalOrder,
    setIsModalOrder,
    handleOrderSubmit,
    isLoadingCreateOrder,
    isLoadingOrderDetail: isLoadingOrderDetail,
    isServiceModalOpen,
    setIsServiceModalOpen,
    serviceModalData,
  };
};
