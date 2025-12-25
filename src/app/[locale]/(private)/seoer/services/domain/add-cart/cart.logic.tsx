import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { useHandleAnimationAddToCart } from "@/hook/cart-hook/useHandleAnimationAddToCart";
import { useAddServiceMutation } from "@/store/Apis/Partner.api";
import { useAddCartDetailMutation } from "@/store/Apis/Seoer.api";
import { apiResponseHandle } from "@/utils/common.util";

import { FormikProps } from "formik";
import * as Yup from "yup";

interface CreateOrEditServiceFormValues {
  serviceId: number;
  quantity: number;
}

const useLogic = ({
  onSuccess,
  addCartData,
}: {
  onSuccess?: () => void;
  addCartData?: any;
}) => {
  const t = useTranslations("Pack.addCart");
  const [addService, { isLoading: loadingAdd }] = useAddServiceMutation();
  const { triggerAnimation, Element } = useHandleAnimationAddToCart();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("serviceType") || "GP";
  const [updateService, { isLoading: loadingUpdate }] =
    useAddCartDetailMutation();
  const formRef = useRef<FormikProps<CreateOrEditServiceFormValues>>(null);

  const handleSubmit = async (values: CreateOrEditServiceFormValues) => {
    if (values?.quantity <= 0) {
      toast.error(t("errors.invalidQuantity"));
      return;
    }

    try {
      const formData = {
        serviceId: addCartData?.id,
        quantity: Number(values.quantity) || 1,
        serviceType: serviceType,
      };

      const res = addCartData?.id
        ? await updateService({
            data: formData,
          })
        : await addService(formData);

      apiResponseHandle({
        res,
        onSuccess: () => {
          triggerAnimation();
          formRef.current?.resetForm();
          onSuccess?.();
        },
      });
    } catch (e: any) {
      toast.error(t("errors.systemOverload"));
    }
  };

  const initialValues: CreateOrEditServiceFormValues = useMemo(() => {
    return {
      serviceId: addCartData?.serviceId,
      quantity: addCartData?.quantity || 1,
    };
  }, [addCartData]);

  const ValidationSchema = Yup.object().shape({
    quantity: Yup.number()
      .positive(t("quantity.positive"))
      .required(t("quantity.required")),
  });

  return {
    handleSubmit,
    loading: loadingAdd || loadingUpdate,
    formRef,
    ValidationSchema,
    initialValues,
    Element,
  };
};

export { useLogic };
