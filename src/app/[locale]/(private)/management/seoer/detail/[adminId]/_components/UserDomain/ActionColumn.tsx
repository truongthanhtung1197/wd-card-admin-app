"use client";
import React, { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import MySelect from "@/app/_components/form/MySelect";
import { ROUTERS } from "@/constant";
import { DOMAIN_STATUS_OPTIONS } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import { useEditDomainByIdMutation } from "@/store/Apis/Domain.api";
import { useDeleteUserDomainByIdMutation } from "@/store/Apis/UserDomain.api";
import { apiResponseHandle } from "@/utils/common.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const ActionColumn = memo(
  ({ data, refetch }: { data: any; refetch: () => void }) => {
    const t = useTranslations("ActionColumn");
    const router = useLocaleRouter();
    const { updateRouteCache } = useUrlHistory();
    const items = useMemo(() => {
      const result = [
        {
          label: t("removeUser"),
          key: "remove_user",
        },
        {
          label: t("edit"),
          key: "edit",
        },
      ];

      return result;
    }, [t]);

    const [deleteUserDomainById, { isLoading }] =
      useDeleteUserDomainByIdMutation();

    const onAction = useCallback(
      async (key: string) => {
        if (key === "remove_user") {
          const res = await deleteUserDomainById(data.id);

          apiResponseHandle({
            res,
            toastSuccessMessage: t("removeUserSuccess"),
            toastErrorMessage: t("removeUserError"),
            onSuccess: () => {
              refetch();
            },
          });
        }
        if (key === "edit") {
          updateRouteCache(ROUTERS.MANAGEMENT_DOMAINS);
          router.push(
            ROUTERS.MANAGEMENT_DOMAINS_EDIT.replace(
              ":id",
              String(data?.domain.id || ""),
            ),
          );
        }
      },
      [deleteUserDomainById, refetch, data, t],
    );

    // const editDomain = useCallback(async () => {
    //   const res = await editDomainById({
    //     id: data.id,
    //     data: {},
    //   });
    //   apiResponseHandle({
    //     res,
    //     toastSuccessMessage: "Đã chỉnh sửa domain",
    //     toastErrorMessage: "Đã xảy ra lỗi khi chỉnh sửa domain",
    //     onSuccess: () => {
    //       toggle();
    //       refetch();
    //     },
    //   });
    // }, [editDomainById, data.id, refetch, toggle]);

    return (
      <div>
        {/* <MyModal
          isOpen={isVisible}
          onClose={toggle}
          header="Chỉnh sửa domain"
          body={<div>form edit doamin here</div>}
          footer={
            <div className="flex justify-end gap-3">
              <MyButton bType="neutral" bSize="small" onClick={toggle}>
                Cancel
              </MyButton>
              <MyButton bSize="small" onClick={editDomain}>
                Confirm
              </MyButton>
            </div>
          }
        ></MyModal> */}
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
  },
);

export default ActionColumn;

const ColumnDomainStatusAction = ({
  data,
  refetch,
}: {
  data: any; // UserDomain
  refetch: () => void;
}) => {
  const t = useTranslations("ActionColumn");
  const [editDomainById] = useEditDomainByIdMutation();

  const onChangeStatus = useCallback(
    async (e: any) => {
      const res = await editDomainById({
        id: data.id.toString(),
        data: {
          status: e?.target?.value,
        },
      });

      apiResponseHandle({
        res,
        toastSuccessMessage: t("updateStatusSuccess"),
        toastErrorMessage: t("updateStatusError"),
        onSuccess: () => {
          refetch();
        },
        onFailer: () => {
          refetch();
        },
      });
    },
    [editDomainById, t],
  );
  return (
    <div>
      <MySelect
        options={DOMAIN_STATUS_OPTIONS}
        selectedKeys={data?.domain?.status ? [data?.domain?.status] : []}
        onChange={(e) => onChangeStatus(e)}
      />
    </div>
  );
};

export { ColumnDomainStatusAction };
