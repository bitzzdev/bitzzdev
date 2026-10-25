"use client";

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "languages",
    skills: [
      { name: "C++", icon: "/icons/cpp.svg" },
      { name: "C", icon: "/icons/c.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
    ],
  },
  {
    title: "systems & os",
    skills: [
      { name: "Arch Linux", icon: "/icons/arch-linux.svg" },
      { name: "Linux", icon: "/icons/linux.svg" },
      { name: "Hyprland", icon: "/icons/hyprland.svg" },
    ],
  },
  {
    title: "cli & shells",
    skills: [
      { name: "Fish", icon: "/icons/fish.svg" },
      { name: "Bash", icon: "/icons/bash.svg" },
    ],
  },
  {
    title: "dev & tools",
    skills: [
      { name: "Zed", icon: "/icons/zed.svg" },
      { name: "Neovim", icon: "/icons/neovim.svg" },
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
    ],
  },
];

export default function MinimalSkillsList() {
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
              {cat.skills.map((skill) => (
                <span key={skill.name} className="mini-skill-pill">
                  <img
                    src={skill.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="mini-skill-icon"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="mini-skill-name">{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
