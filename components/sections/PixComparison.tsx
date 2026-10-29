"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CheckCheck, FileSpreadsheet, Files, FolderOpen, MessageSquare, Network, Plus, Repeat2, UserRound, Zap } from "lucide-react";
import styles from "./PixComparison.module.css";

const descriptions = [
  ["Repeated manual cleaning, checking and formatting, around 20 to 25 minutes.", "One VBA macro cleans, checks and prepares the file in under 5 minutes."],
  ["Follow-up information is scattered across conversations, spreadsheets and reminders.", "Contact, ownership and the next follow-up are visible in one CRM process."],
  ["Partner requests are considered individually even when needs repeat.", "Recurring needs inform workshops, personas and a more structured offer."],
  ["Answers and resources are spread across chats and documents.", "Guides, FAQs and resources can be found again in a shared hub."],
  ["Usage records show differences but do not explain them by themselves.", "Usage data and partner feedback are brought together to decide what to investigate."]
];

export function PixComparison({ index, result }: { index: number; result: string }) {
  const [after, setAfter] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completed = useRef(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      if (!completed.current && entry.isIntersecting && entry.intersectionRatio >= .3) {
        timer.current = setTimeout(() => { completed.current = true; setAfter(true); }, 2000);
      }
    }, { threshold: .3 });
    observer.observe(element);
    return () => { observer.disconnect(); if (timer.current) clearTimeout(timer.current); };
  }, []);
  function choose(value: boolean) {
    completed.current = true;
    if (timer.current) clearTimeout(timer.current);
    setAfter(value);
  }
  return <div className={styles.comparison} ref={root}>
    <div className={styles.header}>
      <div><span className={styles.caption}>{index === 4 ? "The scope" : index === 3 ? "Approximate change" : "What changed"}</span><p className={styles.result}>{result}</p></div>
      <div className={styles.switcher} role="group" aria-label="Compare before and after">
        <button type="button" aria-pressed={!after} aria-controls="pix-change-diagram" onClick={() => choose(false)}>Before</button>
        <button type="button" aria-pressed={after} aria-controls="pix-change-diagram" onClick={() => choose(true)}>After</button>
      </div>
    </div>
    <div id="pix-change-diagram" className={styles.diagram} role="img" aria-label={descriptions[index][after ? 1 : 0]} data-after={after}>
      <div key={String(after)} className={styles.scene} aria-hidden="true">
        {index === 0 ? (after ? <div className={styles.automation}><div className={styles.file}><FileSpreadsheet size={39} strokeWidth={1.2} /><span>Source file</span></div><ArrowRight size={21} /><div className={styles.macro}><Zap size={28} strokeWidth={1.5} /><strong>VBA</strong></div><ArrowRight size={21} /><div className={styles.file}><CheckCheck size={39} strokeWidth={1.2} /><strong>Ready to use</strong><small>Clean · check · prepare</small></div></div> : <div className={styles.manual}>{["Clean the file", "Check duplicates", "Format & prepare"].map((step, i) => <span key={step}><small>0{i + 1}</small><FileSpreadsheet size={19} />{step}</span>)}<p><Repeat2 size={15} />Repeat for each file</p></div>) : null}
        {index === 1 ? (after ? <div className={styles.crm}>{[{ icon: Network, label: "Contact" }, { icon: UserRound, label: "Owner" }, { icon: Check, label: "Next follow-up" }].map(({ icon: Icon, label }) => <div key={label}><Icon size={26} strokeWidth={1.3} /><strong>{label}</strong><span className={styles.rule} /></div>)}</div> : <div className={styles.scattered}><span><MessageSquare size={22} />A conversation</span><span><FileSpreadsheet size={22} />A spreadsheet</span><span><Repeat2 size={22} />A reminder</span></div>) : null}
        {index === 2 ? (after ? <div className={styles.needs}><strong><Network size={27} />Shared needs</strong><div><span>Workshops</span><span>Personas</span><span>Clearer offer</span></div></div> : <div className={styles.scattered}><span>One request</span><span>Another request</span><span>A familiar need</span></div>) : null}
        {index === 3 ? (after ? <div className={styles.hub}><FolderOpen size={66} strokeWidth={1.1} /><div><strong>A shared place to return to</strong>{["Guides", "FAQs", "Resources"].map(item => <span key={item}><Check size={13} />{item}</span>)}</div></div> : <div className={styles.scattered}><span><MessageSquare size={23} />A reply in a chat</span><span><Files size={23} />A document</span><span>The same question again?</span></div>) : null}
        {index === 4 ? (after ? <div className={styles.dataContext}><div><span><FileSpreadsheet size={23} />Usage data</span><Plus size={17} /><span><MessageSquare size={23} />Partner feedback</span></div><p>Better questions to investigate <ArrowRight size={17} /></p></div> : <div className={styles.records}><div>{Array.from({length:4},(_,row)=><span key={row}>{Array.from({length:5},(_,col)=><i key={col} />)}</span>)}</div><p>Different usage. But why?</p></div>) : null}
      </div>
    </div>
  </div>;
}
