"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "@/app/_components/common/Toaster";
import { ROUTERS } from "@/constant";
import { useVisibility } from "@/hook";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useUrlHistory } from "@/hook/useUrlHistory";
import {
  CreatePackage,
  PACKAGE_STATUS,
  UpdatePackage,
} from "@/model/Package.model";
import {
  useCreatePackageMutation,
  useEditPackageByIdMutation,
  useGetPackageByIdQuery,
} from "@/store/Apis/Package.api";

import { FormikProps } from "formik";
import * as Yup from "yup";

export interface FeatureFormValue {
  featureKey: string;
  featureValue: string;
  featureDescription?: string;
}

export interface FormValues {
  name?: string;
  price?: number;
  durationDays?: number;
  status?: PACKAGE_STATUS;
  featuresJson?: string;
}

const DEFAULT_FEATURES_JSON = `[
  {
    "featureKey": "max_guests",
    "featureValue": "500",
    "featureDescription": "Maximum number of guests",
    "isActive": true
  },
  {
    "featureKey": "photo_storage",
    "featureValue": "10GB",
    "featureDescription": "Photo storage capacity",
    "isActive": true
  }
]`;

export const useCreateOrEditPackageLogic = () => {
  const params = useParams<{ packageId?: string }>();
  const packageId = params?.packageId;
  const isEditMode = !!packageId && packageId !== "create";

  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
  const [editPackage, { isLoading: isEditing }] = useEditPackageByIdMutation();

  const {
    data: packageData,
    refetch,
    isLoading: isLoadingPackage,
    isFetching,
  } = useGetPackageByIdQuery(packageId || "", {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  const formRef = useRef<FormikProps<FormValues>>(null);
  const [leavePage, setLeavePage] = useState(false);
  const router = useLocaleRouter();
  const { isVisible: isEdit, toggle: toggleEdit } = useVisibility(!isEditMode);
  const ValidationSchema = createValidationSchema();

  const { history } = useUrlHistory();
  const handleGoBack = useCallback(() => {
    if (formRef?.current?.dirty) {
      setLeavePage(true);
      return;
    }
    router.push(
      history[ROUTERS.MANAGEMENT_PACKAGES] || ROUTERS.MANAGEMENT_PACKAGES,
    );
  }, [setLeavePage, formRef, router, history]);

  const parseFeatures = (featuresJson?: string): FeatureFormValue[] => {
    if (!featuresJson?.trim()) return [];
    try {
      const parsed = JSON.parse(featuresJson);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (f) => f.featureKey?.trim() && f.featureValue?.trim(),
        );
      }
      return [];
    } catch {
      return [];
    }
  };

  const onSubmit = useCallback(
    async (values: FormValues) => {
      console.log(values, 88);
      try {
        const features = parseFeatures(values.featuresJson);

        if (isEditMode) {
          const formData: UpdatePackage = {};
          if (values.name?.trim()) {
            formData.name = values.name.trim();
          }
          if (values.price !== undefined) {
            formData.price = Number(values.price);
          }
          if (values.durationDays !== undefined) {
            formData.durationDays = Number(values.durationDays);
          }
          if (values.status) {
            formData.status = values.status;
          }
          formData.features = features;

          const res: any = await editPackage({
            id: packageId || "",
            data: formData,
          });

          if (res.error) {
            toast.error(res.error?.data?.message || "Failed to update package");
            return;
          }

          toast.success("Package updated successfully");
          toggleEdit();
          refetch();
        } else {
          const formData: CreatePackage = {
            name: values.name || "",
            price: Number(values.price) || 0,
            durationDays: Number(values.durationDays) || 0,
            status: values.status || PACKAGE_STATUS.ACTIVE,
            features: features,
          };

          const res: any = await createPackage(formData);
          if (res.error) {
            toast.error(res.error?.data?.message || "Failed to create package");
            return;
          }

          toast.success("Package created successfully");
          router.push(ROUTERS.MANAGEMENT_PACKAGES);
        }
      } catch (err: any) {
        toast.error(
          isEditMode ? "Failed to update package" : "Failed to create package",
        );
      }
    },
    [
      isEditMode,
      createPackage,
      editPackage,
      packageId,
      router,
      toggleEdit,
      refetch,
    ],
  );

  const initialFormValues = useMemo(() => {
    if (isEditMode && packageData?.data) {
      const featuresArray = packageData.data.features || [];
      return {
        name: packageData.data.name || "",
        price: packageData.data.price || undefined,
        durationDays: packageData.data.durationDays || undefined,
        status: packageData.data.status || PACKAGE_STATUS.ACTIVE,
        featuresJson:
          featuresArray.length > 0
            ? JSON.stringify(featuresArray, null, 2)
            : "[]",
      };
    }
    return {
      name: "",
      price: undefined,
      durationDays: undefined,
      status: PACKAGE_STATUS.ACTIVE,
      featuresJson: DEFAULT_FEATURES_JSON,
    };
  }, [isEditMode, packageData?.data]);

  return {
    onSubmit,
    isLoading: isCreating || isEditing,
    isLoadingPackage: isLoadingPackage || isFetching,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory: history,
    isEdit,
    toggleEdit,
    isEditMode,
    packageData: packageData?.data,
  };
};

const createValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .transform((value) => value?.trim())
      .required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than 0"),
    durationDays: Yup.number()
      .required("Duration is required")
      .min(1, "Duration must be at least 1 day"),
    status: Yup.string().required("Status is required"),
    featuresJson: Yup.string()
      .nullable()
      .test("is-valid-json", "Invalid JSON format", (value) => {
        if (!value?.trim()) return true;
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed);
        } catch {
          return false;
        }
      }),
  });
};
