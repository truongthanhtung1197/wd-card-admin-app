import React from "react";
import { FaGift } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import MyInputNumber from "@/app/_components/form/MyInputNumber";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { getPriceAndDiscountService } from "@/utils/order.ultil";

import { useLogic } from "./cart.logic";

import { Form, Formik } from "formik";

export default function AddPackToCart({
  isVisibleCreateDomain,
  hideCreateDomain,
  onSuccess,
  addCartData,
}: {
  isVisibleCreateDomain: boolean;
  hideCreateDomain: () => void;
  onSuccess?: () => void;
  addCartData?: any; // Sử dụng kiểu thích hợp
}) {
  const t = useTranslations("Pack.addCart");
  const tServices = useTranslations("SeoerDomain.services");
  const {
    handleSubmit,
    Element,
    loading,
    ValidationSchema,
    formRef,
    initialValues,
  } = useLogic({ onSuccess, addCartData });
  const searchParams = useSearchParams();

  const serviceType = ["BANNER", "GP", "TEXTLINK"].includes(
    searchParams.get("serviceType") || "",
  )
    ? searchParams.get("serviceType")
    : "GP";

  return (
    <MyModal
      size="4xl"
      isOpen={isVisibleCreateDomain}
      onClose={hideCreateDomain}
      header={t("title")}
      body={
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          validationSchema={ValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, validateField, errors }) => {
            return (
              <Form autoComplete="off" className="flex w-full flex-col gap-6">
                {/* Thông tin dịch vụ */}
                <div className="rounded-md border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-3 text-xl font-bold text-brand-primary">
                    {t("serviceInfo.title")}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <strong className="inline-block w-32">
                        {t("serviceInfo.name")}
                      </strong>
                      <span className="font-medium">{addCartData.name}</span>
                    </div>
                    <div className="flex items-center">
                      <strong className="inline-block w-32">
                        {t("serviceInfo.type")}
                      </strong>
                      <span className="font-medium">
                        {getLabelFromOptions(
                          serviceType as SERVICE_TYPE,
                          SERVICE_TYPE_OPTIONS,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <strong className="inline-block w-32">{t("serviceInfo.price")}</strong>
                      <span className="font-medium">
                        {serviceType === SERVICE_TYPE.GP &&
                          formatCurrency(addCartData?.guestPostPrice)}
                        {serviceType === SERVICE_TYPE.TEXTLINK &&
                          formatCurrency(addCartData?.textLinkPrice)}
                        {serviceType === SERVICE_TYPE.BANNER &&
                          formatCurrency(addCartData?.bannerPrice)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <strong className="inline-block w-32">{t("serviceInfo.quantity")}</strong>
                      <MyInputNumber
                        name="quantity"
                        className="w-[125px]"
                        onChange={(e) => {
                          setFieldValue("quantity", Number(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Element />

                {addCartData.complimentaries &&
                  addCartData.complimentaries.length > 0 && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4">
                      <div className="flex items-center">
                        <h3 className="mb-1 flex items-center text-xl font-bold text-[#066102]">
                          {t("complimentary.title")}{" "}
                          <FaGift className="-mt-1 ml-2 text-green-500" />
                        </h3>
                      </div>
                      <div className="pl-2">
                        <ul className="list-inside list-disc space-y-1 font-medium">
                          {addCartData.complimentaries.map(
                            (item: any, index: number) => (
                              <li key={index}>{item.name}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Tổng tiền */}
                <div className="rounded-md border border-orange-200 bg-orange-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-orange-600">
                      {tServices("addCart.discount")}
                    </h3>
                    <span className="text-xl font-bold text-orange-600">
                      {formatCurrency(
                        getPriceAndDiscountService(
                          serviceType as SERVICE_TYPE,
                          addCartData,
                        )?.discount * values.quantity,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-orange-700">
                      {tServices("addCart.total")}
                    </h3>
                    <span className="text-xl font-bold text-orange-700">
                      {formatCurrency(
                        getPriceAndDiscountService(
                          serviceType as SERVICE_TYPE,
                          addCartData,
                        )?.priceAfterDiscount * values.quantity,
                      )}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end gap-4">
                  <MyButton
                    bType="neutral"
                    bSize="medium"
                    onClick={hideCreateDomain}
                  >
                    {tServices("addCart.cancel")}
                  </MyButton>
                  <MyButton
                    bSize="medium"
                    onClick={() => formRef?.current?.handleSubmit()}
                    isDisabled={loading}
                    isLoading={loading}
                  >
                    {tServices("addCart.addToCart")}
                  </MyButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
}
