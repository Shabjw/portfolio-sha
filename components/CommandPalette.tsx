"use client";

import { useEffect, useState } from "react";
import { Copy, Download, Languages, Sparkles, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
        trackEvent("command_palette_open", "keyboard");
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function copyEmail() {
    await navigator.clipboard.writeText(portfolioData.person.email);
    trackEvent("email_copy_click", "command_palette");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("command_palette_open", "button");
        }}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-white/88 px-4 py-2 text-xs shadow-paper ring-1 ring-border backdrop-blur transition hover:-translate-y-0.5"
      >
        Quick view /
      </button>
      {open ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#17263a]/35 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#fff8ed] p-4 shadow-soft ring-1 ring-border">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <p className="text-sm font-semibold">Quick view</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              <a className="rounded-2xl p-3 hover:bg-muted" href="#work" onClick={() => setOpen(false)}>
                <Sparkles className="mr-2 inline h-4 w-4" /> View selected work
              </a>
              <button className="rounded-2xl p-3 text-left hover:bg-muted" type="button" onClick={copyEmail}>
                <Copy className="mr-2 inline h-4 w-4" /> Copy email
              </button>
              <a className="rounded-2xl p-3 hover:bg-muted" href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "command_palette")}>
                <Download className="mr-2 inline h-4 w-4" /> Download CV
              </a>
              <a className="rounded-2xl p-3 hover:bg-muted" href="#contact" onClick={() => setOpen(false)}>
                <Languages className="mr-2 inline h-4 w-4" /> See languages
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
