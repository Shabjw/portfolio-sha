"use client";

import { useState } from "react";
import { Coffee, Copy, Github, Linkedin, Mail, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function EndingScene() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(portfolioData.person.email);
    setCopied(true);
    trackEvent("email_copy_click", "ending");
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="ending" className="relative overflow-hidden bg-[#17263a] py-24 text-white md:py-32">
      <div className="ambient-orb left-[12%] top-[12%] h-80 w-80 bg-[#ffc17d]/20" />
      <div className="ambient-orb bottom-[8%] right-[8%] h-96 w-96 bg-[#aeb7df]/18" />
      <div className="section-shell relative z-10 grid gap-10 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#ffe0ac]/70"><Telescope className="h-4 w-4" /> Currently Exploring</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Still organizing the next set of signals.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {portfolioData.exploring.map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/78 ring-1 ring-white/10">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-2xl leading-7 text-white/70">
            Comfortable in multilingual and international environments, with a strong interest in Spain, Portugal and broader European opportunities.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/68">
            {portfolioData.languages.map((language) => (
              <span key={language} className="rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/10">
                {language}
              </span>
            ))}
          </div>
        </div>
        <div id="contact" className="relative overflow-hidden rounded-[2rem] bg-white/10 p-8 shadow-soft ring-1 ring-white/15 backdrop-blur">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#ffc17d]/15 blur-2xl" />
          <p className="relative flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#ffe0ac]/70"><Coffee className="h-4 w-4" /> Let’s talk</p>
          <h3 className="mt-4 font-display text-3xl font-semibold">Open to international BA, product ops and data ops roles.</h3>
          <div className="mt-8 grid gap-3">
            <Button variant="secondary" onClick={copyEmail}><Copy className="h-4 w-4" /> {copied ? "Email copied" : "Copy email"}</Button>
            <Button asChild variant="ghost"><a className="text-white hover:bg-white/10" href={`mailto:${portfolioData.person.email}`}><Mail className="h-4 w-4" /> Email</a></Button>
            <Button asChild variant="ghost"><a className="text-white hover:bg-white/10" href={portfolioData.person.linkedin} onClick={() => trackEvent("linkedin_click", "ending")}><Linkedin className="h-4 w-4" /> LinkedIn</a></Button>
            <Button asChild variant="ghost"><a className="text-white hover:bg-white/10" href={portfolioData.person.github}><Github className="h-4 w-4" /> GitHub</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
