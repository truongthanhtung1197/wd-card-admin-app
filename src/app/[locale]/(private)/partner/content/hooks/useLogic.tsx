import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";
import { SERVICE_TYPE, SERVICE_TYPE_PACK } from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { CreateOrEditService } from "@/model/Partner.model";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "@/store/Apis/Partner.api";
import { useGetMyServicesQuery } from "@/store/Apis/Service.api";
import { apiResponseHandle } from "@/utils/common.util";

import { FormikProps } from "formik";
import * as Yup from "yup";

interface CreateOrEditServiceFormValues {
  name: string;
  urlDemo: string;
  note: string;
  complimentaries: string[];
}

export const useLogic = () => {
  const t = useTranslations("Pack.createEdit");
  const [addService, { isLoading: loadingAdd }] = useAddServiceMutation();
  const [updateService, { isLoading: loadingUpdate }] =
    useUpdateServiceMutation();
  const { isVisible: isEdit, show: showEdit, hide: hideEdit } = useVisibility();
  const {
    data: serviceData,
    isLoading: fetching,
    refetch,
  } = useGetMyServicesQuery(
    {
      limit: 1,
      page: 1,
      typePack: SERVICE_TYPE_PACK.CONTENT,
      sortBy: "createdAt" as string,
      sortOrder: "DESC" as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const myContent = serviceData?.data?.[0] || null;

  const formRef = useRef<FormikProps<CreateOrEditServiceFormValues>>(null);
  const handleSubmit = async (values: CreateOrEditServiceFormValues) => {
    try {
      const formData: CreateOrEditService = {
        name: values.name?.trim(),
        typePack: SERVICE_TYPE_PACK.CONTENT,
        type: SERVICE_TYPE.CONTENT,
        price: 0,
        urlDemo: values.urlDemo,
        note: values.note,
        complimentaries: values.complimentaries,
        isShow: true,
      };
      const res = myContent?.id
        ? await updateService({
            id: myContent?.id,
            data: formData,
          })
        : await addService(formData);

      apiResponseHandle({
        res,
        onSuccess: () => {
          refetch();
          formRef.current?.resetForm();
          hideEdit();
        },
        toastSuccessMessage: myContent?.id
          ? "Update success"
          : "Create success",
      });
    } catch (e: any) {
      toast.error("Server error");
    }
  };

  const ValidationSchema = useMemo(() => createValidationSchema(t), [t]);

  const initialValues: CreateOrEditServiceFormValues = useMemo(() => {
    const complimentaries = myContent?.complimentaries?.length
      ? myContent?.complimentaries?.map((item) => item.name)
      : [];
    return {
      name: myContent?.name || "",
      urlDemo: myContent?.urlDemo || "",
      note: myContent?.note || "",
      complimentaries: complimentaries,
    };
  }, [myContent]);

  return {
    handleSubmit,
    loading: loadingAdd || loadingUpdate,
    ValidationSchema,
    formRef,
    initialValues,
    myContent,
    fetching,
    refetch,
    isEdit,
    showEdit,
    hideEdit,
    loadding: fetching || loadingAdd || loadingUpdate,
  };
};
const createValidationSchema = (t: any) =>
  Yup.object().shape({
    name: Yup.string().trim().required(t("validation.nameRequired")),
    complimentaries: Yup.array().of(
      Yup.string().required(t("validation.complimentaryRequired")),
    ),
  });
