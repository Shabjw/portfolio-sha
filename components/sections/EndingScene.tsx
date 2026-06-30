"use client";

import { useEffect, useState } from "react";
import { Coffee, Copy, Github, Linkedin, Mail, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function EndingScene() {
  const [copied, setCopied] = useState(false);
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeObservation, setActiveObservation] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveObservation((current) => (current + 1) % portfolioData.noticing.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

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
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#ffe0ac]/70"><Telescope className="h-4 w-4" /> Things on my mind lately</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Curiosity outside the project file.</h2>
          <div className="mt-8 grid gap-5">
            <div className="rounded-[1.7rem] border border-[#ffe0ac]/18 bg-white/[.09] p-6 shadow-[0_28px_90px_rgba(0,0,0,.16)]">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffe0ac]/70">Current thought</p>
              <p className="mt-4 min-h-[9.5rem] text-[17px] leading-8 text-white/78">
                {portfolioData.exploring[activeTopic].reflection}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
            {portfolioData.exploring.map((topic, index) => {
              const isActive = activeTopic === index;
              return (
                <button
                  key={topic.title}
                  type="button"
                  onMouseEnter={() => setActiveTopic(index)}
                  onFocus={() => setActiveTopic(index)}
                  onClick={() => setActiveTopic(index)}
                  className={`group min-h-[6.5rem] rounded-[1.15rem] border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe0ac]/40 ${isActive ? "rotate-[-1deg] border-[#ffe0ac]/35 bg-[#ffe0ac]/[.14]" : "border-white/10 bg-white/[.06] hover:-translate-y-1 hover:bg-white/[.1]"}`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#ffe0ac]/55">note 0{index + 1}</span>
                  <span className="mt-2 block font-display text-xl font-semibold text-white">{topic.title}</span>
                  <span className={`mt-3 block h-px w-16 bg-[#ffe0ac]/40 transition ${isActive ? "w-28" : ""}`} />
                </button>
              );
            })}
            </div>
            <article className="rounded-[1.4rem] border border-[#ffe0ac]/16 bg-[#ffe0ac]/[.08] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffe0ac]/70">Things I keep noticing</p>
              <p key={portfolioData.noticing[activeObservation]} className="quote-fade mt-3 font-serif text-xl italic leading-8 text-[#fff2d3]">
                {portfolioData.noticing[activeObservation]}
              </p>
            </article>
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
