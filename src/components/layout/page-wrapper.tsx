"use client";

import { PageTransition } from "@/components/page-transition";
import { ReactNode } from "react";

export function PageWrapper({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

