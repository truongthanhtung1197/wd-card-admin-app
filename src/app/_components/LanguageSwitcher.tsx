"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { localeOptions, LOCALES, removeLocalePrefix } from "@/i18n/routing";
import { Select, SelectItem } from "@nextui-org/react";

import ChinaIcon from "./icons/ChinaIcon";
import VietNameIcon from "./icons/VietNameIcon";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (newLocale: string) => {
      const pathWithoutLocale = removeLocalePrefix(pathname);
      const newPath = `/${newLocale}${pathWithoutLocale}`;

      startTransition(() => {
        router.replace(newPath);
      });
    },
    [pathname, router],
  );

  return (
    <div className="w-[80px]">
      <Select
        isLoading={isPending}
        aria-label="Language"
        size="md"
        variant="flat"
        radius="md"
        className="w-[80px]"
        classNames={{
          base: "",
          trigger: "bg-white border-1 border-neutral-stroke-light",
        }}
        listboxProps={{
          classNames: {
            // list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
          },
          itemClasses: {
            base: [
              "!py-3 border-y-1 border-transparent !text-neutral-element-primary",
              "text-default-500",
              "transition-opacity",
              "data-[pressed=true]:opacity-70",
            ],
            title: "!text-base",
          },
        }}
        renderValue={(items) => (
          <div className="row">
            {items.map((item: any) => (
              <div key={item.key}>
                <p className="flex items-center gap-2 !text-base font-medium">
                  {item.key === LOCALES.VI ? <VietNameIcon /> : <ChinaIcon />}
                  {/* {item.textValue} */}
                </p>
              </div>
            ))}
          </div>
        )}
        selectedKeys={[currentLocale]}
        onChange={(e) => handleChange(e.target.value)}
      >
        {localeOptions.map((locale) => (
          <SelectItem
            key={locale.key}
            startContent={
              locale.key === LOCALES.VI ? <VietNameIcon /> : <ChinaIcon />
            }
          >
            {/* {locale.label} */}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
