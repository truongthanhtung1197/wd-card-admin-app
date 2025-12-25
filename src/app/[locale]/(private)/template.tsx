"use client";
import { ReactNode } from "react";


export default function Template({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
