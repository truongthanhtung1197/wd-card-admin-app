import type { Metadata } from "next";

import AuthLayout from "@/app/_components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Verify | Pacificwide CRM ",
  description: "Verify your account to access Pacificwide CRM.",
  keywords: ["CRM", "verify", "Pacificwide CRM"],
  openGraph: {
    title: "Verify| Pacificwide CRM ",
    description: "Verify your account to access Pacificwide CRM.",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout bgImage="/images/bg-auth.png">{children}</AuthLayout>;
}
