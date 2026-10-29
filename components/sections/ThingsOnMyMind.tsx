"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Brain, ChartLine, Club, Globe2, WandSparkles } from "lucide-react";
import { useAutoBrowse } from "./useAutoBrowse";

import styles from "./MindNotebook.module.css";

const topics = [
  {
    title: "AI automation & Codex projects",
    headline: "I rarely try a new AI tool just once.",
    icon: WandSparkles,
    note: [
      "I usually start by testing something out of curiosity. Then I wonder what else I could do with it, and before I know it, I'm experimenting with an API, building something with Codex or showing a friend what I just discovered.",
      "I think that's what I enjoy most about AI. Being able to take an idea, even a slightly random one, and actually try it out."
    ],
    margin: "I wonder if this could work..."
  },
  {
    title: "Product thinking",
    headline: "My notes are full of things I might never build.",
    icon: Brain,
    note: [
      "Sometimes it's a conversation with a friend, an annoying feature on a website or just a random thought. I'll start imagining how I'd do it differently, what features I'd add, and suddenly I've spent way too much time thinking about it.",
      "Most of those ideas stay in my notes. But every now and then, one turns into something I actually want to build."
    ],
    margin: "Probably another idea for later."
  },
  {
    title: "Different cultures",
    headline: "There's usually more than one way to do something.",
    icon: Globe2,
    note: [
      "I grew up surrounded by different cultures, both in my family and among the people around me. So I've always been quite interested in the different ways people think, behave and do everyday things.",
      "I notice it when I travel, but also in conversations or even when watching shows from different countries.",
      "I love those moments when I realise something I've always considered normal isn't necessarily normal somewhere else. Sometimes the other way even makes more sense!"
    ],
    margin: "There's always another perspective."
  },
  {
    title: "Investing",
    headline: "I like asking what happens if I'm wrong.",
    icon: ChartLine,
    note: [
      "I've always been interested in understanding how financial markets work. I mainly invest for the long term, but options got me curious about all the different scenarios, probabilities and risks involved.",
      "I enjoy thinking through those possibilities before making a decision. Of course, sticking to a plan is a lot easier in theory than when real money is involved. I'm still learning that part."
    ],
    margin: "Rules before reactions."
  },
  {
    title: "Games & strategy",
    headline: "One more round?",
    icon: Club,
    note: [
      "Badminton is one of my favourite ways to get away from a screen. I love getting completely caught up in a game, and even when I play terribly, I'm usually up for another round.",
      "I'm also a big fan of Rummy, Monopoly Deal and a card game I've always called Udaka (apparently it's called Gabo!). It's a mix of memory, swapping cards and knowing when to take a chance. Sometimes I'll deliberately keep a high card because I'm convinced I'll find a way to get rid of it later.",
      "Does it always work? Absolutely not. And somehow, I'm still convinced my next strategy will be better."
    ],
    margin: "Just one more game."
  }
];

const labels = ["AI & Codex", "Product ideas", "Cultures", "Investing", "Games & strategy"];

export function ThingsOnMyMind() {
  const [activeTopic, setActiveTopic] = useState(0);
  const rotation = useAutoBrowse(() => setActiveTopic(current => (current + 1) % topics.length), 5000);
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
        <div className={styles.notebook} data-autopause>
          <div id="mind-pages" className={styles.pages}>
            {topics.map((topic, index) => <article key={topic.title} className={styles.page} aria-hidden={index !== activeTopic} style={{ visibility: index === activeTopic ? "visible" : "hidden" }}>
              <div className={styles.pageMeta}><span>{topic.title}</span></div>
              <h3><topic.icon size={26} strokeWidth={1.3} aria-hidden="true" /><span>{topic.headline}</span></h3>
              <div className={styles.note}>{topic.note.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
              <p className={styles.margin}>{topic.margin}</p>
            </article>)}
          </div>
          <div className={styles.pageControls}>
            <button type="button" aria-label="Previous thought" onClick={() => turnPage(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <span>Note {String(activeTopic + 1).padStart(2, "0")} / {String(topics.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Next thought" onClick={() => turnPage(1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
