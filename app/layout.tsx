import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shana Bhojwani | Business Analyst",
  description: "Business Analyst with a product mindset. CRM, data, operations and workflow clarity."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
