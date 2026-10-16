import { Trophy } from "lucide-react";
import { achievements } from "../data/content";
import CardGrid from "./CardGrid";

export default function Achievements() {
  return (
    <div className="space-y-10">
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "2px dashed var(--accent)",
            borderLeft: "2px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-2 pt-4">
          <p className="theme-muted text-sm font-medium flex items-center justify-center gap-2">
            <Trophy size={16} />
            <span>My</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            <span className="theme-accent">Achievements</span>
          </h1>
        </div>
      </header>

      <CardGrid
        items={achievements}
        emptyMessage="No achievements added yet."
      />
    </div>
  );
}