import { EditableQuantityCell } from "@/app/[locale]/(private)/seoer/my-cart/_component/EditableQuantityCell";
import { SERVICE_TYPE_PACK } from "@/constant/service.constant";
import { ColumnDef } from "@tanstack/react-table";

interface PriceColumnOptions<T extends object> {
  accessorKey: keyof T;
  header?: string;
  size?: number;
  isEdit?: boolean;
  condition?: string;
  onActionEditCell?: ({ id, row, quantity }: any) => void;
  row?: any;
}

export const createQuantityCell = <T extends object>(
  options: PriceColumnOptions<T>,
): ColumnDef<T> => {
  const width = options.size || 120;

  return {
    accessorKey: options.accessorKey,
    size: width,
    cell: (info) => {
      if (
        (info as any)?.row?.original?.service?.typePack ===
        SERVICE_TYPE_PACK.CONTENT
      )
        return null;
      const isShowInput =
        options.condition !== undefined ? eval(options.condition) : true;
      if (!isShowInput) {
        return null;
      }
      const initialValue = info.getValue<string>();
      if (!options.isEdit) {
        return (
          <p className="break-words text-right text-base font-medium">
            {info.getValue() as string}
          </p>
        );
      }
      return (
        <EditableQuantityCell
          row={info.row}
          value={initialValue}
          onActionEditCell={({ id, row, quantity }) =>
            options.onActionEditCell?.({ id, row, quantity })
          }
        />
      );
    },
    header: () => (
      <p className="break-words text-right text-base font-medium">
        {options.header ?? "Số lượng"}
      </p>
    ),
    meta: {
      className: `!w-[${width}px] !min-w-[${width}px] !max-w-[${width}px] break-words`,
    },
  };
};
