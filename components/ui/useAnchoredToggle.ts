"use client";

import { useCallback, useRef, useState } from "react";

export const useAnchoredToggle = () => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const nodes = useRef(new Map<string, HTMLElement>());

  const register = useCallback((slug: string, node: HTMLElement | null) => {
    if (node) {
      nodes.current.set(slug, node);
    } else {
      nodes.current.delete(slug);
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    const node = nodes.current.get(slug);
    const before = node?.getBoundingClientRect().top ?? null;

    setOpenSlug((current) => (current === slug ? null : slug));

    if (before === null || !node) return;

    requestAnimationFrame(() => {
      const after = node.getBoundingClientRect().top;
      const delta = after - before;
      if (Math.abs(delta) > 1) {
        window.scrollBy({ top: delta, behavior: "instant" });
      }
    });
  }, []);

  return { openSlug, toggle, register };
};
