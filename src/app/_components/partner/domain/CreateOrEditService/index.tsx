import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { MyButton, TextInput } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import Text from "@/app/_components/common/Text";
import MyCheckbox from "@/app/_components/form/MyCheckbox";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import FTextInput from "@/app/_components/formik/FTextInput";
import TrashIcon from "@/app/_components/icons/TrashIcon";
import { MONTH_DURATION_OPTIONS } from "@/constant/common.constant";
import { SERVICE_FIELD_TYPE_OPTIONS } from "@/constant/service.constant";
import { Service } from "@/model/Partner.model";
import { cn } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";

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
  const t = useTranslations("Partner.domain.createEdit");
  const { handleSubmit, loading, ValidationSchema, formRef, initialValues } =
    useLogic({ onSuccess, editService });

  const tFieldType = useTranslations("serviceFieldType");
  const optionsFieldTypeMultileLanguage = useMemo(() => {
    return SERVICE_FIELD_TYPE_OPTIONS.map((item) => ({
      ...item,
      label: tFieldType(item.key),
    }));
  }, [tFieldType]);

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
          {({ validateField, values, setFieldValue, errors }) => {
            return (
              <Form autoComplete="off" className="col w-full gap-6">
                <MyCard className=" border-brand-primary">
                  <div className="grid w-full grid-cols-2 gap-6">
                    <TextInput
                      label={t("labels.domain")}
                      type="text"
                      name="domain"
                      className="w-full"
                      onBlur={() => validateField("domain")}
                      disabled={!!editService}
                    />
                    <FSelectInput
                      label={t("labels.field")}
                      name="fieldType"
                      isModal={true}
                      className="w-full"
                      onChangeSelect={() => {
                        setTimeout(() => {
                          validateField("fieldType");
                        }, 0);
                      }}
                      onBlur={() => {
                        validateField("fieldType");
                      }}
                      options={optionsFieldTypeMultileLanguage}
                    />

                    <TextInput
                      label={t("labels.dr")}
                      name="dr"
                      className="w-full"
                      onBlur={() => validateField("dr")}
                      disabled={true}
                    />

                    <TextInput
                      label={t("labels.refDomain")}
                      name="refDomain"
                      className="w-full"
                      onBlur={() => validateField("refDomain")}
                      disabled={true}
                    />

                    <TextInput
                      label={t("labels.organicTraffic")}
                      name="organicTraffic"
                      className="w-full"
                      onBlur={() => validateField("organicTraffic")}
                      disabled={true}
                    />
                  </div>
                </MyCard>

                {values?.isSaleTextLink && (
                  <MyCard className={cn(" border-brand-primary")}>
                    <div className="grid w-full grid-cols-2 gap-6">
                      <TextInput
                        label={t("labels.textLinkPrice")}
                        type="text"
                        name="textLinkPrice"
                        className="w-full"
                        onBlur={() => validateField("textLinkPrice")}
                      />
                      <FSelectInput
                        label={t("labels.textLinkDuration")}
                        name="textLinkDuration"
                        isModal={true}
                        className="w-full"
                        onChangeSelect={() => {
                          setTimeout(() => {
                            validateField("textLinkDuration");
                          }, 0);
                        }}
                        onBlur={() => {
                          validateField("textLinkDuration");
                        }}
                        options={MONTH_DURATION_OPTIONS}
                      />

                      <TextInput
                        label={t("labels.textLinkNote")}
                        type="text"
                        name="textLinkNote"
                        className="w-full"
                      />
                      <div />
                      <div className="col gap-3">
                        <MyCheckbox
                          label={t("labels.dofollowTextLink")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isFollowTextLink === true}
                          onChecked={() => {
                            setFieldValue("isFollowTextLink", true);
                          }}
                        />
                        <MyCheckbox
                          label={t("labels.nofollowTextLink")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isFollowTextLink === false}
                          onChecked={() => {
                            setFieldValue("isFollowTextLink", false);
                          }}
                        />
                      </div>
                      <div className="col gap-3">
                        <MyCheckbox
                          label={t("labels.homeTextLink")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isHomeTextLink}
                          onChecked={() => {
                            setFieldValue(
                              "isHomeTextLink",
                              !values?.isHomeTextLink,
                            );
                          }}
                        />
                        <MyCheckbox
                          label={t("labels.footerTextLink")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isFooterTextLink}
                          onChecked={() => {
                            setFieldValue(
                              "isFooterTextLink",
                              !values?.isFooterTextLink,
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <MyCheckbox
                        classNameLabel="font-bold"
                        label={t("labels.discountTextLinkService")}
                        checked={!!values.discountTextLinkServiceChecked}
                        onChecked={() => {
                          const checked =
                            !values.discountTextLinkServiceChecked;
                          setFieldValue(
                            "discountTextLinkServiceChecked",
                            checked,
                          );
                          if (!checked)
                            setFieldValue("discountTextLinkService", 0);
                        }}
                      />
                      {values.discountTextLinkServiceChecked && (
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <TextInput
                            label={t("labels.discountTextLinkServiceAmount")}
                            name="discountTextLinkService"
                            type="number"
                            className="w-full"
                            value={values.discountTextLinkService?.toString()}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              const max = Number(values.textLinkPrice || 0);
                              setFieldValue(
                                "discountTextLinkService",
                                val > max ? max : val < 0 ? 0 : val,
                              );
                            }}
                            onBlur={() =>
                              validateField("discountTextLinkService")
                            }
                          />
                          <TextInput
                            label={t("labels.textLinkPriceNew")}
                            name="textLinkPriceNew"
                            value={formatCurrency(
                              Math.max(
                                0,
                                Number(values.textLinkPrice || 0) -
                                  Number(values.discountTextLinkService || 0),
                              ),
                            )}
                            readOnly
                            disabled
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </MyCard>
                )}

                {values?.isSaleGuestPost && (
                  <MyCard className=" border-brand-primary">
                    <div className="grid w-full grid-cols-2 gap-6">
                      <TextInput
                        label={t("labels.guestPostPrice")}
                        name="guestPostPrice"
                        className="w-full"
                        onBlur={() => validateField("guestPostPrice")}
                      />
                      <TextInput
                        label={t("labels.guestPostNote")}
                        name="guestPostNote"
                        className="w-full"
                      />

                      <div className="col gap-3">
                        <MyCheckbox
                          label={t("labels.indexGuestPost")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isIndexGuestPost === true}
                          onChecked={() => {
                            setFieldValue("isIndexGuestPost", true);
                          }}
                        />
                        <MyCheckbox
                          label={t("labels.noIndexGuestPost")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isIndexGuestPost === false}
                          onChecked={() => {
                            setFieldValue("isIndexGuestPost", false);
                          }}
                        />
                      </div>
                      <div className="col gap-3">
                        <MyCheckbox
                          label={t("labels.dofollowGuestPost")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isFollowGuestPost === true}
                          onChecked={() => {
                            setFieldValue("isFollowGuestPost", true);
                          }}
                        />
                        <MyCheckbox
                          label={t("labels.nofollowGuestPost")}
                          classNameLabel="text-[#6e6e6e]"
                          checked={values?.isFollowGuestPost === false}
                          onChecked={() => {
                            setFieldValue("isFollowGuestPost", false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <MyCheckbox
                        label={t("labels.discountGuestPostService")}
                        classNameLabel="font-bold"
                        checked={!!values.discountGuestPostServiceChecked}
                        onChecked={() => {
                          const checked =
                            !values.discountGuestPostServiceChecked;
                          setFieldValue(
                            "discountGuestPostServiceChecked",
                            checked,
                          );
                          if (!checked)
                            setFieldValue("discountGuestPostService", 0);
                        }}
                      />
                      {values.discountGuestPostServiceChecked && (
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <TextInput
                            label={t("labels.discountGuestPostServiceAmount")}
                            name="discountGuestPostService"
                            type="number"
                            className="w-full"
                            value={values.discountGuestPostService?.toString()}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              const max = Number(values.guestPostPrice || 0);
                              setFieldValue(
                                "discountGuestPostService",
                                val > max ? max : val < 0 ? 0 : val,
                              );
                            }}
                            onBlur={() =>
                              validateField("discountGuestPostService")
                            }
                          />
                          <TextInput
                            label={t("labels.guestPostPriceNew")}
                            name="guestPostPriceNew"
                            value={formatCurrency(
                              Math.max(
                                0,
                                Number(values.guestPostPrice || 0) -
                                  Number(values.discountGuestPostService || 0),
                              ),
                            )}
                            readOnly
                            disabled
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </MyCard>
                )}

                {values?.isSaleBanner && (
                  <MyCard className=" border-brand-primary">
                    <div className="grid w-full grid-cols-2 gap-6">
                      <TextInput
                        label={t("labels.bannerPrice")}
                        name="bannerPrice"
                        className="w-full"
                        onBlur={() => validateField("bannerPrice")}
                      />
                      <FSelectInput
                        label={t("labels.bannerDuration")}
                        isModal={true}
                        name="bannerDuration"
                        className="w-full"
                        onChangeSelect={() => {
                          setTimeout(() => {
                            validateField("bannerDuration");
                          }, 0);
                        }}
                        onBlur={() => {
                          validateField("bannerDuration");
                        }}
                        options={MONTH_DURATION_OPTIONS}
                      />
                    </div>
                    <div className="mt-3">
                      <MyCheckbox
                        label={t("labels.discountBannerService")}
                        classNameLabel="font-bold"
                        checked={!!values.discountBannerServiceChecked}
                        onChecked={() => {
                          const checked = !values.discountBannerServiceChecked;
                          setFieldValue(
                            "discountBannerServiceChecked",
                            checked,
                          );
                          if (!checked)
                            setFieldValue("discountBannerService", 0);
                        }}
                      />
                      {values.discountBannerServiceChecked && (
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <TextInput
                            label={t("labels.discountBannerServiceAmount")}
                            name="discountBannerService"
                            type="number"
                            className="w-full"
                            value={values.discountBannerService?.toString()}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              const max = Number(values.bannerPrice || 0);
                              setFieldValue(
                                "discountBannerService",
                                val > max ? max : val < 0 ? 0 : val,
                              );
                            }}
                            onBlur={() =>
                              validateField("discountBannerService")
                            }
                          />
                          <TextInput
                            label={t("labels.bannerPriceNew")}
                            name="bannerPriceNew"
                            value={formatCurrency(
                              Math.max(
                                0,
                                Number(values.bannerPrice || 0) -
                                  Number(values.discountBannerService || 0),
                              ),
                            )}
                            readOnly
                            disabled
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </MyCard>
                )}
                <MyCard className=" border-brand-primary">
                  <Text variant="body1-regular" className="text-base font-bold">
                    {t("labels.complimentary")}
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

                <div className="col gap-3">
                  <MyCheckbox
                    label={t("labels.saleGuestPost")}
                    checked={values?.isSaleGuestPost}
                    onChecked={() => {
                      setFieldValue(
                        "isSaleGuestPost",
                        !values?.isSaleGuestPost,
                      );
                    }}
                  />

                  <MyCheckbox
                    label={t("labels.saleTextLink")}
                    checked={values?.isSaleTextLink}
                    onChecked={() => {
                      setFieldValue("isSaleTextLink", !values?.isSaleTextLink);
                    }}
                  />

                  <MyCheckbox
                    label={t("labels.saleBanner")}
                    checked={values?.isSaleBanner}
                    onChecked={() => {
                      setFieldValue("isSaleBanner", !values?.isSaleBanner);
                    }}
                  />
                  <MyCheckbox
                    label={t("labels.showOnMarket")}
                    checked={values?.isShow}
                    onChecked={() => {
                      setFieldValue("isShow", !values?.isShow);
                    }}
                  />
                </div>
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
