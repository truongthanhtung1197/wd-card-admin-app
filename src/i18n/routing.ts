import { defineRouting } from "next-intl/routing";

export enum LOCALES {
  VI = "vi",
  zhCN = "zh-CN",
}

export const routing = defineRouting({
  locales: [LOCALES.VI, LOCALES.zhCN],
  defaultLocale: LOCALES.VI,
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export const localeOptions = [
  { label: "Tiếng Việt", key: LOCALES.VI },
  { label: "中文", key: LOCALES.zhCN },
];

export const removeLocalePrefix = (pathname: string) => {
  return pathname.replace(
    new RegExp(`^/(${LOCALES.VI}|${LOCALES.zhCN})(?=\/|$)`),
    "",
  );
};
