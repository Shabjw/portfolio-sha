"use client";

import { FileText, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#f7efe2] py-20 md:py-28">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf0] p-7 shadow-soft ring-1 ring-[#dfd0bd] md:p-10">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#f0a45e]/14 blur-3xl" />
          <div className="absolute left-8 top-8 h-20 w-px rotate-[10deg] bg-[#bd7a52]/18" />
          <div className="relative grid gap-10 md:grid-cols-[1fr_.86fr] md:items-start">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact page</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#243850] md:text-6xl">
                Let&apos;s build something clearer.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                If your team is dealing with scattered information, unclear workflows or products that deserve more clarity, I&apos;d love to hear about it.
              </p>
            </div>

            <aside className="relative rounded-[1.5rem] bg-white/72 p-6 shadow-paper ring-1 ring-[#dfd0bd]">
              <span className="absolute -top-3 left-8 h-6 w-20 rotate-[-3deg] bg-[#f1cf9b]/75 shadow-sm" />
              <div className="grid gap-5 text-sm text-[#4f5b68]">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6d4f]">
                    <MapPin className="h-3.5 w-3.5" />
                    Current location
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#243850]">Paris</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6d4f]">Looking for</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Business Analysis", "Product Operations", "Product", "Data"].map((item) => (
                      <span key={item} className="rounded-full bg-[#f3eadf] px-3 py-1 text-[#243850]">{item}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6d4f]">Open to</p>
                  <p className="mt-2 leading-7">France · Spain · Portugal · Europe</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6d4f]">Languages</p>
                  <p className="mt-2 leading-7">French · English · Spanish · Italian · Hindi</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-[#dfd0bd] pt-5">
                <Button asChild>
                  <a href={`mailto:${portfolioData.person.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "contact")}>
                    <FileText className="h-4 w-4" />
                    CV
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={portfolioData.person.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("linkedin_click", "contact")}>
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
