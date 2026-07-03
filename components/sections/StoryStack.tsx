"use client";

import { motion } from "framer-motion";
import { GitBranch, Handshake, Layers3, RefreshCcw } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const thinkingIcons = [GitBranch, Handshake, Layers3, RefreshCcw];
const thinkingCues = [
  ["Need", "Constraint", "Shared View"],
  ["Business", "Product", "Data"],
  ["Dashboard", "CRM", "Documentation"],
  ["Less Repeat", "Reuse", "Handoff"]
];

function ThinkingSketch({ index }: { index: number }) {
  const Icon = thinkingIcons[index] ?? GitBranch;
  const cues = thinkingCues[index] ?? thinkingCues[0];

  return (
    <div className="relative mt-5 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f4e0c4,#e7edf0)] p-4 ring-1 ring-white/70">
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f0a45e]/16 blur-2xl" />
      <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-2xl bg-white/72 shadow-paper">
        <Icon className="h-[1.125rem] w-[1.125rem] text-[#253b56]" />
      </div>
      <div className="ml-14 flex min-h-12 flex-wrap items-center gap-2">
        {cues.map((cue, cueIndex) => (
          <span key={cue} className="rounded-full bg-white/70 px-2.5 py-1 text-[11.5px] text-[#253b56] shadow-paper">
            {cue}
            {cueIndex < cues.length - 1 ? <span className="ml-2 text-[#a56d4a]/65">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StoryStack() {
  return (
    <section id="thinking" className="bg-[linear-gradient(180deg,#f7efe2_0%,#f3e7d6_100%)] py-[4.5rem] md:py-24">
      <div className="section-shell grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
        <div className="md:sticky md:top-24 md:h-fit">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">How I Think · observatory notes</p>
          <h2 className="mt-4 max-w-sm font-display text-4xl font-semibold tracking-tight md:text-[2.85rem]">
            How Shana creates clarity.
          </h2>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
            A quiet operating rhythm: listen, map, structure, then make the work reusable.
          </p>
        </div>
        <div className="space-y-4">
          {portfolioData.thinking.map((item, index) => (
            <motion.article
              key={item.title}
              initial={false}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#fffaf0]/90 p-6 shadow-[0_24px_80px_rgba(45,38,31,.10)] ring-1 ring-white/75"
            >
              <span className="absolute right-7 top-5 text-6xl font-semibold text-[#d9c8b3]/18">0{index + 1}</span>
              <h3 className="font-display text-[1.65rem] font-semibold">{item.title}</h3>
              <p className="mt-3 max-w-2xl text-[15.5px] leading-7 text-muted-foreground">{item.copy}</p>
              <ThinkingSketch index={index} />
              <div className="mt-4 flex flex-wrap gap-2">
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



