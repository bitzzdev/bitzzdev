"use client";

import { useEffect, useState } from "react";

interface SkillItem {
  name: string;
  category: "languages" | "systems" | "tools" | "design";
  slug: string;
  tag: string;
  desc: string;
}

const SKILLS: SkillItem[] = [
  // Languages
  {
    name: "C++",
    category: "languages",
    slug: "cpp",
    tag: "Native / Systems",
    desc: "High-performance systems programming, memory safety & computational pipelines.",
  },
  {
    name: "C",
    category: "languages",
    slug: "c",
    tag: "Low-Level Core",
    desc: "Procedural low-level logic, pointers, memory models, and core system utilities.",
  },
  {
    name: "Python",
    category: "languages",
    slug: "python",
    tag: "Tooling & Scripting",
    desc: "Rapid automation, backend APIs, data manipulation, and developer utilities.",
  },
  {
    name: "JavaScript",
    category: "languages",
    slug: "javascript",
    tag: "Web & Runtime",
    desc: "Modern asynchronous web engineering, DOM execution, and dynamic architectures.",
  },

  // Systems & OS
  {
    name: "Arch Linux",
    category: "systems",
    slug: "arch-linux",
    tag: "Daily Driver OS",
    desc: "Rolling-release minimalist Linux environment tuned for speed and full control.",
  },
  {
    name: "Linux (Kernel / OS)",
    category: "systems",
    slug: "tux",
    tag: "Kernel & Ecosystem",
    desc: "Process scheduling, POSIX semantics, device nodes, and system services.",
  },
  {
    name: "Hyprland",
    category: "systems",
    slug: "hyprland",
    tag: "Wayland Compositor",
    desc: "Dynamic tiling Wayland compositor configured for fluid, tear-free workflows.",
  },
  {
    name: "Fish Shell",
    category: "systems",
    slug: "fish",
    tag: "Interactive Shell",
    desc: "Smart autosuggestions, clean tab completions, and prompt scripting.",
  },
  {
    name: "Bash",
    category: "systems",
    slug: "bash",
    tag: "Shell Automation",
    desc: "Deterministic automation scripts, CI pipelines, and POSIX shell tooling.",
  },

  // Developer Tools
  {
    name: "Zed Editor",
    category: "tools",
    slug: "zed",
    tag: "High-Performance Editor",
    desc: "High-performance GPU-accelerated code editor used daily for lightning-fast edits.",
  },
  {
    name: "Neovim",
    category: "tools",
    slug: "neovim",
    tag: "Modal Terminal Editor",
    desc: "Extensible modal text editing, custom Lua configurations, and keyboard-driven efficiency.",
  },
  {
    name: "Git",
    category: "tools",
    slug: "git",
    tag: "Version Control",
    desc: "Branching workflows, atomic commit history, rebase pipelines, and tree tracking.",
  },
  {
    name: "GitHub",
    category: "tools",
    slug: "github",
    tag: "Collaboration & CI",
    desc: "Open-source collaboration, repository workflows, release automation, and code review.",
  },
  {
    name: "Software Engineering",
    category: "tools",
    slug: "software",
    tag: "Architecture & Systems",
    desc: "Full lifecycle engineering, modular structure, test boundaries, and scalability.",
  },

  // Design & UI/UX
  {
    name: "UI / UX Design",
    category: "design",
    slug: "ui-ux",
    tag: "Human Interface",
    desc: "User experience design (UED), information hierarchy, and user-centric flows.",
  },
  {
    name: "Figma",
    category: "design",
    slug: "figma",
    tag: "Interface Prototyping",
    desc: "Design tokens, auto-layout components, vector ergonomics, and interactive wireframes.",
  },
];

export default function SkillsAsciiGrid() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeFilter, setActiveFilter] = useState<string>("all");

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

  const filtered = activeFilter === "all" ? SKILLS : SKILLS.filter((s) => s.category === activeFilter);

  return (
    <div className="skills-section">
      {/* Category Filter Tabs */}
      <div className="skills-filters">
        <button
          type="button"
          className={`skills-tab ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          [all ({SKILLS.length})]
        </button>
        <button
          type="button"
          className={`skills-tab ${activeFilter === "languages" ? "active" : ""}`}
          onClick={() => setActiveFilter("languages")}
        >
          [languages]
        </button>
        <button
          type="button"
          className={`skills-tab ${activeFilter === "systems" ? "active" : ""}`}
          onClick={() => setActiveFilter("systems")}
        >
          [systems &amp; os]
        </button>
        <button
          type="button"
          className={`skills-tab ${activeFilter === "tools" ? "active" : ""}`}
          onClick={() => setActiveFilter("tools")}
        >
          [developer tools]
        </button>
        <button
          type="button"
          className={`skills-tab ${activeFilter === "design" ? "active" : ""}`}
          onClick={() => setActiveFilter("design")}
        >
          [ui / ux design]
        </button>
      </div>

      {/* Grid of Skill Cards */}
      <div className="skills-grid">
        {filtered.map((skill) => {
          const svgPath =
            theme === "dark"
              ? `/ascii/${skill.slug}.dark.svg`
              : `/ascii/${skill.slug}.svg`;

          return (
            <div key={skill.slug} className="skill-card">
              <div className="skill-ascii-wrap">
                <img
                  src={svgPath}
                  alt={`${skill.name} in ascii`}
                  className="skill-ascii-img"
                  loading="lazy"
                />
              </div>
              <div className="skill-content">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-tag">{skill.tag}</span>
                </div>
                <p className="skill-desc">{skill.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Driver Environment Dossier Note */}
      <div className="env-note">
        <span className="env-tag">DAILY DRIVER SETUP</span>
        <span>
          Arch Linux &bull; Fish Shell &bull; Hyprland (Wayland) &bull; Zed Editor / Neovim
        </span>
      </div>
    </div>
  );
}
