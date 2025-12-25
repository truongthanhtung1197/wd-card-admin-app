"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import SearchInput from "@/app/_components/common/SearchInput";
import SetupSubHeader from "@/app/_components/common/SetupSubHeader";
import { toast } from "@/app/_components/common/Toaster";
import MySingleSelectSearch from "@/app/_components/form/MySingleSelectSearch";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import ServiceDetailModal from "@/app/_components/modal/Service/ServiceDetailModal";
import MyPagination from "@/app/_components/table/MyPagination";
import MyTable from "@/app/_components/table/MyTable";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  SERVICE_ORDER_STATUS_OPTIONS,
  ServiceStatusType,
  ServiceStatusValues,
} from "@/constant/Manager.constant";
import {
  SERVICE_STATUS,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { User69vn } from "@/model";
import { useAppSelector } from "@/store";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { useUpdateMultipleServiceStatusMutation } from "@/store/Apis/Service.api";
import { AuthSelector } from "@/store/Auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import SearchUserItem from "../../seoer/services/_components/SearchUserItem";
import { useAdminLogic } from "./logic";

const AdminView = () => {
  const t = useTranslations("ServiceManagement");
  const tSidebar = useTranslations("sidebar");
  const {
    data,
    fetching,
    total,
    columns,
    isModalDetail,
    setIsModalDetail,
    modalDetailData,
    selectedRows,
    setSelectedRows,
    refetch,
  } = useAdminLogic();

  // Determine service type
  const [search, setSearch] = useState<string | undefined>("");
  const [limit, setLimit] = useState(20);
  const [valueSelected, setValueSelected] = useState<any>(null);
  const { data: partnerData, isLoading } = useGetAdminsQuery(
    {
      limit: limit,
      page: 1,
      role: ADMIN_ROLE.PARTNER,
      search: search,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useLocaleRouter();

  useEffect(() => {
    if (valueSelected) {
      const current = new URLSearchParams(searchParams);
      current.set("partnerId", valueSelected.id);
      router.push(`${pathname}?${current.toString()}`);
    } else {
      const current = new URLSearchParams(searchParams);
      current.delete("partnerId");
      router.push(`${pathname}?${current.toString()}`);
    }
  }, [valueSelected]);

  const tStatus = useTranslations("statusService");
  const tService = useTranslations("Service");
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const [updateMultipleStatus, { isLoading: isUpdatingStatus }] =
    useUpdateMultipleServiceStatusMutation();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [statusService, setStatusService] =
    useState<ServiceStatusType>("PENDING");

  const optionsStatusServiceMultileLanguage = useMemo(() => {
    return SERVICE_ORDER_STATUS_OPTIONS.map((item) => ({
      ...item,
      label: tStatus(item.key),
    }));
  }, [tStatus]);

  const getRemainingStatuses = (): Array<{
    key: ServiceStatusType;
    label: string;
  }> => {
    const allStatuses = new Set(ServiceStatusValues);
    return Array.from(allStatuses).map((status) => ({
      key: status,
      label: tService(`status.${status.toLowerCase()}`) || status,
    }));
  };

  const statusItems = useMemo(() => {
    const result: Array<{ key: ServiceStatusType; label: string }> = [];
    const currentUserRole = admin?.role?.roleName;

    const canApproveServices =
      currentUserRole === ADMIN_ROLE.MANAGER ||
      currentUserRole === ADMIN_ROLE.ASSISTANT ||
      currentUserRole === ADMIN_ROLE.SUPER_ADMIN;

    if (canApproveServices) {
      const statusOptions = getRemainingStatuses();
      result.push(...statusOptions);
    }

    return result;
  }, [admin?.role?.roleName, tService]);

  const handleUpdateMultipleStatus = async () => {
    try {
      if (selectedRows.size === 0) return;

      const ids = Array.from(selectedRows);
      const res: any = await updateMultipleStatus({
        ids,
        status: statusService as SERVICE_STATUS,
      });

      if (res.error) {
        toast.error(
          res.error?.data?.error?.message ||
            tService("errors.changeStatusFailure"),
        );
        return;
      }

      toast.success(tService("messages.changeStatusSuccess"));
      setSelectedRows(new Set());
      refetch();
      setIsShowModalConfirm(false);
    } catch (e) {
      toast.error(tService("errors.changeStatusFailure"));
    }
  };

  const onAction = (key: string) => {
    setIsShowModalConfirm(true);
    setStatusService(key as ServiceStatusType);
  };

  return (
    <>
      <SetupSubHeader label={`${tSidebar("list")} ${tSidebar("service")}`} />

      <div className="col mb-4 gap-4 rounded-lg border border-neutral-stroke-bold bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <SearchInput
            className="h-[40px] w-[400px] min-w-[100px]"
            placeholder={t("search.placeholder")}
          />
          {/* {isCanEdit && ( */}
          <div className="w-[170px]">
            <MySingleSelectSearch
              options={SERVICE_TYPE_OPTIONS}
              placeholder={t("search.serviceType")}
              param="serviceType"
              myVariant="v2"
            />
          </div>
          <div className="w-[200px]">
            <MySingleSelectSearch
              param="status"
              options={optionsStatusServiceMultileLanguage}
              myVariant="v2"
              placeholder={t("search.status")}
            />
          </div>
          <SearchableSelect
            wrapClassName="w-[300px]"
            renderItem={({ item, onClick, onRemove }) => {
              return (
                <SearchUserItem
                  data={item as User69vn}
                  onClick={onClick}
                  onRemove={onRemove}
                />
              );
            }}
            onRemoveSelected={() => {
              setValueSelected(null);
            }}
            placeholder={t("search.partner")}
            limit={limit}
            setLimit={setLimit}
            setSearch={setSearch}
            setValueSelected={setValueSelected}
            valueSelected={valueSelected}
            data={partnerData}
            isLoading={isLoading}
          />
          {selectedRows.size > 0 && statusItems.length > 0 && (
            <div className="flex items-center gap-2">
              <Dropdown
                classNames={{
                  base: "!p-0",
                  content:
                    "!rounded-lg !py-2 !px-0 !border-[1px] !border-neutral-stroke-bold !min-w-[120px] !max-w-[300px] !w-auto",
                }}
              >
                <DropdownTrigger>
                  <div className="flex h-[42px] cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors duration-200 hover:bg-gray-50">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/1721/1721936.png"
                      alt="option"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm font-medium">
                      Change Status ({selectedRows.size})
                    </span>
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Status Actions"
                  items={statusItems}
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
          )}
        </div>
      </div>
      <MyTable
        {...{
          data: data || [],
          fetching,
          columns,
          NoDataProps,
          tableClassName: "min-w-[800px]",
        }}
      />
      <MyPagination total={total} />

      {/* Add the modal for service details */}
      {isModalDetail && (
        <ServiceDetailModal
          isOpen={isModalDetail}
          onCancel={() => setIsModalDetail(false)}
          serviceDetail={modalDetailData}
        />
      )}

      {/* Modal confirm change status */}
      {isShowModalConfirm && (
        <MyModal
          size="sm"
          isOpen={isShowModalConfirm}
          onClose={() => setIsShowModalConfirm(false)}
          header={tService("modal.changeStatus.title")}
          body={tService("modal.changeStatus.message")}
          footer={
            <div className="flex justify-end gap-3">
              <MyButton
                bType="neutral"
                bSize="small"
                onClick={() => setIsShowModalConfirm(false)}
              >
                {tService("modal.changeStatus.cancel")}
              </MyButton>
              <MyButton
                isLoading={isUpdatingStatus}
                bSize="small"
                onClick={handleUpdateMultipleStatus}
              >
                {tService("modal.changeStatus.confirm")}
              </MyButton>
            </div>
          }
        />
      )}
    </>
  );
};

const NoDataProps = {
  title: "No Services Found",
};

export default AdminView;
