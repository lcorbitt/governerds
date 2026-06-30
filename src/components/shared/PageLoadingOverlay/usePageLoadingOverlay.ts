"use client";

import { useEffect, useState } from "react";

import { FADE_MS, SHOW_DELAY_MS } from "./constants";

interface UsePageLoadingOverlayOptions {
  active: boolean;
  immediate?: boolean;
}

export function usePageLoadingOverlay({
  active,
  immediate = false,
}: UsePageLoadingOverlayOptions) {
  const [mounted, setMounted] = useState(immediate && active);
  const [visible, setVisible] = useState(immediate && active);

  useEffect(() => {
    let showTimer: number | undefined;
    let fadeTimer: number | undefined;
    let unmountTimer: number | undefined;

    if (!active) {
      fadeTimer = window.setTimeout(() => {
        setVisible(false);
        unmountTimer = window.setTimeout(() => setMounted(false), FADE_MS);
      }, 0);
    } else {
      fadeTimer = window.setTimeout(() => {
        setMounted(true);
        if (immediate) {
          setVisible(true);
        } else {
          showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
        }
      }, 0);
    }

    return () => {
      if (showTimer !== undefined) window.clearTimeout(showTimer);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
      if (unmountTimer !== undefined) window.clearTimeout(unmountTimer);
    };
  }, [active, immediate]);

  useEffect(() => {
    if (!mounted || !visible) return;

    document.body.setAttribute("aria-busy", "true");
    return () => {
      document.body.removeAttribute("aria-busy");
    };
  }, [mounted, visible]);

  return { mounted, visible };
}
