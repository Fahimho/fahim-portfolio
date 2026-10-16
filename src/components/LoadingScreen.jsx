import { useEffect, useState } from "react";
import { personal } from "../data/content";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  // 0: line appears, 1: bar fills, 2: name appears, 3: glow pulse, 4: fade out

  const [accent, setAccent] = useState("#f472b6");

  // Get accent color from theme
  useEffect(() => {
    const updateAccent = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAccent(isDark ? "#f472b6" : "#3b82c4");
    };
    updateAccent();
    const observer = new MutationObserver(updateAccent);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Progress fill animation (0 → 100 over 1.2s)
  useEffect(() => {
    const start = performance.now();
    const duration = 1200;

    let frame;
    const animate = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Phase timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),   // bar starts filling
      setTimeout(() => setPhase(2), 1300),  // name fades in
      setTimeout(() => setPhase(3), 1600),  // glow pulse
      setTimeout(() => setPhase(4), 1800),  // fade out
      setTimeout(() => onComplete(), 2000), // done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Skip on click or key
  useEffect(() => {
    const skip = () => onComplete();
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [onComplete]);

  // Split name into parts for styling
  const nameParts = personal.name.split(" ");

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        backgroundColor: "var(--bg)",
        opacity: phase === 4 ? 0 : 1,
        transition: "opacity 0.2s ease",
        cursor: "pointer",
      }}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center" style={{ width: "min(360px, 80vw)" }}>

        {/* ============ LOADING BAR ============ */}
        <div
          className="w-full"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Track */}
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              height: "4px",
              backgroundColor: "var(--border)",
            }}
          >
            {/* Filled portion */}
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}, 0 0 24px ${accent}80`,
                transition: "width 0.05s linear",
              }}
            />
          </div>

          {/* Percentage below the bar */}
          <div
            className="text-center mt-3 text-xs tracking-widest font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            {Math.round(progress)}%
          </div>
        </div>

        {/* ============ DIVIDER LINE ============ */}
        <div
          className="w-full my-6"
          style={{
            height: "1px",
            backgroundColor: "var(--border)",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.4s ease 0.1s",
          }}
        />

        {/* ============ NAME ============ */}
             <h1
          className="text-center font-bold tracking-tight"
          style={{
            fontSize: "clamp(20px, 4vw, 28px)",
            opacity: 1,
            transform: "translateY(0)",
            transition: "text-shadow 0.4s ease",
            textShadow: phase === 3 ? `0 0 24px ${accent}` : "none",
          }}
        >
          {nameParts.map((word, i) => (
            <span key={i}>
              {word === personal.nameHighlight ? (
                <span style={{ color: accent }}>{word}</span>
              ) : (
                <span style={{ color: "var(--text-heading)" }}>{word}</span>
              )}
              {i < nameParts.length - 1 && " "}
            </span>
          ))}
        </h1>

      </div>
    </div>
  );
}