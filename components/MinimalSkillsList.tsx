"use client";

import { useEffect, useState } from "react";

interface SkillItem {
  name: string;
  slug: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "languages",
    skills: [
      { name: "C++", slug: "cpp" },
      { name: "C", slug: "c" },
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
    ],
  },
  {
    title: "systems & os",
    skills: [
      { name: "Arch Linux", slug: "arch-linux" },
      { name: "Linux", slug: "tux" },
      { name: "Hyprland", slug: "hyprland" },
    ],
  },
  {
    title: "cli & shells",
    skills: [
      { name: "Fish", slug: "fish" },
      { name: "Bash", slug: "bash" },
    ],
  },
  {
    title: "dev & tools",
    skills: [
      { name: "Zed", slug: "zed" },
      { name: "Neovim", slug: "neovim" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
    ],
  },
];

export default function MinimalSkillsList() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const getStoredTheme = () => {
      const root = document.documentElement;
      const t = root.dataset.theme;
      if (t === "light" || t === "dark") return t;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    setTheme(getStoredTheme());

    const observer = new MutationObserver(() => {
      setTheme(getStoredTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mini-skills-wrap">
      <div className="mini-skills-head">
        <span className="dossier-label">Technical Stack &amp; Environment</span>
      </div>
      <div className="mini-skills-list">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title} className="mini-skills-row">
            <span className="mini-skills-cat">{cat.title}</span>
            <div className="mini-skills-items">
              {cat.skills.map((skill) => {
                const svgPath =
                  theme === "dark"
                    ? `/ascii/${skill.slug}.dark.svg`
                    : `/ascii/${skill.slug}.svg`;

                return (
                  <span key={skill.slug} className="mini-skill-pill">
                    <img
                      src={svgPath}
                      alt={skill.name}
                      className="mini-skill-icon"
                      loading="lazy"
                    />
                    <span className="mini-skill-name">{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
