import type { Metadata } from "next";

import AuthHeader from "@/app/_components/AuthHeader";

import Footer from "../(public)/home/Footer";
import PrivateAuthProvider from "./PrivateAuthProvider";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "View Admin dashboard",
  keywords: ["CRM", "Admin dashboard"],
  openGraph: {
    title: "Admin dashboard ",
    description: "View Admin dashboard",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // return <SetupLayout>{children}</SetupLayout>;
  return (
    <PrivateAuthProvider>
      <div>
        <AuthHeader />
        <div className="container-page min-h-[calc(100vh_-_646px)]">
          {children}
        </div>
        <Footer />
      </div>
    </PrivateAuthProvider>
  );
}
