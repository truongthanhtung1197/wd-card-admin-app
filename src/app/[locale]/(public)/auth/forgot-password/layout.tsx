import type { Metadata } from "next";

import AuthLayout from "@/app/_components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Forgot Password |  ",
  description: "Reset your password for .",
  keywords: ["CRM", "forgot password", ""],
  openGraph: {
    title: "Forgot Password|  ",
    description: "Reset your password for .",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout bgImage="/images/bg-auth.png">{children}</AuthLayout>;
}
