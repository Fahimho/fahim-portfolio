import { Heart, MapPin, Calendar, Users } from "lucide-react";
import { useContent } from "../context/ContentContext";
export default function ExtraCurricular() {
  const { content } = useContent();
  const extracurricular = content.extracurricular || [];
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
            <Heart size={16} />
            <span>My</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            <span className="theme-accent">Extra-Curriculars</span>
          </h1>
        </div>
      </header>

      {/* ============ TIMELINE ============ */}
      {!extracurricular || extracurricular.length === 0 ? (
        <div
          className="theme-card theme-shadow rounded-2xl p-12 text-center"
          style={{ border: "1px dashed var(--border)" }}
        >
          <Heart
            size={48}
            className="mx-auto mb-4"
            style={{ color: "var(--accent)", opacity: 0.5 }}
          />
          <p className="theme-muted text-sm">
            No extra-curricular activities added yet.
          </p>
        </div>
      ) : (
        <div className="relative">
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

          <div className="space-y-16">
            {extracurricular.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineItem({ item }) {
  const initials = item.event
    .split(" ")
    .filter((w) => w.match(/^[A-Z]/))
    .slice(0, 2)
    .join("");

  return (
    <div className="grid md:grid-cols-[150px_1fr] gap-8 items-start">
      <div className="hidden md:flex justify-center pt-2">
        <div
          className="relative z-10 rounded-full flex items-center justify-center"
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "var(--bg-sidebar)",
            border: "4px solid var(--bg)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          {item.logo ? (
            <img
              src={item.logo}
              alt={item.event}
              className="w-full h-full object-cover rounded-full"
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
      </div>

      <div className="theme-card theme-shadow rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
          <h3 className="text-lg md:text-xl font-bold theme-heading leading-snug">
            <span className="theme-accent">{item.roleAccent}</span>{" "}
            {item.roleRest}
            {item.event && (
              <>
                {" "}
                <span className="theme-muted font-normal">— {item.event}</span>
              </>
            )}
          </h3>

          {(item.start || item.end) && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                         text-xs font-medium whitespace-nowrap self-start"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-body)",
              }}
            >
              <Calendar size={12} />
              {item.start && <span>{item.start}</span>}
              {item.start && item.current && (
                <>
                  <span className="theme-accent">→</span>
                  <span>Present</span>
                </>
              )}
              {item.start && !item.current && item.end && (
                <>
                  <span className="theme-accent">→</span>
                  <span>{item.end}</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm theme-muted mb-4">
          {item.organizer && (
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {item.organizer}
            </span>
          )}
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {item.location}
            </span>
          )}
        </div>

        {item.description && (
          <p className="theme-body text-sm leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {item.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((s, i) => (
              <span
                key={i}
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
    </div>
  );
}