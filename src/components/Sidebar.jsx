import {
  User, GraduationCap, Briefcase, Wrench, Award, Trophy,
  Folder, Heart, Send, Sun, Moon, ChevronLeft, ChevronRight,
  Settings, Globe,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { personal, menuItems } from "../data/content";
import RotatingTitle from "./RotatingTitle";
import StatusDot from "./StatusDot";

const ICONS = {
  User, GraduationCap, Briefcase, Wrench, Award, Trophy,
  Folder, Heart, Send,
};

export default function Sidebar({ activeSection, setActiveSection }) {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const nameParts = personal.name.split(" ");

  const goToContact = () => setActiveSection("contact");

  return (
    <aside
      className={`theme-sidebar theme-shadow fixed top-0 left-0 h-screen z-40
        flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-[280px]"}`}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full theme-card
                   theme-border border flex items-center justify-center
                   theme-heading hover:theme-accent transition-colors z-50"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Top: photo + name + title */}
      <div className="px-6 pt-8 pb-6">
        {/* Photo / initials */}
               <div className="relative w-20 h-20 mx-auto mb-4" style={{ overflow: "visible" }}>
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-2xl theme-bg-accent
                            theme-on-accent flex items-center justify-center
                            text-2xl font-bold">
              FS
            </div>
          )}

             {/* Status dot with motivational tooltip — visible even when collapsed */}
          {personal.statusDot && (
            <StatusDot onClick={goToContact} collapsed={collapsed} />
          )}
        </div>

        {/* Name */}
        {!collapsed && (
          <>
            <h2 className="text-center text-lg font-bold theme-heading leading-tight">
              {nameParts.map((word, i) => (
                <span key={i}>
                  {word === personal.nameHighlight ? (
                    <span className="theme-accent">{word}</span>
                  ) : (
                    word
                  )}
                  {i < nameParts.length - 1 && " "}
                </span>
              ))}
            </h2>

            {/* Rotating title */}
            <RotatingTitle titles={personal.titles} interval={2500} />
          </>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = ICONS[item.icon] || User;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm
                border-t theme-border transition-colors duration-200
                ${isActive
                  ? "theme-bg-accent theme-on-accent font-semibold"
                  : "theme-heading hover:theme-bg-accent-soft"
                }
                ${collapsed ? "justify-center px-2" : ""}`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom row */}
      <div className={`flex items-center justify-around py-4 border-t theme-border
        ${collapsed ? "flex-col gap-3" : ""}`}>
        <button className="theme-muted hover:theme-accent transition-colors"
                aria-label="Language">
          <Globe size={18} />
        </button>
        <button onClick={toggleTheme}
                className="theme-muted hover:theme-accent transition-colors"
                aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="theme-muted hover:theme-accent transition-colors"
                aria-label="Settings">
          <Settings size={18} />
        </button>
      </div>
    </aside>
  );
}