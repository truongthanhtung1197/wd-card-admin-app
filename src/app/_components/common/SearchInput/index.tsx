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

import Loadding from "../Loadding";

export interface SearchInputProps extends InputProps {
  className?: string;
  placeholder?: string;
  onEnter?: (value: string) => void;
  keepHistory?: boolean;
  param?: string;
  onSearch?: (v: string) => void;
  isLoading?: boolean;
}

const SearchInput = memo(
  ({
    isLoading,
    className,
    placeholder,
    keepHistory = true,
    param,
    onSearch: onSearchCustom,
  }: SearchInputProps) => {
    const [value, setValue] = useState<string>("");

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push, replace } = useLocaleRouter();

    const s = searchParams.get(param || "s") || "";

    const onSearch = useCallback(
      (searchValue: any) => {
        if (onSearchCustom) {
          onSearchCustom?.(searchValue);
          return;
        }
        const params = new URLSearchParams(searchParams);
        params.set(param || "s", searchValue?.trim());
        params.set("page", "1");
        keepHistory
          ? push(`${pathname}?${params.toString()}`)
          : replace(`${pathname}?${params.toString()}`);
      },
      [pathname, onSearchCustom, searchParams],
    );

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onSearch(value);
        }
      },
      [value, onSearch],
    );

    useEffect(() => {
      if (onSearchCustom) {
        return;
      }
      setValue(s);
    }, [s, onSearchCustom]);

    return (
      <div className={cn("w-full", className)}>
        <Input
          radius="full"
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
          endContent={isLoading ? <Loadding /> : <SearchIcon />}
          onKeyDown={handleKeyPress}
        />
      </div>
    );
  },
);

export default SearchInput;
