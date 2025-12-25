import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin",
  description: "Create new Admins",
  keywords: ["create Admin", "Admin"],
  openGraph: {
    title: "Create Admin",
    description: "Create new Admins",
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
