import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "myra-reduce-motion";

function readInitial(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "true";
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function applyAttr(value: boolean) {
  if (typeof document === "undefined") return;
  if (value) document.documentElement.setAttribute("data-reduce-motion", "true");
  else document.documentElement.removeAttribute("data-reduce-motion");
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState<boolean>(() => {
    const v = readInitial();
    applyAttr(v);
    return v;
  });

  useEffect(() => {
    applyAttr(reduced);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(reduced));
    } catch {}
  }, [reduced]);

  const toggle = useCallback(() => setReduced((r) => !r), []);
  return { reduced, toggle, setReduced };
}
