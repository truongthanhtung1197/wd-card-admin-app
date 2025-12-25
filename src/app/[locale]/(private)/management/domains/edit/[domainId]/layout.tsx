import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Domain",
  description: "Create new Domain",
  keywords: ["create Domain", "Domain"],
  openGraph: {
    title: "Create Domain",
    description: "Create new Domain",
  },
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default Layout;
