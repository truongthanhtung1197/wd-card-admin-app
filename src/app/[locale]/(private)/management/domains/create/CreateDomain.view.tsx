"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { MyButton, TextInput } from "@/app/_components";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { ROUTERS } from "@/constant";
import {
  DOMAIN_STATUS,
  DOMAIN_STATUS_OPTIONS,
  DOMAIN_TYPE_OPTIONS,
} from "@/constant/domain.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";

import { SearchTeamItem } from "../../../seoer/services/_components/SearchUserItem";
import SubCreatingHeader from "../../_components/SubCreatingHeader";
import { useCreateAdminLogic } from "./CreateDomain.logic";

import { Formik, FormikProps } from "formik";

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
    roleOptions,
    teamOptions,
    allTeamsData,
    myTeamsData,
    getFilteredTeamsData,
    userRole,
    isManagerRole,
    isTeamLeaderRole,
    t,
    selectedTeamId,
    setSelectedTeamId,
  } = useCreateAdminLogic();
  const router = useLocaleRouter();

  const [teamLimit, setTeamLimit] = useState(20);
  const [teamSearch, setTeamSearch] = useState<string | undefined>("");

  // Get filtered teams data based on search
  const filteredTeamsData = useMemo(() => {
    return getFilteredTeamsData(teamSearch);
  }, [getFilteredTeamsData, teamSearch]);

  return (
    <div className="w-full bg-neutral-surface">
      <div className="mx-auto w-[640px]">
        <SubCreatingHeader goBack={handleGoBack} label={t("title")} />
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
            const { values, validateField, setFieldValue } = props;

            const teamSelected = () => {
              // For Manager roles - use teamId from form values
              if (isManagerRole) {
                return (
                  allTeamsData?.data?.find(
                    (item: any) => item?.id?.toString() === values?.teamId,
                  ) || null
                );
              }

              // For Team Leader roles - use selectedTeamId state
              if (isTeamLeaderRole) {
                return (
                  myTeamsData?.data?.find(
                    (item: any) => item?.id?.toString() === selectedTeamId,
                  ) || null
                );
              }

              return null;
            };

            return (
              <form className="col relative w-full ">
                <div className="mb-3 flex flex-col gap-5 overflow-hidden rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                  <h5>{t("fields.basicInfo")}</h5>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label={t("fields.name")}
                      name="name"
                      isRequired
                      onBlur={() => {
                        validateField("name");
                      }}
                    />
                    <TextInput
                      label={t("fields.budget")}
                      name="budget"
                      isRequired
                      onBlur={() => {
                        validateField("budget");
                      }}
                    />
                    <FSelectInput
                      options={DOMAIN_TYPE_OPTIONS || []}
                      label={t("fields.type")}
                      name="type"
                      isRequired
                    />
                    <FSelectInput
                      options={
                        DOMAIN_STATUS_OPTIONS?.filter((item) =>
                          [
                            DOMAIN_STATUS.SEOING,
                            DOMAIN_STATUS.STOPPED,
                            DOMAIN_STATUS.AUDIT,
                            DOMAIN_STATUS.SATELLITE,
                          ].includes(item.key),
                        ) || []
                      }
                      label={t("fields.status")}
                      name="status"
                      isRequired
                    />
                  </div>
                </div>

                {/* Manager roles - Team selection using form values */}
                {isManagerRole && (
                  <div className="mb-3 flex flex-col gap-5 rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                    <div className="flex items-center justify-between">
                      <h5>{t("fields.assignToTeam")}</h5>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full">
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
                          placeholder={t("fields.selectTeam")}
                          limit={teamLimit}
                          setLimit={setTeamLimit}
                          setSearch={setTeamSearch}
                          setValueSelected={(value: any) => {
                            setFieldValue("teamId", value?.id?.toString());
                          }}
                          valueSelected={teamSelected()}
                          data={filteredTeamsData}
                          isLoading={false}
                          inputClassname="!w-full"
                        />
                      </div>
                      <div />
                    </div>
                  </div>
                )}

                {/* Team Leader roles - Team selection using selectedTeamId state */}
                {isTeamLeaderRole && (
                  <div className="mb-3 flex flex-col gap-5 rounded-lg border-[0.5px] border-solid border-neutral-stroke-light bg-white p-5">
                    <div className="flex items-center justify-between">
                      <h5>{t("fields.selectTeam")}</h5>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full">
                        <SearchableSelect
                          renderItem={({ item, onClick, onRemove }) => {
                            const _onRemove = onRemove
                              ? () => {
                                  onRemove?.();
                                  setSelectedTeamId("");
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
                          placeholder={t("fields.selectTeam")}
                          limit={teamLimit}
                          setLimit={setTeamLimit}
                          setSearch={setTeamSearch}
                          setValueSelected={(value: any) => {
                            setSelectedTeamId(value?.id?.toString());
                          }}
                          valueSelected={teamSelected()}
                          data={filteredTeamsData}
                          isLoading={false}
                          inputClassname="!w-full"
                        />
                      </div>
                      <div />
                    </div>
                  </div>
                )}

                <div className="row bottom-0 w-full justify-end gap-3 bg-neutral-surface py-4">
                  <MyButton
                    bSize="small"
                    bType="neutral"
                    onClick={handleGoBack}
                  >
                    {t("buttons.cancel")}
                  </MyButton>
                  <MyButton
                    bSize="small"
                    onClick={() => props.handleSubmit()}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {t("buttons.save")}
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
