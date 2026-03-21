import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Príncipe André Luís - Digital Business Card",
  description: "Digital business card of Príncipe André Luís - Creator, Decider, Orchestrator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
