import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { MAX_PRICE } from "@/constant/Order.constant";
import { SERVICE_TYPE, SERVICE_TYPE_PACK } from "@/constant/service.constant";
import { CreateOrEditService, Service } from "@/model/Partner.model";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "@/store/Apis/Partner.api";
import { apiResponseHandle } from "@/utils/common.util";

import { FormikProps } from "formik";
import * as Yup from "yup";

interface CreateOrEditServiceFormValues {
  name: string;
  type: SERVICE_TYPE;
  price: string | number;
  urlDemo: string;
  note: string;
  complimentaries: string[];
  isShow: boolean;
  discountPackServiceChecked: boolean;
  discountPackService: number;
}

export const useLogic = ({
  onSuccess,
  editService,
}: {
  onSuccess?: () => void;
  editService?: Service;
}) => {
  const t = useTranslations("Pack.createEdit");
  const [addService, { isLoading: loadingAdd }] = useAddServiceMutation();
  const [updateService, { isLoading: loadingUpdate }] =
    useUpdateServiceMutation();
  const formRef = useRef<FormikProps<CreateOrEditServiceFormValues>>(null);
  const handleSubmit = async (values: CreateOrEditServiceFormValues) => {
    try {
      const formData: CreateOrEditService = {
        name: values.name?.trim(),
        typePack: SERVICE_TYPE_PACK.PACK,
        type: values.type,
        price: Number(values.price) || 0,
        urlDemo: values.urlDemo,
        note: values.note,
        complimentaries: values.complimentaries,
        isShow: values.isShow,
        discountPackService: values.discountPackServiceChecked
          ? Number(values.discountPackService) || 0
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
      name: editService?.name || "",
      type: editService?.type || ("" as SERVICE_TYPE),
      price: editService?.price || "",
      urlDemo: editService?.urlDemo || "",
      note: editService?.note || "",
      complimentaries: complimentaries,
      isShow: editService?.isShow ?? true,
      discountPackServiceChecked: !!editService?.discountPackService,
      discountPackService: editService?.discountPackService || 0,
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
    name: Yup.string().trim().required(t("validation.nameRequired")),
    type: Yup.string().required(t("validation.typeRequired")),
    price: Yup.number()
      .typeError(t("validation.priceInvalid"))
      .min(0, t("validation.priceMin"))
      .max(MAX_PRICE, `${t("validation.priceMax")} ${MAX_PRICE}`)
      .required(t("validation.priceRequired")),
    urlDemo: Yup.string().required(t("validation.demoRequired")),
    complimentaries: Yup.array().of(
      Yup.string().required(t("validation.complimentaryRequired")),
    ),
    discountPackService: Yup.number()
      .min(0, t("validation.discountMin"))
      .max(Yup.ref("price"), t("validation.discountMax"))
      .max(MAX_PRICE, `${t("validation.discountMaxPrice")} ${MAX_PRICE}`),
    discountPackServiceChecked: Yup.boolean(),
  });
