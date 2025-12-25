import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { MAX_PRICE } from "@/constant/Order.constant";
import { REGEX } from "@/constant/Regex.constant";
import {
  SERVICE_FIELD_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { CreateOrEditService, Service } from "@/model/Partner.model";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "@/store/Apis/Partner.api";
import { apiResponseHandle, insertObjectIf } from "@/utils/common.util";

import { FormikProps } from "formik";
import { isBoolean } from "lodash";
import * as Yup from "yup";

interface CreateOrEditServiceFormValues {
  domain: string;
  fieldType: SERVICE_FIELD_TYPE;
  // Add the new fields
  dr: string | number;
  refDomain: string | number;
  organicTraffic: string | number;
  // Existing fields
  textLinkPrice: string | number;
  textLinkDuration: string | number;
  textLinkNote: string;
  isFollowTextLink: boolean;
  isHomeTextLink: boolean;
  isFooterTextLink: boolean;
  guestPostPrice: string | number;
  guestPostNote: string;
  isFollowGuestPost: boolean;
  isIndexGuestPost: boolean;
  bannerPrice: string | number;
  bannerDuration: string | number;
  complimentaries: string[];
  isSaleTextLink: boolean;
  isSaleGuestPost: boolean;
  isSaleBanner: boolean;
  isShow: boolean;
  // Thêm các field giảm giá:
  discountTextLinkService: number;
  discountGuestPostService: number;
  discountBannerService: number;
  discountTextLinkServiceChecked: boolean;
  discountGuestPostServiceChecked: boolean;
  discountBannerServiceChecked: boolean;
}

export const useLogic = ({
  onSuccess,
  editService,
}: {
  onSuccess?: () => void;
  editService?: Service;
}) => {
  const t = useTranslations("Partner.domain.createEdit");
  const [addService, { isLoading: loadingAdd }] = useAddServiceMutation();
  const [updateService, { isLoading: loadingUpdate }] =
    useUpdateServiceMutation();
  const formRef = useRef<FormikProps<CreateOrEditServiceFormValues>>(null);
  const handleSubmit = async (values: CreateOrEditServiceFormValues) => {
    if (
      !values?.isSaleGuestPost &&
      !values?.isSaleTextLink &&
      !values?.isSaleBanner
    ) {
      toast.error(t("validation.selectService"));
      return;
    }

    try {
      const formData: CreateOrEditService = {
        name: values.domain?.trim(),
        typePack: SERVICE_TYPE_PACK.DOMAIN,
        fieldType: values.fieldType,
        // Add the new fields
        dr: Number(values.dr) || 0,
        refDomain: Number(values.refDomain) || 0,
        organicTraffic: Number(values.organicTraffic) || 0,
        // Existing fields
        ...insertObjectIf(values.isSaleTextLink, {
          textLinkPrice: Number(values.textLinkPrice) || 0,
          textLinkDuration: Number(values.textLinkDuration) || 0,
          textLinkNote: values.textLinkNote,
          isFooterTextLink: values.isFooterTextLink,
          isHomeTextLink: values.isHomeTextLink,
          isFollowTextLink: values.isFollowTextLink,
        }),
        ...insertObjectIf(values.isSaleGuestPost, {
          guestPostPrice: Number(values.guestPostPrice) || 0,
          guestPostNote: values.guestPostNote,
          isFollowGuestPost: values.isFollowGuestPost,
          isIndexGuestPost: values.isIndexGuestPost,
        }),
        ...insertObjectIf(values.isSaleBanner, {
          bannerPrice: Number(values.bannerPrice) || 0,
          bannerDuration: Number(values.bannerDuration) || 0,
        }),
        complimentaries: values.complimentaries,
        isSaleTextLink: values.isSaleTextLink,
        isSaleGuestPost: values.isSaleGuestPost,
        isSaleBanner: values.isSaleBanner,
        isShow: values.isShow,
        // Thêm các field giảm giá: nếu không check thì luôn gửi 0
        discountTextLinkService: values.discountTextLinkServiceChecked
          ? Number(values.discountTextLinkService) || 0
          : 0,
        discountGuestPostService: values.discountGuestPostServiceChecked
          ? Number(values.discountGuestPostService) || 0
          : 0,
        discountBannerService: values.discountBannerServiceChecked
          ? Number(values.discountBannerService) || 0
          : 0,
      };
      const res = editService?.id
        ? await updateService({
            id: editService?.id,
            data: formData,
          })
        : await addService(formData);

      apiResponseHandle({
        res,
        onSuccess: () => {
          formRef.current?.resetForm();
          onSuccess?.();
        },
        toastSuccessMessage: editService?.id
          ? t("messages.updateSuccess")
          : t("messages.createSuccess"),
      });
    } catch (e: any) {
      toast.error(t("messages.serverError"));
    }
  };

  const ValidationSchema = useMemo(() => createValidationSchema(t), [t]);

  const initialValues: CreateOrEditServiceFormValues = useMemo(() => {
    const complimentaries = editService?.complimentaries?.length
      ? editService?.complimentaries?.map((item) => item.name)
      : [];
    return {
      domain: editService?.name || "",
      fieldType: editService?.fieldType || ("" as SERVICE_FIELD_TYPE),
      // Add the new fields
      dr: editService?.dr || 0,
      refDomain: editService?.refDomain || 0,
      organicTraffic: editService?.organicTraffic || 0,
      urlDemo: editService?.urlDemo || "",
      // Existing fields
      textLinkPrice: editService?.textLinkPrice || "",
      textLinkDuration: editService?.textLinkDuration || "",
      textLinkNote: editService?.textLinkNote || "",
      isFollowTextLink: isBoolean(editService?.isFollowTextLink)
        ? editService?.isFollowTextLink
        : true,
      isHomeTextLink: isBoolean(editService?.isHomeTextLink)
        ? editService?.isHomeTextLink
        : false,
      isFooterTextLink: isBoolean(editService?.isFooterTextLink)
        ? editService?.isFooterTextLink
        : false,
      guestPostPrice: editService?.guestPostPrice || "",
      guestPostNote: editService?.guestPostNote || "",
      isFollowGuestPost: isBoolean(editService?.isFollowGuestPost)
        ? editService?.isFollowGuestPost
        : true,
      isIndexGuestPost: isBoolean(editService?.isIndexGuestPost)
        ? editService?.isIndexGuestPost
        : true,
      bannerPrice: editService?.bannerPrice || "",
      bannerDuration: editService?.bannerDuration || "",
      complimentaries: complimentaries,
      isSaleTextLink: isBoolean(editService?.isSaleTextLink)
        ? editService?.isSaleTextLink
        : true,
      isSaleGuestPost: isBoolean(editService?.isSaleGuestPost)
        ? editService?.isSaleGuestPost
        : true,
      isSaleBanner: isBoolean(editService?.isSaleBanner)
        ? editService?.isSaleBanner
        : true,
      isShow: isBoolean(editService?.isShow) ? editService?.isShow : true,
      discountTextLinkServiceChecked: !!editService?.discountTextLinkService,
      discountTextLinkService: editService?.discountTextLinkService || 0,
      discountGuestPostServiceChecked: !!editService?.discountGuestPostService,
      discountGuestPostService: editService?.discountGuestPostService || 0,
      discountBannerServiceChecked: !!editService?.discountBannerService,
      discountBannerService: editService?.discountBannerService || 0,
    };
  }, [editService]);

  return {
    handleSubmit,
    loading: loadingAdd || loadingUpdate,
    ValidationSchema,
    formRef,
    initialValues,
  };
};
const createValidationSchema = (t: any) =>
  Yup.object().shape({
    domain: Yup.string()
      .trim()
      .required(t("validation.domainRequired"))
      .test("domain", t("validation.domainInvalid"), (value) => {
        return REGEX.DOMAIN.test(value);
      }),
    fieldType: Yup.string().required(t("validation.fieldRequired")),
    // Add validation for new fields
    // dr: Yup.number()
    //   .typeError("DR phải là số")
    //   .required("Vui lòng nhập Domain Rating")
    //   .min(0, "DR không thể nhỏ hơn 0")
    //   .max(100, "DR không thể lớn hơn 100"),
    // refDomain: Yup.number()
    //   .typeError("RefDomain phải là số")
    //   .required("Vui lòng nhập Reference Domains")
    //   .min(0, "DR không thể nhỏ hơn 0"),
    // organicTraffic: Yup.number()
    //   .typeError("Organic traffic phải là số")
    //   .required("Vui lòng nhập Organic Traffic")
    //   .min(0, "DR không thể nhỏ hơn 0"),
    // Existing validations
    textLinkPrice: Yup.number()
      .typeError(t("validation.priceInvalid"))
      .min(0, t("validation.priceMin"))
      .max(MAX_PRICE, `${t("validation.priceMax")} ${MAX_PRICE}`),
    textLinkDuration: Yup.string().test(
      "textLinkDuration",
      t("validation.durationRequired"),
      function (value) {
        if (this.parent.isSaleTextLink) {
          return REGEX.INTEGER.test(value || "");
        }
        return true;
      },
    ),

    guestPostPrice: Yup.number()
      .typeError(t("validation.priceInvalid"))
      .min(0, t("validation.priceMin"))
      .max(MAX_PRICE, `${t("validation.priceMax")} ${MAX_PRICE}`),
    bannerPrice: Yup.number()
      .typeError(t("validation.priceInvalid"))
      .min(0, t("validation.priceMin"))
      .max(MAX_PRICE, `${t("validation.priceMax")} ${MAX_PRICE}`),
    bannerDuration: Yup.string().test(
      "bannerDuration",
      t("validation.durationRequired"),
      function (value) {
        if (this.parent.isSaleBanner) {
          return REGEX.INTEGER.test(value || "");
        }
        return true;
      },
    ),
    complimentaries: Yup.array().of(
      Yup.string().required(t("validation.complimentaryRequired")),
    ),
    discountTextLinkService: Yup.number()
      .min(0, t("validation.discountMin"))
      .max(Yup.ref("textLinkPrice"), t("validation.discountMax"))
      .max(MAX_PRICE, `${t("validation.discountMaxPrice")} ${MAX_PRICE}`),
    discountTextLinkServiceChecked: Yup.boolean(),
    discountGuestPostService: Yup.number()
      .min(0, t("validation.discountMin"))
      .max(Yup.ref("guestPostPrice"), t("validation.discountMax"))
      .max(MAX_PRICE, `${t("validation.discountMaxPrice")} ${MAX_PRICE}`),
    discountGuestPostServiceChecked: Yup.boolean(),
    discountBannerService: Yup.number()
      .min(0, t("validation.discountMin"))
      .max(Yup.ref("bannerPrice"), t("validation.discountMax"))
      .max(MAX_PRICE, `${t("validation.discountMaxPrice")} ${MAX_PRICE}`),
    discountBannerServiceChecked: Yup.boolean(),
  });
