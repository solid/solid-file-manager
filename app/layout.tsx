import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import LdoProvider from "./components/providers/LdoProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solid File Manager",
  description: "A Google Drive-like file manager for Solid Pods",
  icons: {
    icon: "/file-manager-logo.svg",
    shortcut: "/file-manager-logo.svg",
    apple: "/file-manager-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LdoProvider>
          {children}
          <Toaster />
        </LdoProvider>
      </body>
    </html>
  );
}
