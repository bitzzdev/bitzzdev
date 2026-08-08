"use client";

import { createContext, useContext } from "react";

interface SiteContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  aboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;
}

export const SiteContext = createContext<SiteContextValue>({
  menuOpen: false,
  setMenuOpen: () => {},
  aboutOpen: false,
  setAboutOpen: () => {},
});

export function useSite() {
  return useContext(SiteContext);
}