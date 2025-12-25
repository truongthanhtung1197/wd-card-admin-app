"use client";

import Error from "next/error";

import { LOCALES } from "@/i18n/routing";

export default function GlobalNotFound() {
  return (
    <html lang={LOCALES.VI}>
      <body>
        <Error statusCode={404} />;
      </body>
    </html>
  );
}
