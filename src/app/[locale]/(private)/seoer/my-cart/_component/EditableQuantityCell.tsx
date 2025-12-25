// EditableQuantityCell.tsx
import { useEffect, useState } from "react";

import MyInputNumber from "@/app/_components/form/MyInputNumber";

interface Props {
  row: any;
  value: string;
  onActionEditCell?: ({ id, row, quantity }: any) => void;
}

export function EditableQuantityCell({ row, value, onActionEditCell }: Props) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="truncate text-right text-base font-medium">
      <MyInputNumber
        value={localValue}
        classNameInputWrapper="w-full"
        onChange={(e) => {
          setLocalValue(e.target.value);
          onActionEditCell && onActionEditCell({ id: row.original.id, row, quantity: Number(e.target.value) });
        }}
      />
    </div>
  );
}
