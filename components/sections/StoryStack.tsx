"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export function StoryStack() {
  return (
    <section id="thinking" className="section-shell py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
        <div className="md:sticky md:top-24 md:h-fit">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">How I Think</p>
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
