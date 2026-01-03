import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create/Edit Package",
  description: "Create or Edit Package",
  keywords: ["Package", "Create", "Edit"],
  openGraph: {
    title: "Create/Edit Package",
    description: "Create or Edit Package",
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

