"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, FileStack, Map, Network, Sheet, type LucideIcon } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

const projectIcons: Record<string, LucideIcon> = {
  CRM: Network,
  Documentation: FileStack,
  Operations: Map,
  Automation: Sheet,
  AI: Bot
};

function ProjectVisual({ category, featured }: { category: string; featured: boolean }) {
  const Icon = projectIcons[category] ?? Network;

  return (
    <div className={`group/visual relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f7e6cc,#dbe5ed)] p-4 ring-1 ring-white/70 ${featured ? "h-44" : "h-32"}`}>
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f0a45e]/25 blur-2xl" />
      <div className="absolute -bottom-10 left-10 h-28 w-32 rounded-full bg-[#253b56]/18 blur-2xl" />
      <Icon className="absolute right-4 top-4 h-5 w-5 text-[#253b56]/62 transition-transform duration-500 group-hover/visual:scale-110" />

      {category === "CRM" ? (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          {["Prospect", "Follow-up", "Partner"].map((label, index) => (
            <div key={label} className="flex items-center gap-2 rounded-full bg-white/65 px-3 py-2 text-[10px] text-[#253b56] shadow-paper">
              <span className="h-2 w-2 rounded-full bg-[#f0a45e]" />
              <span>{label}</span>
              <span className="ml-auto h-px bg-[#253b56]/20" style={{ width: `${32 + index * 14}px` }} />
            </div>
          ))}
        </div>
      ) : null}

      {category === "Documentation" ? (
        <div className="absolute bottom-4 left-5 h-20 w-32">
          <div className="absolute inset-0 rotate-[-5deg] rounded-xl bg-white/70 shadow-paper" />
          <div className="absolute left-4 top-3 h-full w-full rotate-[4deg] rounded-xl bg-[#fffaf0] p-3 shadow-paper">
            <div className="h-1.5 w-16 rounded-full bg-[#253b56]/25" />
            <div className="mt-3 h-1.5 w-20 rounded-full bg-[#7f654f]/20" />
            <div className="mt-2 h-1.5 w-12 rounded-full bg-[#f0a45e]/45" />
          </div>
        </div>
      ) : null}

      {category === "Operations" ? (
        <svg className="absolute bottom-4 left-4 h-28 w-44 text-[#253b56]/55" viewBox="0 0 180 110" fill="none" aria-hidden="true">
          <path d="M18 78C45 24 83 95 112 42C129 12 150 32 164 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 5" />
          <circle cx="18" cy="78" r="5" fill="#253b56" />
          <circle cx="112" cy="42" r="5" fill="#f0a45e" />
          <circle cx="164" cy="20" r="5" fill="#7f654f" />
          <rect x="30" y="70" width="52" height="18" rx="9" fill="white" fillOpacity=".65" />
          <text x="40" y="82" fill="#253b56" fontSize="8">partners</text>
        </svg>
      ) : null}

      {category === "Automation" ? (
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/70 p-3 shadow-paper">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 15 }).map((_, index) => (
              <span key={index} className={`h-3 rounded-sm ${index % 4 === 0 ? "bg-[#f0a45e]/55" : "bg-[#253b56]/16"}`} />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-[#253b56]/72">
            <span>20 min</span><span className="h-px flex-1 bg-[#253b56]/25" /><span>under 5</span>
          </div>
        </div>
      ) : null}

      {category === "AI" ? (
        <div className="absolute bottom-4 left-4 right-5 space-y-2">
          <div className="w-32 rounded-2xl bg-white/75 px-3 py-2 text-[10px] text-[#253b56] shadow-paper">summarize notes</div>
          <div className="ml-auto w-36 rounded-2xl bg-[#253b56] px-3 py-2 text-[10px] text-white shadow-paper">extract useful signals</div>
          <div className="w-28 rounded-2xl bg-[#fffaf0]/80 px-3 py-2 text-[10px] text-[#7f654f] shadow-paper">workflow ready</div>
        </div>
      ) : null}

      <div className="absolute left-4 top-4 flex items-end gap-2">
        <div className="h-10 w-6 rounded-full bg-[#253b56]/80" />
        <div className="h-6 w-6 rounded-full bg-[#f0a45e]/75" />
        <div className="h-14 w-2 rounded-full bg-[#7f654f]/45" />
      </div>
    </div>
  );
}

export function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const filters = useMemo(() => ["All", ...Array.from(new Set(portfolioData.projects.map((project) => project.category)))], []);
  const projects = filter === "All" ? portfolioData.projects : portfolioData.projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="section-shell py-24 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Selected Work · visual artifacts</p>
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
              className={`hover-lift rounded-[2rem] bg-[#fffaf0]/90 p-5 shadow-soft ring-1 ring-white/70 ${index < 2 ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <ProjectVisual category={project.category} featured={index < 2} />
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">{project.category}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{project.title}</h3>
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
