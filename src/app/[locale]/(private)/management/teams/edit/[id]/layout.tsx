import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Team",
  description: "Edit team details",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default Layout;
