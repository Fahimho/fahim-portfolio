import { useEffect, useState } from "react";
import { useContent } from "../context/ContentContext";
export default function StatusDot({ onClick, collapsed = false }) {
  const { content } = useContent();
  const personal = content.personal;
  const [index, setIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!personal.motivations?.length) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % personal.motivations.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const message = personal.motivations?.[index];

  return (
    <div
      className="absolute -bottom-1 -right-1 z-30"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && message && (
        <div
          className={`absolute z-[100] pointer-events-none
                      px-4 py-2.5 rounded-lg text-xs font-semibold
                      animate-[fadeIn_0.15s_ease-out]
                      ${collapsed
                        ? "top-1/2 left-full -translate-y-1/2 ml-3"
                        : "bottom-full left-1/2 -translate-x-1/2 mb-2"
                      }`}
          style={{
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
            minWidth: "180px",
            maxWidth: "260px",
            width: "max-content",
            lineHeight: "1.35",
            textAlign: "left",
          }}
        >
          {message}

          <span
            className={`absolute ${
              collapsed
                ? "right-full top-1/2 -translate-y-1/2 mr-px"
                : "top-full left-1/2 -translate-x-1/2 -mt-px"
            }`}
            style={{
              width: 0,
              height: 0,
              ...(collapsed
                ? {
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderRight: "6px solid #1a1a1a",
                  }
                : {
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid #1a1a1a",
                  }),
            }}
          />
        </div>
      )}

      <button
        onClick={onClick}
        aria-label="Available — click to contact"
        className="block w-3.5 h-3.5 rounded-full bg-emerald-500
                   border-2 cursor-pointer transition-transform
                   hover:scale-125"
        style={{
          borderColor: "var(--bg-sidebar)",
          minWidth: "14px",
          minHeight: "14px",
        }}
      />
    </div>
  );
}