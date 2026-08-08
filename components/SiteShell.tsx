"use client";

import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import MobileMenu from "@/components/MobileMenu";
import AboutModal from "@/components/AboutModal";
import { SiteContext } from "@/components/site-context";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const stopScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    const lenis = (window as any).__bitz_lenis;
    if (lenis) lenis.stop();
  }, []);

  const startScroll = useCallback(() => {
    document.body.style.overflow = "";
    const lenis = (window as any).__bitz_lenis;
    if (lenis) lenis.start();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    (window as any).__bitz_lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onAnchor = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash) return;
      e.preventDefault();
      const target = document.querySelector<HTMLElement>(hash);
      if (target) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
      (window as any).__bitz_lenis = undefined;
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observeNew = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.visible)").forEach((el) => {
        revealObserver.observe(el);
      });
    };

    const mutationObserver = new MutationObserver(observeNew);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    observeNew();

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (menuOpen || aboutOpen) stopScroll();
    else startScroll();
  }, [menuOpen, aboutOpen, stopScroll, startScroll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setAboutOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SiteContext.Provider value={{ menuOpen, setMenuOpen, aboutOpen, setAboutOpen }}>
      <Nav />
      <MobileMenu />
      <AboutModal />
      {children}
    </SiteContext.Provider>
  );
}