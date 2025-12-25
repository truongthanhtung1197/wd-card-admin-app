"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import { MyButton, TextInput } from "@/app/_components";
import { FErrorMessage } from "@/app/_components/common/FErrorMessage";
import MyCard from "@/app/_components/common/MyCard";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { SearchTeamItem } from "@/app/[locale]/(private)/seoer/services/_components/SearchUserItem";
import { ROUTERS } from "@/constant";
import { DOMAIN_TYPE_OPTIONS } from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import SubCreatingHeader from "../../_components/SubCreatingHeader";
import { useCreateAdminLogic } from "./logic";

import { Field, Formik, FormikProps } from "formik";

const ConfirmUnsavedModal = dynamic(
  () => import("@/app/_components/modal/ConfirmUnsavedModal"),
  {
    ssr: false,
  },
);

export type CreateOrEditUserVariant = "edit" | "create";

const CreateAdminView = () => {
  const {
    onSubmit,
    isLoading,
    leavePage,
    setLeavePage,
    formRef,
    ValidationSchema,
    initialFormValues,
    handleGoBack,
    urlHistory,
    // team select dependencies
    isShowTeamSelect,
    getFilteredTeamsData,
  } = useCreateAdminLogic();
  const router = useLocaleRouter();
  const [teamLimit, setTeamLimit] = useState(20);
  const [teamSearch, setTeamSearch] = useState<string | undefined>("");

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto w-[840px]">
        <SubCreatingHeader goBack={handleGoBack} label={"Order Domains"} />
        <Formik
          initialValues={initialFormValues as any}
          validationSchema={ValidationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          innerRef={formRef}
          enableReinitialize={true}
        >
          {(props: FormikProps<any>) => {
            const { values, validateField, errors, setFieldValue } = props;

            console.log({ errors });
            return (
              <form className="col relative w-full gap-5">
                <div className="!rounded-lg border-[0.5px] border-neutral-stroke-light bg-white p-5">
                  <h5 className="mb-5">Mô tả đơn hàng</h5>
                  <TextInput
                    name="description"
                    placeholder="Enter description"
                  />
                  {isShowTeamSelect && (
                    <div className="mt-4 w-full md:w-1/2">
                      <SearchableSelect
                        renderItem={({ item, onClick, onRemove }) => {
                          const _onRemove = onRemove
                            ? () => {
                                onRemove?.();
                                setFieldValue("teamId", null);
                              }
                            : undefined;
                          return (
                            <SearchTeamItem
                              data={item}
                              onClick={onClick}
                              onRemove={_onRemove}
                            />
                          );
                        }}
                        placeholder={"Chọn team"}
                        limit={teamLimit}
                        setLimit={setTeamLimit}
                        setSearch={setTeamSearch}
                        setValueSelected={(value: any) => {
                          setFieldValue("teamId", value?.id?.toString() || "");
                        }}
                        valueSelected={
                          (getFilteredTeamsData(teamSearch).data || []).find(
                            (item: any) =>
                              item?.id?.toString() === values?.teamId,
                          ) || null
                        }
                        data={getFilteredTeamsData(teamSearch)}
                        isLoading={false}
                        inputClassname="!w-full"
                      />
                    </div>
                  )}
                </div>
                <MyCard label={"Danh sách domain"}>
                  <div className="col w-full gap-2">
                    <div className="w-full md:w-1/3">
                      <FSelectInput
                        disallowEmptySelection={true}
                        label="Domain type"
                        name="domainType"
                        options={DOMAIN_TYPE_OPTIONS}
                        placeholder="Chọn loại domain"
                        triggerClassName="!h-[44px]"
                        className="!h-[44px]"
                      />
                    </div>
                    <Field
                      as="textarea"
                      name="domainsText"
                      rows={8}
                      placeholder="Nhập domain, cách nhau bằng khoảng trắng hoặc xuống dòng. Ví dụ: google.com facebook.com"
                      className="w-full rounded-md border border-neutral-stroke-light p-3 outline-none focus:border-primary"
                      onBlur={() => validateField("domainsText")}
                    />
                    <FErrorMessage name="domainsText" />
                    <div className="row text-neutral-text justify-between text-sm">
                      <span>
                        Total (
                        {
                          (values?.domainsText || "")
                            .trim()
                            .split(/\s+/)
                            .filter((s: string) => s).length
                        }
                        )
                      </span>
                    </div>
                  </div>
                </MyCard>

                <div className="row bottom-0 w-full justify-end gap-3 bg-neutral-surface py-4">
                  <MyButton
                    bSize="small"
                    bType="neutral"
                    onClick={handleGoBack}
                  >
                    {"Cancel"}
                  </MyButton>
                  <MyButton
                    bSize="small"
                    onClick={() => props.handleSubmit()}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {"Order"}
                  </MyButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>

      {leavePage && (
        <ConfirmUnsavedModal
          onCancel={() => setLeavePage(false)}
          funcConfirm={() =>
            router.push(
              urlHistory[ROUTERS.MANAGEMENT_DOMAINS] ||
                ROUTERS.MANAGEMENT_DOMAINS,
            )
          }
        />
      )}
    </div>
  );
};

export default CreateAdminView;
