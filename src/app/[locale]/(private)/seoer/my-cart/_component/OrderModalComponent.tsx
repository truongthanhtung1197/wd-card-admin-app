import React, { memo, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import MyButton from "@/app/_components/common/MyButton";
import MyModal from "@/app/_components/common/MyModal";
import DateInput from "@/app/_components/form/DateInput";
import MyInput from "@/app/_components/form/MyInput";
import MyInputNumber from "@/app/_components/form/MyInputNumber";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { createQuantityCell } from "@/app/_components/table/_components/QuantityCell";
import MyTable from "@/app/_components/table/MyTable";
import { REGEX } from "@/constant/Regex.constant";
import { ICartDetails } from "@/constant/Seoer.constant";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { useGetDomainsAssignToMeQuery } from "@/store/Apis/Domain.api";
import { getTextLinkLabels } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import {
  getFormattedServicePrice,
  getFormattedTotalPrice,
  getPriceAndDiscountService,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import { FieldArray, Form, Formik, useField, useFormikContext } from "formik";
import { trim } from "lodash";
import * as Yup from "yup";

interface IOrderCreate {
  domainId: number;
  orderItems: {
    serviceId: number;
    quantity: number;
    cartDetailId: number;
    serviceType: string;
    url1?: string;
    url2?: string;
    anchorText1?: string;
    anchorText2?: string;
    linkDrive?: string;
    orderAt?: string;
    expiredAt?: string;
    newOrRenew?: string;
    warrantyPeriod?: string;
  }[];
}

interface EventModalProps {
  onCancel: () => void;
  funcConfirm?: (data: IOrderCreate, onSuccess?: () => void) => void;
  linkRedirectAfterConfirm?: string;
  isOpen: boolean;
  data: any;
  isLoadingSubmit: boolean;
  totalPrice?: number;
}

interface FieldCellProps {
  name: string;
  placeholder: string;
  type?: string;
}

const FieldCell = React.memo(
  ({ name, placeholder, type = "text" }: FieldCellProps) => {
    const [field, meta, helpers] = useField(name);
    const { validateField } = useFormikContext<any>();

    if (type === "date") {
      return (
        <div className="flex flex-col">
          <DateInput
            value={field.value}
            onChange={(v) => helpers.setValue(v)}
            onBlur={() => {
              validateField(name);
            }}
          />
          {meta.error && (
            <p className="mt-1 whitespace-normal break-words text-red-500">
              {meta.error}
            </p>
          )}
        </div>
      );
    }

    if (type === "number") {
      return (
        <div className="flex flex-col">
          <MyInputNumber
            value={field.value || 1}
            onChange={(e) => helpers.setValue(e.target.value)}
            placeholder={placeholder}
            onBlur={() => {
              validateField(name);
            }}
          />
          {meta.error && (
            <p className="mt-1 whitespace-normal break-words text-red-500">
              {meta.error}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <MyInput
          value={field.value}
          onChange={(e) => helpers.setValue(e.target.value)}
          placeholder={placeholder}
          onBlur={() => {
            validateField(name);
          }}
        />
        {meta.error && (
          <p className="mt-1 whitespace-normal break-words text-red-500">
            {meta.error}
          </p>
        )}
      </div>
    );
  },
);

const EditableTable = ({ name }: { name: string }) => {
  const t = useTranslations("OrderModal");
  const { values } = useFormikContext<any>();
  const [serviceDetailModal, setServiceDetailModal] = useState<{
    isOpen: boolean;
    serviceData: any;
    serviceType: SERVICE_TYPE | null;
  }>({
    isOpen: false,
    serviceData: null,
    serviceType: null,
  });

  const data = useMemo(() => {
    return values[name];
  }, [values[name].length]);

  const columnHelper = createColumnHelper<ICartDetails>();

  const handleViewServiceDetails = (
    service: any,
    serviceType: SERVICE_TYPE,
  ) => {
    setServiceDetailModal({
      isOpen: true,
      serviceData: service,
      serviceType: serviceType,
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("service.name", {
        size: 200,
        cell: ({ getValue, row }) => (
          <p
            className="cursor-pointer truncate text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewServiceDetails(
                row.original.service,
                row.original.serviceType,
              );
            }}
          >
            {getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("fields.serviceName")}</p>,
      }),
      columnHelper.accessor("serviceType", {
        size: 200,
        cell: (info) => {
          const labels = getTextLinkLabels(info.row.original?.service);
          return (
            <p className="truncate text-left text-base font-medium">
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
          );
        },
        header: () => <p className="text-left">{t("fields.serviceType")}</p>,
      }),
      createQuantityCell({
        accessorKey: "quantity",
        header: t("fields.quantity"),
        size: 80,
      }),

      columnHelper.accessor("priceService", {
        cell: (info) => {
          return (
            <div className="break-words text-right text-base font-medium">
              {getFormattedServicePrice(
                info?.row?.original?.serviceType,
                info?.row?.original.service,
              )}
            </div>
          );
        },
        header: () => (
          <p className="break-words text-right">{t("fields.price")}</p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px] break-words",
        },
      }),
      columnHelper.accessor("priceService", {
        cell: (info) => {
          return (
            <div className="break-words text-right text-base font-medium">
              {formatCurrency(
                getPriceAndDiscountService(
                  info?.row?.original?.serviceType as SERVICE_TYPE,
                  info?.row?.original?.service,
                )?.price * info?.row?.original?.quantity,
              )}
            </div>
          );
        },
        header: () => (
          <p className="break-words text-right">{t("fields.totalPrice")}</p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px] break-words",
        },
      }),
      columnHelper.accessor("total", {
        cell: (info) => {
          return (
            <p className="break-words text-right text-base font-medium">
              {formatCurrency(
                getPriceAndDiscountService(
                  info?.row?.original?.serviceType as SERVICE_TYPE,
                  info?.row?.original?.service,
                )?.discount * info?.row?.original?.quantity,
              )}
            </p>
          );
        },
        header: () => (
          <p className="break-words text-right">{t("fields.discount")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px] break-words",
        },
      }),
      columnHelper.accessor("total", {
        cell: (info) => {
          return (
            <p className="truncate text-right text-base font-medium">
              {getFormattedTotalPrice(info?.row?.original)}
            </p>
          );
        },
        header: () => <p className="text-right">{t("fields.finalTotal")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("anchorText1", {
        size: 200,
        cell: (info) => {
          if (
            ![SERVICE_TYPE.GP, SERVICE_TYPE.TEXTLINK].includes(
              info.row.original.serviceType,
            )
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].anchorText1`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.anchorText1")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("url1", {
        size: 200,
        cell: (info) => {
          if (
            ![SERVICE_TYPE.GP, SERVICE_TYPE.TEXTLINK].includes(
              info.row.original.serviceType,
            )
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].url1`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.url1")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("anchorText2", {
        size: 200,
        cell: (info) => {
          if (![SERVICE_TYPE.GP].includes(info.row.original.serviceType)) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].anchorText2`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.anchorText2")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("url2", {
        size: 200,
        cell: (info) => {
          if (![SERVICE_TYPE.GP].includes(info.row.original.serviceType)) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].url2`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.url2")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("linkDrive", {
        size: 200,
        cell: (info) => {
          if (
            ![
              SERVICE_TYPE.GP,
              SERVICE_TYPE.TEXTLINK,
              SERVICE_TYPE.BACKLINK,
              SERVICE_TYPE.CONTENT,
            ].includes(info.row.original.serviceType)
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].linkDrive`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.linkDrive")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("orderAt", {
        size: 200,
        cell: (info) => {
          if (
            ![SERVICE_TYPE.TEXTLINK].includes(info.row.original.serviceType)
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].orderAt`}
              placeholder={""}
              type="date"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.orderAt")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("expiredAt", {
        size: 200,
        cell: (info) => {
          if (
            ![SERVICE_TYPE.TEXTLINK].includes(info.row.original.serviceType)
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].expiredAt`}
              placeholder={""}
              type="date"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.expiredAt")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("newOrRenew", {
        size: 200,
        cell: (info) => {
          if (
            ![SERVICE_TYPE.TEXTLINK].includes(info.row.original.serviceType)
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].newOrRenew`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.newOrRenew")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("warrantyPeriod", {
        size: 200,
        cell: (info) => {
          if (
            ![
              SERVICE_TYPE.BACKLINK,
              SERVICE_TYPE.TRAFFIC,
              SERVICE_TYPE.ENTITY,
            ].includes(info.row.original.serviceType)
          ) {
            return "-";
          }
          return (
            <FieldCell
              name={`orderItems[${info.row.index}].warrantyPeriod`}
              placeholder={""}
              type="text"
            />
          );
        },
        header: () => <p className="text-left">{t("fields.warrantyPeriod")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
    ],
    [name, values[name].length],
  );

  return (
    <FieldArray name={name}>
      {() => {
        return (
          <>
            <MyTable columns={columns} data={data} />
          </>
        );
      }}
    </FieldArray>
  );
};

const OrderModalComponent = memo((props: EventModalProps) => {
  const t = useTranslations("OrderModal");
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState<string | undefined>("");
  const [valueSelected, setValueSelected] = React.useState<any>(null);
  const [isDomainEmpty, setIsDomainEmpty] = useState<boolean>(false);

  const { data: domainData, isLoading } = useGetDomainsAssignToMeQuery({
    limit: limit,
    page: 1,
    search: trim(search),
  });

  const [newData, setNewData] = useState<any>();

  useEffect(() => {
    if (props.data) {
      const newData = props.data
        .filter((item: any) => item.quantity > 0)
        .map((item: any) => ({
          ...item,
          quantity: item.quantity.toString(),
        }));
      setNewData(newData);
    }
  }, [props.data]);

  const validationSchema = Yup.object().shape({
    orderItems: Yup.array().of(
      Yup.object().shape({
        url1: Yup.string().when("serviceType", {
          is: (val: string) => ["GP", "TEXTLINK"].includes(val),
          then: (schema) =>
            schema
              .required(t("validation.url1Required"))
              .url(t("validation.invalidUrl"))
              .matches(REGEX.URL, t("validation.invalidUrlFormat")),
          otherwise: (schema) => schema.optional(),
        }),
        url2: Yup.string().when("serviceType", {
          is: (val: string) => ["GP"].includes(val),
          then: (schema) =>
            schema
              .required(t("validation.url2Required"))
              .url(t("validation.invalidUrl"))
              .matches(REGEX.URL, t("validation.invalidUrlFormat")),
          otherwise: (schema) => schema.optional(),
        }),
        anchorText1: Yup.string().when("serviceType", {
          is: (val: string) => ["GP", "TEXTLINK"].includes(val),
          then: (schema) =>
            schema.required(t("validation.anchorText1Required")),
          otherwise: (schema) => schema.optional(),
        }),
        anchorText2: Yup.string().when("serviceType", {
          is: (val: string) => ["GP"].includes(val),
          then: (schema) =>
            schema.required(t("validation.anchorText2Required")),
          otherwise: (schema) => schema.optional(),
        }),
        linkDrive: Yup.string().when("serviceType", {
          is: (val: SERVICE_TYPE) => [SERVICE_TYPE.CONTENT].includes(val),
          then: (schema) => schema.required("Bắt buộc"),
          otherwise: (schema) => schema.optional(),
        }),
        orderAt: Yup.string().when("serviceType", {
          is: (val: string) => ["TEXTLINK"].includes(val),
          then: (schema) => schema.required("Vui lòng nhập thời gian đặt"),
          otherwise: (schema) => schema.optional(),
        }),
        expiredAt: Yup.string().when("serviceType", {
          is: (val: string) => ["TEXTLINK"].includes(val),
          then: (schema) => schema.required("Vui lòng nhập ngày hết hạn"),
          otherwise: (schema) => schema.optional(),
        }),
        newOrRenew: Yup.string().when("serviceType", {
          is: (val: string) => ["TEXTLINK"].includes(val),
          then: (schema) =>
            schema.required("Vui lòng chọn đặt mới hoặc gia hạn"),
          otherwise: (schema) => schema.optional(),
        }),
        warrantyPeriod: Yup.string().when("serviceType", {
          is: (val: string) => ["BACKLINK", "TRAFFIC", "ENTITY"].includes(val),
          then: (schema) => schema.required("Vui lòng nhập thời gian bảo hành"),
          otherwise: (schema) => schema.optional(),
        }),
      }),
    ),
  });

  const initialValues = {
    domainId: "",
    orderItems:
      newData?.map((item: any) => ({
        service: item.service,
        serviceId: item.service.id,
        quantity: Number(item.quantity),
        cartDetailId: item.id,
        serviceType: item.serviceType,
        url1: item.url1 || "",
        url2: item.url2 || "",
        anchorText1: item.anchorText1 || "",
        anchorText2: item.anchorText2 || "",
        linkDrive: item.linkDrive || "",
        orderAt: item.orderAt || "",
        expiredAt: item.expiredAt || "",
        newOrRenew: item.newOrRenew || "",
        warrantyPeriod: item.warrantyPeriod || "",
        partnerId: item?.service?.user?.id || "",
      })) || [],
  };

  const handleSubmitOrder = (values: any) => {
    if (!valueSelected) {
      setIsDomainEmpty(true);
      return;
    } else {
      setIsDomainEmpty(false);
    }
    const orderItems = values.orderItems.map((item: any) => ({
      serviceId: item.service.id,
      serviceType: item.serviceType,
      quantity: Number(item.quantity),
      cartDetailId: item.cartDetailId,
      url1: item.url1,
      url2: item.url2,
      anchorText1: item.anchorText1,
      anchorText2: item.anchorText2,
      linkDrive: item.linkDrive || "",
      orderAt: item.orderAt === "" ? null : item.orderAt,
      expiredAt: item.expiredAt === "" ? null : item.expiredAt,
      newOrRenew: item.newOrRenew,
      warrantyPeriod: item.warrantyPeriod,
      partnerId: Number(item.partnerId),
    }));

    const dataOrder = {
      domainId: Number(valueSelected?.id),
      orderItems,
      totalPrice: props.totalPrice,
    };

    props.funcConfirm &&
      props.funcConfirm(dataOrder, () => {
        setValueSelected(null);
      });
  };

  return (
    <MyModal
      size="max"
      isOpen={props.isOpen}
      onClose={props.onCancel}
      header="Order"
      classNameBody="!min-h-[400px]"
      body={
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={handleSubmitOrder}
        >
          <Form>
            <div className="mb-[20px] max-w-[500px]">
              <SearchableSelect
                limit={limit}
                setLimit={setLimit}
                setSearch={setSearch}
                setValueSelected={setValueSelected}
                valueSelected={valueSelected}
                data={domainData}
                isLoading={isLoading}
              />
              {isDomainEmpty && (
                <p className="text-red-500">Vui lòng chọn miền</p>
              )}
            </div>
            <EditableTable name="orderItems" />
            <div className="mt-4 flex justify-end gap-3">
              <div className="flex items-end text-[20px] text-accent-error">
                Tổng thanh toán: {formatCurrency(props.totalPrice)}
              </div>
              <MyButton
                bSize="small"
                type="submit"
                isLoading={props.isLoadingSubmit}
              >
                Đặt hàng
              </MyButton>
            </div>
          </Form>
        </Formik>
      }
    />
  );
});

export default OrderModalComponent;
