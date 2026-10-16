import { useState } from "react";
import { Award, ExternalLink } from "lucide-react";

export default function CardGrid({ items, emptyMessage }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];

  const filtered =
    activeFilter === "All"
      ? items
      : items.filter((i) => i.category === activeFilter);

  if (!items || items.length === 0) {
    return (
      <div
        className="theme-card theme-shadow rounded-2xl p-12 text-center"
        style={{ border: "1px dashed var(--border)" }}
      >
        <Award
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--accent)", opacity: 0.5 }}
        />
        <p className="theme-muted text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-medium
                         transition-colors duration-200"
              style={{
                backgroundColor:
                  activeFilter === cat ? "var(--accent)" : "var(--bg-card)",
                color:
                  activeFilter === cat
                    ? "var(--text-on-accent)"
                    : "var(--text-body)",
                border: "1px solid var(--border)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <CardItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function CardItem({ item }) {
  const isEmoji =
    item.icon &&
    item.icon.length <= 4 &&
    !item.icon.startsWith("http");

  const Wrapper = item.link ? "a" : "div";
  const wrapperProps = item.link
    ? {
        href: item.link,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="theme-card theme-shadow rounded-2xl overflow-hidden
                 flex items-stretch transition-transform duration-200
                 hover:scale-[1.02]"
      style={{ cursor: item.link ? "pointer" : "default" }}
    >
      <div
        className="w-24 flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--accent-soft)" }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : isEmoji ? (
          <span className="text-4xl">{item.icon}</span>
        ) : (
          <Award size={32} style={{ color: "var(--accent)" }} />
        )}
      </div>

      <div className="flex-1 p-4">
        <h3
          className="font-bold text-sm leading-snug mb-1"
          style={{ color: "var(--accent)" }}
        >
          {item.title}
        </h3>

        <p className="text-xs theme-body leading-relaxed">
          {item.description || item.issuer || item.organization}
        </p>

        {(item.date || item.year || item.position) && (
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs theme-muted">
            {item.position && (
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                {item.position}
              </span>
            )}
            {item.date || item.year ? (
              <span>{item.date || item.year}</span>
            ) : null}
            {item.link && <ExternalLink size={10} />}
          </div>
        )}
      </div>
    </Wrapper>
  );
}