import { useState } from "react";
import {
  Cpu, Bot, Wrench, Code, Database, Cloud, Server, Terminal,
  Smartphone, Monitor, Wifi, Bluetooth, Zap, Battery, Lightbulb,
  CircuitBoard, HardDrive, Router, Radio, Settings, Cog,
  GitBranch, Github, FileCode, Binary, Braces, Palette,
  Brain, Network, Cable, Gauge, Rocket, Star, Award
} from "lucide-react";

// Available icons grouped by category
const ICON_CATEGORIES = {
  "Hardware & IoT": [
    { name: "Cpu", icon: Cpu },
    { name: "CircuitBoard", icon: CircuitBoard },
    { name: "HardDrive", icon: HardDrive },
    { name: "Battery", icon: Battery },
    { name: "Cable", icon: Cable },
    { name: "Wifi", icon: Wifi },
    { name: "Bluetooth", icon: Bluetooth },
    { name: "Router", icon: Router },
    { name: "Radio", icon: Radio },
    { name: "Zap", icon: Zap },
    { name: "Gauge", icon: Gauge },
    { name: "Lightbulb", icon: Lightbulb },
  ],
  "Robotics": [
    { name: "Bot", icon: Bot },
    { name: "Cog", icon: Cog },
    { name: "Settings", icon: Settings },
    { name: "Rocket", icon: Rocket },
    { name: "Network", icon: Network },
    { name: "Brain", icon: Brain },
  ],
  "Software & Code": [
    { name: "Code", icon: Code },
    { name: "Terminal", icon: Terminal },
    { name: "FileCode", icon: FileCode },
    { name: "Braces", icon: Braces },
    { name: "Binary", icon: Binary },
    { name: "GitBranch", icon: GitBranch },
    { name: "Github", icon: Github },
    { name: "Database", icon: Database },
    { name: "Server", icon: Server },
    { name: "Cloud", icon: Cloud },
    { name: "Monitor", icon: Monitor },
    { name: "Smartphone", icon: Smartphone },
  ],
  "Other": [
    { name: "Wrench", icon: Wrench },
    { name: "Palette", icon: Palette },
    { name: "Star", icon: Star },
    { name: "Award", icon: Award },
  ],
};

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Find currently selected icon
  const allIcons = Object.values(ICON_CATEGORIES).flat();
  const currentIcon = allIcons.find((i) => i.name === value);
  const IconPreview = currentIcon?.icon || Cpu;

  // Filter icons by search term
  const filteredCategories = {};
  Object.entries(ICON_CATEGORIES).forEach(([catName, icons]) => {
    const matches = icons.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    if (matches.length > 0) {
      filteredCategories[catName] = matches;
    }
  });

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium theme-heading">Icon</label>
      
      {/* Current selection button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: "var(--bg)",
          border: "1px solid var(--border)",
          color: "var(--text-heading)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "var(--accent-soft)" }}
        >
          <IconPreview size={18} style={{ color: "var(--accent)" }} />
        </div>
        <span className="flex-1 text-left">{value || "Select an icon"}</span>
        <span className="text-xs theme-muted">{open ? "▲" : "▼"}</span>
      </button>

      {/* Picker dropdown */}
      {open && (
        <div
          className="rounded-lg p-3 space-y-3"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search icons (e.g. cpu, code, wifi)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text-heading)",
              border: "1px solid var(--border)",
            }}
          />

          {/* Icon grid */}
          <div className="max-h-64 overflow-y-auto space-y-3">
            {Object.entries(filteredCategories).map(([catName, icons]) => (
              <div key={catName}>
                <p className="text-xs font-bold theme-muted mb-2">
                  {catName}
                </p>
                <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
                  {icons.map(({ name, icon: IconComp }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        onChange(name);
                        setOpen(false);
                        setSearch("");
                      }}
                      title={name}
                      className="aspect-square rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                      style={{
                        backgroundColor:
                          value === name
                            ? "var(--accent)"
                            : "var(--bg)",
                        color:
                          value === name
                            ? "var(--text-on-accent)"
                            : "var(--text-body)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <IconComp size={16} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(filteredCategories).length === 0 && (
              <p className="text-xs theme-muted text-center py-4">
                No icons match "{search}"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}