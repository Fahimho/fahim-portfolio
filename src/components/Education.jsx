import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useContent } from "../context/ContentContext";
export default function Education() {
  const { content } = useContent();
    const education = content.education;

  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
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
            <GraduationCap size={16} />
            <span>This is my</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            <span className="theme-accent">Education</span> Background
          </h1>
        </div>
      </header>

      {/* ============ TIMELINE ============ */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 hidden md:block"
          style={{
            left: "75px",
            width: "3px",
            backgroundColor: "var(--border)",
            transform: "translateX(-50%)",
            opacity: 0.7,
          }}
        />

        {/* Bottom end cap */}
        <div
          className="absolute hidden md:block rounded-full"
          style={{
            left: "75px",
            bottom: "-20px",
            width: "32px",
            height: "32px",
            border: "3px solid var(--border)",
            opacity: 0.6,
            transform: "translateX(-50%)",
            backgroundColor: "var(--bg)",
          }}
        />

        <div className="space-y-16">
          {education.map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item }) {
  const initials = item.institution
    .split(" ")
    .filter((w) => w.match(/^[A-Z]/))
    .slice(0, 2)
    .join("");

  // The circle container + logo (shared markup)
  const isWhiteBg = item.logoStyle === "white-bg";
  const LogoCircle = (
    <div
      className="relative z-10 rounded-full flex items-center justify-center
                 transition-transform duration-200 hover:scale-105"
      style={{
        width: "120px",
        height: "120px",
        backgroundColor: isWhiteBg ? "#ffffff" : "var(--bg-sidebar)",
        padding: isWhiteBg ? "6px" : "8px",
        borderRadius: "50%",
      }}
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.institution}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
      ) : (
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--accent)" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
  return (
    <div className="grid md:grid-cols-[150px_1fr] gap-8 items-start">
      {/* Logo — wrapped in link only if institutionUrl exists */}
      <div className="hidden md:flex justify-center pt-2">
        {item.institutionUrl ? (
          <a
            href={item.institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${item.institution}`}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            {LogoCircle}
          </a>
        ) : (
          LogoCircle
        )}
      </div>

      {/* Card */}
      <div className="theme-card theme-shadow rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
          <h3 className="text-lg md:text-xl font-bold theme-heading leading-snug">
            <span className="theme-accent">{item.degreeAccent}</span>{" "}
            {item.degreeRest}
          </h3>

          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                       text-xs font-medium whitespace-nowrap self-start"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-body)",
            }}
          >
            <Calendar size={12} />
            <span>{item.start}</span>
            <span className="theme-accent">→</span>
            <span>{item.current ? "Present" : item.end}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm theme-muted mb-4">
          {item.institutionUrl ? (
            <a
              href={item.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:theme-accent transition-colors"
            >
              <GraduationCap size={14} />
              <span className="underline decoration-dotted underline-offset-2">
                {item.institution}
              </span>
            </a>
          ) : (
            <span className="flex items-center gap-1.5">
              <GraduationCap size={14} />
              {item.institution}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {item.location}
          </span>
        </div>

        {item.description && (
          <p className="theme-body text-sm leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {item.highlights?.length > 0 && (
          <ul className="space-y-1.5">
            {item.highlights.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm theme-body"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}