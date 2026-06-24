"use client";

import { FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <nav className="mx-auto flex h-12 w-[min(26rem,calc(100%-24px))] items-center justify-between rounded-full border border-white/60 bg-[#fff8ed]/88 px-4 shadow-paper backdrop-blur-xl">
        <a href="#top" className="font-semibold tracking-tight text-foreground">
          SB
        </a>
        <a
          href={portfolioData.person.cv}
          onClick={() => trackEvent("cv_download_click", "header")}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-paper ring-1 ring-border transition-all hover:-translate-y-0.5"
        >
          <FileText className="h-4 w-4" />
          CV
        </a>
      </nav>
    </header>
  );
}
