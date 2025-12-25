import { useCallback, useState } from "react";

import { MyButton } from "@/app/_components";
import MyModal from "@/app/_components/common/MyModal";
import { toast } from "@/app/_components/common/Toaster";
import MyInput from "@/app/_components/form/MyInput";
import MySelect from "@/app/_components/form/MySelect";
import {
  DOMAIN_STATUS,
} from "@/constant/domain.constant";
import { useVisibility } from "@/hook";
import { DomainOrder } from "@/model/Domain.model";
import { useUpdateDomainPriceByTldMutation } from "@/store/Apis/Domain.api";
import { apiResponseHandle } from "@/utils/common.util";
import { formatCurrency } from "@/utils/format.util";

import { domainOrderStatus } from ".";

export default function QuickUpdatePrice({
  isShowQuickUpdatePrice,
  hideQuickUpdatePrice,
  detail,
  refetchDomainOrderDetail,
  refetchDomainsList,
}: {
  isShowQuickUpdatePrice: boolean;
  hideQuickUpdatePrice: () => void;
  detail?: DomainOrder;
  refetchDomainOrderDetail?: () => void;
  refetchDomainsList?: () => void;
}) {
  const {
    isVisible: isFocusPrice,
    hide: hideFocusPrice,
    show: showFocusPrice,
  } = useVisibility();
  const [price, setPrice] = useState<string>("");
  const [domainTld, setDomainTld] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [
    updateDomainPriceByTld,
    { isLoading: isLoadingUpdateDomainPriceByTld },
  ] = useUpdateDomainPriceByTldMutation();
  const onSubmitQuickUpdatePrice = useCallback(async () => {
    hideFocusPrice();
    if (!domainTld) {
      return toast.error("Vui lòng chọn loại domain");
    }
    if (!Number(price)) {
      toast.error("Giá Không hợp lệ");
      setPrice("");
      return;
    }
    const res = await updateDomainPriceByTld({
      domainOrderId: detail?.id.toString() || "",
      data: {
        tld: domainTld,
        price: Number(price),
        ...(selectedStatus ? { status: selectedStatus as DOMAIN_STATUS } : {}),
      },
    });

    apiResponseHandle({
      res,
      onSuccess: () => {
        toast.success("Cập nhật giá thành công");
        hideQuickUpdatePrice();
        refetchDomainOrderDetail?.();
        refetchDomainsList?.();
        setPrice("");
        setDomainTld("");
        setSelectedStatus("");
      },
    });
  }, [
    domainTld,
    price,
    selectedStatus,
    refetchDomainOrderDetail,
    refetchDomainsList,
  ]);

  return (
    <div>
      <MyModal
        size="4xl"
        isOpen={isShowQuickUpdatePrice}
        onClose={hideQuickUpdatePrice}
        header="Nhập giá nhanh"
        body={
          <>
            <div className="row gap-4">
              <MySelect
                label="Loại domain"
                options={
                  detail?.summarizeDomains?.map((domain) => ({
                    label: domain.type,
                    key: domain.type,
                  })) || []
                }
                value={domainTld}
                onChange={(e) => setDomainTld(e.target.value)}
                isDisabled={isLoadingUpdateDomainPriceByTld}
                isLoading={isLoadingUpdateDomainPriceByTld}
              />
              <MySelect
                label="Trạng thái (tuỳ chọn)"
                options={domainOrderStatus}
                selectedKeys={[selectedStatus]}
                onChange={(e) => setSelectedStatus(e.target.value)}
                isDisabled={isLoadingUpdateDomainPriceByTld}
                isLoading={isLoadingUpdateDomainPriceByTld}
              />
              <div className="w-[450px]">
                <MyInput
                  isDisabled={isLoadingUpdateDomainPriceByTld}
                  label="Giá"
                  value={
                    isFocusPrice ? price.toString() : formatCurrency(price)
                  }
                  onChange={(e) => setPrice(e.target.value)}
                  baseClassNames="h-[56px]"
                  onFocus={showFocusPrice}
                  onBlur={() => {
                    hideFocusPrice();
                    if (!Number(price)) {
                      toast.error("Giá Không hợp lệ");
                      setPrice("");
                    }
                  }}
                />
              </div>
            </div>
          </>
        }
        footer={
          <div className="flex justify-end gap-2">
            <MyButton bType="secondary" onClick={hideQuickUpdatePrice}>
              Cancel
            </MyButton>
            <MyButton bType="primary" onClick={onSubmitQuickUpdatePrice}>
              Save
            </MyButton>
          </div>
        }
      ></MyModal>
    </div>
  );
}
