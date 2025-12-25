import { redirect } from "next/navigation";

import { LOCALES } from "@/i18n/routing";

export default function Home() {
  redirect(LOCALES.VI);
}
