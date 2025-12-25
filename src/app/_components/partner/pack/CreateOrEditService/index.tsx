import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import MyCheckbox from "@/app/_components/form/MyCheckbox";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import FTextInput from "@/app/_components/formik/FTextInput";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import {
  SERVICE_TYPE,
  SERVICE_TYPE_OPTIONS,
} from "@/constant/service.constant";
import { Service } from "@/model/Partner.model";

import MyCard from "../../../common/MyCard";
import MyModal from "../../../common/MyModal";
import { useLogic } from "./useLogic";

import { FieldArray, Form, Formik } from "formik";

export default function CreateOrEditService({
  isVisibleCreateDomain,
  hideCreateDomain,
  onSuccess,
  editService,
}: {
  isVisibleCreateDomain: boolean;
  hideCreateDomain: () => void;
  onSuccess?: () => void;
  editService?: Service;
}) {
  const t = useTranslations("Pack.createEdit");
  const { handleSubmit, loading, ValidationSchema, formRef, initialValues } =
    useLogic({ onSuccess, editService });

  return (
    <MyModal
      size="4xl"
      isOpen={isVisibleCreateDomain}
      onClose={hideCreateDomain}
      header={
        editService?.id
          ? `${t("editTitle")} ${editService?.name}`
          : t("createTitle")
      }
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
          {({ validateField, values, setFieldValue }) => {
            return (
              <Form autoComplete="off" className="col w-full gap-6">
                <TextInput
                  label={t("labels.name")}
                  type="text"
                  name="name"
                  className="w-full"
                  onBlur={() => validateField("name")}
                  disabled={!!editService}
                />
                <div className="grid w-full grid-cols-2 gap-6">
                  <TextInput
                    label={t("labels.price")}
                    type="text"
                    name="price"
                    className="w-full"
                    onBlur={() => validateField("price")}
                  />

                  <FSelectInput
                    label={t("labels.serviceType")}
                    name="type"
                    isModal={true}
                    className="w-full"
                    onChangeSelect={() => {
                      setTimeout(() => {
                        validateField("type");
                      }, 0);
                    }}
                    onBlur={() => {
                      validateField("type");
                    }}
                    options={SERVICE_TYPE_OPTIONS?.filter((item) =>
                      [
                        SERVICE_TYPE.TRAFFIC,
                        SERVICE_TYPE.ENTITY,
                        SERVICE_TYPE.BACKLINK,
                        SERVICE_TYPE.TOOL,
                      ].includes(item.key),
                    )}
                  />
                </div>
                <div className="w-full">
                  <MyCheckbox
                    label={t("labels.discount")}
                    checked={!!values.discountPackServiceChecked}
                    onChecked={() => {
                      const checked = !values.discountPackServiceChecked;
                      setFieldValue("discountPackServiceChecked", checked);
                      if (!checked) setFieldValue("discountPackService", 0);
                    }}
                  />
                  {values.discountPackServiceChecked && (
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <TextInput
                        label={t("labels.discountAmount")}
                        name="discountPackService"
                        type="number"
                        className="w-full"
                        value={values.discountPackService?.toString() ?? ""}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const max = Number(values.price || 0);
                          setFieldValue(
                            "discountPackService",
                            val > max ? max : val < 0 ? 0 : val,
                          );
                        }}
                        onBlur={() => validateField("discountPackService")}
                      />
                      <TextInput
                        label={t("labels.newPrice")}
                        name="packPriceNew"
                        value={Math.max(
                          0,
                          Number(values.price || 0) -
                            Number(values.discountPackService || 0),
                        ).toString()}
                        readOnly
                        disabled
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                <TextInput
                  label={t("labels.demoUrl")}
                  type="text"
                  name="urlDemo"
                  className="w-full"
                  onBlur={() => validateField("urlDemo")}
                />
                <MyCard className="border-brand-primary">
                  <Text variant="body1-regular" className="text-base font-bold">
                    {t("labels.addComplimentary")}
                  </Text>
                  <div className="col mt-3 gap-3">
                    <FieldArray name="complimentaries">
                      {({ remove, push }) => (
                        <div className="col w-full gap-4">
                          {(values?.complimentaries?.length &&
                            values?.complimentaries?.length > 0 &&
                            values?.complimentaries?.map(
                              (item: string, index: number) => (
                                <div
                                  key={index}
                                  className="row w-full max-w-full items-start gap-3"
                                >
                                  <FTextInput
                                    wrapperClassName="w-full"
                                    name={`complimentaries.${index}`}
                                    inputWrapperClassName="!min-h-[44px]"
                                    onBlur={() => {
                                      validateField(`complimentaries.${index}`);
                                    }}
                                  />

                                  <div
                                    className="center  mt-2 h-8 w-8 shrink-0 cursor-pointer rounded-full hover:border hover:border-neutral-stroke-light"
                                    onClick={() => remove(index)}
                                  >
                                    <TrashIcon />
                                  </div>
                                </div>
                              ),
                            )) ||
                            ""}
                          <MyButton
                            className="cursor-pointer"
                            onClick={() => push("")}
                            bType="neutral"
                            bSize="small"
                          >
                            {t("labels.addComplimentary")}
                          </MyButton>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </MyCard>
                <TextInput
                  label={t("labels.note")}
                  type="text"
                  name="note"
                  className="w-full"
                />

                <MyCheckbox
                  label={t("labels.showOnMarket")}
                  checked={values?.isShow}
                  onChecked={() => {
                    setFieldValue("isShow", !values?.isShow);
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      }
      footer={
        <div className="flex justify-end gap-3">
          <MyButton bType="neutral" bSize="small" onClick={hideCreateDomain}>
            {t("buttons.cancel")}
          </MyButton>
          <MyButton
            bSize="small"
            onClick={() => {
              formRef?.current?.handleSubmit();
            }}
            isDisabled={loading}
            isLoading={loading}
          >
            {t("buttons.submit")}
          </MyButton>
        </div>
      }
    ></MyModal>
  );
}
