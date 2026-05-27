"use client";

import { FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

const links = [
  { label: "How I Think", href: "#thinking" },
  { label: "Selected Work", href: "#work" },
  { label: "Ending", href: "#ending" },
  { label: "Contact", href: "#contact" }
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/35 bg-[#fff8ed]/80 backdrop-blur-xl">
      <nav className="cinematic-shell flex h-16 items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-foreground">
          Shana Bhojwani
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={portfolioData.person.cv}
          onClick={() => trackEvent("cv_download_click", "header")}
          className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-paper ring-1 ring-border transition hover:-translate-y-0.5 md:inline-flex"
        >
          <FileText className="h-4 w-4" />
          Download CV
        </a>
      </nav>
    </header>
  );
}
