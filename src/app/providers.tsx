"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
