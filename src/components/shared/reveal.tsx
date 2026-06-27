"use client";

import { useEffect, useState } from "react";
import type { ElementType, ReactNode } from "react";

import { useIntersectionReveal } from "@/hooks/use-intersection-reveal";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Fraction of element visible before reveal. Default 0.1 */
  threshold?: number;
  /** Keep children mounted after first reveal. Default true */
  once?: boolean;
  /** Delay before fade-in starts (ms). Useful for stagger. Default 0 */
  delay?: number;
  as?: ElementType;
}

/**
 * Lazy-mounts children when the wrapper enters the viewport, then fades them in.
 * Defers rendering until scroll brings the section into view for lighter pages.
 */
export function Reveal({
  children,
  className,
  threshold = 0.1,
  once = true,
  delay = 0,
  as: Component = "div",
}: RevealProps) {
  const { ref, shouldMount, prefersReducedMotion } = useIntersectionReveal({
    threshold,
    once,
  });
  const [delayedVisible, setDelayedVisible] = useState(false);
  const visible = shouldMount && (prefersReducedMotion || delayedVisible);

  useEffect(() => {
    if (!shouldMount || prefersReducedMotion) {
      return;
    }

    let rafId = 0;
    const delayTimer = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(() => setDelayedVisible(true));
    }, delay);

    return () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
      setDelayedVisible(false);
    };
  }, [shouldMount, prefersReducedMotion, delay]);

  return (
    <Component
      ref={ref}
      className={cn(
        className,
        shouldMount &&
          !prefersReducedMotion &&
          "transition-[opacity,transform] duration-150 ease-in-out",
        shouldMount &&
          !prefersReducedMotion &&
          !visible &&
          "translate-y-2 opacity-0",
        shouldMount &&
          !prefersReducedMotion &&
          visible &&
          "translate-y-0 opacity-100",
      )}
    >
      {shouldMount ? children : null}
    </Component>
  );
}
