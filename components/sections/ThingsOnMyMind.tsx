"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Brain, ChartLine, Globe2, Sparkles, Trophy, WandSparkles, Pause, Play } from "lucide-react";
import { useAutoBrowse } from "./useAutoBrowse";

import styles from "./MindNotebook.module.css";

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

const labels = ["AI & Codex", "Product ideas", "Cultures", "Investing", "Everyday systems", "Badminton"];
const cues = ["Make room for better work", "An idea worth keeping", "Another way to do things", "Rules before reactions", "One less thing to remember", "Observe. Adjust. Try again."];

export function ThingsOnMyMind() {
  const [activeTopic, setActiveTopic] = useState(0);
  const rotation = useAutoBrowse(() => setActiveTopic(current => (current + 1) % topics.length), 6000);
  function turnPage(direction: number) {
    setActiveTopic(current => (current + direction + topics.length) % topics.length);
  }
  return <section id="mind" className={styles.section} aria-labelledby="mind-heading">
    <div className="section-shell" ref={rotation.ref}>
      <div className={styles.chapter}><span>03 / Things on my mind lately</span><span>Notes beyond the project file</span></div>
      <div className={styles.layout}>
        <div className={styles.index}>
          <h2 id="mind-heading">A curious mind.<br /><em>A few open pages.</em></h2>
          <p className={styles.intro}>The things I keep coming back to, even when the laptop is closed.</p>
          <div className={styles.topics} role="group" aria-label="Choose a notebook topic">
            {topics.map((topic, index) => <button key={topic.title} type="button" aria-pressed={activeTopic === index} aria-controls="mind-pages" onClick={() => setActiveTopic(index)}>
              <topic.icon size={20} strokeWidth={1.5} aria-hidden="true" /><span>{labels[index]}</span><small>0{index + 1}</small>
            </button>)}
          </div>
          <p className={styles.annotation} aria-hidden="true">Still asking questions.</p>
        </div>
        <div className={styles.notebook}>
          <div id="mind-pages" className={styles.pages}>
            {topics.map((topic, index) => <article key={topic.title} className={styles.page} aria-hidden={index !== activeTopic} style={{ visibility: index === activeTopic ? "visible" : "hidden" }}>
              <div className={styles.pageMeta}><span>From my notebook</span></div>
              <h3><topic.icon size={26} strokeWidth={1.3} aria-hidden="true" />{topic.title}</h3>
              <div className={styles.note}>{topic.note.map((paragraph, paragraphIndex) => <p key={paragraph} className={paragraphIndex === 0 ? styles.opening : undefined}>{paragraph}</p>)}</div>
              <p className={styles.margin}>{cues[index]}</p>
            </article>)}
          </div>
          <div className={styles.pageControls}>
            <button type="button" aria-label="Previous thought" onClick={() => turnPage(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <span aria-live="polite">Note {String(activeTopic + 1).padStart(2, "0")} / 06</span>
            <button data-autoplay-control type="button" onClick={rotation.toggle} aria-label={rotation.paused ? "Play notebook rotation" : "Pause notebook rotation"}>{rotation.paused ? <Play size={17} /> : <Pause size={17} />}</button>
            <button type="button" aria-label="Next thought" onClick={() => turnPage(1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
