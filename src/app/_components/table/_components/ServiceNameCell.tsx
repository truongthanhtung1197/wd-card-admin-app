import { IOrder } from "@/constant/Manager.constant";
import { SERVICE_TYPE_OPTIONS } from "@/constant/service.constant";
import { getLabelFromOptions } from "@/utils/loan.utils";

import MyTooltip from "../../common/MyTooltip";

export const ServiceNameCell = ({
  order,
  handleViewServiceDetails,
}: {
  order: IOrder;
  handleViewServiceDetails?: (order: IOrder) => void;
}) => {
  return (
    <p
      className="col cursor-pointer gap-2 break-words text-left text-base font-medium hover:text-brand-primary"
      onClick={(e) => {
        e.stopPropagation();
        handleViewServiceDetails?.(order);
      }}
    >
      {order?.orderDetails?.map((item: any, index: number) => {
        return (
          <span
            key={item.id}
            className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary"
          >
            {item?.orderDetails?.length > 1 ? `${index + 1}. ` : ""}
            <span className="text-md font-medium italic text-gray-500">
              ({getLabelFromOptions(item.serviceType, SERVICE_TYPE_OPTIONS)}
              ){" "}
            </span>
            -{" "}
            <MyTooltip content={item.service?.name}>
              <p className="line-clamp-3">{item.service?.name}</p>
            </MyTooltip>
          </span>
        );
      })}
    </p>
  );
};
