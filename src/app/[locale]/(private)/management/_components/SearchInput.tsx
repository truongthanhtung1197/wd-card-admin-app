import React, {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

import SearchIcon from "@/app/_components/icons/SearchIcon";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { cn } from "@/utils/common.util";
import { Input, InputProps } from "@nextui-org/input";

export interface SearchInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  onEnter?: (value: string) => void;
}

const SearchInput = memo(({ className, placeholder }: SearchInputProps) => {
  const [value, setValue] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useLocaleRouter();

  const s = searchParams.get("s") || "";

  const onSearch = useCallback(
    (searchValue: any) => {
      const params = new URLSearchParams(searchParams);
      params.set("s", searchValue?.trim());
      params.set("page", "1");
      push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSearch(value);
      }
    },
    [value],
  );

  useEffect(() => {
    setValue(s);
  }, [s]);

  return (
    <div className={cn("w-full", className)}>
      <Input
        radius="sm"
        classNames={{
          base: "h-full",
          input: [
            "bg-transparent h-full",
            "text-black/90 dark:text-white/90 font-quicksand font-medium text-base",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent h-full",
          inputWrapper: [
            "h-full",
            "bg-white",
            "border",
            "border-neutral-stroke-light",
            "hover:!bg-white",
            "hover:!border-brand-primary",
            "group-data-[focus=true]:bg-white",
            "group-data-[focus=true]:border-brand-primary",
            "!shadow-none",
          ],
        }}
        value={value}
        onValueChange={setValue}
        placeholder={placeholder}
        endContent={<SearchIcon />}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
});

export default SearchInput;
