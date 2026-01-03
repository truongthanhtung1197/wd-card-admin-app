"use client";

import { ReactNode } from "react";

import { useAppSelector } from "@/store";
import { AuthSelector } from "@/store/Auth";

interface PrivateAuthProviderProps {
  children: ReactNode;
}

export default function PrivateAuthProvider({
  children,
}: PrivateAuthProviderProps) {
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  console.log(admin);

  return <>{children}</>;
}
