"use client";

import { useEffect, useRef } from "react";

// Hover, keyboard focus and active presses pause temporarily, never permanently.
export function useAutoBrowse(advance: () => void, delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(advance);
  useEffect(() => { callback.current = advance; }, [advance]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    let visible = false;
    let pressing = false;
    let hovering = hover.matches && element.matches(":hover");
    let lastInteraction = Date.now();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .25;
      lastInteraction = Date.now();
    }, { threshold: .25 });
    observer.observe(element);
    const reset = () => { lastInteraction = Date.now(); };
    const enter = () => {
      hovering = true;
      reset();
    };
    const leave = () => {
      hovering = false;
      reset();
    };
    const press = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-autopause], button, a, summary")) {
        pressing = true;
        reset();
      }
    };
    const release = () => { if (pressing) { pressing = false; reset(); } };
    element.addEventListener("pointerdown", press);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("click", reset);
    element.addEventListener("focusout", reset);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    document.addEventListener("visibilitychange", reset);
    const timer = window.setInterval(() => {
      const pointerOverSection = hovering && hover.matches;
      const focused = element.querySelector(":focus-visible");
      if (!visible || document.hidden || motion.matches || pressing || pointerOverSection || focused || document.querySelector("dialog[open]")) {
        reset();
        return;
      }
      if (Date.now() - lastInteraction >= delay) { callback.current(); reset(); }
    }, 100);
    return () => {
      observer.disconnect(); window.clearInterval(timer);
      element.removeEventListener("pointerdown", press);
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("click", reset);
      element.removeEventListener("focusout", reset);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("visibilitychange", reset);
    };
  }, [delay]);
  return { ref };
}
