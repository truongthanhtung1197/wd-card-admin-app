import type { Metadata } from "next";

import AuthLayout from "@/app/_components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Reset Password | Pacificwide CRM ",
  description: "Reset your password for Pacificwide CRM.",
  keywords: ["CRM", "login", "Pacificwide CRM"],
  openGraph: {
    title: "Reset Password| Pacificwide CRM ",
    description: "Reset your password for Pacificwide CRM.",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout bgImage="/images/bg-auth.png">{children}</AuthLayout>;
}
