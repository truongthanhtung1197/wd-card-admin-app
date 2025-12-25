import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Team",
  description: "Create a new team",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default Layout;
