"use client";

import { useEffect, useRef, useState } from "react";

// Rotation stops while someone is reading, interacting, or has opened a story.
export function useAutoBrowse(advance: () => void, delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(advance);
  const [paused, setPaused] = useState(false);
  useEffect(() => { callback.current = advance; }, [advance]);
  useEffect(() => {
    const element = ref.current;
    if (!element || paused) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let hovering = window.matchMedia("(hover: hover)").matches && element.matches(":hover");
    let lastInteraction = Date.now();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastInteraction = Date.now(); }, { threshold: 0.25 });
    observer.observe(element);
    const enter = (event: PointerEvent) => { hovering = event.pointerType === "mouse"; };
    const leave = () => { hovering = false; lastInteraction = Date.now(); };
    const interact = () => { lastInteraction = Date.now(); };
    const takeControl = (event: Event) => {
      if (event.target instanceof Element && !event.target.closest("[data-autoplay-control]")) setPaused(true);
    };
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointerdown", interact);
    element.addEventListener("pointerdown", takeControl);
    element.addEventListener("click", takeControl);
    element.addEventListener("focusout", interact);
    element.addEventListener("scroll", interact, true);
    document.addEventListener("visibilitychange", interact);
    const timer = window.setInterval(() => {
      if (!visible || hovering || document.hidden || motion.matches || element.contains(document.activeElement) || element.querySelector("details[open]")) return;
      if (Date.now() - lastInteraction >= delay) { callback.current(); lastInteraction = Date.now(); }
    }, 500);
    return () => {
      observer.disconnect(); window.clearInterval(timer);
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointerdown", interact);
      element.removeEventListener("pointerdown", takeControl);
      element.removeEventListener("click", takeControl);
      element.removeEventListener("focusout", interact);
      element.removeEventListener("scroll", interact, true);
      document.removeEventListener("visibilitychange", interact);
    };
  }, [delay, paused]);
  return { ref, paused, toggle: () => setPaused(value => !value) };
}
