"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, Brain, Clock3, FileText, Lightbulb, Mail, Map, MousePointer2, Network, Search, Sparkles, Zap } from "lucide-react";
import coffeeImage from "@/image/coffee.png";
import dinoImage from "@/image/dino.png";
import worldmapImage from "@/image/worldmap.png";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

const postItNotes = [
  "There has to be a simpler way."
];

const thinkingNodes = [
  {
    id: "people",
    label: "What are people trying to do?",
    story: "Before thinking about a solution, I try to understand what people are really trying to achieve.",
    icon: Search,
    className: "left-[5%] top-[9%] w-[14rem]"
  },
  {
    id: "friction",
    label: "What is making it harder?",
    story: "I look for friction: unclear ownership, scattered information, repeated questions, or tools that do not match how people work.",
    icon: Zap,
    className: "left-[23%] top-[47%] w-[13.5rem]"
  },
  {
    id: "missing",
    label: "What is missing?",
    story: "Sometimes the real problem is not the process. It is that people do not share the same context.",
    icon: Brain,
    className: "left-[43%] top-[9%] w-[11.5rem]"
  },
  {
    id: "clearer",
    label: "What would make this clearer?",
    story: "I like turning messy inputs into something people can read, follow and act on.",
    icon: Lightbulb,
    className: "right-[4%] top-[47%] w-[14rem]"
  },
  {
    id: "decide",
    label: "Now we can decide.",
    story: "The goal is not more dashboards or documentation. The goal is better decisions.",
    icon: Sparkles,
    className: "left-[calc(43%+10px)] bottom-[1%] w-[12rem]"
  }
];

const pathOrder = ["people", "friction", "missing", "clearer", "decide"];

const memoryCards = [
  {
    title: "CRM & Workflow Optimization",
    visible: "Follow-up was scattered.",
    line: "Follow-up scattered → follow-up visible",
    result: "Clearer follow-up visibility.",
    icon: Network,
    href: "#work",
    details: [
      ["Situation", "Follow-up information was scattered across conversations and tools."],
      ["What I noticed", "People were not forgetting tasks. They could not easily see what needed attention."],
      ["What I changed", "I helped structure CRM pipelines, segmentation and follow-up logic."],
      ["Outcome", "The next action became easier to spot, so team coordination felt calmer."]
    ]
  },
  {
    title: "Excel / VBA Automation",
    visible: "A repeated task kept stealing time.",
    line: "20-25 min → under 5 min",
    result: "Faster, cleaner preparation.",
    icon: Clock3,
    href: "#work",
    details: [
      ["Situation", "A manual preparation process was repetitive and error-prone."],
      ["What I noticed", "The same steps were being repeated every time."],
      ["What I changed", "I built a VBA automation to clean, check and prepare the file."],
      ["Outcome", "The process became faster, cleaner and easier to repeat."]
    ]
  },
  {
    title: "Local Authorities Offer",
    visible: "Partner needs repeated.",
    line: "Different requests → one clearer offer",
    result: "Easier to explain and reuse.",
    icon: Map,
    href: "#work",
    details: [
      ["Situation", "Local authority requests looked different at first, but many needs were recurring."],
      ["What I noticed", "The team needed a way to see patterns instead of treating every request separately."],
      ["What I changed", "I worked with workshops, feedback loops and dashboards to structure the offer."],
      ["Outcome", "The offer became easier to explain, reuse and improve."]
    ]
  }
];

const curiosityTopics = [
  {
    title: "AI automation & Codex projects",
    shortTitle: "AI & Codex",
    cleanNote: "Recently I've been building small tools to automate everyday problems. Mostly because I enjoy making life slightly easier. The fun part is not replacing people - it is removing repetitive work.",
    note: "Recently I've been building small tools to automate everyday problems. Mostly because I enjoy making life slightly easier. The fun part is not replacing people - it is removing repetitive work."
  },
  {
    title: "Product thinking",
    shortTitle: "Product",
    note: "The more projects I work on, the more I notice products everywhere. I catch myself wondering why something feels intuitive, what makes a feature useful, or how an experience could be simpler."
  },
  {
    title: "Different cultures",
    shortTitle: "Cultures",
    cleanNote: "Travelling made me notice that people often solve the same problem in completely different ways. In Korea, you can press an elevator button again to cancel the wrong floor. Tiny detail, huge relief.",
    note: "Travelling made me notice that people often solve the same problem in completely different ways. In Korea, for example, you can press an elevator button again to cancel the wrong floor. Tiny detail, huge relief."
  },
  {
    title: "Investing",
    shortTitle: "Investing",
    note: "Recently I've been learning more about long-term investing and option strategies. What interests me is not quick wins, but how small decisions compound over time."
  },
  {
    title: "Better everyday systems",
    shortTitle: "Systems",
    cleanNote: "I like small systems that make daily life easier: a clearer routine, a useful dashboard, a smoother handoff, or a better way to track something.",
    note: "I like small systems that make daily life easier: a clearer routine, a useful dashboard, a better way to track something, a smoother handoff."
  },
  {
    title: "Badminton",
    shortTitle: "Badminton",
    note: "I play regularly because it is fun, social and strategic. You improve by adjusting, trying again, and reading the game better."
  }
];

const observations = [
  {
    label: "Observation 01",
    line: "The first request is rarely the whole story.",
    detail: "I usually try to understand what is behind the request before jumping into a solution.",
    icon: Search
  },
  {
    label: "Observation 02",
    line: "People need the right information at the right moment.",
    detail: "Often, they do not need more information. They need to know what should be visible, when, and for whom.",
    icon: Brain
  },
  {
    label: "Observation 03",
    line: "Good tools make the next step obvious.",
    detail: "I like when a system quietly reduces hesitation and helps people move forward.",
    icon: ArrowRight
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
      <svg className="absolute right-[14%] top-[18%] h-28 w-44 opacity-20" viewBox="0 0 180 110" fill="none">
        <path d="M18 72 L58 42 L96 58 L139 24 L162 70" stroke="#fff3dc" strokeWidth="1" />
        {[18, 58, 96, 139, 162].map((cx, index) => (
          <circle key={cx} cx={cx} cy={[72, 42, 58, 24, 70][index]} r="2.5" fill="#fff3dc" />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#f7efe2]/55 to-[#f7efe2]" />
    </div>
  );
}

function NotebookHeader() {
  return (
    <header className="grid gap-2 border-b border-[#283b53]/10 pb-2.5 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#9b6d4f]">Shana Bhojwani</p>
        <h1 className="mt-1 text-[clamp(1.45rem,2.1vw,2rem)] font-semibold leading-none text-[#20354d]">
          Business Analyst · Product & Operations
        </h1>
        <p className="mt-2 max-w-[46rem] text-[clamp(.95rem,1.1vw,1.06rem)] leading-6 text-[#4f5b68]">
          I like turning messy information into clear systems people can actually use.
        </p>
        <p className="mt-1 text-[clamp(.78rem,.9vw,.9rem)] leading-5 text-[#6a6270]">
          I ask better questions, connect scattered information, and turn complexity into clearer decisions.
        </p>
      </div>
      <div className="max-w-[26rem] text-[clamp(.62rem,.75vw,.7rem)] text-[#4e5966]">
        <div className="flex flex-wrap justify-start gap-1.5 md:justify-end">
          <span className="rounded-full bg-[#243850] px-2.5 py-1 text-white">Paris-based</span>
          <span className="rounded-full bg-white/70 px-2.5 py-1">Open internationally</span>
        </div>
        <div className="mt-1.5 flex flex-wrap justify-start gap-1.5 md:justify-end">
          {["French", "English", "Spanish", "Italian", "Hindi"].map((language) => (
            <span key={language} className="rounded-full bg-white/55 px-2.5 py-1">{language}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

function ThinkingMap() {
  const [activeNode, setActiveNode] = useState("people");
  const activeIndex = pathOrder.indexOf(activeNode);
  const activeStory = thinkingNodes.find((node) => node.id === activeNode)?.story ?? "I usually start with questions before solutions.";

  function goToThinking() {
    document.querySelector("#thinking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] bg-[#fff8eb]/70 p-[clamp(.7rem,1vw,.95rem)] shadow-[inset_0_0_0_1px_rgba(45,39,32,.08),0_18px_45px_rgba(47,39,31,.05)]">
      <div className="pointer-events-none absolute left-[9%] top-[20%] h-24 w-[78%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(246,194,129,.18),transparent_68%)] blur-md" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">How I think</p>
      </div>
      <div className="relative mt-1.5 h-[8.45rem] [@media(max-height:800px)]:h-[7.2rem]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 200" fill="none" aria-hidden="true">
          {[
            ["people", "friction", "M154 63 C172 82 198 95 225 100"],
            ["friction", "missing", "M338 100 C368 82 405 68 449 63"],
            ["missing", "clearer", "M522 63 C574 74 618 88 651 101"],
            ["clearer", "decide", "M651 127 C617 145 576 155 529 155"]
          ].map(([from, to, d]) => {
            const fromIndex = pathOrder.indexOf(from);
            const toIndex = pathOrder.indexOf(to);
            const isActive = activeIndex >= Math.min(fromIndex, toIndex);
            return (
              <path
                key={`${from}-${to}`}
                d={d}
                stroke="#8f715d"
                strokeLinecap="round"
                strokeWidth={isActive ? 2.45 : 1.5}
                className={`thinking-path-active transition duration-300 ${isActive ? "opacity-85" : "opacity-40"}`}
              />
            );
          })}
        </svg>
        <span className="absolute left-[19%] top-[55%] z-20 rotate-[-8deg] rounded-full bg-[#fff8eb]/70 px-1.5 font-serif text-[11px] italic text-[#a56d4a]/75">less noise</span>
        <span className="absolute right-[9%] top-[26%] z-20 rotate-[5deg] rounded-full bg-[#fff8eb]/70 px-1.5 font-serif text-[11px] italic text-[#a56d4a]/75">make it useful</span>

        {thinkingNodes.map((node) => {
          const isActive = node.id === activeNode;
          const Icon = node.icon;
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setActiveNode(node.id)}
              onFocus={() => setActiveNode(node.id)}
              onClick={goToThinking}
              className={`absolute z-10 flex items-center justify-center gap-1.5 rounded-[1rem] border px-3.5 py-1.5 text-center text-[12.5px] font-semibold leading-[1.08] shadow-[0_14px_35px_rgba(47,39,31,.08)] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45 ${node.className} ${isActive ? "border-[#b77954]/45 bg-white text-[#20354d] shadow-[0_18px_45px_rgba(183,121,84,.16)]" : "border-[#283b53]/10 bg-[#fffaf0] text-[#506074]"}`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#a56d4a]" strokeWidth={1.8} />
              <span className="whitespace-nowrap">{node.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto min-h-[2.85rem] max-w-[47rem] rounded-[1rem] border-l-2 border-[#c7865c]/55 bg-white/72 px-4 py-1.5 text-center text-[clamp(.84rem,.92vw,.94rem)] font-medium leading-5 text-[#425163] shadow-[0_14px_32px_rgba(47,39,31,.06),inset_0_0_0_1px_rgba(45,39,32,.05)] [@media(max-height:800px)]:min-h-[2.35rem] [@media(max-height:800px)]:py-1.5">
        {activeStory}
      </div>
    </section>
  );
}

function MemoryCards() {
  return (
    <section className="flex min-h-0 flex-col">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">Moments where clarity changed something</p>
      <div className="grid flex-1 gap-3.5 md:grid-cols-3">
        {memoryCards.map((card, index) => {
          const Icon = card.icon;
          return (
          <a
            key={card.title}
            href={card.href}
          className="group relative min-h-[9.4rem] overflow-visible rounded-[1.05rem] bg-[#fffaf0]/80 p-4 text-[#243850] shadow-[0_18px_45px_rgba(47,39,31,.08)] ring-1 ring-[#463629]/8 transition duration-300 hover:z-30 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45 [@media(max-height:800px)]:min-h-[6.45rem] [@media(max-height:800px)]:p-2.5"
          >
            <span className="absolute -top-2 left-5 h-4 w-14 rotate-[-2deg] bg-[#f1cf9b]/70 shadow-sm" />
            <div className="transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-[#a56d4a]" strokeWidth={1.8} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a56d4a]">case 0{index + 1}</p>
              </div>
              <p className="mt-2.5 text-[16px] font-semibold leading-5">{card.title}</p>
              <div className="mt-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a56d4a]/75">Situation</p>
                <p className="mt-1 text-[13.5px] leading-5 text-[#4f5c6b] [@media(max-height:800px)]:hidden">{card.visible}</p>
              </div>
              <p className="mt-2.5 font-serif text-[13px] italic leading-5 text-[#8c684e]">{card.line}</p>
              <div className="mt-3 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a56d4a]/75">Result</p>
                <p className="mt-1 inline-flex rounded-full bg-[#f0c987]/80 px-3 py-1.5 text-[11px] font-extrabold leading-5 text-[#243850] shadow-[0_8px_18px_rgba(160,103,61,.12)]">{card.result}</p>
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 z-40 min-h-full translate-y-3 rounded-[1.05rem] bg-[#243850] p-4 text-white opacity-0 shadow-[0_24px_70px_rgba(20,35,56,.24)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(max-height:800px)]:p-3">
              <div className="space-y-1 text-[11.5px] leading-[1.22rem] [@media(max-height:800px)]:space-y-1 [@media(max-height:800px)]:text-[10.8px] [@media(max-height:800px)]:leading-[1.1rem]">
                {card.details.map(([label, detail]) => (
                  <p key={label}>
                    <span className="block text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#f5c98d]">{label}</span>
                    <span className="block text-white/86">{detail}</span>
                  </p>
                ))}
              </div>
            </div>
          </a>
          );
        })}
      </div>
    </section>
  );
}

function CuriosityStrip() {
  const [activeTopic, setActiveTopic] = useState<number | null>(null);
  const active = activeTopic === null ? null : curiosityTopics[activeTopic];
  const defaultNote = "Small details often reveal how people think, work and make decisions.";

  return (
    <section className="rounded-[1.15rem] bg-[#243850]/[.055] p-2 [@media(max-height:800px)]:hidden" onMouseLeave={() => setActiveTopic(null)}>
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c684e]">Curiosity outside the project file</p>
        <div className="min-w-0">
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 md:overflow-hidden md:pb-0">
            {curiosityTopics.map((topic, index) => (
              <button
                key={topic.title}
                type="button"
                onMouseEnter={() => setActiveTopic(index)}
                onFocus={() => setActiveTopic(index)}
                onClick={() => setActiveTopic(index)}
                className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45 ${activeTopic === index ? "bg-[#243850] text-white" : "bg-white/60 text-[#4e5966] hover:bg-white"}`}
              >
                {topic.shortTitle}
              </button>
            ))}
          </div>
        </div>
        <p className="flex h-[3.45rem] min-w-[17rem] flex-1 items-center overflow-hidden rounded-[.9rem] bg-white/60 px-3 py-1.5 text-[clamp(.68rem,.72vw,.76rem)] leading-[1.05rem] text-[#4e5966] shadow-[inset_0_0_0_1px_rgba(45,39,32,.05)]">
          {active ? (
            "cleanNote" in active ? active.cleanNote : active.note
          ) : (
            <span>
              {defaultNote}
              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-[#7a8390]">
                <MousePointer2 className="h-3 w-3" strokeWidth={1.8} />
                Click a chip to see more.
              </span>
            </span>
          )}
        </p>
      </div>
    </section>
  );
}

function ObservationPanel() {
  const [activeObservation, setActiveObservation] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveObservation((current) => (current + 1) % observations.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="relative hidden h-[18.3rem] overflow-hidden rounded-[1.25rem] bg-[#fff8eb]/45 p-4 shadow-[inset_0_0_0_1px_rgba(45,39,32,.07)] md:block [@media(max-height:800px)]:h-[15.8rem]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">Things I naturally notice</p>
      <div className="mt-2 flex h-[calc(100%-1.35rem)] flex-col gap-1.5">
        {observations.map((observation, index) => {
          const isActive = activeObservation === index;
          const Icon = observation.icon;
          return (
            <button
              key={observation.line}
              type="button"
              onMouseEnter={() => setActiveObservation(index)}
              onFocus={() => setActiveObservation(index)}
              onClick={() => setActiveObservation(index)}
              className={`w-full overflow-hidden rounded-[.95rem] px-3 py-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b77954]/45 ${
                isActive
                  ? "h-[7.05rem] bg-white/82 text-[#243850] shadow-paper [@media(max-height:800px)]:h-[5.95rem]"
                  : "h-[3.45rem] text-[#526073] hover:bg-white/45 [@media(max-height:800px)]:h-[3.05rem]"
              }`}
            >
              <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a56d4a]">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {observation.label}
              </span>
              <span className="mt-1 block text-[clamp(.74rem,.8vw,.84rem)] font-semibold leading-[1.08rem]">{observation.line}</span>
              <span
                className={`block overflow-hidden text-[11px] leading-[1.05rem] text-[#6a6270] transition-all duration-300 ${
                  isActive ? "mt-1 max-h-20 translate-y-0 opacity-100" : "max-h-0 -translate-y-1 opacity-0"
                }`}
              >
                {observation.detail}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function NotebookScreen() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[#ece1d2] text-[#223750]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(255,190,112,.24),transparent_15rem),radial-gradient(circle_at_88%_28%,rgba(118,145,180,.18),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-25 paper-grid" />
      <div className="absolute inset-0 bg-[linear-gradient(116deg,transparent_5%,rgba(255,255,255,.38)_28%,transparent_42%)] opacity-50" />
      <div className="absolute right-8 top-7 h-16 w-16 rounded-full border border-[#8c684e]/10" />
      <div className="absolute bottom-8 left-8 h-20 w-px rotate-[12deg] bg-[#bd7a52]/20" />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2 p-4 md:p-5">
        <NotebookHeader />
        <main className="grid min-h-0 grid-rows-[auto_1fr] gap-2.5">
          <div className="grid min-h-0 gap-2.5 md:grid-cols-[1.72fr_.72fr]">
            <ThinkingMap />
            <ObservationPanel />
          </div>
          <MemoryCards />
        </main>
        <CuriosityStrip />
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative z-30 mx-auto min-w-0 w-[min(clamp(1030px,74vw,1360px),calc(100vw-32px))]">
      <div className="breathe-glow absolute inset-x-[12%] -bottom-6 h-24 rounded-full bg-[#ffc27b]/28 blur-3xl" />
      <div className="relative h-[min(825px,calc(100svh-76px))] rounded-[2.25rem] bg-[#142338] p-[clamp(.55rem,.8vw,.9rem)] shadow-[0_60px_150px_rgba(27,34,51,.44)] ring-1 ring-white/28 md:h-[min(812px,calc(100svh-84px))]">
        <NotebookScreen />
        <div className="pointer-events-none absolute inset-x-8 top-3 h-20 rounded-full bg-white/8 blur-2xl" />
        <div className="absolute left-1/2 top-1.5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/35" />
      </div>
      <div className="relative mx-auto h-7 w-[92%] rounded-b-[2.5rem] bg-[linear-gradient(180deg,#1a2738,#111b29)] shadow-[0_22px_45px_rgba(26,29,40,.32)]">
        <div className="absolute left-1/2 top-0 h-2 w-36 -translate-x-1/2 rounded-b-xl bg-white/10" />
      </div>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="mx-auto w-full max-w-[31rem] py-6 text-[#223750]">
      <div className="rounded-[2rem] bg-[#ece1d2]/95 p-5 shadow-[0_28px_90px_rgba(20,35,56,.24)] ring-1 ring-white/45">
        <div className="border-b border-[#283b53]/10 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9b6d4f]">Shana Bhojwani</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#20354d]">
            Business Analyst · Product & Operations
          </h1>
          <p className="mt-3 text-base leading-7 text-[#4f5b68]">
            I like turning messy information into clear systems people can actually use.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#4e5966]">
            <span className="rounded-full bg-[#243850] px-3 py-1.5 text-white">Paris-based</span>
            <span className="rounded-full bg-white/70 px-3 py-1.5">Open internationally</span>
            {["French", "English", "Spanish", "Italian", "Hindi"].map((language) => (
              <span key={language} className="rounded-full bg-white/55 px-3 py-1.5">{language}</span>
            ))}
          </div>
        </div>

        <section className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">How I think</p>
          <div className="mt-3 space-y-2">
            {thinkingNodes.map((node, index) => (
              <div key={node.id} className="rounded-2xl bg-[#fffaf0]/82 p-3 shadow-[inset_0_0_0_1px_rgba(45,39,32,.06)]">
                <div className="flex items-start gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f0c987]/45 text-[#a56d4a]">{index + 1}</span>
                  <div>
                    <p className="font-semibold leading-5">{node.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5e6672]">{node.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">Things I naturally notice</p>
          <div className="mt-3 grid gap-2">
            {observations.map((observation) => {
              const Icon = observation.icon;
              return (
                <div key={observation.line} className="rounded-2xl bg-white/68 p-3 shadow-[inset_0_0_0_1px_rgba(45,39,32,.06)]">
                  <div className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#a56d4a]" strokeWidth={1.8} />
                    <div>
                      <p className="font-semibold leading-5">{observation.line}</p>
                      <p className="mt-1 text-sm leading-6 text-[#5e6672]">{observation.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c684e]">Moments where clarity changed something</p>
          <div className="mt-3 space-y-3">
            {memoryCards.map((card) => {
              const Icon = card.icon;
              return (
                <a key={card.title} href={card.href} className="block rounded-2xl bg-[#fffaf0]/86 p-4 shadow-paper ring-1 ring-[#463629]/8">
                  <div className="flex items-center gap-2 text-[#a56d4a]">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">Case</p>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-[#243850]">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5e6672]">{card.visible}</p>
                  <p className="mt-2 font-serif text-sm italic text-[#8c684e]">{card.line}</p>
                  <p className="mt-3 inline-flex rounded-full bg-[#f0c987]/80 px-3 py-1.5 text-xs font-bold text-[#243850]">{card.result}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#243850]/[.055] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c684e]">Curiosity outside the project file</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {curiosityTopics.map((topic) => (
              <span key={topic.title} className="rounded-full bg-white/70 px-3 py-1.5 text-xs text-[#4e5966]">{topic.shortTitle}</span>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild className="h-9 px-4 py-1.5"><a href="#thinking">View work <ArrowRight className="h-4 w-4" /></a></Button>
          <Button asChild variant="secondary" className="h-9 px-4 py-1.5"><a href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "hero_mobile")}><FileText className="h-4 w-4" /> CV</a></Button>
          <Button asChild variant="ghost"><a className="text-[#243850] hover:bg-white/40" href="#contact"><Mail className="h-4 w-4" /> Contact</a></Button>
        </div>
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
      <div className="absolute left-[calc(12px_-_160px)] bottom-[calc(3.8%_-_35px)] z-40 hidden w-[clamp(9.6rem,9.7vw,12rem)] xl:block 2xl:left-[calc(28px_-_160px)]" style={{ transform: `translate3d(${parallax.x * -0.7}px, ${parallax.y * -0.5}px, 0)` }}>
        <div className="coffee-object group relative transition-transform duration-500 hover:scale-[1.03]">
          <Image src={coffeeImage} alt="Hand-drawn cup of coffee" className="h-auto w-full drop-shadow-[0_22px_30px_rgba(47,31,25,.28)]" priority />
          <span className="steam absolute left-[47%] top-[1%] h-16 w-6 rounded-full border-l border-[#fff3dc]/55 [animation-delay:.5s]" />
          <span className="steam absolute left-[57%] top-[-3%] h-20 w-8 rounded-full border-l border-[#fff3dc]/40 [animation-delay:1.4s]" />
          <div className="pointer-events-none absolute left-[62%] top-[calc(96%_-_53px)] w-[min(15rem,calc(100vw-2rem))] translate-x-2 translate-y-2 rounded-xl bg-[#fff4df]/95 p-3 text-[12px] leading-5 text-[#5f493b] opacity-0 shadow-paper transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
            Coffee is not really the point. The atmosphere is. I think better in places that help me slow down.
          </div>
        </div>
      </div>

      <div className="group absolute right-[calc(1.3%_-_160px)] bottom-[29.5%] z-40 hidden w-[clamp(8.2rem,7.85vw,10.2rem)] xl:block 2xl:right-[calc(2.4%_-_160px)]" style={{ transform: `translate3d(${parallax.x * 0.65}px, ${parallax.y * 0.45}px, 0) rotate(4deg)`, perspective: "800px" }}>
        <div className="relative aspect-[354/376] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image src={dinoImage} alt="Instax-style sunset memory with a small dinosaur playing badminton" className="h-auto w-full drop-shadow-[0_26px_35px_rgba(37,29,28,.3)]" priority />
          </div>
          <div className="absolute inset-0 grid place-items-center rounded-sm bg-[#fff1d3] p-3 text-center text-[11px] leading-[0.92rem] text-[#5f493b] shadow-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p>A random thought: Playing badminton at sunset on a quiet beach would probably make a pretty good day. Dinosaurs are optional.</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[calc(1.1%_-_170px)] top-[4.6%] z-40 hidden w-[clamp(12.2rem,11.8vw,16.05rem)] opacity-95 xl:block 2xl:right-[calc(2.2%_-_170px)]" style={{ transform: `translate3d(${parallax.x * 0.28}px, ${parallax.y * 0.22}px, 0) rotate(1deg)` }}>
        <div className="travel-note group relative transition-transform duration-700 hover:rotate-[-2deg] hover:scale-[1.02]">
          <span className="absolute left-[55%] top-2 z-10 h-4 w-16 -translate-x-1/2 rotate-[3deg] bg-[#f6d6a5]/82 shadow-paper" />
          <div className="relative rounded-sm drop-shadow-[0_20px_34px_rgba(37,29,28,.2)]">
            <Image src={worldmapImage} alt="Travel sketch connecting Paris, Tenerife and Seoul" className="h-auto w-full" priority />
          </div>
          <div className="pointer-events-none absolute right-[clamp(2rem,12vw,8rem)] top-[calc(100%_-_182px)] w-[min(15rem,calc(100vw-2rem))] translate-y-2 rounded-xl bg-[#fff4df]/95 p-3 text-[12px] leading-5 text-[#5f493b] opacity-0 shadow-paper transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Travelling made me notice how differently people solve the same everyday problems.
          </div>
        </div>
      </div>

      <div className="group absolute left-[calc(18px_-_135px)] top-[25%] z-40 hidden aspect-square w-[clamp(5.4rem,5.2vw,6.6rem)] -rotate-[3deg] place-items-center rounded-sm bg-[#ffe6a9] p-3 text-center text-[#4c382d] shadow-[0_22px_46px_rgba(50,35,29,.22)] ring-1 ring-white/55 xl:grid 2xl:left-[calc(40px_-_135px)]">
        <span className="absolute -top-3 right-6 h-6 w-16 rotate-[7deg] bg-[#f6d6a5]/78 shadow-paper" />
        <p className="font-serif text-[15px] italic leading-5">{postItText}</p>
        <span className="pointer-events-none absolute left-full top-1/2 ml-3 w-[min(14rem,calc(100vw-2rem))] -translate-y-1/2 rounded-xl bg-[#fff4df]/95 p-3 text-left text-[12px] leading-5 text-[#5f493b] opacity-0 shadow-paper transition duration-300 group-hover:opacity-100">
          This is usually where I start when something feels unnecessarily complicated.
        </span>
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
        <div className="md:hidden">
          <MobileHero />
        </div>

        <div className="relative mx-auto hidden max-w-[1500px] md:block">
          <Laptop />
          <WorkspaceObjects parallax={parallax} />
        </div>

        <div className="mx-auto mt-0 hidden max-w-[1120px] flex-col gap-2 md:flex md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#fff0cc]/80">visual thinking · calm systems · useful outcomes</p>
          <div className="translate-y-0.5 flex flex-wrap gap-2">
              <Button asChild className="h-9 px-4 py-1.5"><a href="#thinking">View work <ArrowRight className="h-4 w-4" /></a></Button>
            <Button asChild variant="secondary" className="h-9 px-4 py-1.5"><a href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "hero")}><FileText className="h-4 w-4" /> CV</a></Button>
            <Button asChild variant="ghost" className="h-9 px-4 py-1.5"><a className="text-[#fff9ed] hover:bg-white/10" href="#contact"><Mail className="h-4 w-4" /> Contact</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}





