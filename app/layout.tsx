import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S&K Enterprises - Tiles & Labour Contractor",
  description:
    "Professional tiles, ladi, marble, and Kota stone works in Navi Mumbai. Established 2021.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ClerkProvider>{children}</ClerkProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
