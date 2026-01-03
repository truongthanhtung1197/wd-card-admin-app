"use client";
import { ReactNode } from "react";

import { persistor } from "@/store";

import { PersistGate } from "redux-persist/integration/react";

export function PersistGateWrapper({ children }: { children: ReactNode }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
}

