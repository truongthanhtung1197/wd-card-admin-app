"use client";

import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export const useLocaleRouter = () => {
  const router = useRouter();
  const locale = useLocale();

  const withLocale = (url: string, customLocale?: string): string => {
    const effectiveLocale = customLocale || locale;

    if (url.startsWith(`/${effectiveLocale}/`) || url === `/${effectiveLocale}`)
      return url;

    if (url === "/") return `/${effectiveLocale}`;
    return `/${effectiveLocale}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return {
    ...router,

    push: (url: string, options?: NavigateOptions & { locale?: string }) => {
      const finalUrl = withLocale(url, options?.locale);
      router.push(finalUrl, options);
    },

    replace: (url: string, options?: NavigateOptions & { locale?: string }) => {
      const finalUrl = withLocale(url, options?.locale);
      router.replace(finalUrl, options);
    },

    prefetch: (url: string, options?: { locale?: string }) => {
      const finalUrl = withLocale(url, options?.locale);
      router.prefetch(finalUrl);
    },
  };
};

// example
// const router = useLocaleRouter();
// router.push('/about', { scroll: false });
// router.push('/contact', { locale: 'en' });
