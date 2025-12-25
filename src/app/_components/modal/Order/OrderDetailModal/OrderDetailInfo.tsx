import { FaGift } from "react-icons/fa";
import { useTranslations } from "next-intl";

import MyButton from "@/app/_components/common/MyButton";
import MyModal from "@/app/_components/common/MyModal";
import { toast } from "@/app/_components/common/Toaster";
import TextInput from "@/app/_components/formik/FTextInput";
import EditIcon from "@/app/_components/icons/EditIcon";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { IOrderDetail, ServiceType } from "@/constant/Manager.constant";
import {
  SERVICE_TYPE_OPTIONS,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { useAppSelector } from "@/store";
import { useUpdateOrderLinkDriveMutation } from "@/store/Apis/Order.api";
import { AuthSelector } from "@/store/Auth";
import { apiResponseHandle, parseSafe } from "@/utils/common.util";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";

import { RenderFiledValue } from "../../../common/RenderFiledValue";
import Text from "../../../common/Text";

import { Formik, FormikProps } from "formik";

export default function OrderDetailInfo({
  orderDetail,
  refetchOrderDetail,
}: {
  orderDetail: IOrderDetail;
  refetchOrderDetail: () => void;
}) {
  const t = useTranslations("DetailModal");
  const {
    quantity,
    serviceType,
    anchorText1,
    anchorText2,
    url1,
    url2,
    linkDrive,
    expiredAt,
    newOrRenew,
    warrantyPeriod,
    serviceMetadata,
    price,
    discount,
    service,
    id,
  } = orderDetail || {};

  const { admin } = useAppSelector((state) =>
    AuthSelector.selectAuthState(state),
  );
  const { isVisible, show, hide } = useVisibility();
  const [updateOrderLinkDrive, { isLoading: loadingLinkDrive }] =
    useUpdateOrderLinkDriveMutation();

  const handleUpdateLinkDrive = async (value: any) => {
    try {
      const res = await updateOrderLinkDrive({
        id: id,
        linkDrive: value?.linkDrive,
      });
      apiResponseHandle({
        res,
        onSuccess: () => {
          hide();
          refetchOrderDetail();
          toast.success("Update link drive success");
        },
      });
    } catch (error) {
      toast.error("Update link drive failed");
    }
  };
  const _service: Service = parseSafe(serviceMetadata, {});
  return (
    <>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 gap-x-[30px]">
          {serviceType && (
            <RenderFiledValue
              filedName={"Service Type"}
              value={getLabelFromOptions(serviceType, SERVICE_TYPE_OPTIONS)}
            />
          )}{" "}
          {service?.typePack === SERVICE_TYPE_PACK.DOMAIN && (
            <RenderFiledValue filedName={"domain"} value={service?.name} />
          )}
          {quantity && (
            <RenderFiledValue filedName={t("quantity")} value={quantity} />
          )}
          {anchorText1 && (
            <RenderFiledValue
              filedName={t("anchorText1")}
              value={anchorText1}
            />
          )}
          {anchorText2 && (
            <RenderFiledValue
              filedName={t("anchorText2")}
              value={anchorText2}
            />
          )}
          {url1 && <RenderFiledValue filedName={t("url1")} value={url1} />}
          {url2 && <RenderFiledValue filedName={t("url2")} value={url2} />}
          {expiredAt && (
            <RenderFiledValue
              filedName={t("expiredAt")}
              value={formatDateTime(expiredAt)}
            />
          )}
          {newOrRenew && (
            <RenderFiledValue filedName={t("newOrRenew")} value={newOrRenew} />
          )}
          {warrantyPeriod && (
            <RenderFiledValue
              filedName={t("warrantyPeriod")}
              value={warrantyPeriod}
            />
          )}
          {price && (
            <RenderFiledValue
              filedName={"price"}
              value={formatCurrency(price)}
            />
          )}
          {discount && (
            <RenderFiledValue
              filedName={"discount"}
              value={formatCurrency(discount)}
            />
          )}
          {serviceType === ServiceType.GP && (
            <>
              <RenderFiledValue
                filedName={"index"}
                value={service?.isIndexGuestPost ? "Index" : "Noindex"}
              />
              <RenderFiledValue
                filedName={"follow"}
                value={service?.isFollowGuestPost ? "Dofollow" : "Nofollow"}
              />
            </>
          )}
          <RenderFiledValue
            filedName={
              <div className="row gap-3">
                Link Drive
                {admin?.role?.roleName === ADMIN_ROLE.PARTNER && (
                  <div
                    className="center ml-2 h-7 w-7 cursor-pointer rounded-full hover:border hover:border-slate-200 hover:bg-slate-200 hover:shadow-lg"
                    onClick={show}
                  >
                    <EditIcon fill="#000" size={"20"} />
                  </div>
                )}
              </div>
            }
            value={linkDrive}
          />
        </div>

        {service?.complimentaries && service.complimentaries.length > 0 && (
          <div className="rounded-md p-3">
            <div className="mb-2 flex items-center">
              <h3 className="mb-1 flex items-center text-base font-bold text-[#066102]">
                {t("complimentaryServices")}{" "}
                <FaGift className="ml-2 text-green-500" size={15} />
              </h3>
            </div>
            <div className="pl-6">
              <ul className="col gap-3">
                {[{ name: "test" }].map((item: any, index: number) => (
                  <li key={index} className="flex gap-3 text-[#6e6e6e]">
                    <Text variant="body1-regular">{index + 1}:</Text>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <MyModal
        isOpen={isVisible}
        onClose={hide}
        header="Update link drive"
        body={
          <>
            <Formik
              initialValues={{ linkDrive }}
              // validationSchema={ValidationSchema}
              onSubmit={handleUpdateLinkDrive}
              validateOnBlur={false}
              validateOnChange={false}
              enableReinitialize={true}
            >
              {(props: FormikProps<any>) => {
                const { values, validateField } = props;
                return (
                  <form className="col relative w-full ">
                    <TextInput label={"Link Drive"} name="linkDrive" />
                    <div className="row sticky bottom-0 z-50 mt-5 w-full justify-end gap-3">
                      <MyButton bSize="small" bType="neutral" onClick={hide}>
                        Cancel
                      </MyButton>
                      <MyButton
                        bSize="small"
                        onClick={() => props.handleSubmit()}
                        disabled={loadingLinkDrive}
                        isLoading={loadingLinkDrive}
                      >
                        {"Save"}
                      </MyButton>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </>
        }
      ></MyModal>
    </>
  );
}
