import { HierarchyProvider } from "@/contexts/hierarchy";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  title: "Infra for Babies",
  description:
    "Easy-to-use dashboard where you can build your terraform code like playing with lego blocks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HierarchyProvider>{children}</HierarchyProvider>
      </body>
    </html>
  );
}
