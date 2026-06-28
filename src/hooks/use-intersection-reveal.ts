"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface UseIntersectionRevealOptions {
  /** Fraction of element visible before reveal. Default 0.1 */
  threshold?: number;
  /** Keep children mounted after first reveal. Default true */
  once?: boolean;
  /** Root margin passed to IntersectionObserver. Default "50px 0px" */
  rootMargin?: string;
  /** When false, observer is skipped and shouldMount stays false. Default true */
  enabled?: boolean;
}

interface UseIntersectionRevealResult<T extends Element> {
  ref: React.RefObject<T | null>;
  shouldMount: boolean;
  prefersReducedMotion: boolean;
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribePrefersReducedMotion(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

/**
 * Observes a sentinel element and returns whether its children should mount.
 * Used by Reveal for lazy mount on scroll.
 */
export function useIntersectionReveal<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  once = true,
  rootMargin = "50px 0px",
  enabled = true,
}: UseIntersectionRevealOptions = {}): UseIntersectionRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotion,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShouldMount(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin, enabled]);

  return { ref, shouldMount, prefersReducedMotion };
}
