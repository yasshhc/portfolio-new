import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const body = Work_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Yash Channe | Customer Success → Product",
  description:
    "Customer Success Manager who turns customer calls into specs and tickets the product team ships, and builds and ships own products on the side.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink font-body">{children}</body>
    </html>
  );
}
