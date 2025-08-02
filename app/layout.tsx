import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devzent - Your vision our Expertise",
  description:
    "Devzent is a platform that connects you with top-notch developers to bring your ideas to life. Whether you need a website, app, or custom software, our expert team is here to help.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(Date.now());

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
