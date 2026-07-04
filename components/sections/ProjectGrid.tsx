"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Bot, FileStack, Map, MessageSquareText, Network, Sheet, Timer, UsersRound, Zap, type LucideIcon } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

const projectIcons: Record<string, LucideIcon> = {
  CRM: Network,
  Documentation: FileStack,
  Operations: Map,
  Automation: Sheet,
  AI: Bot,
  Data: BarChart3
};

const visualLabel: Record<string, string> = {
  CRM: "pipeline",
  Documentation: "knowledge base",
  Operations: "workshop map",
  Automation: "automated sheet",
  AI: "summary flow",
  Data: "dashboard"
};

function ProjectVisual({ category, featured }: { category: string; featured: boolean }) {
  const Icon = projectIcons[category] ?? Network;

  return (
    <div className={`group/visual relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f8ead5,#dbe5ed)] p-4 ring-1 ring-white/70 ${featured ? "h-44" : "h-32"}`}>
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f0a45e]/25 blur-2xl" />
      <div className="absolute -bottom-10 left-10 h-28 w-32 rounded-full bg-[#253b56]/18 blur-2xl" />
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/58 px-2.5 py-1 text-[10px] font-medium text-[#253b56]/72 shadow-paper">
        <Icon className="h-3.5 w-3.5 text-[#a56d4a]" strokeWidth={1.7} />
        {visualLabel[category] ?? "project"}
      </div>

      {category === "CRM" ? (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-3 gap-2">
            {["Lead", "Follow-up", "Partner"].map((label, index) => (
              <div key={label} className="rounded-2xl bg-white/68 p-2 text-center text-[10px] text-[#253b56] shadow-paper">
                <UsersRound className="mx-auto mb-1 h-4 w-4 text-[#a56d4a]" strokeWidth={1.6} />
                {label}
                {index < 2 ? <span className="absolute mt-2 hidden h-px w-6 bg-[#253b56]/25 sm:inline-block" /> : null}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-3 h-px w-[78%] bg-gradient-to-r from-transparent via-[#253b56]/28 to-transparent" />
        </div>
      ) : null}

      {category === "Automation" ? (
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-paper">
          <div>
            <Timer className="h-5 w-5 text-[#a56d4a]" strokeWidth={1.6} />
            <p className="mt-2 text-[11px] font-semibold text-[#253b56]">20-25 min</p>
          </div>
          <Zap className="h-5 w-5 text-[#f0a45e]" strokeWidth={1.8} />
          <div>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className={`h-2 rounded-sm ${index % 3 === 0 ? "bg-[#f0a45e]/55" : "bg-[#253b56]/18"}`} />
              ))}
            </div>
            <p className="mt-2 text-[11px] font-semibold text-[#253b56]">under 5</p>
          </div>
        </div>
      ) : null}

      {category === "Documentation" ? (
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-center gap-3">
          <div className="relative h-20 w-28">
            <div className="absolute inset-0 rotate-[-6deg] rounded-xl bg-white/62 shadow-paper" />
            <div className="absolute left-3 top-2 h-full w-full rotate-[3deg] rounded-xl bg-[#fffaf0] p-3 shadow-paper">
              <div className="h-1.5 w-16 rounded-full bg-[#253b56]/25" />
              <div className="mt-3 h-1.5 w-20 rounded-full bg-[#7f654f]/20" />
              <div className="mt-2 h-1.5 w-12 rounded-full bg-[#f0a45e]/45" />
            </div>
          </div>
          <FileStack className="mb-3 h-7 w-7 text-[#a56d4a]" strokeWidth={1.5} />
        </div>
      ) : null}

      {category === "Operations" ? (
        <svg className="absolute bottom-4 left-4 h-28 w-48 max-w-[calc(100%-2rem)] text-[#253b56]/60" viewBox="0 0 190 112" fill="none" aria-hidden="true">
          <rect x="12" y="68" width="62" height="24" rx="12" fill="white" fillOpacity=".7" />
          <rect x="106" y="18" width="64" height="26" rx="13" fill="white" fillOpacity=".72" />
          <rect x="94" y="76" width="72" height="22" rx="11" fill="#fffaf0" fillOpacity=".86" />
          <path d="M70 80 C92 58 104 43 126 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 6" />
          <path d="M136 45 C133 62 128 72 124 78" stroke="#a56d4a" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 6" />
          <circle cx="42" cy="80" r="5" fill="#253b56" />
          <circle cx="136" cy="31" r="5" fill="#f0a45e" />
          <circle cx="124" cy="87" r="5" fill="#7f654f" />
          <text x="24" y="84" fill="#253b56" fontSize="8">needs</text>
          <text x="118" y="34" fill="#253b56" fontSize="8">workshop</text>
          <text x="107" y="90" fill="#253b56" fontSize="8">offer</text>
        </svg>
      ) : null}

      {category === "AI" ? (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="flex w-36 items-center gap-2 rounded-2xl bg-white/75 px-3 py-2 text-[10px] text-[#253b56] shadow-paper">
            <MessageSquareText className="h-4 w-4 text-[#a56d4a]" strokeWidth={1.6} />
            raw notes
          </div>
          <div className="ml-auto flex w-36 items-center gap-2 rounded-2xl bg-[#243850] px-3 py-2 text-[10px] text-white shadow-paper">
            <Bot className="h-4 w-4 text-[#f0c987]" strokeWidth={1.6} />
            summary
          </div>
          <div className="w-32 rounded-2xl bg-[#fffaf0]/85 px-3 py-2 text-[10px] text-[#7f654f] shadow-paper">next action</div>
        </div>
      ) : null}

      {category === "Data" ? (
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/70 p-3 shadow-paper">
          <div className="flex h-16 items-end gap-2">
            {[35, 54, 42, 68, 58].map((height, index) => (
              <span key={height} className={`w-5 rounded-t-md ${index === 3 ? "bg-[#f0a45e]/70" : "bg-[#253b56]/22"}`} style={{ height }} />
            ))}
          </div>
          <div className="mt-2 h-px bg-[#253b56]/18" />
        </div>
      ) : null}

      <div className="absolute left-4 top-4 h-10 w-16 rounded-full border border-[#253b56]/12 bg-white/30" />
    </div>
  );
}

export function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const filters = useMemo(() => ["All", ...Array.from(new Set(portfolioData.projects.map((project) => project.category)))], []);
  const projects = filter === "All" ? portfolioData.projects : portfolioData.projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="bg-transparent pt-12 pb-14 md:pt-16 md:pb-16">
      <div className="section-shell">
      <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Selected Work · visual artifacts</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">Work that made teams clearer.</h2>
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
      <div className="mt-12 grid gap-6 md:grid-cols-6">
        {projects.map((project, index) => {
          const expanded = open === project.title;
          return (
            <motion.article
              key={project.title}
              layout
              initial={false}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={`hover-lift rounded-[2rem] bg-[#fffaf0]/92 p-6 shadow-[0_24px_80px_rgba(45,38,31,.11)] ring-1 ring-white/75 ${index < 2 ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <ProjectVisual category={project.category} featured={index < 2} />
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">{project.category}</p>
              <h3 className="mt-3 font-display text-[1.65rem] font-semibold leading-tight">{project.title}</h3>
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
      <p className="mt-10 text-sm text-muted-foreground">Other projects: {portfolioData.otherProjects.join(" · ")}</p>
      </div>
    </section>
  );
}

