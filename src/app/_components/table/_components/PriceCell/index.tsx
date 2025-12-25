import { formatCurrency } from "@/utils/format.util";
import { ColumnDef } from "@tanstack/react-table";

interface PriceColumnOptions<T extends object> {
    accessorKey: keyof T;
    header?: string;
    size?: number;
}

export const createPriceColumn = <T extends object>({
    accessorKey,
    header = "Giá",
    size = 120,
}: PriceColumnOptions<T>): ColumnDef<T> => ({
    accessorKey,
    size,
    cell: (info) => (
        <p className="truncate text-right text-base font-medium">
            {formatCurrency(info.getValue() as string | number | undefined)}
        </p>
    ),
    header: () => <p className="truncate text-right text-base font-medium">{header}</p>,
});

