"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

export function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const filters = useMemo(() => ["All", ...Array.from(new Set(portfolioData.projects.map((project) => project.category)))], []);
  const projects = filter === "All" ? portfolioData.projects : portfolioData.projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="section-shell py-24 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Selected Work</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Work that made teams clearer.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm transition ${filter === item ? "bg-primary text-primary-foreground" : "bg-white/70 text-muted-foreground ring-1 ring-border hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-6">
        {projects.map((project, index) => {
          const expanded = open === project.title;
          return (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={`rounded-[2rem] bg-[#fffaf0]/90 p-6 shadow-soft ring-1 ring-white/70 ${index < 2 ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{project.category}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{project.summary}</p>
              <button
                type="button"
                onClick={() => {
                  const next = expanded ? null : project.title;
                  setOpen(next);
                  if (next) trackEvent("project_note_open", project.title);
                }}
                className="mt-6 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                {expanded ? "Close note" : "Open note"}
              </button>
              {expanded ? (
                <motion.div layout className="mt-6 space-y-4 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
                  <p><strong className="text-foreground">Context:</strong> {project.context}</p>
                  <p><strong className="text-foreground">Problem:</strong> {project.problem}</p>
                  <p><strong className="text-foreground">What I did:</strong> {project.did}</p>
                  <p><strong className="text-foreground">Tools:</strong> {project.tools.join(", ")}</p>
                  <p><strong className="text-foreground">Outcome:</strong> {project.outcome}</p>
                  <p><strong className="text-foreground">What I learned:</strong> {project.learned}</p>
                </motion.div>
              ) : null}
            </motion.article>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">Other projects: {portfolioData.otherProjects.join(" · ")}</p>
    </section>
  );
}
