import type { Metadata } from "next";

import AuthLayout from "@/app/_components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "69 VN",
  description: "Log in to your 69 VN",
  keywords: ["CRM", "69 VN"],
  openGraph: {
    title: " 69 VN",
    description: "69 VN",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout bgImage="/images/bg-auth.png">{children}</AuthLayout>;
}
