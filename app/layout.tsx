import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shana Bhojwani | Business Analyst · Product & Operations",
  description: "Business Analyst focused on turning messy information into clear systems, useful workflows and better decisions.",
  openGraph: {
    title: "Shana Bhojwani | Business Analyst · Product & Operations",
    description: "Business Analyst focused on turning messy information into clear systems, useful workflows and better decisions.",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shana Bhojwani portfolio preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shana Bhojwani | Business Analyst · Product & Operations",
    description: "Business Analyst focused on turning messy information into clear systems, useful workflows and better decisions.",
    images: ["/og-image.svg"]
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
