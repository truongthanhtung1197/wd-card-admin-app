"use client";
import dynamic from "next/dynamic";
import { Form, Formik, FormikProps } from "formik";

import { MyButton, TextInput } from "@/app/_components";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import TextareaInput from "@/app/_components/formik/FTextareaInput";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import { ROUTERS } from "@/constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { PACKAGE_STATUS } from "@/model/Package.model";
import { formatDateTime } from "@/utils/format.util";

import SubCreatingHeader from "../../../_components/SubCreatingHeader";
import {
  FormValues,
  useCreateOrEditPackageLogic,
} from "./CreateOrEditPackage.logic";

const ConfirmUnsavedModal = dynamic(
  () => import("@/app/_components/modal/ConfirmUnsavedModal"),
  {
    ssr: false,
  },
);

const CreateOrEditPackageView = () => {
  const {
    onSubmit,
    isLoading,
    isLoadingPackage,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory,
    isEdit,
    toggleEdit,
    isEditMode,
    packageData,
  } = useCreateOrEditPackageLogic();
  const router = useLocaleRouter();

  // Show loading state when fetching package data in edit mode
  if (isEditMode && isLoadingPackage) {
    return (
      <div className="w-full bg-neutral-surface">
        <div className="mx-auto w-[940px] pb-20">
          <SubCreatingHeader goBack={handleGoBack} label="Edit Package" />
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-neutral-text-secondary">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const statusOptions = [
    { key: PACKAGE_STATUS.ACTIVE, label: "Active" },
    { key: PACKAGE_STATUS.INACTIVE, label: "Inactive" },
  ];

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto w-[940px] pb-20">
        <SubCreatingHeader
          goBack={handleGoBack}
          label={isEditMode ? "Edit Package" : "Create Package"}
        />
        <div className="col w-full gap-4">
          <div className="!rounded-lg border-[0.5px] border-neutral-stroke-light bg-white p-5">
            <div className="mb-5">
              <div className="row w-full justify-between">
                <h5>Basic Information</h5>
                {isEditMode &&
                  (isEdit ? (
                    <div className="flex justify-end gap-2">
                      <MyButton
                        bSize="xs"
                        bType="secondary"
                        onClick={() => {
                          formRef.current?.resetForm();
                          toggleEdit();
                        }}
                      >
                        Cancel
                      </MyButton>
                    </div>
                  ) : (
                    <div className="flex cursor-pointer justify-end">
                      <MyButton
                        bSize="xs"
                        bType="secondary"
                        onClick={toggleEdit}
                      >
                        Edit
                      </MyButton>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex-1">
              <Formik
                innerRef={formRef}
                initialValues={initialFormValues as FormValues}
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
                enableReinitialize
              >
                {(props: FormikProps<FormValues>) => {
                  const {
                    values,
                    resetForm,
                    handleSubmit,
                    isSubmitting,
                    validateField,
                  } = props;
                  console.log(values);
                  return (
                    <Form>
                      <div className="flex flex-col gap-y-5">
                        {isEditMode && !isEdit ? (
                          <>
                            <div className="grid grid-cols-2 gap-5">
                              <RenderFiledValue
                                filedName="Name"
                                value={packageData?.name}
                              />
                              <RenderFiledValue
                                filedName="Price"
                                value={`$${packageData?.price?.toLocaleString() || "0"}`}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <RenderFiledValue
                                filedName="Duration"
                                value={`${packageData?.durationDays || 0} days`}
                              />
                              <RenderFiledValue
                                filedName="Status"
                                value={
                                  packageData?.status === PACKAGE_STATUS.ACTIVE
                                    ? "Active"
                                    : "Inactive"
                                }
                              />
                            </div>
                            <RenderFiledValue
                              filedName="Created At"
                              value={formatDateTime(
                                packageData?.createdAt || "",
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-5">
                              <TextInput
                                label="Name"
                                name="name"
                                isRequired
                                editable={true}
                                isDivider={true}
                                onBlur={() => {
                                  validateField("name");
                                }}
                              />
                              <TextInput
                                label="Price"
                                name="price"
                                type="number"
                                isRequired
                                editable={true}
                                isDivider={true}
                                onBlur={() => {
                                  validateField("price");
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <TextInput
                                label="Duration (Days)"
                                name="durationDays"
                                type="number"
                                isRequired
                                editable={true}
                                isDivider={true}
                                onBlur={() => {
                                  validateField("durationDays");
                                }}
                              />
                              <FSelectInput
                                editable={true}
                                isDivider={true}
                                label="Status"
                                name="status"
                                options={statusOptions}
                                isRequired
                              />
                            </div>
                          </>
                        )}

                        {/* Features Section */}
                        <div className="mt-5">
                          <div className="mb-3">
                            <h5>Features</h5>
                            {isEditMode && !isEdit && (
                              <div className="col mt-3 gap-2">
                                {packageData?.features &&
                                Array.isArray(packageData.features) &&
                                packageData.features.length > 0 ? (
                                  packageData.features.map((feature, index) => (
                                    <div
                                      key={`${feature.featureKey}-${index}`}
                                      className="rounded-lg border border-neutral-stroke-light p-3"
                                    >
                                      <p className="font-semibold">
                                        {feature.featureKey}
                                      </p>
                                      <p className="text-neutral-text-secondary text-sm">
                                        {feature.featureValue}
                                      </p>
                                      {feature.featureDescription && (
                                        <p className="text-neutral-text-tertiary text-xs">
                                          {feature.featureDescription}
                                        </p>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-neutral-text-secondary">
                                    No features found
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {(isEdit || !isEditMode) && (
                            <div className="col w-full gap-2">
                              <TextareaInput
                                label="Features (JSON)"
                                name="featuresJson"
                                editable={true}
                                placeholder={`feature json`}
                                onBlur={() => {
                                  validateField("featuresJson");
                                }}
                                inputWrapperClassName="!h-[350px]"
                              />
                              <p className="text-neutral-text-tertiary text-xs">
                                Enter features as JSON array. Each feature
                                should have: featureKey, featureValue, and
                                optionally featureDescription.
                              </p>
                            </div>
                          )}
                        </div>

                        {(isEdit || !isEditMode) && (
                          <div className="flex justify-end gap-4">
                            <MyButton
                              bType="neutral"
                              onClick={() => {
                                if (isEditMode) {
                                  toggleEdit();
                                  resetForm();
                                } else {
                                  handleGoBack();
                                }
                              }}
                            >
                              Cancel
                            </MyButton>
                            <MyButton
                              bType="primary"
                              onClick={() => handleSubmit()}
                              isDisabled={isSubmitting || isLoading}
                              isLoading={isSubmitting || isLoading}
                            >
                              {isEditMode ? "Save" : "Create"}
                            </MyButton>
                          </div>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {leavePage && (
        <ConfirmUnsavedModal
          onCancel={() => setLeavePage(false)}
          funcConfirm={() =>
            router.push(
              urlHistory[ROUTERS.MANAGEMENT_PACKAGES] ||
                ROUTERS.MANAGEMENT_PACKAGES,
            )
          }
        />
      )}
    </div>
  );
};

export default CreateOrEditPackageView;
