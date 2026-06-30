"use client";

import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  HIDDEN_CLASS,
  TRANSITION_ACTIVE_CLASS,
  VISIBLE_CLASS,
} from "./constants";
import { useReveal } from "./useReveal";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Fraction of element visible before reveal. Default 0.1 */
  threshold?: number;
  /** Keep children mounted after first reveal. Default true */
  once?: boolean;
  /** Delay before fade-in starts (ms). Useful for stagger. Default 0 */
  delay?: number;
  /**
   * Mount on first paint and animate in without waiting for scroll into view.
   * Use for above-the-fold content (e.g. landing hero).
   */
  immediate?: boolean;
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
  immediate = false,
  as: Component = "div",
}: RevealProps) {
  const { ref, shouldMount, prefersReducedMotion, canTransition, visible } =
    useReveal({ threshold, once, delay, immediate });

  return (
    <Component
      ref={ref}
      className={cn(
        className,
        shouldMount &&
          !prefersReducedMotion &&
          canTransition &&
          TRANSITION_ACTIVE_CLASS,
        shouldMount && !prefersReducedMotion && !visible && HIDDEN_CLASS,
        shouldMount && !prefersReducedMotion && visible && VISIBLE_CLASS,
      )}
    >
      {shouldMount ? children : null}
    </Component>
  );
}
