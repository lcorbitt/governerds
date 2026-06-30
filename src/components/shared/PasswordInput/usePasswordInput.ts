"use client";

import { useState } from "react";

export function usePasswordInput() {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((current) => !current);
  }

  return { visible, toggleVisible };
}
