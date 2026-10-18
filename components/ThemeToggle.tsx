"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.dataset.theme as "light" | "dark" | undefined;
    if (current) {
      setTheme(current);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  if (!mounted) {
    return <span className="muted">[theme]</span>;
  }

  return (
    <button className="button" type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <span>[{theme === "dark" ? "light" : "dark"}]</span>
    </button>
  );
}
