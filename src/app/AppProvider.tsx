"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();
import { SessionProvider } from "@/context/SessionContext";
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
