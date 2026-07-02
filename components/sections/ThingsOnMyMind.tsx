"use client";

import { useState } from "react";
import { Brain, ChartLine, Globe2, Sparkles, Trophy, WandSparkles } from "lucide-react";

const topics = [
  {
    title: "AI automation & Codex projects",
    icon: WandSparkles,
    note: [
      "I started using AI because I was curious.",
      "I kept using it because it changed the way I solve problems.",
      "Today I use tools like Codex to build small systems, test ideas quickly and automate repetitive work. Whenever I discover something genuinely useful, I'm usually the first one sending it to friends or finding a way to use it in everyday life."
    ]
  },
  {
    title: "Product thinking",
    icon: Brain,
    note: [
      "Product ideas have a habit of following me everywhere.",
      "A conversation with friends, something frustrating in a website or a random everyday situation can easily turn into an hour of brainstorming.",
      "I keep notes of those ideas. Most will probably never exist, but every now and then one starts feeling realistic enough that I actually want to build it."
    ]
  },
  {
    title: "Different cultures",
    icon: Globe2,
    note: [
      "Travelling made me realise that people often solve the same problem in completely different ways.",
      "In Korea, for example, you can press an elevator button a second time to cancel the floor. Tiny detail, huge quality of life improvement.",
      "Those little discoveries remind me that there is rarely only one good solution. They make me more curious about how different cultures think, design and solve the same problems."
    ]
  },
  {
    title: "Investing",
    icon: ChartLine,
    note: [
      "Investing taught me that good decisions are rarely emotional.",
      "I mainly focus on long term investing but I also enjoy learning about options strategies because they force you to think in terms of probabilities, scenarios and risk management rather than certainty.",
      "Taking calculated risks is still uncomfortable sometimes, especially when real money is involved, but building clear rules makes those decisions much easier to stick to.",
      "The same mindset often applies outside investing too. Good systems usually beat emotional decisions."
    ]
  },
  {
    title: "Better everyday systems",
    icon: Sparkles,
    note: [
      "I kept forgetting what I already owned.",
      "Sometimes I bought a skincare product only to realise I already had one at home, or I couldn't remember what would run out next.",
      "So I started building a system that tracks my products, predicts when they'll be empty, manages replacements and even learns more about my skin over time with AI.",
      "It slowly became much more than an inventory. It became a way of making everyday decisions simpler, which is probably why I enjoy building systems in the first place."
    ]
  },
  {
    title: "Badminton",
    icon: Trophy,
    note: [
      "I've been playing badminton regularly since 2018.",
      "One way I describe how I work is through badminton.",
      "You observe what's happening, anticipate the next move and constantly adjust your strategy.",
      "That's surprisingly close to what good business analysis feels like.",
      "Also... I'm still willing to play in the middle of a heatwave."
    ]
  }
];

export function ThingsOnMyMind() {
  const [activeTopic, setActiveTopic] = useState(0);
  const active = topics[activeTopic];

  return (
    <section id="mind" className="relative overflow-hidden bg-[#17263a] py-20 text-white md:py-28">
      <div className="ambient-orb left-[10%] top-[14%] h-72 w-72 bg-[#ffc17d]/18" />
      <div className="ambient-orb bottom-[8%] right-[10%] h-80 w-80 bg-[#aeb7df]/16" />
      <div className="section-shell relative z-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#ffe0ac]/72">Things on my mind lately</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            A few topics I keep coming back to outside the project file.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const isActive = activeTopic === index;

              return (
                <button
                  key={topic.title}
                  type="button"
                  onMouseEnter={() => setActiveTopic(index)}
                  onFocus={() => setActiveTopic(index)}
                  onClick={() => setActiveTopic(index)}
                  className={`group rounded-[1.3rem] border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe0ac]/45 ${
                    isActive
                      ? "border-[#ffe0ac]/36 bg-[#ffe0ac]/[.15] shadow-[0_24px_70px_rgba(0,0,0,.18)]"
                      : "border-white/10 bg-white/[.055] hover:-translate-y-1 hover:bg-white/[.09]"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe0ac]/14 text-[#ffe0ac] ring-1 ring-[#ffe0ac]/15">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="mt-4 block font-display text-xl font-semibold text-white">{topic.title}</span>
                  <span className={`mt-3 block h-px bg-[#ffe0ac]/45 transition-all ${isActive ? "w-24" : "w-12"}`} />
                </button>
              );
            })}
          </div>

          <article className="flex h-[32rem] flex-col justify-between rounded-[2rem] border border-[#ffe0ac]/16 bg-white/[.075] p-7 shadow-[0_28px_90px_rgba(0,0,0,.18)] backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffe0ac]/72">Current thought</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-[#fff2d3]">{active.title}</h3>
              <div className="mt-6 max-h-[21rem] space-y-4 overflow-y-auto pr-2 text-[17px] leading-8 text-white/78">
                {active.note.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <p className="mt-8 text-sm text-white/45">Hover or tap a note to read the thought behind it.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
