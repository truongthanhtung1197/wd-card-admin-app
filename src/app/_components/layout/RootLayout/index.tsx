"use client";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";

import { store } from "@/store";

import { Toaster } from "../../common/Toaster";
import { PersistGateWrapper } from "./PersistGateWrapper";

// Dynamically import PersistGateWrapper to avoid SSR issues with Next.js 16
const ClientPersistGate = dynamic(() => Promise.resolve(PersistGateWrapper), {
  ssr: false,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ClientPersistGate>
        {children}
        <Toaster />
      </ClientPersistGate>
    </Provider>
  );
}
