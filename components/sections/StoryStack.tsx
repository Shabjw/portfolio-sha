"use client";

import { motion } from "framer-motion";
import { GitBranch, Handshake, Layers3, RefreshCcw } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const thinkingIcons = [GitBranch, Handshake, Layers3, RefreshCcw];

function ThinkingSketch({ index }: { index: number }) {
  const Icon = thinkingIcons[index] ?? GitBranch;

  return (
    <div className="relative mt-7 h-28 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f4e0c4,#e7edf0)] ring-1 ring-white/70">
      <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/72 shadow-paper">
        <Icon className="h-5 w-5 text-[#253b56]" />
      </div>
      <svg className="absolute bottom-4 right-4 h-20 w-44 text-[#253b56]/36" viewBox="0 0 180 86" fill="none" aria-hidden="true">
        <path d="M10 60C42 12 70 76 100 34C120 8 144 35 168 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 5" />
        <circle cx="10" cy="60" r="4" fill="#253b56" />
        <circle cx="100" cy="34" r="4" fill="#f0a45e" />
        <circle cx="168" cy="18" r="4" fill="#7f654f" />
      </svg>
      {index === 0 ? <p className="absolute bottom-5 left-5 text-[11px] text-[#7f654f]">messy → mapped</p> : null}
      {index === 1 ? <p className="absolute bottom-5 left-5 text-[11px] text-[#7f654f]">shared language</p> : null}
      {index === 2 ? <p className="absolute bottom-5 left-5 text-[11px] text-[#7f654f]">systems over noise</p> : null}
      {index === 3 ? <p className="absolute bottom-5 left-5 text-[11px] text-[#7f654f]">reusable by design</p> : null}
    </div>
  );
}

export function StoryStack() {
  return (
    <section id="thinking" className="section-shell py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
        <div className="md:sticky md:top-24 md:h-fit">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">How I Think · observatory notes</p>
          <h2 className="mt-4 max-w-sm font-display text-4xl font-semibold tracking-tight md:text-5xl">
            How Shana creates clarity.
          </h2>
          <p className="mt-5 max-w-sm leading-7 text-muted-foreground">
            A quiet operating rhythm: listen, map, structure, then make the work reusable.
          </p>
        </div>
        <div className="space-y-5">
          {portfolioData.thinking.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#fffaf0]/88 p-8 shadow-soft ring-1 ring-white/70"
            >
              <span className="absolute right-8 top-6 text-7xl font-semibold text-[#d9c8b3]/20">0{index + 1}</span>
              <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{item.copy}</p>
              <ThinkingSketch index={index} />
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
