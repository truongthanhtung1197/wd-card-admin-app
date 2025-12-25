import CommentThread from "@/app/_components/comment/CommentThread";
import Loading from "@/app/_components/common/Loading";
import MyAccordion from "@/app/_components/common/MyAccordion";
import Text from "@/app/_components/common/Text";
import { LocaleLink } from "@/app/_components/LocaleLink";
import PartnerInfo from "@/app/_components/PartnerInfo";
import ReviewForm from "@/app/_components/reviews/ReviewForm";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { IOrder } from "@/constant/Manager.constant";
import { useAppSelector } from "@/store";
import {
  ORDER_STATUS,
  useGetOrderHistoriesQuery,
} from "@/store/Apis/Order.api";
import { AuthSelector } from "@/store/Auth";

import OrderDetails from "../../Cart/CardDetailModal/OrderDetails";
import OrderStatusTimeline from "../../OrderStatusTimeline";
import OrderHistory from "./OrderHistory";
import OrderInfo from "./OrderInfo";

export default function OrderDetailView({
  isLoading,
  isFetching,
  orderDetail,
  refetch,
}: {
  isLoading: boolean;
  isFetching: boolean;
  orderDetail?: IOrder;
  refetch: () => void;
}) {
  const partner =
    orderDetail?.partner ||
    orderDetail?.orderDetails?.[0]?.service?.user ||
    undefined;
  const auth = useAppSelector((state) => AuthSelector.selectAuthState(state));
  const {
    data: historyData,
    isLoading: loadingGetHistory,
    isFetching: fetchingGetHistory,
  } = useGetOrderHistoriesQuery(
    {
      limit: 200,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "DESC",
      orderId: orderDetail?.id,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !orderDetail?.id,
    },
  );

  return (
    <div className="relative max-w-full space-y-6 p-6">
      {(isLoading || isFetching) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/15">
          <Loading />
        </div>
      )}
      {auth?.admin?.role?.roleName !== ADMIN_ROLE.PARTNER && (
        <PartnerInfo partner={partner} />
      )}
      {orderDetail?.status && (
        <OrderStatusTimeline
          currentStatus={orderDetail?.status}
          beforeStatus={
            orderDetail?.recentChangeStatusHistory?.metadata
              ?.before as ORDER_STATUS
          }
          histories={historyData?.data || []}
        />
      )}
      <div className="flex h-full flex-col space-y-4">
        <OrderInfo order={orderDetail} />
        <OrderDetails order={orderDetail} refetchOrderDetail={refetch} />
      </div>
      {orderDetail?.id && (
        <OrderHistory
          historyData={historyData}
          loadingGetHistory={loadingGetHistory}
          fetchingGetHistory={fetchingGetHistory}
        />
      )}
      <div className="w-full rounded-md border border-green-200 bg-green-50 p-4">
        <CommentThread orderId={orderDetail?.id?.toString() || ""} />
      </div>
      {/* Partner review form in order detail (non-partner roles) */}
      {partner?.id && auth?.admin?.role?.roleName !== ADMIN_ROLE.PARTNER && (
        <MyAccordion title="Đánh giá của đơn hàng này" defaultExpandedKeys={[]}>
          <ReviewForm
            userId={partner.id}
            onSubmitted={refetch}
            orderId={orderDetail?.id}
            label=""
            showReview={true}
          />
          <LocaleLink
            href={ROUTERS.MANAGEMENT_PARTNER_DETAIL.replace(
              ":id",
              partner.id.toString(),
            )}
            className="mt-4 block"
            target="_blank"
          >
            <Text variant="body2-link">
              Xem tất cả đánh giá của đối tác này
            </Text>
          </LocaleLink>
        </MyAccordion>
      )}
    </div>
  );
}
