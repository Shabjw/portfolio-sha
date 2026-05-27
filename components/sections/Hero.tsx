"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";

function ObservatorySky({ glow }: { glow: { x: number; y: number } }) {
  const responsiveShift = {
    transform: `translate3d(${(glow.x - 50) * 0.05}px, ${(glow.y - 38) * 0.05}px, 0)`
  };

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_15%,rgba(255,176,92,.62),transparent_25rem),radial-gradient(circle_at_77%_11%,rgba(191,142,187,.34),transparent_29rem),radial-gradient(circle_at_58%_56%,rgba(116,151,184,.56),transparent_38rem),linear-gradient(135deg,#dc8f50_0%,#a46e83_27%,#6d91b0_58%,#274866_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,231,199,.26),rgba(96,131,166,.18)_44%,rgba(30,56,82,.48))]" />
      <div className="absolute inset-0 opacity-20 paper-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0,transparent_51%,rgba(47,47,68,.18)_100%)]" />
      <div className="ambient-orb left-[9%] top-[12%] h-80 w-80 bg-[#ffd08a]/32" />
      <div className="ambient-orb right-[14%] top-[8%] h-96 w-96 bg-[#c6b9ef]/24" />
      <div className="ambient-orb bottom-[16%] right-[30%] h-72 w-72 bg-[#e9f3ff]/16 breathe-glow" />
      <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-white/70 shadow-[90px_34px_0_rgba(255,255,255,.28),210px_-18px_0_rgba(255,255,255,.22),520px_22px_0_rgba(255,255,255,.32),760px_80px_0_rgba(255,255,255,.22),980px_12px_0_rgba(255,255,255,.28)]" />
      <svg className="absolute right-[9%] top-[18%] h-44 w-72 text-white/16 transition-transform duration-700" style={responsiveShift} viewBox="0 0 280 170" fill="none" aria-hidden="true">
        <path className="signal-draw [animation-delay:.8s]" d="M32 118 88 74l58 22 96-58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle className="signal-pulse" cx="32" cy="118" r="2.4" fill="currentColor" />
        <circle className="signal-pulse [animation-delay:.7s]" cx="146" cy="96" r="2.4" fill="currentColor" />
        <circle className="signal-pulse [animation-delay:1.3s]" cx="242" cy="38" r="2.4" fill="currentColor" />
        <circle className="orbit-soft opacity-35 [animation-duration:28s]" cx="166" cy="86" r="46" stroke="currentColor" strokeWidth=".6" strokeDasharray="2 10" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#f7efe2]" />
    </>
  );
}

function LaptopScreen() {
  return (
    <div className="absolute left-1/2 top-8 z-30 h-[276px] w-[min(82vw,610px)] -translate-x-1/2 rounded-[2.1rem] bg-[#17263a] p-4 shadow-[0_56px_150px_rgba(70,70,92,.42)] ring-1 ring-white/28 md:h-[324px]">
      <div className="absolute -inset-10 -z-10 rounded-[3.2rem] bg-[#ffc37b]/18 blur-3xl" />
      <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-[#203954]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,205,140,.34),transparent_15rem),radial-gradient(circle_at_80%_42%,rgba(184,178,224,.25),transparent_18rem)]" />
        <div className="absolute inset-0 opacity-20 paper-grid" />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_8%,rgba(255,255,255,.18)_31%,transparent_43%,transparent)] opacity-60" />
        <div className="absolute -left-24 top-20 h-20 w-[145%] rotate-[-15deg] bg-white/10 blur-2xl" />

        <div className="absolute left-7 top-6 text-[10px] uppercase tracking-[0.28em] text-[#ffe0ac]/78">Shana OS · operational snapshot</div>
        <div className="absolute right-7 top-6 rounded-full bg-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white/68 ring-1 ring-white/10">Business Analyst · Product Ops</div>

        <div className="absolute left-7 top-16 h-[94px] w-[178px] rounded-2xl bg-white/9 p-3 ring-1 ring-white/12 scanline">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/52">analytics</p>
          <p className="mt-1 text-[18px] font-semibold text-[#fff4da]">+40%</p>
          <p className="-mt-0.5 text-[9px] text-[#ffe0ac]/74">partner engagement</p>
          <div className="mt-3 flex items-end gap-1.5">
            {[18, 25, 22, 34, 31, 42].map((height, index) => (
              <span key={index} className="signal-bar w-4 rounded-t-md bg-[#ffc17d]/70" style={{ height, animationDelay: `${index * 0.22}s` }} />
            ))}
          </div>
        </div>

        <div className="absolute right-7 top-16 h-[94px] w-[218px] rounded-2xl bg-white/8 p-3 ring-1 ring-white/12">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/52">systems map</p>
          <svg className="mt-3 h-12 w-full text-[#ffe0ac]/78" viewBox="0 0 190 54" fill="none">
            <path className="signal-draw" d="M24 28h42m28 0h42m28 0h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            {[
              ["CRM", 22, 28],
              ["Product", 80, 28],
              ["Ops", 142, 28],
              ["Data", 172, 28]
            ].map(([label, cx, cy], index) => (
              <g key={label}>
                <circle className="signal-pulse" style={{ animationDelay: `${index * 0.35}s` }} cx={Number(cx)} cy={Number(cy)} r="3" fill="currentColor" />
                <text x={Number(cx) - 11} y={Number(cy) - 10} fill="currentColor" fontSize="8" opacity=".85">{label}</text>
              </g>
            ))}
          </svg>
          <p className="text-[9px] text-white/58">connecting teams into one shared picture</p>
        </div>

        <div className="absolute left-7 top-[168px] hidden rounded-2xl bg-white/7 px-3 py-2 text-[10px] text-white/70 ring-1 ring-white/10 md:block">
          SQL · Power BI · Metabase · Excel
        </div>

        <div className="absolute right-7 top-[168px] hidden rounded-2xl bg-white/7 px-3 py-2 text-[10px] text-white/70 ring-1 ring-white/10 md:block">
          FR · EN · ES
        </div>

        <div className="absolute bottom-8 left-7 right-7 grid grid-cols-[1fr_.92fr] gap-4">
          <pre className="rounded-2xl bg-[#111b2b]/76 p-4 font-mono text-[10px] leading-5 text-[#ffe0ac]/88">SELECT clarity{"\n"}FROM messy_systems{"\n"}WHERE users = supported;</pre>
          <div className="rounded-2xl bg-[#fff5df]/13 p-4 ring-1 ring-white/12">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/48">profile snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-white/72">
              <span>FR / EN / ES</span>
              <span>Paris based</span>
              <span>Open Europe</span>
              <span>Product · Ops · Data</span>
            </div>
            <p className="mt-3 text-[9px] text-[#ffe0ac]/68">clear systems, useful workflows</p>
          </div>
        </div>

        <div className="absolute left-[52%] top-[52%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_16px_rgba(255,255,255,.7)] transition-transform duration-700" />
      </div>
    </div>
  );
}

function DeskScene({ tilt }: { tilt: { x: number; y: number } }) {
  return (
    <div
      className="relative mx-auto mt-4 h-[420px] w-full max-w-5xl md:mt-0 md:h-[462px]"
      style={{ transform: `perspective(1400px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
    >
      <div className="absolute inset-x-[2%] bottom-[-18px] h-[286px] rounded-[3.5rem] bg-[linear-gradient(135deg,rgba(255,239,213,.58),rgba(151,112,91,.24)_48%,rgba(88,116,150,.18))] shadow-[0_64px_160px_rgba(73,60,70,.38)] ring-1 ring-white/24 backdrop-blur-md md:h-[322px]" />
      <div className="absolute inset-x-[8%] bottom-8 h-[230px] rounded-[2rem] bg-[#6f5348]/22 blur-2xl" />
      <div className="absolute left-[14%] top-[52%] h-28 w-72 rotate-[-8deg] rounded-full bg-[#ffc17d]/17 blur-3xl" />
      <div className="absolute right-[12%] top-[36%] h-40 w-72 rotate-[12deg] rounded-full bg-[#aeb7df]/18 blur-3xl" />

      <div className="absolute left-[7%] top-[92px] h-40 w-56 rounded-[1.4rem] bg-[#fff4df]/92 p-5 text-[#2f251f] shadow-soft ring-1 ring-white/65 float-slower" style={{ "--r": "-8deg" } as CSSProperties}>
        <span className="absolute -top-3 left-9 h-6 w-16 rotate-[5deg] rounded-sm bg-[#f8dfb8]/72 shadow-paper" />
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#7f654f]">working note</p>
        <p className="mt-4 max-w-[11rem] text-[13px] leading-5 text-[#4a382e]">Reduce friction. Keep systems human.</p>
        <div className="mt-4 flex items-center gap-2 text-[9px] text-[#7f654f]/70">
          <span>needs</span>
          <span className="h-px flex-1 bg-[#7f654f]/25" />
          <span>workflow</span>
        </div>
      </div>

      <LaptopScreen />

      <div className="absolute bottom-[58px] left-1/2 z-20 h-10 w-[min(72vw,650px)] -translate-x-1/2 rounded-b-[2.4rem] bg-[#141d2c] shadow-[0_22px_86px_rgba(45,43,60,.35)]" />
      <div className="absolute bottom-[46px] left-1/2 z-10 h-4 w-[min(48vw,420px)] -translate-x-1/2 rounded-full bg-[#f0b76e]/44 blur-md" />

      <div className="absolute bottom-[70px] left-[8%] z-40 hidden h-24 w-24 md:block">
        <div className="absolute left-7 top-7 h-12 w-14 rounded-b-[1.2rem] rounded-t-md bg-[#fff4df]/92 shadow-paper ring-1 ring-white/70" />
        <div className="absolute left-[4.4rem] top-10 h-6 w-5 rounded-r-full border-2 border-[#fff4df]/85" />
        <div className="absolute left-9 top-[3.1rem] h-2 w-10 rounded-full bg-[#7f654f]/30" />
        <span className="steam absolute left-10 top-2 h-10 w-4 rounded-full border-l border-[#fff4df]/65 [animation-delay:.2s]" />
        <span className="steam absolute left-14 top-0 h-12 w-5 rounded-full border-l border-[#fff4df]/50 [animation-delay:1s]" />
        <span className="steam absolute left-8 top-1 h-11 w-5 rounded-full border-l border-[#fff4df]/45 [animation-delay:1.8s]" />
      </div>

      <div className="absolute right-[7%] top-[116px] z-40 w-60 rounded-[1.5rem] bg-[#f7e6cc]/92 p-4 text-[#2f251f] shadow-soft ring-1 ring-white/60 float-slow" style={{ "--r": "7deg" } as CSSProperties}>
        <span className="absolute -top-2 right-10 h-5 w-14 rotate-[-8deg] rounded-sm bg-[#f8dfb8]/62" />
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#7f654f]">Paris-based · open to Spain / Europe</p>
        <div className="relative mt-4 h-24 rounded-2xl bg-[#4c6683]/12 paper-grid">
          <span className="absolute left-4 top-3 text-[9px] text-[#7f654f]/70">Paris</span>
          <span className="absolute right-5 top-3 text-[9px] text-[#7f654f]/70">Madrid</span>
          <span className="absolute bottom-3 right-12 text-[9px] text-[#7f654f]/70">Portugal</span>
          <span className="absolute left-9 top-12 h-2 w-2 rounded-full bg-[#253b56]" />
          <span className="absolute right-11 top-7 h-2 w-2 rounded-full bg-[#e2a75e]" />
          <span className="absolute bottom-7 right-20 h-2 w-2 rounded-full bg-[#7f654f]" />
          <div className="signal-line absolute left-11 top-12 h-px w-32 rotate-[-15deg] bg-[#253b56]/35" />
          <div className="signal-line absolute right-12 top-10 h-px w-20 rotate-[42deg] bg-[#253b56]/25 [animation-delay:1.1s]" />
        </div>
        <p className="mt-3 text-[10px] leading-4 text-[#5e4738]/76">FR / EN / ES · international product, ops and data roles.</p>
      </div>

      <div className="hover-lift absolute bottom-[80px] right-[20%] z-40 hidden w-28 rotate-[-5deg] rounded-sm bg-[#fff7e7] p-2 shadow-paper ring-1 ring-white/70 md:block" style={{ "--hover-r": "-2deg" } as CSSProperties}>
        <div className="grid h-20 place-items-center rounded-sm bg-[linear-gradient(135deg,#f0a45e,#718eae)]">
          <svg className="h-12 w-12 text-[#2f251f]/70" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M10 30c6-14 15-15 25-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 28c2 6 7 9 14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M29 20c3-5 6-7 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="35" cy="18" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <p className="mt-2 text-center text-[9px] text-[#7f654f]">sunset field note</p>
      </div>

      <div className="absolute bottom-[64px] left-[21%] z-20 h-24 w-24 rounded-full border border-[#f3c88c]/32 opacity-70">
        <div className="h-full w-full rounded-full border border-[#7f654f]/18" />
      </div>
      <div className="absolute bottom-[76px] left-[31%] z-40 rotate-[-8deg] rounded-xl bg-[#fff6df]/92 px-3 py-2 text-[10px] text-[#7f654f] shadow-paper">
        clarity leaves traces · 𓆈
      </div>
      <div className="absolute left-[42%] bottom-[38px] z-40 h-2 w-2 rounded-full bg-[#fff6df]/80 shadow-[0_0_18px_rgba(255,246,223,.65)]" />
    </div>
  );
}

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 38 });

  function onMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 3.2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * -2.4
    });
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  }

  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-[#436985] text-white"
      onMouseMove={onMove}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setGlow({ x: 50, y: 38 });
      }}
    >
      <ObservatorySky glow={glow} />
      <div
        className="pointer-events-none absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff0cc]/12 blur-3xl transition-all duration-700"
        style={{ left: `${glow.x}%`, top: `${glow.y}%` }}
      />

      <div className="cinematic-shell relative z-20 flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-12 pt-16 md:pb-16 md:pt-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative z-30 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.36em] text-[#fff0cc]/80">Shana Bhojwani · Business Analyst · Product Operations</p>
            <h1 className="mt-5 max-w-4xl font-display font-semibold leading-[0.96] tracking-tight text-[#fff9ed]" style={{ fontSize: "clamp(2.55rem, min(4.8vw, 7.8dvh), 4.95rem)" }}>
              Turning messy systems into calmer workflows.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-[#fff4da]/86 md:text-xl">
              Business Analyst · Product Operations · CRM, data and workflow clarity
            </p>
          </div>

          <DeskScene tilt={tilt} />

          <div className="relative z-30 -mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="max-w-2xl text-base leading-7 text-[#fff8ec]/78 md:text-lg">{portfolioData.person.identity}</p>
              <p className="mt-3 text-sm text-[#fff0cc]/78">{portfolioData.person.meta}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild><a href="#work">View selected work <ArrowRight className="h-4 w-4" /></a></Button>
              <Button asChild variant="secondary"><a href={portfolioData.person.cv} onClick={() => trackEvent("cv_download_click", "hero")}><FileText className="h-4 w-4" /> Download CV</a></Button>
              <Button asChild variant="ghost"><a className="text-[#fff9ed] hover:bg-white/10" href="#contact"><Mail className="h-4 w-4" /> Contact</a></Button>
            </div>
          </div>

          <div className="relative z-30 mt-8 flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.24em] text-[#fff0cc]/54">
            <span>late evening systems thinking</span>
            <span>visual thinking</span>
            <span>small systems, useful outcomes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
