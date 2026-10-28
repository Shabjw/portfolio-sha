"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, BarChart3, Check, ChevronDown, FileText, FlaskConical, Network, Search, Sparkles, Timer, UsersRound, WalletCards, MapPin, Compass } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";
import styles from "./WorkChapters.module.css";
import { Pause, Play, X, ArrowUpRight } from "lucide-react";
import { useAutoBrowse } from "./useAutoBrowse";

const pixNotes = [
  { project: portfolioData.projects[3], icon: Timer, title: "Give a repeated task its time back.", result: "20–25 min → under 5 min", caption: "Excel file preparation", summary: "The same cleaning and checking steps came back with every file. I built a VBA macro so they no longer had to be done by hand." },
  { project: portfolioData.projects[1], icon: Network, title: "Make the next follow-up visible.", result: "A clearer next action", caption: "CRM & team coordination", summary: "Follow-up information was spread across tools and conversations. I helped organise Sellsy pipelines, segmentation and reminders around the team's work." },
  { project: portfolioData.projects[0], icon: UsersRound, title: "Turn repeated needs into a clearer offer.", result: "+40% partner engagement", caption: "Local authorities offer", summary: "Partner requests sounded different, but many needs repeated. Workshops, personas and feedback loops helped us see what could be shared." },
  { project: portfolioData.projects[2], icon: FileText, title: "Let an answer help more than once.", result: "Around 30% fewer repeated questions", caption: "Documentation & shared knowledge", summary: "Useful answers were getting lost in conversations. I brought guides, FAQs and resources into a shared place people could return to." }
];

const experiments = [
  {
    id: "finance", title: "Investment & Trading Dashboard", category: "Finance & Data", status: "V1 · Evolving",
    problem: "As I learned more about investing and options, I wanted a clearer view of my positions instead of piecing information together across accounts.",
    approach: "I built an Excel dashboard to follow stock and options positions, profit and loss, currencies and broker activity. Keeping the calculations and data consistent became an important part of the work.",
    learning: "I enjoy understanding how a decision changes under different scenarios. My interest in options pushes me to think about probabilities and risk, and to keep clear rules when emotions get involved.",
    tools: "Excel · Financial data modelling · Portfolio tracking"
  },
  {
    id: "job", title: "SHA Job Copilot", category: "Product", status: "V1 · Evolving",
    hook: "A job search has enough moving parts already.",
    copy: "I wanted one place for opportunities, applications and the documents that go with them. So I started building it.",
    problem: "Comparing a job with my profile was one task. Finding the right CV, remembering a previous letter and tracking the application were three more.",
    approach: "I built a hub bringing profile matching, missing skills, application tracking and previous cover letters together. The idea is to keep the context with the application. I am now improving it and adding features.",
    learning: "The challenge is deciding what deserves attention now, and what can stay quietly in the background.",
    tools: "Codex · AI-assisted development · Product design",
    notes: ["Compare opportunities", "Keep the context", "Follow the next step"]
  },
  {
    id: "skin", title: "SHA Skinventory", category: "Product", status: "V1 · Evolving",
    hook: "I bought it. Then found another one at home.",
    copy: "A skincare inventory grew into a small system for knowing what I own, what is running out and what should replace it.",
    problem: "I could not always remember what was already open, what I had in reserve or when I would need to buy a replacement.",
    approach: "I connected usage and opening dates to depletion estimates, linked replacements and added product comparisons and a wishlist. An AI assistant adds context about my skin over time. I keep improving the first version as I use it.",
    learning: "Small details matter here. A product is not just a name: it has a routine, a history and a possible replacement.",
    tools: "Codex · AI · UX/UI · Data structuring",
    notes: ["What I own", "What runs out next", "What replaces it"]
  },
  {
    id: "sales", title: "Sales, made easier to read", category: "Data", status: "V1 · Evolving",
    hook: "Start with a business question. Then a chart.",
    copy: "A Power BI project for my family's business, bringing sales and customer information into a view that is easier to explore.",
    problem: "Sales records contain plenty of information. Making useful comparisons requires clean data and clear definitions first.",
    approach: "The work brings together data cleaning, a structured model and sales and customer KPIs. I focus on the questions the dashboard needs to answer before choosing its visuals.",
    learning: "A useful dashboard should help someone ask a better question about the business, not just show them another number.",
    tools: "Power BI · Data preparation · Business intelligence",
    notes: ["Clean the records", "Connect the data", "Explore performance"]
  },
  {
    id: "jarvis", title: "JARVIS", category: "AI", status: "V1 · Evolving",
    hook: "It started with a Telegram bot and a question.",
    copy: "Could the voice notes, links and other inputs I collect become something useful more easily? This is where I test that idea.",
    problem: "Useful information arrives in different formats. Reading, transcribing and pulling out the important parts can take longer than expected.",
    approach: "I built Python and Telegram bot flows with the OpenAI API for transcription, summaries and extraction, alongside image generation and web parsing experiments.",
    learning: "I learn more by testing AI on a specific task than by asking it to do everything at once.",
    tools: "Python · Telegram Bot API · OpenAI API",
    notes: ["A voice note or link", "Transcribe & summarise", "Something to act on"]
  },
  {
    id: "travel", title: "SHA Travel OS", category: "Product", status: "V1 · Evolving",
    problem: "Planning a trip can leave useful places, activities and ideas scattered across different notes and lists.",
    approach: "I built a first version connecting city guides, saved places, activities and itineraries. The focus is on organising the information around how a trip takes shape. I am now refining the experience and adding features.",
    learning: "I want enough structure to make planning easier, while leaving room to change plans and discover somewhere unexpected.",
    tools: "Product design · Information architecture · User journeys"
  }
];

function NoteDetails({ title, children }: { title: string; children: ReactNode }) {
  return <details className={styles.details} onToggle={(event) => { if (event.currentTarget.open) trackEvent("project_note_open", title); }}>
    <summary><span>Read the story <span className="sr-only">of {title}</span></span><ChevronDown size={18} aria-hidden="true" /></summary>
    <div className={styles.detailBody}>{children}</div>
  </details>;
}

function Reflection({ label, children }: { label: string; children: ReactNode }) {
  return <div><h4>{label}</h4><p>{children}</p></div>;
}

function ExperimentSketch({ project }: { project: typeof experiments[number] }) {
  return <div className={`${styles.sketch} ${styles[project.id]}`}>
    <span className={styles.sketchLabel}>{({ finance: "A clearer view of my positions", travel: "Room for a detour", job: "Keep the context together", skin: "Before I buy another one", sales: "From records to a useful question", jarvis: "Keep the idea, skip the replay" } as Record<string, string>)[project.id]}</span>
    {project.id === "finance" ? <div className={styles.financeSketch}><div className={styles.positionLedger}><span><WalletCards size={17} aria-hidden="true" /> Portfolio</span><span>Stocks <i /></span><span>Options <i /></span></div><ArrowRight size={20} aria-hidden="true" /><div className={styles.riskNote}><BarChart3 size={32} strokeWidth={1.2} aria-hidden="true" /><strong>One view.</strong><span>Positions · P&L · Risk</span></div></div> : null}
    {project.id === "travel" ? <div className={styles.travelSketch}><div><MapPin size={25} aria-hidden="true" /><span>Saved places</span></div><span className={styles.routeLine} /><div><Compass size={32} strokeWidth={1.2} aria-hidden="true" /><span>A day takes shape</span></div><span className={styles.detour}>...or take the long way</span></div> : null}
    {project.id === "job" ? <div className={styles.jobSketch}><div><Search size={20} aria-hidden="true" /><span>Opportunity</span></div><ArrowRight size={20} aria-hidden="true" /><div><FileText size={20} aria-hidden="true" /><span>My profile</span></div><span className={styles.sketchStamp}><Check size={15} aria-hidden="true" /> Next step, clear.</span></div> : null}
    {project.id === "skin" ? <div className={styles.skinSketch}>{["In use", "Running low", "Replacement"].map((label, index) => <div key={label}><FlaskConical size={40} strokeWidth={1.2} aria-hidden="true" /><span className={styles.stockBar}><i style={{ width: [75, 20, 100][index] + "%" }} /></span><span>{label}</span></div>)}</div> : null}
    {project.id === "sales" ? <div className={styles.salesSketch}><div className={styles.dataRows} aria-hidden="true">{[0,1,2,3].map(row => <span key={row}><i /><i /><i /></span>)}</div><ArrowRight size={22} aria-hidden="true" /><div><BarChart3 size={66} strokeWidth={1.1} aria-hidden="true" /><span>See the pattern</span></div></div> : null}
    {project.id === "jarvis" ? <div className={styles.chatSketch}><div><AudioLines size={24} aria-hidden="true" /><span>A voice note...</span></div><ArrowDownRight size={20} aria-hidden="true" /><div><Sparkles size={20} aria-hidden="true" /><span>The useful parts.<br /><strong>And what to do next.</strong></span></div></div> : null}
  </div>;
}

export function ProjectGrid() {
  const [selected, setSelected] = useState(0);
  const caseRotation = useAutoBrowse(() => setSelected(value => (value + 1) % 5), 6000);
  const cases = [...pixNotes, {
    project: { title: "Understanding user adoption", problem: "Usage varied between local authorities. The numbers alone could not explain why.", did: "I used SQL and Metabase to investigate usage and data inconsistencies, then compared the findings with partner feedback.", learned: "A difference in the data is a starting point for a conversation.", tools: ["SQL", "Metabase", "Partner feedback"] },
    icon: BarChart3, title: "Understand what sits behind the numbers.", result: "~35 local authorities", caption: "Data & adoption", summary: "Connecting usage data with partner feedback to understand differences in adoption."
  }];
  const current = cases[selected];
  const CaseIcon = current.icon;
  const transformations = [
    ["Manual preparation", "A repeatable macro"],
    ["Scattered follow-up", "A visible next action"],
    ["Individual requests", "Shared partner needs"],
    ["Repeated questions", "Reusable answers"],
    ["Usage data", "Partner context"]
  ];
  return <div id="work" className={styles.workChapters}>
    <section className={styles.professional} aria-labelledby="pix-heading">
      <div className="section-shell" ref={caseRotation.ref}>
        <div className={styles.chapterLabel}><span>02 / Selected work</span><span>At work & on my own</span></div>
        <div className={styles.subchapter}><span>At Pix / Business analysis & operations</span><button data-autoplay-control type="button" onClick={caseRotation.toggle} aria-label={caseRotation.paused ? "Play work rotation" : "Pause work rotation"}>{caseRotation.paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
        <div className={styles.compactHeading}><h2 id="pix-heading" className={styles.headline}>Small changes.<br /><em>Work that gets easier.</em></h2><p>Data, CRM and small automations that helped the team at Pix.</p></div>
        <div className={styles.caseExplorer}>
          <div className={styles.caseChoices} role="group" aria-label="Choose a Pix case">{cases.map((item, index) => <button type="button" key={item.caption} aria-pressed={selected === index} aria-controls="case-preview" onClick={() => setSelected(index)}><item.icon size={20} strokeWidth={1.5} aria-hidden="true" /><span><strong>{item.caption}</strong><small>{item.result}</small></span><ArrowRight size={17} aria-hidden="true" /></button>)}</div>
          <article id="case-preview" className={styles.casePreview} aria-label={current.project.title}>
            <div className={styles.caseVisual} key={"visual-" + selected}>
              <CaseIcon size={30} strokeWidth={1.3} aria-hidden="true" />
              <p className={styles.bigResult}>{current.result}</p>
              {selected === 0 ? <div className={styles.timeBars} aria-hidden="true"><span><i />Before</span><span><i />After</span></div> : <div className={styles.transformation}><span>{transformations[selected][0]}</span><ArrowRight size={22} aria-hidden="true" /><strong>{transformations[selected][1]}</strong></div>}
            </div>
            <div className={styles.caseReading} key={"copy-" + selected}>
              <h3>{current.title}</h3><p>{current.summary}</p>
              <NoteDetails title={current.project.title}><Reflection label="The problem">{current.project.problem}</Reflection><Reflection label="My contribution">{current.project.did}</Reflection><Reflection label="What I learned">{current.project.learned}</Reflection></NoteDetails>
              <p className={styles.tools}>{current.project.tools.join(" · ")}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
    <PersonalCollection />
  </div>;
}

const collectionNotes = [
  { short: "Finance", hook: "My investments were spread across accounts.", summary: "One Excel view for stocks, options and the decisions behind them." },
  { short: "Job Copilot", hook: "Which CV did I send? And what happens next?", summary: "Keeping applications, letters and the next step in one place." },
  { short: "Skinventory", hook: "I bought it. Then found another one at home.", summary: "A small system for what I own, what runs out and what replaces it." },
  { short: "Sales & data", hook: "We had sales records. I wanted clearer answers.", summary: "A Power BI project for my family's business." },
  { short: "JARVIS", hook: "The useful part was somewhere in that voice note.", summary: "An experiment in turning everyday inputs into something I can use." },
  { short: "Travel OS", hook: "Saved places everywhere. A trip still to plan.", summary: "Places and ideas connected into a trip, with room for a detour." }
];

const projectSnapshots = [
  { problem: "Positions were spread across accounts.", built: "An Excel dashboard bringing stocks, options, P&L and currencies into one view.", skills: "Excel · Data modelling · Portfolio tracking" },
  { problem: "Applications, CVs and letters were difficult to keep together.", built: "A hub in development for profile matching, applications and previous cover letters.", skills: "Product design · AI-assisted development · Information structure" },
  { problem: "I could not tell what I owned or what would run out next.", built: "An inventory in development that connects usage, depletion estimates and replacements.", skills: "Data structuring · UX/UI · AI-assisted development" },
  { problem: "Sales records needed cleaning and clear definitions before comparisons were useful.", built: "A Power BI project connecting a structured data model with sales and customer KPIs.", skills: "Power BI · Data preparation · Business intelligence" },
  { problem: "Useful information was buried in voice notes and links.", built: "Python and Telegram bot flows for transcription, summaries and information extraction.", skills: "Python · API integration · AI automation" },
  { problem: "Places and ideas were scattered across different notes.", built: "A travel planning concept connecting saved places, city guides and itineraries.", skills: "Product design · Information architecture · User journeys" }
];

function PersonalCollection() {
  const [active, setActive] = useState(0);
  const [story, setStory] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const storyBody = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const isStoryOpen = story !== null;
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const rotation = useAutoBrowse(() => { if (story === null) setActive(value => (value + 1) % experiments.length); }, 6000);
  function move(direction: number) { setActive(value => (value + direction + experiments.length) % experiments.length); }

  useEffect(() => {
    const modal = dialog.current;
    if (!isStoryOpen || !modal) return;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => { modal.close(); document.body.style.overflow = previousOverflow; };
  }, [isStoryOpen]);

  useEffect(() => { if (story !== null) storyBody.current?.scrollTo({ top: 0, behavior: "instant" }); }, [story]);

  function moveStory(direction: number) {
    if (story === null) return;
    const next = (story + direction + experiments.length) % experiments.length;
    setStory(next);
    setActive(next);
    trackEvent("project_note_open", experiments[next].title);
  }

  function openStory(index: number) {
    setStory(index);
    trackEvent("project_note_open", experiments[index].title);
  }
  const opened = story === null ? null : experiments[story];
  return <section className={styles.curiosity} aria-labelledby="build-heading">
    <div className="section-shell" ref={rotation.ref}>
      <div className={styles.subchapter}><span>On my own / Built from curiosity</span><button data-autoplay-control type="button" onClick={rotation.toggle} aria-label={rotation.paused ? "Play project rotation" : "Pause project rotation"} title={rotation.paused ? "Play" : "Pause"}>{rotation.paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
      <div className={styles.compactHeading}><h2 id="build-heading" className={styles.headline}>I had a problem.<br /><em>So I started building.</em></h2><p>Six small starting points.<br />A collection of things I wanted to make easier.</p></div>
      <div className={styles.collection} role="region" aria-roledescription="carousel" aria-label="Personal projects" onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        <div id="personal-projects" ref={deck} className={styles.deck} onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY }; suppressClick.current = false; }} onPointerCancel={() => { gesture.current = null; }} onPointerUp={event => {
          if (!gesture.current) return;
          const dx = event.clientX - gesture.current.x;
          const dy = event.clientY - gesture.current.y;
          gesture.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) { suppressClick.current = true; move(dx < 0 ? 1 : -1); }
        }}>
          {experiments.map((project, index) => {
            let offset = (index - active + experiments.length) % experiments.length;
            if (offset > experiments.length / 2) offset -= experiments.length;
            const hidden = Math.abs(offset) > 1;
            return <article key={project.id} className={styles.deckCard} data-active={offset === 0} aria-hidden={offset !== 0} inert={hidden} style={{ "--offset": offset, "--scale": offset === 0 ? 1 : .88, "--lift": offset === 0 ? "0px" : "20px", zIndex: 4 - Math.abs(offset), opacity: hidden ? 0 : 1 } as CSSProperties}>
              <ExperimentSketch project={project} />
              <div className={styles.deckCopy}>
                <div className={styles.projectMeta}><span>{project.category}</span><span>{project.status}</span></div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardHook}>{collectionNotes[index].hook}</p>
                <p className={styles.deckSummary}>{collectionNotes[index].summary}</p>
                <p className={styles.cardSkills}>{projectSnapshots[index].skills}</p>
                <span className={styles.openStory}>Read the story <ArrowUpRight size={19} aria-hidden="true" /></span>
              </div>
              <button type="button" className={styles.cardHitArea} tabIndex={offset === 0 ? 0 : -1} aria-label={`Read the story of ${project.title}`} aria-haspopup="dialog" onClick={() => {
                if (suppressClick.current) { suppressClick.current = false; return; }
                if (offset !== 0) setActive(index); else openStory(index);
              }} />
            </article>;
          })}
        </div>
        <div className={styles.deckControls}>
          <button type="button" aria-label="Previous project" aria-controls="personal-projects" onClick={() => move(-1)}><ArrowLeft size={20} /></button>
          <span><strong>{String(active + 1).padStart(2, "0")}</strong> / 06</span>
          <button type="button" aria-label="Next project" aria-controls="personal-projects" onClick={() => move(1)}><ArrowRight size={20} /></button>
        </div>
        <div className={styles.collectionIndex} role="group" aria-label="Choose a personal project">{experiments.map((project, index) => <button type="button" key={project.id} aria-pressed={active === index} aria-controls="personal-projects" onClick={() => setActive(index)}>{collectionNotes[index].short}</button>)}</div>
      </div>
    </div>
    <dialog ref={dialog} className={styles.storyDialog} aria-labelledby="project-story-title" onClose={() => {
      setStory(null);
      requestAnimationFrame(() => deck.current?.querySelector<HTMLButtonElement>('[data-active="true"] button')?.focus());
    }} onKeyDown={event => {
      if (event.key === "Tab") {
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, summary, a[href], [tabindex="0"]'));
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); moveStory(event.key === "ArrowRight" ? 1 : -1); }
    }} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
    }}>
      {opened ? <>
        <div className={styles.dialogToolbar}>
          <span>{opened.status} / {opened.category}</span><button type="button" aria-label="Close project story" onClick={() => dialog.current?.close()}><X size={21} /></button>
          <span className={styles.storyCount} aria-live="polite">{String(story! + 1).padStart(2, "0")} / 06</span>
        </div>
        <div className={styles.storyContent} ref={storyBody} tabIndex={0} aria-label="Project story">
          <h2 id="project-story-title" aria-live="polite">{opened.title}</h2>
          <p className={styles.cardHook}>{collectionNotes[story!].hook}</p>
          <p className={styles.storySkills}>{projectSnapshots[story!].skills}</p>
          <div className={styles.storyReflections}><Reflection label="The starting point">{opened.problem}</Reflection><Reflection label="What I built">{opened.approach}</Reflection><Reflection label="What I am learning">{opened.learning}</Reflection></div>
        </div>
        <nav className={styles.storyNavigation} aria-label="Browse project stories">
          <button type="button" aria-label="Previous project story" title="Previous project" onClick={() => moveStory(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button className={styles.nextStory} type="button" aria-label="Next project story" onClick={() => moveStory(1)}><span><small>Up next</small>{collectionNotes[(story! + 1) % experiments.length].short}</span><ArrowRight size={20} aria-hidden="true" /></button>
        </nav>
      </> : null}
    </dialog>
  </section>;
}
