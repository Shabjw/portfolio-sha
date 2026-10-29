"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText, MapPin, Plus, X } from "lucide-react";
import coffeeImage from "@/image/curiosity/coffee-cards-v3.webp";
import shuttlecockImage from "@/image/curiosity/shuttlecock.webp";
import seoulImage from "@/image/curiosity/seoul.webp";
import skinventoryImage from "@/image/curiosity/skinventory.webp";
import badmintonImage from "@/image/curiosity/badminton.webp";
import dinosaurImage from "@/image/curiosity/dinosaur.webp";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";
import styles from "./Hero.module.css";

const stories = [
  {
    id: "seoul", number: "01", context: "A little discovery in Seoul",
    annotation: "Wait, you can cancel that?",
    title: "Wait, why doesn't every elevator do this?",
    paragraphs: [
      "In Seoul, I noticed you could cancel a floor selection by pressing the elevator button again. Such a tiny detail, but it made so much sense.",
      "I love noticing little design decisions like that. The kind you barely think about until you realise how much easier they make something."
    ],
    image: seoulImage, alt: "An illuminated elevator button beside a Seoul postcard and travel ticket"
  },
  {
    id: "skinventory", number: "02", context: "A small problem at home",
    annotation: "Wait, do I already own this?",
    title: "An everyday annoyance became an app idea.",
    paragraphs: [
      "I love skincare. Remembering what I already own, what each product does and how everything fits into a routine? A little less fun.",
      "So I started building Skinventory, a personal app to organise products and routines.",
      "It's still evolving, but that's part of what I enjoy: taking a small frustration and gradually turning it into something useful."
    ],
    image: skinventoryImage, alt: "Skincare bottles and a small handwritten product inventory"
  },
  {
    id: "badminton", number: "03", context: "Off the screen",
    annotation: "Watch. Adjust. Try again.", title: "A different kind of strategy.",
    paragraphs: [
      "I've been playing badminton since 2018, and I love how much thinking happens in just a few seconds. Trying to anticipate the next shot, making it look like I'm going one way... then sneaking in a drop shot instead.",
      "Of course, sometimes I'm the one getting completely fooled. That's part of the fun."
    ],
    image: badmintonImage, alt: "A badminton racket and feather shuttlecock on a little court sketch"
  }
] as const;

type StoryId = typeof stories[number]["id"] | "dinosaur";

function scrollToChapter(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.querySelector(event.currentTarget.hash);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}

export function Hero() {
  const [activeStory, setActiveStory] = useState<StoryId | null>(null);
  const [playingStory, setPlayingStory] = useState<StoryId | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const note = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const returnFocus = useRef(true);
  const active = stories.find(story => story.id === activeStory);

  useEffect(() => () => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
  }, []);

  useLayoutEffect(() => {
    const dialog = note.current;
    if (!activeStory || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    // Use the visual viewport so the paper remains centred on mobile too.
    const positionNote = () => {
      const viewport = window.visualViewport;
      const viewWidth = viewport?.width ?? window.innerWidth;
      const viewHeight = viewport?.height ?? window.innerHeight;
      const offsetTop = viewport?.offsetTop ?? 0;
      const offsetLeft = viewport?.offsetLeft ?? 0;
      dialog.style.maxHeight = `${Math.max(80, viewHeight - 32)}px`;
      const width = dialog.offsetWidth;
      const height = dialog.offsetHeight;
      dialog.style.left = `${offsetLeft + Math.max(16, (viewWidth - width) / 2)}px`;
      dialog.style.top = `${offsetTop + Math.max(16, (viewHeight - height) / 2)}px`;
    };

    positionNote();
    const observer = new ResizeObserver(positionNote);
    observer.observe(dialog);
    window.addEventListener("resize", positionNote);
    window.visualViewport?.addEventListener("resize", positionNote);
    window.visualViewport?.addEventListener("scroll", positionNote);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", positionNote);
      window.visualViewport?.removeEventListener("resize", positionNote);
      window.visualViewport?.removeEventListener("scroll", positionNote);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus.current) opener.current?.focus({ preventScroll: true });
    };
  }, [activeStory]);

  function openStory(id: StoryId, button: HTMLButtonElement) {
    if (revealTimer.current) return;
    opener.current = button;
    returnFocus.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveStory(id);
      return;
    }
    setPlayingStory(id);
    revealTimer.current = setTimeout(() => {
      revealTimer.current = null;
      setPlayingStory(null);
      setActiveStory(id);
    }, id === "skinventory" ? 760 : id === "badminton" ? 850 : 620);
  }

  function goToSkinventory(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("personal-projects");
    if (!target) return;
    event.preventDefault();
    returnFocus.current = false;
    note.current?.close();
    // Reuse the existing project selector without changing the work section.
    requestAnimationFrame(() => {
      const choices = target.closest("section")?.querySelectorAll<HTMLButtonElement>('[aria-label="Choose a personal project"] button');
      const skinventory = Array.from(choices ?? []).find(button => button.textContent?.trim() === "Skinventory");
      skinventory?.click();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
      skinventory?.focus({ preventScroll: true });
    });
  }

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.canvas}>
        <svg className={styles.thread} viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M241 319 C302 289 365 171 497 175 C675 178 752 227 925 243 C1093 258 1246 275 1279 390 C1306 480 1289 558 1197 639 C1113 714 1066 770 950 772 C830 774 758 786 720 826" />
          <path d="M244 321 C304 291 365 174 499 178 C673 181 751 230 927 246 C1090 260 1241 274 1276 391 C1303 480 1286 555 1194 637 C1110 712 1068 768 949 770 C831 773 756 788 718 827" className={styles.threadEcho} />
          <circle cx="241" cy="319" r="5" /><circle cx="1157" cy="304" r="5" /><circle cx="1197" cy="639" r="5" />
        </svg>

        <div className={styles.identity}>
          <h1 id="hero-name">Shana Bhojwani</h1>
          <p className={styles.role}>Business Analyst <span aria-hidden="true">·</span> Data, Product &amp; AI</p>
          <div className={styles.introduction}>
            <p className={styles.mainThought}>I notice <span>small things.</span></p>
            <p className={styles.supporting}>Some become questions.<br className={styles.mobileBreak} /> Some become things I build.</p>
          </div>
          <p className={styles.location}><MapPin size={14} strokeWidth={1.5} aria-hidden="true" />Paris-based <span aria-hidden="true">·</span> Open internationally</p>
          <nav className={styles.actions} aria-label="Portfolio shortcuts">
            <a className={styles.primaryAction} href="#work" onClick={scrollToChapter}>View my work <ArrowRight size={17} aria-hidden="true" /></a>
            <a href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "hero_curiosity")}><FileText size={15} aria-hidden="true" />CV <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="#contact" onClick={scrollToChapter}>Contact <ArrowUpRight size={12} aria-hidden="true" /></a>
          </nav>
        </div>

        <div className={styles.stories}>
          {stories.map(story => (
            <article className={`${styles.story} ${styles[story.id]}`} key={story.id} data-playing={playingStory === story.id}>
              <button type="button" className={styles.storyTrigger} aria-label={`Read the story: ${story.annotation}`} aria-haspopup="dialog" aria-expanded={activeStory === story.id} aria-controls="hero-story-note" onClick={event => openStory(story.id, event.currentTarget)}>
                <span className={styles.art}>
                  <span className={styles.artImage}>
                  <Image src={story.image} alt={story.alt} sizes="(max-width: 767px) 160px, (max-width: 1100px) 260px, 390px" priority={story.id !== "badminton"} />
                  {story.id === "skinventory" ? <><span className={styles.serumCap} aria-hidden="true"><Image src={story.image} alt="" sizes="(max-width: 767px) 160px, 345px" /></span><span className={styles.serumDrop} aria-hidden="true" /></> : null}
                  {story.id === "seoul" ? <span className={styles.elevatorGlow} aria-hidden="true" /> : null}
                  {story.id === "badminton" ? <svg className={styles.trajectory} viewBox="0 0 320 130" fill="none" aria-hidden="true">
                    <path d="M22 88 C90 12 190 3 244 40 C273 62 224 72 231 112" />
                    {playingStory === "badminton" ? <g className={styles.flightShuttle}>
                      <animateMotion ref={animation => { if (animation instanceof SVGAnimationElement) animation.beginElement(); }} dur="0.78s" begin="indefinite" fill="freeze" rotate="auto" path="M22 88 C90 12 190 3 244 40 C273 62 224 72 231 112" />
                      <g transform="rotate(-35)"><image href={shuttlecockImage.src} x="-24" y="-18" width="48" height="36" /></g>
                    </g> : null}
                  </svg> : null}
                  </span>
                </span>
                <span className={styles.caption}>
                  <span className={styles.storyContext}><span>{story.number}</span>{story.context}</span>
                  <span className={styles.annotation}>{story.annotation}</span>
                  <span className={styles.plus} data-note-anchor><Plus size={19} strokeWidth={1.5} aria-hidden="true" /></span>
                </span>
              </button>
            </article>
          ))}
        </div>

        <div className={styles.coffee} aria-hidden="true"><Image src={coffeeImage} alt="" sizes="(max-width: 767px) 64px, (max-width: 1100px) 280px, 350px" /></div>
        <button className={styles.dinosaur} data-playing={playingStory === "dinosaur"} type="button" aria-label="A tiny dinosaur. What is it doing here?" aria-describedby="dinosaur-hint" aria-haspopup="dialog" aria-expanded={activeStory === "dinosaur"} aria-controls="hero-story-note" onClick={event => openStory("dinosaur", event.currentTarget)}><Image src={dinosaurImage} alt="A tiny sage-green dinosaur" sizes="72px" /><span id="dinosaur-hint" className={styles.dinoHint} role="tooltip">psst... 🦕</span></button>
        <a className={styles.follow} href="#thinking" onClick={scrollToChapter}>Follow my curiosity <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" /></a>
      </div>

      <dialog ref={note} id="hero-story-note" className={styles.note} aria-labelledby="hero-note-title" onClose={() => setActiveStory(null)} onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'));
        if (!controls.length) return;
        const current = controls.findIndex(control => control === document.activeElement);
        const next = (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
        event.preventDefault();
        controls[next].focus();
      }} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <button className={styles.closeNote} type="button" aria-label="Close story" onClick={() => note.current?.close()} autoFocus><X size={19} strokeWidth={1.5} aria-hidden="true" /></button>
        {activeStory === "dinosaur" ? <>
          <span className={styles.noteEyebrow}>An entirely unnecessary discovery</span>
          <h2 id="hero-note-title">RAWR! 🦖</h2>
          <p>Okay, that sounded a lot scarier in my head.</p>
          <p>I just really like dinosaurs.</p>
        </> : active ? <>
          <span className={styles.noteEyebrow}>{active.number} / {active.context}</span>
          <h2 id="hero-note-title">{active.title}</h2>
          {active.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {active.id === "skinventory" ? <a className={styles.projectLink} href="#personal-projects" onClick={goToSkinventory}>Meet Skinventory <ArrowUpRight size={16} aria-hidden="true" /></a> : null}
        </> : null}
      </dialog>
    </section>
  );
}
