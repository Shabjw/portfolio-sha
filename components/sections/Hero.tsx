"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  FileText,
  Lightbulb,
  ListChecks,
  Mail,
  PenTool,
  Search,
  Settings2,
  Target,
  Users,
  Waves
} from "lucide-react";
import coffeeImage from "@/image/coffee.png";
import dinoImage from "@/image/dino.png";
import worldmapImage from "@/image/worldmap.png";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

const workingStyles = [
  { label: "Calm", icon: Waves, story: "I like reducing pressure before increasing speed." },
  { label: "Curious", icon: Search, story: "I ask lots of questions because I hate decisions made with fuzzy information." },
  { label: "Structured", icon: ListChecks, story: "I turn scattered ideas into something people can use again." },
  { label: "Visual", icon: PenTool, story: "I think faster when I can draw the system." }
];

const peopleNotes = [
  "She always asks the question nobody asked.",
  "Five minutes with her usually saves us an hour.",
  "She connects people before connecting tools.",
  "She makes complexity feel lighter.",
  "She sees patterns earlier than most people."
];

const curiosityItems = [
  { group: "Where I think best", items: ["Coffee shops", "Golden hour", "Quiet places", "Airports", "Libraries"], detail: "Atmosphere helps me slow down enough to notice what matters." },
  { group: "What keeps me curious", items: ["AI", "Cities", "Psychology", "Space", "Human behaviour"], detail: "I like systems that reveal how people move, decide and adapt." },
  { group: "How I recharge", items: ["Badminton", "Photography", "Travel", "Sunsets"], detail: "Movement, light and distance usually reset the way I see a problem." }
];

const postItNotes = [
  "Does this actually make sense?",
  "There has to be a simpler way.",
  "What are we missing?"
];

const proofCards = [
  {
    title: "CRM & Workflow Optimization",
    challenge: "Scattered follow-up made partner conversations hard to track.",
    thinking: "What does the team need to see before the next action is obvious?",
    action: "Reshaped CRM stages, segments and follow-up logic.",
    outcome: "Teams could see who needed attention and why.",
    tools: "Sellsy · segmentation · campaigns",
    visualBefore: "scattered",
    visualAfter: "visible"
  },
  {
    title: "Process Automation",
    challenge: "A repeated Excel task was stealing attention from better work.",
    thinking: "Why is this harder than it should be?",
    action: "Built a small VBA automation with cleaning and checks.",
    outcome: "20-25 minutes became under 5.",
    tools: "Excel · VBA · data cleaning",
    visualBefore: "20-25 min",
    visualAfter: "under 5"
  },
  {
    title: "Local Authorities Offer",
    challenge: "Similar public-sector needs were being solved one by one.",
    thinking: "What are these partners asking for underneath the surface?",
    action: "Used workshops, feedback loops and dashboards to shape a clearer offer.",
    outcome: "A shared offer became easier to explain and improve.",
    tools: "feedback loops · dashboards",
    visualBefore: "specific needs",
    visualAfter: "shared offer"
  }
];

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,176,92,.72),transparent_26rem),radial-gradient(circle_at_76%_10%,rgba(193,139,185,.38),transparent_31rem),radial-gradient(circle_at_54%_58%,rgba(108,146,182,.48),transparent_40rem),linear-gradient(138deg,#d98c50_0%,#9f6f82_28%,#6387a6_58%,#233f5b_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,235,207,.22),transparent_42%,rgba(23,43,64,.36))]" />
      <div className="absolute inset-0 opacity-[.16] paper-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0,transparent_48%,rgba(28,31,48,.23)_100%)]" />
      <div className="ambient-orb left-[7%] top-[13%] h-80 w-80 bg-[#ffd08a]/30" />
      <div className="ambient-orb right-[10%] top-[10%] h-96 w-96 bg-[#c7b7e7]/20" />
      <div className="absolute left-[8%] top-[21%] h-1 w-1 rounded-full bg-white/60 shadow-[130px_34px_0_rgba(255,255,255,.22),430px_-12px_0_rgba(255,255,255,.22),750px_60px_0_rgba(255,255,255,.18),1020px_10px_0_rgba(255,255,255,.24)]" />
      <svg className="absolute right-[5%] top-[8%] h-[38%] w-[44%] opacity-[.12]" viewBox="0 0 620 360" fill="none">
        <path d="M48 192 142 112l78 47 88-103 96 78 142-70M220 159l66 92 118-117 92 118" stroke="#fff5dd" strokeWidth="1" />
        {[ [48,192], [142,112], [220,159], [308,56], [404,134], [546,64], [286,251], [496,252] ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#fff5dd" />)}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#f7efe2]/55 to-[#f7efe2]" />
    </div>
  );
}

function Flag({ country }: { country: "fr" | "gb" | "es" | "it" | "in" }) {
  if (country === "fr" || country === "it") {
    const colors = country === "fr" ? ["#1f4b8f", "#fff", "#e43d46"] : ["#1f8b4c", "#fff", "#d33d45"];
    return (
      <svg viewBox="0 0 24 16" className="h-1.5 w-2.5 overflow-hidden rounded-[2px] shadow-sm" aria-hidden="true">
        <path fill={colors[0]} d="M0 0h8v16H0z" /><path fill={colors[1]} d="M8 0h8v16H8z" /><path fill={colors[2]} d="M16 0h8v16h-8z" />
      </svg>
    );
  }
  if (country === "es") {
    return <svg viewBox="0 0 24 16" className="h-1.5 w-2.5 overflow-hidden rounded-[2px] shadow-sm" aria-hidden="true"><path fill="#aa1f2e" d="M0 0h24v16H0z" /><path fill="#f3c842" d="M0 4h24v8H0z" /></svg>;
  }
  if (country === "in") {
    return <svg viewBox="0 0 24 16" className="h-1.5 w-2.5 overflow-hidden rounded-[2px] shadow-sm" aria-hidden="true"><path fill="#ef8b3a" d="M0 0h24v5.34H0z" /><path fill="#fff" d="M0 5.33h24v5.34H0z" /><path fill="#2d8a4e" d="M0 10.66h24V16H0z" /><circle cx="12" cy="8" r="1.5" fill="none" stroke="#34558b" strokeWidth=".7" /></svg>;
  }
  return (
    <svg viewBox="0 0 24 16" className="h-1.5 w-2.5 overflow-hidden rounded-[2px] shadow-sm" aria-hidden="true">
      <path fill="#24457d" d="M0 0h24v16H0z" /><path stroke="#fff" strokeWidth="4" d="M0 0l24 16M24 0 0 16" /><path stroke="#c83d4d" strokeWidth="2" d="M0 0l24 16M24 0 0 16" /><path stroke="#fff" strokeWidth="6" d="M12 0v16M0 8h24" /><path stroke="#c83d4d" strokeWidth="3" d="M12 0v16M0 8h24" />
    </svg>
  );
}

function WorkingStylePanel() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveQuote((current) => (current + 1) % peopleNotes.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="relative p-2.5 text-[#243850] md:border-l md:border-[#243850]/10 md:px-3 md:py-2.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6f5d50]">Working style</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {workingStyles.map(({ label, icon: Icon, story }) => (
          <div key={label} className="group relative flex items-center gap-2 border-b border-[#243850]/8 px-1 py-1 transition duration-300 hover:translate-x-1">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f4dfc8] text-[#a96645] shadow-[inset_0_0_0_1px_rgba(169,102,69,.08)] transition group-hover:bg-[#243850] group-hover:text-white">
              <Icon className="h-[15px] w-[15px]" strokeWidth={1.7} />
            </span>
            <span className="text-[12px] font-medium">{label}</span>
            <span className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-52 translate-y-1 rounded-xl bg-[#243850] p-3 text-[12px] leading-4 text-white opacity-0 shadow-paper transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {story}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 border-t border-[#243850]/10 pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f5d50]">Things people often say</p>
        <div className="relative mt-1.5 h-[5.6rem] overflow-hidden rounded-xl bg-white/45 shadow-[inset_0_0_0_1px_rgba(36,56,80,.06)]">
          <p key={peopleNotes[activeQuote]} className="quote-fade absolute inset-0 grid place-items-center px-4 text-center text-[13px] font-semibold leading-5 text-[#4e5966]">
            {peopleNotes[activeQuote]}
          </p>
        </div>
      </div>
    </aside>
  );
}

function ThinkingDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const nodes = [
    { id: "trying", label: "What are people actually trying to do?", insight: "I rarely start with solutions. I first try to understand why people struggle.", icon: Users, className: "left-[0%] top-0 bg-[#f8e6c9]" },
    { id: "problem", label: "What problem are we really solving?", insight: "The first request is often only the visible part of the problem.", icon: Search, className: "left-[34%] top-0 bg-[#e5edf1]" },
    { id: "hard", label: "Why is this harder than it should be?", insight: "Good systems disappear. People notice bad ones.", icon: Settings2, className: "right-[0%] top-0 bg-[#f7d9cf]" },
    { id: "understanding", label: "Understanding", insight: "This is where vague information starts becoming shared meaning.", icon: Lightbulb, className: "left-[8%] top-[3.1rem] bg-[#fff3d8] sm:left-[13%]" },
    { id: "clarity", label: "Clarity", insight: "If people need three meetings to understand something, the system is probably the problem.", icon: PenTool, className: "left-[38%] top-[3.1rem] bg-[#dfe7d2]" },
    { id: "useful", label: "Useful workflows", insight: "Useful means someone knows what to do next without asking twice.", icon: ListChecks, className: "right-[4%] top-[3.1rem] bg-[#f7dfaa] sm:right-[8%]" },
    { id: "decisions", label: "Better decisions", insight: "Better decisions usually come from better understanding, not more information.", icon: Target, className: "left-[25%] bottom-0 bg-[#e8dfee]" },
    { id: "freedom", label: "More freedom", insight: "Clearer systems give teams more room to move, decide and build.", icon: Waves, className: "right-[24%] bottom-0 bg-[#e8e7d5]" }
  ];
  const paths: Record<string, string[]> = {
    trying: ["trying", "understanding", "clarity", "useful", "decisions", "freedom"],
    problem: ["problem", "understanding", "clarity", "useful", "decisions", "freedom"],
    hard: ["hard", "understanding", "clarity", "useful", "decisions", "freedom"],
    understanding: ["understanding", "clarity", "useful", "decisions", "freedom"],
    clarity: ["clarity", "useful", "decisions", "freedom"],
    useful: ["useful", "decisions", "freedom"],
    decisions: ["decisions", "freedom"],
    freedom: ["freedom"]
  };
  const activeInsight = nodes.find((node) => node.id === activeNode)?.insight;
  const activePath = activeNode ? paths[activeNode] : [];
  const edgeIsActive = (from: string, to: string) => Boolean(activeNode && activePath.includes(from) && activePath.includes(to));
  const edgeStyle = (from: string, to: string) => ({
    opacity: !activeNode ? 0.58 : edgeIsActive(from, to) ? 0.98 : 0.1,
    strokeWidth: edgeIsActive(from, to) ? 3 : 2
  });
  const edgeClass = (from: string, to: string) => `transition-all duration-300 ${edgeIsActive(from, to) ? "thinking-path-active" : ""}`;
  const nodeOpacity = (id: string) => !activeNode || activePath.includes(id) ? 1 : 0.25;
  const nodeClass = "absolute z-10 flex max-w-[13rem] items-center justify-center gap-1.5 rounded-full border border-[#263c54]/18 bg-[#fff8eb] px-2.5 py-1.5 text-center text-[11px] font-semibold leading-4 shadow-paper transition duration-300 hover:-translate-y-0.5 hover:border-[#b77954]/40 hover:shadow-[0_0_24px_rgba(183,121,84,.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[12px]";

  return (
    <div className="mx-auto w-full max-w-[45rem] text-[#263c54]">
      <div className="relative h-[8.45rem] w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 172" fill="none" aria-hidden="true">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10Z" fill="#735d50" fillOpacity=".58" />
          </marker>
        </defs>
        <path d="M120 31C150 62 170 64 214 78" stroke="#735d50" style={edgeStyle("trying", "understanding")} markerEnd="url(#arrow)" className={edgeClass("trying", "understanding")} />
        <path d="M360 31C330 59 300 64 258 78" stroke="#735d50" style={edgeStyle("problem", "understanding")} markerEnd="url(#arrow)" className={edgeClass("problem", "understanding")} />
        <path d="M604 31C540 59 502 65 460 78" stroke="#735d50" style={edgeStyle("hard", "useful")} markerEnd="url(#arrow)" className={edgeClass("hard", "useful")} />
        <path d="M240 96C284 105 314 106 354 96" stroke="#735d50" style={edgeStyle("understanding", "clarity")} markerEnd="url(#arrow)" className={edgeClass("understanding", "clarity")} />
        <path d="M430 96C460 105 490 104 526 96" stroke="#735d50" style={edgeStyle("clarity", "useful")} markerEnd="url(#arrow)" className={edgeClass("clarity", "useful")} />
        <path d="M548 108C508 134 442 139 360 139" stroke="#735d50" style={edgeStyle("useful", "decisions")} markerEnd="url(#arrow)" className={edgeClass("useful", "decisions")} />
        <path d="M334 151C382 166 424 166 474 151" stroke="#735d50" style={edgeStyle("decisions", "freedom")} markerEnd="url(#arrow)" className={edgeClass("decisions", "freedom")} />
      </svg>
      <span className="absolute left-[7%] top-[3.85rem] -rotate-6 font-serif text-[10px] italic text-[#9a684a]/65">find the thread</span>
      <span className="absolute right-[7%] top-[3.85rem] rotate-3 font-serif text-[10px] italic text-[#9a684a]/65">less noise</span>
      <span className="absolute bottom-[1.5rem] left-[9%] font-serif text-[10px] italic text-[#9a684a]/65">make it useful</span>

      {nodes.map(({ id, label, icon: Icon, className }) => (
        <button key={id} type="button" onMouseEnter={() => setActiveNode(id)} onMouseLeave={() => setActiveNode(null)} onFocus={() => setActiveNode(id)} onBlur={() => setActiveNode(null)} onClick={() => setActiveNode(activeNode === id ? null : id)} style={{ opacity: nodeOpacity(id) }} className={`${nodeClass} ${className}`}>
          <Icon className="h-4 w-4 text-[#a36d4e]" />{label}
        </button>
      ))}
      </div>
      <div className="relative z-20 mx-auto mt-1 min-h-[2.5rem] w-[94%] border-l-2 border-[#b77954]/45 px-4 py-1 text-[15px] italic leading-5 text-[#4e5966] transition">
        {activeInsight ?? "Hover a word to see how the thought moves."}
      </div>
    </div>
  );
}

function CuriosityBlock() {
  const [active, setActive] = useState(0);
  const activeThread = curiosityItems[active].detail;

  return (
    <footer className="rounded-xl bg-[#243850]/[.055] px-4 py-2.5">
      <div className="grid gap-2 md:grid-cols-[auto_1fr] md:items-start">
        <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#6f5d50]">Current threads</p>
        <div className="grid gap-1.5 md:grid-cols-3">
          {curiosityItems.map((group, index) => (
            <button key={group.group} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={`rounded-xl px-3 py-2 text-left transition ${active === index ? "bg-white/70 text-[#243850] shadow-paper" : "bg-white/35 text-[#4e5966] hover:bg-white/55"}`}>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a684a]">{group.group}</span>
              <span className="mt-1 block text-[11px] leading-4">{group.items.join(" · ")}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-2 min-h-4 max-w-[42rem] rounded-full bg-white/45 px-3 py-1 text-center text-xs leading-4 text-[#4e5966]">{activeThread}</p>
    </footer>
  );
}

function VisualThinkingBoard() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[#e9e0d4] text-[#223750]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(255,190,112,.28),transparent_16rem),radial-gradient(circle_at_88%_30%,rgba(118,145,180,.22),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-30 paper-grid" />
      <div className="absolute inset-0 bg-[linear-gradient(116deg,transparent_5%,rgba(255,255,255,.42)_28%,transparent_42%)] opacity-55" />

      <div className="relative grid h-full content-between grid-rows-[auto_auto_auto_auto] gap-1.5 p-3 md:gap-1 md:p-3.5">
        <header className="border-b border-[#243850]/10 pb-1.5">
          <div className="max-w-[72%]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#b56f48] shadow-[0_0_12px_rgba(181,111,72,.5)]" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">Shana Bhojwani OS</p>
            </div>
            <p className="mt-1 text-xl font-semibold md:text-[23px]">Business Analyst · Product &amp; Operations</p>
            <p className="mt-0.5 text-[13px] leading-5 text-[#5f6570] sm:text-[15px] md:whitespace-nowrap">I like turning messy information into clear systems people can actually use.</p>
          </div>
          <div className="mt-1.5 flex max-w-[72%] flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#4e5966]">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#243850] px-2.5 py-1 text-white">Paris-based</span>
              <span className="rounded-full bg-white/70 px-2.5 py-1">Open internationally</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="flex items-center gap-1"><Flag country="fr" />French · Native</span>
              <span className="flex items-center gap-1"><Flag country="gb" />English · C2</span>
              <span className="flex items-center gap-1"><Flag country="es" />Spanish · C1</span>
              <span className="flex items-center gap-1"><Flag country="it" />Italian · A2</span>
              <span className="flex items-center gap-1"><Flag country="in" />Hindi · A2</span>
            </div>
          </div>
        </header>

        <div className="grid gap-2.5 md:grid-cols-[1.52fr_.48fr] md:gap-3">
          <section className="relative overflow-hidden rounded-2xl bg-[#fff8eb]/82 p-2 shadow-paper ring-1 ring-white/60">
            <div className="flex items-center justify-between px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f5d50]">How I think</p>
            </div>
            <ThinkingDiagram />
            <div className="mx-auto mt-0.5 max-w-[45rem] border-t border-[#243850]/10 px-3 pt-1.5 text-[14px] font-medium leading-5 text-[#243850]">
              Finding the thread between people, systems and decisions.
            </div>
          </section>
          <WorkingStylePanel />
        </div>

        <section>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f5d50]">Selected work</p>
            <a href="#work" className="text-[11px] font-medium text-[#b56f48] hover:underline">See selected work</a>
          </div>
          <div className="grid gap-2.5 md:grid-cols-3">
            {proofCards.map((card, index) => (
              <button key={card.title} type="button" className="group relative z-10 min-h-[5.9rem] overflow-hidden rounded-xl bg-[#fff8eb]/90 p-3 text-left shadow-paper ring-1 ring-white/70 transition duration-300 hover:z-30 hover:-translate-y-1 hover:scale-[1.018] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45">
                <div className="transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#243850] text-[9px] text-white">0{index + 1}</span>
                  <p className="text-sm font-semibold">{card.title}</p>
                </div>
                {index === 0 && (
                  <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
                    <div className="rounded-lg bg-[#f1ddd4] px-2 py-1.5"><span className="text-[8px] uppercase tracking-[.12em] text-[#95634c]">Before</span><p className="mt-0.5 text-[11px] font-medium">{card.visualBefore}</p></div>
                    <ArrowRight className="h-4 w-4 text-[#b77954]" />
                    <div className="rounded-lg bg-[#dfe7d2] px-2 py-1.5"><span className="text-[8px] uppercase tracking-[.12em] text-[#60714f]">After</span><p className="mt-0.5 text-[11px] font-medium">{card.visualAfter}</p></div>
                  </div>
                )}
                {index === 1 && (
                  <div className="mt-2 flex items-center justify-center gap-4 text-center">
                    <p><strong className="block text-[22px] leading-6 text-[#9a684a]">{card.visualBefore}</strong><span className="text-[10px] text-[#6f5d50]">before</span></p>
                    <ArrowRight className="h-5 w-5 text-[#b77954]" />
                    <p><strong className="block text-[25px] leading-6 text-[#243850]">{card.visualAfter}</strong><span className="text-[10px] text-[#6f5d50]">after</span></p>
                  </div>
                )}
                {index === 2 && (
                  <div className="relative mx-auto mt-2 h-10 max-w-[15rem]">
                    <div className="absolute left-0 top-0 rounded-full bg-[#f3d9cd] px-2.5 py-1 text-[9px]">{card.visualBefore}</div>
                    <div className="absolute right-0 top-0 rounded-full bg-[#dce7ec] px-2.5 py-1 text-[9px]">workshops</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[#e0e5c8] px-2.5 py-1 text-[9px] font-semibold">{card.visualAfter}</div>
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 56" aria-hidden="true"><path d="M54 20 112 42M186 20l-58 22" stroke="#8d725e" strokeWidth="1.5" strokeDasharray="4 4" /></svg>
                  </div>
                )}
                  <p className="mt-2 text-xs font-medium text-[#4e5966]">{card.outcome}</p>
                </div>
                <div className="absolute inset-0 translate-y-3 bg-[#243850] p-3.5 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="space-y-1.5 text-[13px] leading-5">
                    <p><span className="font-semibold text-[#f5c98d]">Challenge:</span> {card.challenge}</p>
                    <p><span className="font-semibold text-[#f5c98d]">Thinking:</span> {card.thinking}</p>
                    <p><span className="font-semibold text-[#f5c98d]">Action:</span> {card.action}</p>
                    <p><span className="font-semibold text-[#f5c98d]">Outcome:</span> {card.outcome}</p>
                    <p className="pt-0.5 font-medium text-[#f5c98d]">{card.tools}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <CuriosityBlock />
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative z-30 mx-auto min-w-0 w-[calc(100vw-32px)] max-w-[1320px] sm:w-full">
      <div className="breathe-glow absolute inset-x-[12%] -bottom-6 h-24 rounded-full bg-[#ffc27b]/28 blur-3xl" />
      <div className="relative h-[min(730px,calc(100svh-150px))] rounded-[2.25rem] bg-[#142338] p-3 shadow-[0_60px_150px_rgba(27,34,51,.44)] ring-1 ring-white/28 md:h-[min(728px,calc(100svh-154px))] md:p-3.5">
        <VisualThinkingBoard />
        <div className="pointer-events-none absolute inset-x-8 top-3 h-20 rounded-full bg-white/8 blur-2xl" />
        <div className="absolute left-1/2 top-1.5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/35" />
      </div>
      <div className="relative mx-auto h-7 w-[92%] rounded-b-[2.5rem] bg-[linear-gradient(180deg,#1a2738,#111b29)] shadow-[0_22px_45px_rgba(26,29,40,.32)]">
        <div className="absolute left-1/2 top-0 h-2 w-36 -translate-x-1/2 rounded-b-xl bg-white/10" />
      </div>
    </div>
  );
}

function WorkspaceObjects({ parallax }: { parallax: { x: number; y: number } }) {
  const [postItText, setPostItText] = useState(postItNotes[0]);

  useEffect(() => {
    setPostItText(postItNotes[Math.floor(Math.random() * postItNotes.length)]);
  }, []);

  return (
    <>
      <div className="absolute -left-[7%] bottom-[1%] z-40 hidden w-[10.75rem] lg:block xl:-left-[6%]" style={{ transform: `translate3d(${parallax.x * -0.7}px, ${parallax.y * -0.5}px, 0)` }}>
        <div className="coffee-object group relative transition-transform duration-500 hover:scale-[1.03]">
          <Image src={coffeeImage} alt="Hand-drawn cup of coffee" className="h-auto w-full drop-shadow-[0_22px_30px_rgba(47,31,25,.28)]" priority />
          <span className="steam absolute left-[47%] top-[1%] h-16 w-6 rounded-full border-l border-[#fff3dc]/55 [animation-delay:.5s]" />
          <span className="steam absolute left-[57%] top-[-3%] h-20 w-8 rounded-full border-l border-[#fff3dc]/40 [animation-delay:1.4s]" />
          <div className="pointer-events-none absolute left-[62%] top-[96%] w-52 translate-x-2 translate-y-2 rounded-xl bg-[#fff4df]/95 p-3 text-[11px] leading-4 text-[#5f493b] opacity-0 shadow-paper transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
            I don&apos;t drink coffee for caffeine. I drink it because good places help me think.
          </div>
        </div>
      </div>

      <div className="group absolute -right-[1%] bottom-[36%] z-40 hidden w-[7.8rem] lg:block xl:-right-[0.5%]" style={{ transform: `translate3d(${parallax.x * 0.65}px, ${parallax.y * 0.45}px, 0) rotate(4deg)`, perspective: "800px" }}>
        <div className="relative aspect-[354/376] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image src={dinoImage} alt="Instax-style sunset memory with a small dinosaur playing badminton" className="h-auto w-full drop-shadow-[0_26px_35px_rgba(37,29,28,.3)]" priority />
          </div>
          <div className="absolute inset-x-5 inset-y-7 grid place-items-center rounded-sm bg-[#fff1d3] p-2.5 text-center text-[14px] leading-5 text-[#5f493b] shadow-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p>I like collecting moments that remind me how a place felt.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[1%] top-[10%] z-40 hidden w-[10.25rem] opacity-95 lg:block xl:right-[1.5%] xl:w-[11rem]" style={{ transform: `translate3d(${parallax.x * 0.28}px, ${parallax.y * 0.22}px, 0) rotate(1deg)` }}>
        <div className="travel-note group relative transition-transform duration-700 hover:rotate-[-2deg] hover:scale-[1.02]">
          <span className="absolute left-[55%] top-2 z-10 h-4 w-16 -translate-x-1/2 rotate-[3deg] bg-[#f6d6a5]/82 shadow-paper" />
          <div className="relative rounded-sm drop-shadow-[0_20px_34px_rgba(37,29,28,.2)]">
            <Image src={worldmapImage} alt="Travel sketch connecting Paris, Tenerife and Seoul" className="h-auto w-full" priority />
          </div>
          <div className="pointer-events-none absolute -bottom-20 right-0 w-52 translate-y-2 rounded-xl bg-[#fff4df]/95 p-3 text-[11px] leading-4 text-[#5f493b] opacity-0 shadow-paper transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            I&apos;m not chasing destinations. I&apos;m looking for places that feel like home.
          </div>
        </div>
      </div>

      <div className="absolute -left-[1.5%] top-[25.5%] z-40 hidden aspect-square w-[6.4rem] -rotate-[3deg] place-items-center rounded-sm bg-[#ffe6a9] p-3 text-center text-[#4c382d] shadow-[0_22px_46px_rgba(50,35,29,.22)] ring-1 ring-white/55 lg:grid xl:-left-[1%]">
        <span className="absolute -top-3 right-6 h-6 w-16 rotate-[7deg] bg-[#f6d6a5]/78 shadow-paper" />
        <div>
          <p className="font-serif text-[15px] italic leading-5">{postItText}</p>
        </div>
      </div>

      <div className="group absolute -bottom-[2%] left-[18%] z-20 hidden w-40 rotate-[-5deg] rounded-sm bg-[#f8edda] p-4 text-[#5f493b] shadow-paper ring-1 ring-white/55 transition duration-500 hover:-translate-y-12 hover:rotate-[-2deg] lg:block">
        <div className="absolute inset-y-0 left-4 w-px bg-[#c98d72]/28" />
        <p className="pl-4 text-[9px] uppercase tracking-[0.18em] text-[#916c51]">Current ideas</p>
        <div className="mt-3 space-y-2 pl-4 text-[10px] leading-4 opacity-55 transition group-hover:opacity-100">
          <p>AI workflows</p><p>Product operations</p><p>Better systems</p><p>Next project?</p>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-3 lg:hidden">
        <Image src={coffeeImage} alt="Coffee" className="h-auto w-20 drop-shadow-lg" />
        <Image src={worldmapImage} alt="Paris, Tenerife and Seoul travel sketch" className="h-auto w-28 drop-shadow-lg" />
        <Image src={dinoImage} alt="Sunset dinosaur memory" className="h-auto w-16 rotate-[4deg] drop-shadow-lg" />
      </div>
    </>
  );
}

export function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  function onMove(event: MouseEvent<HTMLElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setParallax({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 10
    });
  }

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#274866] pb-5 pt-2 text-white md:pb-6 md:pt-2" onMouseMove={onMove} onMouseLeave={() => setParallax({ x: 0, y: 0 })}>
      <HeroAtmosphere />

      <div className="cinematic-shell relative z-20">
        <div className="relative mx-auto max-w-[1500px]">
          <Laptop />
          <WorkspaceObjects parallax={parallax} />
        </div>

        <div className="mx-auto mt-2 flex max-w-[1120px] flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#fff0cc]/52">visual thinking · calm systems · useful outcomes</p>
          <div className="flex flex-wrap gap-2">
            <Button asChild><a href="#work">View work <ArrowRight className="h-4 w-4" /></a></Button>
            <Button asChild variant="secondary"><a href={portfolioData.person.cv} onClick={() => trackEvent("cv_download_click", "hero")}><FileText className="h-4 w-4" /> CV</a></Button>
            <Button asChild variant="ghost"><a className="text-[#fff9ed] hover:bg-white/10" href="#contact"><Mail className="h-4 w-4" /> Contact</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
