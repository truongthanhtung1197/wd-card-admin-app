"use client";
import React from "react";
import { BsGiftFill } from "react-icons/bs";

import { MyButton, TextInput } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import SubHeader from "@/app/_components/common/SubHeader";
import Text from "@/app/_components/common/Text";
import TrashIcon from "@/app/_components/icons/TrashIcon";

import { useLogic } from "./hooks/useLogic";

import { FieldArray, Form, Formik } from "formik";

const PackPartner = () => {
  const {
    handleSubmit,
    initialValues,
    formRef,
    ValidationSchema,
    myContent,
    fetching,
    refetch,
    isEdit,
    showEdit,
    hideEdit,
    loadding,
  } = useLogic();

  const isEditContent = !myContent?.id ? true : isEdit;

  return (
    <div className="mx-auto mb-10 max-w-[740px]">
      <SubHeader label="CTV Content" />
      <MyCard label={myContent?.id ? "CTV Content" : "Đăng kí làm CTV Content"}>
        <div>
          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            validationSchema={ValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ validateField, values }) => {
              return (
                <Form autoComplete="off" className="col w-full gap-6">
                  <TextInput
                    label={"Name"}
                    type="text"
                    name="name"
                    className="w-full"
                    onBlur={() => validateField("name")}
                    editable={isEditContent}
                    isDivider={true}
                  />
                  <TextInput
                    label={"URL Demo"}
                    type="text"
                    name="urlDemo"
                    className="w-full"
                    editable={isEditContent}
                    isDivider={true}
                  />
                  <TextInput
                    label={"Note"}
                    type="text"
                    name="note"
                    className="w-full"
                    editable={isEditContent}
                    isDivider={true}
                  />
                  {isEditContent ? (
                    <MyCard className="border-brand-primary">
                      <Text
                        variant="body1-regular"
                        className="text-base font-bold"
                      >
                        {"Dịch vụ tặng kèm"}
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
                                      <TextInput
                                        wrapperClassName="w-full"
                                        name={`complimentaries.${index}`}
                                        inputWrapperClassName="!min-h-[44px]"
                                        onBlur={() => {
                                          validateField(
                                            `complimentaries.${index}`,
                                          );
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
                                + More
                              </MyButton>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </MyCard>
                  ) : !myContent?.complimentaries?.length ? null : (
                    <MyCard className="border-brand-primary">
                      <Text
                        variant="body1-regular"
                        className="text-base font-bold"
                      >
                        {"Dịch vụ tặng kèm"}
                      </Text>

                      <div className="col mt-2 gap-3">
                        {myContent?.complimentaries?.map((item) => (
                          <div key={item.id} className="row gap-2">
                            <BsGiftFill fill="#066102" /> {item.name}
                          </div>
                        ))}
                      </div>
                    </MyCard>
                  )}
                </Form>
              );
            }}
          </Formik>
          <div className="mt-5 flex justify-end gap-3">
            {isEditContent && !!myContent?.id && (
              <MyButton bType="neutral" bSize="small" onClick={hideEdit}>
                {"Cancel"}
              </MyButton>
            )}
            {!isEditContent && !!myContent?.id && (
              <MyButton bType="neutral" bSize="small" onClick={showEdit}>
                {"Edit"}
              </MyButton>
            )}
            {isEditContent && (
              <MyButton
                bSize="small"
                onClick={() => {
                  formRef?.current?.handleSubmit();
                }}
                isDisabled={loadding}
                isLoading={loadding}
              >
                {"Submit"}
              </MyButton>
            )}
          </div>
        </div>
      </MyCard>
    </div>
  );
};

export default PackPartner;
