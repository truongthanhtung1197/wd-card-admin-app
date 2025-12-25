import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { MyButton } from "@/app/_components";
import Loadding from "@/app/_components/common/Loadding";
import Text from "@/app/_components/common/Text";
import { toast } from "@/app/_components/common/Toaster";
import MyInput from "@/app/_components/form/MyInput";
import MySelect from "@/app/_components/form/MySelect";
import SearchableSelect from "@/app/_components/form/SearchableSelect";
import { SearchTeamItem } from "@/app/[locale]/(private)/seoer/services/_components/SearchUserItem";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import {
  DOMAIN_STATUS,
  DOMAIN_STATUS_OPTIONS,
  DOMAIN_TYPE_OPTIONS,
} from "@/constant/domain.constant";
import { useVisibility } from "@/hook";
import { Domain, DomainOrder } from "@/model/Domain.model";
import { useAppSelector } from "@/store";
import { useEditDomainOrderDetailByIdMutation } from "@/store/Apis/Domain.api";
import { useGetTeamsQuery } from "@/store/Apis/Team.api";
import { AuthSelector } from "@/store/Auth";
import { apiResponseHandle } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

import ChangeTeamModal from "../ChangeTeamModal";
import QuickUpdatePrice from "./QuickUpdatePrice";
import { exportDomainsToExcel } from "./utils";

const DomainList = ({
  isEditPermission,
  domains = [],
  refetchDomainOrderDetail,
  refetchDomainsList,
  detail,
}: {
  isEditPermission?: boolean;
  domains?: Domain[];
  refetchDomainOrderDetail?: () => void;
  refetchDomainsList?: () => void;
  detail?: DomainOrder;
}) => {
  const {
    isVisible: isShowQuickUpdatePrice,
    show: showQuickUpdatePrice,
    hide: hideQuickUpdatePrice,
  } = useVisibility();

  const { admin } = useAppSelector(AuthSelector.selectAuthState);

  const handleExport = useCallback(() => {
    const domainNameArray = domains?.map((domain) => domain.name);
    try {
      exportDomainsToExcel(domainNameArray);
    } catch (error) {
      console.log("exportDomainsToExcel(domainNameArray)", error);
    }
  }, [domains]);

  // Role-based visibility for team selector
  const isShowTeamSelect = useMemo(
    () =>
      [
        ADMIN_ROLE.DOMAIN_BUYER,
        ADMIN_ROLE.MANAGER,
        ADMIN_ROLE.SUPER_ADMIN,
        ADMIN_ROLE.ASSISTANT,
      ].includes(admin?.role?.roleName as any),
    [admin],
  );

  // Teams list for selector
  const { data: allTeamsData } = useGetTeamsQuery(
    { limit: 50, page: 1 },
    { skip: !isShowTeamSelect, refetchOnMountOrArgChange: true },
  );
  const [teamLimit, setTeamLimit] = useState(20);
  const [teamSearch, setTeamSearch] = useState<string | undefined>("");
  const [isShowChangeTeam, setIsShowChangeTeam] = useState(false);
  const getFilteredTeamsData = useCallback(
    (searchTerm?: string) => {
      if (!allTeamsData?.data) return { data: [], total: 0 } as any;
      const filtered = allTeamsData.data.filter((team: any) => {
        if (!searchTerm) return true;
        return (
          team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      return { data: filtered, total: filtered.length } as any;
    },
    [allTeamsData],
  );

  return (
    <div className="!rounded-lg border-[0.5px] border-neutral-stroke-light bg-white p-5">
      <div className="row mb-5 justify-between gap-2">
        <Text>{`Danh sách domain (${domains?.length || 0})`}</Text>
        <div className="row gap-2">
          {[ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.DOMAIN_BUYER].includes(
            admin?.role?.roleName as any,
          ) && (
            <MyButton bSize="xs" bType="secondary" onClick={handleExport}>
              Xuất file domain
            </MyButton>
          )}

          {isShowTeamSelect && (
            <MyButton
              bSize="xs"
              bType="secondary"
              onClick={() => setIsShowChangeTeam(true)}
            >
              Thay đổi team
            </MyButton>
          )}

          {[ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.DOMAIN_BUYER].includes(
            admin?.role?.roleName as any,
          ) && (
            <MyButton
              bSize="xs"
              bType="secondary"
              onClick={() => showQuickUpdatePrice()}
            >
              Nhập giá nhanh
            </MyButton>
          )}
        </div>
      </div>
      {isShowTeamSelect && (
        <ChangeTeamModal
          isOpen={isShowChangeTeam}
          onClose={() => setIsShowChangeTeam(false)}
          detail={detail}
          getFilteredTeamsData={getFilteredTeamsData}
          currentTeamId={
            (detail as any)?.teamId ? String((detail as any).teamId) : ""
          }
          refetchDomainOrderDetail={refetchDomainOrderDetail}
          refetchDomainsList={refetchDomainsList}
        />
      )}
      <QuickUpdatePrice
        refetchDomainOrderDetail={refetchDomainOrderDetail}
        refetchDomainsList={refetchDomainsList}
        detail={detail}
        isShowQuickUpdatePrice={isShowQuickUpdatePrice}
        hideQuickUpdatePrice={hideQuickUpdatePrice}
      />

      <div className="col gap-4">
        <div className="row gap-4 border-b pb-2">
          <div className="flex-1">
            <Text>Domain</Text>
          </div>
          <div className="w-[150px]">Giá</div>
          <div className="w-[150px]">Trạng thái</div>
          {isShowTeamSelect && <div className="w-[220px]">Team</div>}
        </div>
        {domains?.map((domain) => (
          <DomainItem
            refetchDomainOrderDetail={refetchDomainOrderDetail}
            key={domain.id}
            domain={domain}
            isEditPermission={isEditPermission}
            isShowTeamSelect={isShowTeamSelect}
            getFilteredTeamsData={getFilteredTeamsData}
            teamLimit={teamLimit}
            setTeamLimit={setTeamLimit}
            teamSearch={teamSearch}
            setTeamSearch={setTeamSearch}
          />
        ))}
      </div>
    </div>
  );
};

export default DomainList;

export const domainOrderStatus = DOMAIN_STATUS_OPTIONS?.filter((item) =>
  [
    DOMAIN_STATUS.REQUEST_BUY,
    DOMAIN_STATUS.BUYING,
    DOMAIN_STATUS.PURCHASED,
    DOMAIN_STATUS.DNS,
    DOMAIN_STATUS.DIE,
    DOMAIN_STATUS.CANCEL_BUY,
  ]?.includes(item.key),
);

const DomainItem = ({
  domain,
  isEditPermission,
  refetchDomainOrderDetail,
  isShowTeamSelect,
  getFilteredTeamsData,
  teamLimit,
  setTeamLimit,
  teamSearch,
  setTeamSearch,
}: {
  domain?: Domain;
  isEditPermission?: boolean;
  refetchDomainOrderDetail?: () => void;
  isShowTeamSelect?: boolean;
  getFilteredTeamsData?: (search?: string) => { data: any[]; total: number };
  teamLimit?: number;
  setTeamLimit?: (n: number) => void;
  teamSearch?: string;
  setTeamSearch?: (s?: string) => void;
}) => {
  const [price, setPrice] = useState<any>(Number(domain?.price) || "");
  const [status, setStatus] = useState(domain?.status || "");
  const [teamId, setTeamId] = useState<string>(
    (domain as any)?.teamId ? String((domain as any).teamId) : "",
  );
  const [editDomainById, { isLoading }] =
    useEditDomainOrderDetailByIdMutation();

  useEffect(() => {
    setPrice(Number(domain?.price));
    setStatus(domain?.status || "");
    setTeamId((domain as any)?.teamId ? String((domain as any).teamId) : "");
  }, [domain]);

  const {
    isVisible: isEditPrice,
    hide: hideEditPrice,
    show: showEditPrice,
  } = useVisibility();

  const prevRef = useRef<any>(null);

  useEffect(() => {
    prevRef.current = {
      status: domain?.status,
      price: Number(domain?.price) || "",
      teamId: (domain as any)?.teamId ? String((domain as any).teamId) : "",
    };
  }, []);

  const handleUpdateDomain = useCallback(
    async ({
      status,
      price,
      teamId,
    }: {
      status?: DOMAIN_STATUS | any;
      price?: string;
      teamId?: string;
    }) => {
      hideEditPrice();
      if (price && price !== "0" && !Number(price)) {
        setPrice(prevRef.current.price);
        toast.error("Giá không hợp lệ");
        return;
      }

      if (
        status === prevRef.current.status &&
        Number(price) === prevRef.current.price &&
        (teamId === undefined || teamId === prevRef.current.teamId)
      ) {
        return;
      }

      const res = await editDomainById({
        id: domain?.id as any,
        data: {
          price: status === DOMAIN_STATUS.CANCEL_BUY ? 0 : Number(price) || 0,
          status,
          teamId: teamId ? Number(teamId) : null,
        },
      });

      apiResponseHandle({
        res,
        onFailer() {
          setStatus(prevRef.current.status);
          setPrice(prevRef.current.price);
          setTeamId(prevRef.current.teamId);
        },
        onSuccess() {
          if (status !== undefined) {
            prevRef.current.status = status;
            if (status === DOMAIN_STATUS.CANCEL_BUY) {
              prevRef.current.price = 0;
              setPrice(0);
            }
          }
          if (price !== undefined) {
            prevRef.current.price = Number(price);
          }
          if (teamId !== undefined) {
            prevRef.current.teamId = teamId;
          }

          refetchDomainOrderDetail?.();
        },
        toastSuccessMessage: "updated",
      });
    },
    [domain],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleUpdateDomain({ price, status });
      }
    },
    [price, status],
  );

  return (
    <div className="row items-start gap-4 border-b pb-4">
      <div className="row min-h-10 w-full flex-1 justify-between border-r pr-3">
        <Text className="text-wrap break-all">{domain?.name}</Text>
        <Text
          className="w-max text-wrap break-all italic"
          variant="button-xsmall"
        >
          ({getLabelFromOptions(domain?.type as any, DOMAIN_TYPE_OPTIONS)})
        </Text>
      </div>
      <div className="w-[150px]">
        <MyInput
          endContent={isLoading ? <Loadding /> : null}
          value={isEditPrice ? price : formatCurrency(price)}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          onBlur={() => handleUpdateDomain({ price, status })}
          isDisabled={
            !isEditPermission ||
            isLoading ||
            status === DOMAIN_STATUS.CANCEL_BUY
          }
          onFocus={showEditPrice}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="w-[150px]">
        <MySelect
          selectedKeys={[status]}
          onChange={(e) => {
            setStatus(e.target.value);
            handleUpdateDomain({ status: e.target.value, price });
          }}
          options={domainOrderStatus}
          isDisabled={!isEditPermission || isLoading}
          isLoading={isLoading}
        />
      </div>
      {isShowTeamSelect && (
        <div className="w-[220px]">
          <SearchableSelect
            renderItem={({ item, onClick, onRemove }) => {
              const _onRemove = onRemove
                ? () => {
                    console.log(1234);
                    onRemove?.();
                    setTeamId("");
                    handleUpdateDomain({ teamId: "" });
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
            limit={teamLimit as number}
            setLimit={setTeamLimit as any}
            setSearch={setTeamSearch as any}
            setValueSelected={(value: any) => {
              const id = value?.id?.toString() || "";
              setTeamId(id);
              handleUpdateDomain({ teamId: id });
            }}
            valueSelected={
              (getFilteredTeamsData?.(teamSearch) as any)?.data?.find(
                (item: any) => item?.id?.toString() === teamId,
              ) || null
            }
            data={getFilteredTeamsData?.(teamSearch) as any}
            isLoading={false}
            inputClassname="!w-full"
          />
        </div>
      )}
    </div>
  );
};
