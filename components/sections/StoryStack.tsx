"use client";

import { useState } from "react";
import { Ear, ScanSearch, PencilRuler, Repeat2, ArrowRight, Pause, Play } from "lucide-react";
import { useAutoBrowse } from "./useAutoBrowse";
import styles from "./WorkChapters.module.css";

const steps = [
  { icon: Ear, title: "Listen", question: "What are people trying to do?", copy: "I start with the people doing the work. The useful details often come out in conversation.", practice: "Interviews · Workshops · Requirements", from: "The first request", to: "The actual need" },
  { icon: ScanSearch, title: "Connect", question: "What keeps coming back?", copy: "I compare what people tell me with what the data shows. Repeated questions often point to a shared problem.", practice: "SQL · Metabase · Analysis", from: "Scattered signals", to: "A shared pattern" },
  { icon: PencilRuler, title: "Clarify", question: "Can we see the same picture?", copy: "A map, a dashboard or clearer requirements give people something concrete to discuss and decide on.", practice: "Process mapping · Dashboards", from: "Different views", to: "Shared understanding" },
  { icon: Repeat2, title: "Simplify", question: "What would make next time easier?", copy: "I look for something people can reuse: a small automation, a clearer handoff or an answer they can find.", practice: "Automation · CRM · Documentation", from: "Repeated effort", to: "A useful system" }
];

export function StoryStack() {
  const [active, setActive] = useState(0);
  const rotation = useAutoBrowse(() => setActive(value => (value + 1) % steps.length), 6000);
  const step = steps[active];
  return <section id="thinking" className={styles.method} aria-labelledby="method-heading">
    <div className="section-shell" ref={rotation.ref}>
      <div className={styles.chapterLabel}><span>01 / How I work</span><a href="#work">See it in practice <ArrowRight size={14} aria-hidden="true" /></a></div>
      <div className={styles.compactHeading}><h2 id="method-heading" className={styles.headline}>From a good question<br /><em>to a useful answer.</em></h2><p>People first. Data for context. A simpler next step.</p></div>
      <div className={styles.rotationControl}><button data-autoplay-control type="button" onClick={rotation.toggle} aria-label={rotation.paused ? "Play thinking rotation" : "Pause thinking rotation"}>{rotation.paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
      <div className={styles.methodSwitch} role="group" aria-label="Explore how I work">{steps.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls="method-preview" onClick={() => setActive(index)}><item.icon size={25} strokeWidth={1.5} aria-hidden="true" /><span><small>0{index + 1}</small>{item.title}</span><ArrowRight size={17} aria-hidden="true" /></button>)}</div>
      <div id="method-preview" className={styles.methodPreview} aria-live="polite">
        <div className={styles.methodThought}><h3>{step.question}</h3><p>{step.copy}</p><span>{step.practice}</span></div>
        <div className={styles.methodDrawing} data-step={active} aria-hidden="true"><div className={styles.scattered}><i /><i /><i /><i /><i /></div><span>{step.from}</span><ArrowRight className={styles.drawArrow} size={32} strokeWidth={1.2} /><div className={styles.ordered}><i /><i /><i /></div><strong>{step.to}</strong></div>
      </div>
    </div>
  </section>;
}
