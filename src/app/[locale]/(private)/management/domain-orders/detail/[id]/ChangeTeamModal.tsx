import { useCallback, useMemo, useState } from "react";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import { toast } from "@/app/_components/common/Toaster";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { SearchTeamItem } from "@/app/[locale]/(private)/seoer/services/_components/SearchUserItem";
import { DomainOrder } from "@/model/Domain.model";
import { useEditDomainOrderByIdMutation } from "@/store/Apis/Domain.api";
import { apiResponseHandle } from "@/utils/common.util";

export default function ChangeTeamModal({
  isOpen,
  onClose,
  detail,
  getFilteredTeamsData,
  currentTeamId,
  refetchDomainOrderDetail,
  refetchDomainsList,
}: {
  isOpen: boolean;
  onClose: () => void;
  detail?: DomainOrder;
  getFilteredTeamsData: (search?: string) => { data: any[]; total: number };
  currentTeamId?: string;
  refetchDomainOrderDetail?: () => void;
  refetchDomainsList?: () => void;
}) {
  const [teamLimit, setTeamLimit] = useState(20);
  const [teamSearch, setTeamSearch] = useState<string | undefined>("");
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    currentTeamId || "",
  );

  const selectedTeam = useMemo(() => {
    return (
      getFilteredTeamsData(teamSearch).data.find(
        (item: any) => item?.id?.toString() === selectedTeamId,
      ) || null
    );
  }, [selectedTeamId, teamSearch, getFilteredTeamsData]);

  const [editOrder, { isLoading }] = useEditDomainOrderByIdMutation();

  const onSave = useCallback(async () => {
    const res = await editOrder({
      id: String(detail?.id || ""),
      data: {
        teamId: selectedTeamId ? Number(selectedTeamId) : undefined,
      } as any,
    });

    apiResponseHandle({
      res,
      onSuccess: () => {
        toast.success("Updated");
        refetchDomainOrderDetail?.();
        refetchDomainsList?.();
        onClose();
      },
    });
  }, [selectedTeamId, detail?.id]);

  return (
    <MyModal
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      header="Thay đổi team"
      body={
        <div className="min-h-[400px] w-full md:w-3/4">
          <p className="mb-4">Đổi team cho tất cả các domain của đơn hàng</p>
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
            placeholder={"Chọn team"}
            limit={teamLimit}
            setLimit={setTeamLimit}
            setSearch={setTeamSearch}
            setValueSelected={(value: any) => {
              setSelectedTeamId(value?.id?.toString() || "");
            }}
            valueSelected={selectedTeam}
            data={getFilteredTeamsData(teamSearch)}
            isLoading={isLoading}
            inputClassname="!w-full"
          />
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <MyButton bType="secondary" onClick={onClose}>
            Cancel
          </MyButton>
          <MyButton bType="primary" onClick={onSave} isLoading={isLoading}>
            Save
          </MyButton>
        </div>
      }
    />
  );
}
