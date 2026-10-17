import { Wrench, Cpu, Bot, Code, Database, Cloud, Server, Terminal,
  Smartphone, Monitor, Wifi, Bluetooth, Zap, Battery, Lightbulb,
  CircuitBoard, HardDrive, Router, Radio, Settings, Cog,
  GitBranch, Github, FileCode, Binary, Braces, Palette,
  Brain, Network, Cable, Gauge, Rocket, Star, Award
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useTheme } from "../context/ThemeContext";

const HIGHLIGHT_ICONS = {
  Cpu, Bot, Wrench, Code, Database, Cloud, Server, Terminal,
  Smartphone, Monitor, Wifi, Bluetooth, Zap, Battery, Lightbulb,
  CircuitBoard, HardDrive, Router, Radio, Settings, Cog,
  GitBranch, Github, FileCode, Binary, Braces, Palette,
  Brain, Network, Cable, Gauge, Rocket, Star, Award
};

export default function Skills() {
  const { theme } = useTheme();
  const { content } = useContent();
  const skills = content.skills || { highlights: [], categories: [] };

  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "3px dashed var(--accent)",
            borderLeft: "3px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-2 pt-4">
          <p className="theme-muted text-sm font-medium flex items-center justify-center gap-2">
            <Wrench size={16} />
            <span>Explore</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            My <span className="theme-accent">Skill Set</span>
          </h1>
        </div>
      </header>

      {/* ============ HIGHLIGHT CARDS ============ */}
      {skills.highlights?.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {skills.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[h.icon] || Cpu;
            return (
              <div
                key={i}
                className="theme-card theme-shadow rounded-2xl p-8
                           transition-transform duration-200 hover:scale-[1.02]"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto"
                  style={{ backgroundColor: "var(--accent-soft)" }}
                >
                  <Icon size={32} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-center text-xl font-bold theme-accent mb-3">
                  {h.title}
                </h3>
                <p className="text-center text-sm theme-body leading-relaxed mb-5">
                  {h.description}
                </p>
                {h.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {h.skills.map((s, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "var(--accent-soft)",
                          color: "var(--accent)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============ CATEGORIES ============ */}
      {skills.categories?.map((cat, i) => (
        <section key={i} className="space-y-5">
          <h2 className="section-bar text-xl md:text-2xl font-bold theme-heading">
            {cat.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {cat.skills.map((skill, j) => (
              <SkillRow key={j} skill={skill} theme={theme} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SkillRow({ skill, theme }) {
  const isDark = theme === "dark";
  
  // Decide which icon to show based on the toggle
  // Auto-detect if the old `icon` field actually holds a URL
  const isOldUrl = skill.icon && (skill.icon.startsWith("http") || skill.icon.startsWith("data:"));
  
  // Decide which icon to show based on the toggle (or old data)
  const baseUrl = skill.iconUrl || (isOldUrl ? skill.icon : "");
  const showUrl = (skill.useUrl && skill.iconUrl) || isOldUrl;
  
  // Theme-specific URL logic
  let finalUrl = baseUrl;
  if (isDark && skill.iconDark) {
    finalUrl = skill.iconDark; // Use dark mode specific logo if provided
  }
  
  const LucideIcon = HIGHLIGHT_ICONS[skill.icon] || Wrench;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          {showUrl ? (
            <img
              src={finalUrl}
              alt={skill.name}
              className="w-6 h-6 object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <LucideIcon size={18} style={{ color: "var(--accent)" }} />
          )}
        </div>
        <span className="font-semibold theme-heading text-sm flex-1">
          {skill.name}
        </span>
        <span className="text-xs font-bold theme-accent">
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${skill.level}%`,
            backgroundColor: "var(--accent)",
          }}
        />
      </div>

      {/* Description */}
      {skill.description && (
        <p className="text-xs theme-muted leading-relaxed">
          {skill.description}
        </p>
      )}
    </div>
  );
}