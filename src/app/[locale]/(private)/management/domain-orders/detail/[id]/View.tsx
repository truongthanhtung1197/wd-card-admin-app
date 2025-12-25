"use client";

import { useMemo } from "react";

import { MyButton, TextInput } from "@/app/_components";
import { RenderFiledValue } from "@/app/_components/common/RenderFiledValue";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { DOMAIN_ORDER_STATUS_OPTIONS } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";

import SubCreatingHeader from "../../../_components/SubCreatingHeader";
import DomainList from "./DomainList";
import { FormValues, useEditDomainLogic, ValidationSchema } from "./logic";
import StatisticsDomainOrder from "./Statistics";

import { Form, Formik, FormikProps } from "formik";

export type CreateOrEditUserVariant = "edit" | "create";

const View = () => {
  const {
    onSubmit,
    detail,
    initialFormValues,
    formRef,
    isEdit,
    toggleEdit,
    isLoading,
    domains,
    refetchDomainOrderDetail,
    refetchDomainsList,
    isShowTeamSelect,
    getFilteredTeamsData,
  } = useEditDomainLogic();
  const router = useLocaleRouter();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);

  const isEditPermission = useMemo(() => {
    return [ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.DOMAIN_BUYER].includes(
      admin?.role?.roleName as any,
    );
  }, [admin]);

  return (
    <div className="relative w-full bg-neutral-surface">
      <div className="mx-auto w-[940px] pb-20">
        <SubCreatingHeader
          goBack={() => router.back()}
          label={"Chi tiết đơn hàng domain"}
        />
        <div className="col w-full gap-4">
          <div className="!rounded-lg border-[0.5px] border-neutral-stroke-light bg-white p-5">
            <div className="mb-5">
              {" "}
              <div className="row w-full justify-between">
                <h5>Thông tin cơ bản</h5>
                {isEditPermission &&
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
                initialValues={initialFormValues as any}
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
                enableReinitialize
              >
                {(props: FormikProps<FormValues>) => {
                  const { values, resetForm, handleSubmit, isSubmitting } =
                    props;
                  return (
                    <Form>
                      <div className="flex flex-col gap-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <RenderFiledValue
                            value={<UserInformationV2 user={detail?.user} />}
                            filedName="Người order"
                          />
                          <RenderFiledValue
                            value={detail?.orderCode}
                            filedName="Order code"
                          />
                        </div>
                        <TextInput
                          label={"Mô tả đơn hàng"}
                          name="description"
                          editable={
                            isEdit &&
                            admin?.role?.roleName !== ADMIN_ROLE.DOMAIN_BUYER
                          }
                          isDivider={true}
                        />
                        <div className="grid grid-cols-2 gap-5">
                          <TextInput
                            label={"Mã đề xuất"}
                            name="proposeCode"
                            editable={isEdit}
                            isDivider={true}
                          />
                          {/* <RenderFiledValue
                            value={formatCurrency(values?.price)}
                            filedName="Thành tiền"
                          /> */}
                          <FSelectInput
                            editable={isEdit}
                            isDivider={true}
                            label={"Trạng thái"}
                            name="status"
                            options={DOMAIN_ORDER_STATUS_OPTIONS}
                          />
                        </div>
                        {isEdit && isEditPermission && (
                          <div className="flex justify-end gap-4">
                            <MyButton
                              bType="neutral"
                              onClick={() => {
                                toggleEdit();
                                resetForm();
                              }}
                            >
                              Cancel
                            </MyButton>
                            <MyButton
                              bType="primary"
                              onClick={() => handleSubmit()}
                              isDisabled={isSubmitting}
                              isLoading={isSubmitting}
                            >
                              Save
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
          <StatisticsDomainOrder detail={detail} />
          <DomainList
            refetchDomainsList={refetchDomainsList}
            refetchDomainOrderDetail={refetchDomainOrderDetail}
            domains={domains}
            isEditPermission={isEditPermission}
            detail={detail}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
