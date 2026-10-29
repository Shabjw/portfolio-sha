"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, BarChart3, Check, FileText, FlaskConical, Network, Search, Sparkles, Timer, UsersRound, WalletCards, MapPin, Compass } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";
import styles from "./WorkChapters.module.css";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useAutoBrowse } from "./useAutoBrowse";
import { PixComparison } from "./PixComparison";

const pixNotes = [
  { project: portfolioData.projects[3], icon: Timer, title: "Give a repeated task its time back.", result: "20–25 min → under 5 min", caption: "Excel file preparation", summary: "The same cleaning and checking steps came back with every file. I built a VBA macro so they no longer had to be done by hand." },
  { project: portfolioData.projects[1], icon: Network, title: "Make the next follow-up visible.", result: "A clearer next action", caption: "CRM & team coordination", summary: "Follow-up information was spread across tools and conversations. I helped organise Sellsy pipelines, segmentation and reminders around the team's work." },
  { project: portfolioData.projects[0], icon: UsersRound, title: "Turn repeated needs into a clearer offer.", result: "Recurring needs, shared offer", caption: "Local authorities offer", summary: "Workshops, personas and feedback helped turn recurring partner needs into a clearer offer." },
  { project: portfolioData.projects[2], icon: FileText, title: "Let an answer help more than once.", result: "Around 30% fewer repeated questions", caption: "Documentation & shared knowledge", summary: "Guides, FAQs and resources moved into one shared place, so useful answers could be found again." }
];

const experiments = [
  {
    id: "finance", title: "Investment & Trading Dashboard", category: "Finance & Data",
    problem: "As I learned more about investing and options, I wanted a clearer view of my positions instead of piecing information together across accounts.",
    approach: "I built an Excel dashboard to follow stock and options positions, profit and loss, currencies and broker activity. Keeping the calculations and data consistent became an important part of the work.",
    learning: "I enjoy understanding how a decision changes under different scenarios. My interest in options pushes me to think about probabilities and risk, and to keep clear rules when emotions get involved.",
    tools: "Excel · Financial data modelling · Portfolio tracking"
  },
  {
    id: "job", title: "SHA Job Copilot", category: "Product",
    hook: "A job search has enough moving parts already.",
    copy: "I wanted one place for opportunities, applications and the documents that go with them. So I started building it.",
    problem: "Comparing a job with my profile was one task. Finding the right CV, remembering a previous letter and tracking the application were three more.",
    approach: "I built a hub bringing profile matching, missing skills, application tracking and previous cover letters together. The idea is to keep the context with the application. I am now improving it and adding features.",
    learning: "The challenge is deciding what deserves attention now, and what can stay quietly in the background.",
    tools: "Codex · AI-assisted development · Product design",
    notes: ["Compare opportunities", "Keep the context", "Follow the next step"]
  },
  {
    id: "skin", title: "SHA Skinventory", category: "Product",
    hook: "I bought it. Then found another one at home.",
    copy: "A skincare inventory grew into a small system for knowing what I own, what is running out and what should replace it.",
    problem: "I could not always remember what was already open, what I had in reserve or when I would need to buy a replacement.",
    approach: "I connected usage and opening dates to depletion estimates, linked replacements and added product comparisons and a wishlist. An AI assistant adds context about my skin over time. I keep improving the first version as I use it.",
    learning: "Small details matter here. A product is not just a name: it has a routine, a history and a possible replacement.",
    tools: "Codex · AI · UX/UI · Data structuring",
    notes: ["What I own", "What runs out next", "What replaces it"]
  },
  {
    id: "sales", title: "Sales, made easier to read", category: "Data",
    hook: "Start with a business question. Then a chart.",
    copy: "A Power BI project for my family's business, bringing sales and customer information into a view that is easier to explore.",
    problem: "Sales records contain plenty of information. Making useful comparisons requires clean data and clear definitions first.",
    approach: "The work brings together data cleaning, a structured model and sales and customer KPIs. I focus on the questions the dashboard needs to answer before choosing its visuals.",
    learning: "A useful dashboard should help someone ask a better question about the business, not just show them another number.",
    tools: "Power BI · Data preparation · Business intelligence",
    notes: ["Clean the records", "Connect the data", "Explore performance"]
  },
  {
    id: "jarvis", title: "JARVIS", category: "AI",
    hook: "It started with a Telegram bot and a question.",
    copy: "Could the voice notes, links and other inputs I collect become something useful more easily? This is where I test that idea.",
    problem: "Useful information arrives in different formats. Reading, transcribing and pulling out the important parts can take longer than expected.",
    approach: "I built Python and Telegram bot flows with the OpenAI API for transcription, summaries and extraction, alongside image generation and web parsing experiments.",
    learning: "I learn more by testing AI on a specific task than by asking it to do everything at once.",
    tools: "Python · Telegram Bot API · OpenAI API",
    notes: ["A voice note or link", "Transcribe & summarise", "Something to act on"]
  },
  {
    id: "travel", title: "SHA Travel OS", category: "Product",
    problem: "Planning a trip can leave useful places, activities and ideas scattered across different notes and lists.",
    approach: "I built a first version connecting city guides, saved places, activities and itineraries. The focus is on organising the information around how a trip takes shape. I am now refining the experience and adding features.",
    learning: "I want enough structure to make planning easier, while leaving room to change plans and discover somewhere unexpected.",
    tools: "Product design · Information architecture · User journeys"
  }
];

type PixCase = {
  title: string; summary: string; result: string;
  project: { title: string; problem: string; did: string; learned: string; tools: string[] };
};

function PixCasePanel({ item, index, active, nextLabel, onNext }: { item: PixCase; index: number; active: boolean; nextLabel: string; onNext: () => void }) {
  const [reading, setReading] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);
  useEffect(() => {
    if (!hasOpened.current) return;
    (reading ? backButton : openButton).current?.focus({ preventScroll: !reading });
  }, [reading]);
  return <article className={styles.casePreview} aria-label={item.project.title} aria-hidden={!active} inert={!active} style={{ visibility: active ? "visible" : "hidden" }} data-autopause>
    <div className={styles.caseOverview} aria-hidden={reading} inert={reading} style={{ visibility: reading ? "hidden" : undefined }}>
      <div className={styles.caseVisual}>{active ? <PixComparison index={index} result={item.result} /> : null}</div>
      <div className={styles.caseReading}>
        <h3>{item.title}</h3><p>{item.summary}</p>
        <button ref={openButton} data-case-open className={styles.caseStoryButton} type="button" aria-expanded={reading} aria-controls={`pix-story-${index}`} onClick={() => {
          hasOpened.current = true;
          setReading(true);
          trackEvent("project_note_open", item.project.title);
        }}>Read the story <ArrowRight size={18} aria-hidden="true" /></button>
        <p className={styles.tools}>{item.project.tools.join(" · ")}</p>
      </div>
    </div>
    <div id={`pix-story-${index}`} className={styles.caseStory} aria-hidden={!reading} inert={!reading} style={{ visibility: reading ? "visible" : "hidden" }}>
      <div className={styles.caseStoryHeader}><span>At Pix / 0{index + 1}</span><button ref={backButton} type="button" onClick={() => setReading(false)}><ArrowLeft size={16} aria-hidden="true" />Back to overview</button></div>
      <div className={styles.caseStoryBody} tabIndex={reading && active ? 0 : -1} role="region" aria-label={`${item.project.title}: full story`}>
        <h3>{item.project.title}</h3>
        <div className={styles.detailBody}><Reflection label="The context">{item.project.problem}</Reflection><Reflection label="What I did">{item.project.did}</Reflection><Reflection label="What I learned">{item.project.learned}</Reflection></div>
        <p className={styles.caseStoryResult}>{item.result}</p>
        <p className={styles.tools}>{item.project.tools.join(" · ")}</p>
      </div>
      <div className={styles.caseStoryFooter}><span>Up next<br /><strong>{nextLabel}</strong></span><button type="button" aria-label={`Next Pix case: ${nextLabel}`} onClick={onNext}>Next <ArrowRight size={17} aria-hidden="true" /></button></div>
    </div>
  </article>;
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
  const stage = useRef<HTMLDivElement>(null);
  const focusNextOverview = useRef(false);
  useEffect(() => {
    if (!focusNextOverview.current) return;
    focusNextOverview.current = false;
    stage.current?.querySelector<HTMLButtonElement>('article[aria-hidden="false"] [data-case-open]')?.focus({ preventScroll: true });
  }, [selected]);
  const caseRotation = useAutoBrowse(() => setSelected(value => (value + 1) % 5), 5000);
  const cases = [...pixNotes, {
    project: { title: "Understanding user adoption", problem: "Usage varied between local authorities. The numbers alone could not explain why.", did: "I used SQL and Metabase to investigate usage and data inconsistencies, then compared the findings with partner feedback.", learned: "A difference in the data is a starting point for a conversation.", tools: ["SQL", "Metabase", "Partner feedback"] },
    icon: BarChart3, title: "Understand what sits behind the numbers.", result: "~35 local authorities", caption: "Data & adoption", summary: "Connecting usage data with partner feedback to understand differences in adoption."
  }];
  return <div id="work" className={styles.workChapters}>
    <section className={styles.professional} aria-labelledby="pix-heading">
      <div className="section-shell" ref={caseRotation.ref}>
        <div className={styles.chapterLabel}><span>02 / Selected work</span><span>At work & on my own</span></div>
        <div className={styles.subchapter}><span>At Pix / Business analysis & operations</span></div>
        <div className={styles.compactHeading}><h2 id="pix-heading" className={styles.headline}>Small changes.<br /><em>Work that gets easier.</em></h2><p>Data, CRM and small automations that helped the team at Pix.</p></div>
        <div className={styles.caseExplorer}>
          <div className={styles.caseChoices} role="group" aria-label="Choose a Pix case">{cases.map((item, index) => <button type="button" key={item.caption} aria-pressed={selected === index} aria-controls="case-preview" onClick={() => setSelected(index)}><item.icon size={20} strokeWidth={1.5} aria-hidden="true" /><span><strong>{item.caption}</strong><small>{item.result}</small></span><ArrowRight size={17} aria-hidden="true" /></button>)}</div>
          <div id="case-preview" ref={stage} className={styles.caseStage}>
            {cases.map((item, index) => <PixCasePanel key={`${selected}-${item.caption}`} item={item} index={index} active={selected === index} nextLabel={cases[(index + 1) % cases.length].caption} onNext={() => {
              focusNextOverview.current = true;
              setSelected((index + 1) % cases.length);
            }} />)}
          </div>
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
  const [leaving, setLeaving] = useState<{ index: number; direction: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const [isReading, setIsReading] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isFlipAnimating, setIsFlipAnimating] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  const storyFlipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingFlipIndex = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const focusCardAfterMove = useRef(false);
  const storyVisible = isReading && flippedIndex === active && !isFlipAnimating;
  const rotation = useAutoBrowse(() => move(1), storyVisible ? 16000 : 8000);
  function choose(index: number, direction = index > active ? 1 : -1) {
    if (leaving || index === active) return;
    const previous = active;
    if (storyFlipTimer.current) window.clearTimeout(storyFlipTimer.current);
    storyFlipTimer.current = null;
    if (!reducedMotion) setLeaving({ index: previous, direction });
    setActive(index);
    if (isReading) {
      setFlippedIndex(previous);
      pendingFlipIndex.current = index;
      trackEvent("project_note_open", experiments[index].title);
      if (reducedMotion) {
        pendingFlipIndex.current = null;
        showNextStoryFront(index);
      }
    }
  }
  function move(direction: number) { choose((active + direction + experiments.length) % experiments.length, direction); }

  function showNextStoryFront(index: number) {
    setFlippedIndex(null);
    setIsFlipAnimating(false);
    storyFlipTimer.current = setTimeout(() => {
      storyFlipTimer.current = null;
      setIsFlipAnimating(!reducedMotion);
      setFlippedIndex(index);
    }, 2000);
  }

  useEffect(() => {
    if (!focusCardAfterMove.current) return;
    focusCardAfterMove.current = false;
    deck.current?.querySelector<HTMLButtonElement>('[data-active="true"] button')?.focus({ preventScroll: true });
  }, [active]);

  function openStory(index: number) {
    if (storyFlipTimer.current) window.clearTimeout(storyFlipTimer.current);
    storyFlipTimer.current = null;
    pendingFlipIndex.current = null;
    setLeaving(null);
    setIsReading(true);
    setIsFlipAnimating(!reducedMotion);
    setFlippedIndex(index);
    trackEvent("project_note_open", experiments[index].title);
  }
  function closeStory() {
    if (storyFlipTimer.current) window.clearTimeout(storyFlipTimer.current);
    storyFlipTimer.current = null;
    pendingFlipIndex.current = null;
    setIsReading(false);
    setIsFlipAnimating(!reducedMotion);
    setFlippedIndex(null);
  }

  useEffect(() => () => {
    if (storyFlipTimer.current) window.clearTimeout(storyFlipTimer.current);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const showingStory = isReading && flippedIndex === active;
      const target = showingStory
        ? '.deckCard[data-active="true"][data-flipped="true"] [data-story-back]'
        : '.deckCard[data-active="true"] [data-story-open]';
      deck.current?.querySelector<HTMLButtonElement>(target)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [active, isReading, flippedIndex]);
  return <section className={styles.curiosity} aria-labelledby="build-heading">
    <div className="section-shell" ref={rotation.ref}>
      <div className={styles.subchapter}><span>On my own / Built from curiosity</span></div>
      <div className={styles.compactHeading}><h2 id="build-heading" className={styles.headline}>I had a problem.<br /><em>So I started building.</em></h2><p>Six small starting points.<br />A collection of things I wanted to make easier.</p></div>
      <div className={styles.collection} role="region" aria-roledescription="carousel" aria-label="Personal projects" aria-busy={Boolean(leaving)} onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); focusCardAfterMove.current = true; move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        <div id="personal-projects" ref={deck} className={styles.deck} onPointerDown={() => { suppressClick.current = false; }}>
          {experiments.map((project, index) => {
            let offset = (index - active + experiments.length) % experiments.length;
            if (offset > experiments.length / 2) offset -= experiments.length;
            const hidden = Math.abs(offset) > 1;
            const isLeaving = leaving?.index === index;
            const isActive = offset === 0;
            const isFlipped = flippedIndex === index;
            return <motion.article key={project.id} className={styles.deckCard} data-active={isActive} data-flipped={isFlipped} aria-hidden={!isActive} inert={hidden || isLeaving || (!isActive && !isLeaving)} initial={false} data-autopause
              animate={{ x: isLeaving ? `${-leaving.direction * 95}%` : `${offset * 28}%`, y: isLeaving ? -15 : isActive && isReading ? -14 : isActive ? 0 : 18, scale: isLeaving ? .98 : isActive ? 1 : .91, rotate: isLeaving ? -leaving.direction * 12 : offset * -5, opacity: hidden || isLeaving ? 0 : 1 }}
              transition={{ duration: reducedMotion ? 0 : .48, ease: [.22,.7,.2,1] }}
              style={{ zIndex: isLeaving ? 8 : isActive ? 6 : 4 - Math.abs(offset), touchAction: "pan-y" }}
              whileHover={isActive && !leaving && !reducedMotion ? { y: isReading ? -22 : -5 } : undefined}
              drag={isActive && !leaving ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={reducedMotion ? 0 : .35} dragMomentum={false}
              whileDrag={reducedMotion ? { cursor: "grabbing" } : { scale: 1.015, rotate: 0, cursor: "grabbing" }}
              onDragStart={() => { suppressClick.current = true; }}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 500) move(info.offset.x < 0 ? 1 : -1); }}
              onAnimationComplete={() => {
                if (!isLeaving) return;
                setLeaving(null);
                const nextStory = pendingFlipIndex.current;
                if (isReading && nextStory === active) {
                  pendingFlipIndex.current = null;
                  showNextStoryFront(nextStory);
                }
              }}>
              <div className={styles.flipInner} data-flipped={isFlipped} data-flipping={isFlipAnimating} onTransitionEnd={event => {
                if (event.target === event.currentTarget && event.propertyName === "transform") setIsFlipAnimating(false);
              }}>
                <div className={styles.cardFace} aria-hidden={isFlipped} inert={isFlipped}>
                  <ExperimentSketch project={project} />
                  <div className={styles.deckCopy}>
                    <div className={styles.projectMeta}><span>{project.category}</span></div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardHook}>{collectionNotes[index].hook}</p>
                    <p className={styles.deckSummary}>{collectionNotes[index].summary}</p>
                    <p className={styles.cardSkills}>{projectSnapshots[index].skills}</p>
                    <button type="button" className={styles.openStory} data-story-open tabIndex={isActive && !isFlipped ? 0 : -1} aria-label={`Read the story of ${project.title}`} onClick={() => {
                      if (suppressClick.current) { suppressClick.current = false; return; }
                      openStory(index);
                    }}>Read the story <ArrowUpRight size={19} aria-hidden="true" /></button>
                  </div>
                </div>
                <div className={styles.cardFaceBack} aria-hidden={!isFlipped} inert={!isFlipped}>
                  <div className={styles.storyToolbar}>
                    <span>{project.category} / {String(index + 1).padStart(2, "0")} of 06</span>
                    <button type="button" data-story-back tabIndex={isActive && isFlipped ? 0 : -1} aria-label="Back to project card" onClick={closeStory}><RotateCcw size={17} aria-hidden="true" /><span>Back to card</span></button>
                  </div>
                  <div className={styles.storyCardContent}>
                    <h3>{project.title}</h3>
                    <p className={styles.cardHook}>{collectionNotes[index].hook}</p>
                    <p className={styles.storySkills}>{projectSnapshots[index].skills}</p>
                    <div className={styles.storyReflections}>
                      <Reflection label="The starting point">{project.problem}</Reflection>
                      <Reflection label="What I built">{project.approach}</Reflection>
                      <Reflection label="What I'm learning">{project.learning}</Reflection>
                    </div>
                  </div>
                  <nav className={styles.storyNavigation} aria-label="Browse project stories">
                    <button type="button" tabIndex={isActive && isFlipped ? 0 : -1} aria-label="Previous project story" onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden="true" /><span>Previous</span></button>
                    <button type="button" tabIndex={isActive && isFlipped ? 0 : -1} aria-label="Next project story" onClick={() => move(1)}><span>Next project</span><ArrowRight size={19} aria-hidden="true" /></button>
                  </nav>
                </div>
              </div>
            </motion.article>;
          })}
        </div>
        <div className={styles.deckControls}>
          <button type="button" aria-label="Previous project" aria-controls="personal-projects" disabled={Boolean(leaving)} onClick={() => move(-1)}><ArrowLeft size={20} /></button>
          <span><strong>{String(active + 1).padStart(2, "0")}</strong> / 06</span>
          <button type="button" aria-label="Next project" aria-controls="personal-projects" disabled={Boolean(leaving)} onClick={() => move(1)}><ArrowRight size={20} /></button>
        </div>
        <div className={styles.collectionIndex} role="group" aria-label="Choose a personal project">{experiments.map((project, index) => <button type="button" key={project.id} aria-pressed={active === index} aria-controls="personal-projects" onClick={() => choose(index)}>{collectionNotes[index].short}</button>)}</div>
      </div>
    </div>
  </section>;
}
