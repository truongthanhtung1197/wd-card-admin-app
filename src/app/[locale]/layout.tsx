import { Metadata } from "next";
import { Pacifico, Quicksand } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";

import { routing } from "@/i18n/routing";

import RootLayout from "../_components/layout/RootLayout";
import { Providers } from "./providers";

import "../globals.css";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--quicksand-font",
});

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--pacifico-font",
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "",
  },
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const messages = await getMessages({ locale });
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${quicksand.variable} ${pacifico.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" sizes="53" />
      </head>
      <body className="relative">
        <NextTopLoader showSpinner={false} color="#000" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <RootLayout>{children}</RootLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
