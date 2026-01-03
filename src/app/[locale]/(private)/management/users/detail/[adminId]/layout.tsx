import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail User | Pacificwide CRM ",
  description: "View detail information about your user.",
  keywords: ["CRM", "detail User", "Pacificwide CRM"],
  openGraph: {
    title: "Detail User | Pacificwide CRM ",
    description: "View detail information about your user.",
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
