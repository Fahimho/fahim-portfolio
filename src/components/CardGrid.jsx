import { useState } from "react";
import { Award, ExternalLink, X, MousePointerClick, Calendar, Building2 } from "lucide-react";

export default function CardGrid({ items, emptyMessage }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];
  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  if (!items || items.length === 0) {
    return (
      <div className="theme-card theme-shadow rounded-2xl p-12 text-center" style={{ border: "1px dashed var(--border)" }}>
        <Award size={48} className="mx-auto mb-4" style={{ color: "var(--accent)", opacity: 0.5 }} />
        <p className="theme-muted text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
              style={{
                backgroundColor: activeFilter === cat ? "var(--accent)" : "var(--bg-card)",
                color: activeFilter === cat ? "var(--text-on-accent)" : "var(--text-body)",
                border: "1px solid var(--border)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedItem(item)}
            className="theme-card theme-shadow rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group relative flex flex-col justify-between"
            style={{ border: "2px solid var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center backdrop-blur-sm z-10">
              <span className="bg-[var(--accent)] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                <MousePointerClick size={16} /> View Details
              </span>
            </div>

            <div className="space-y-4">
              {/* Header: Category & Icon */}
              <div className="flex justify-between items-start">
                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-md" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
                  {item.category || "Certificate"}
                </span>
                <Award size={24} style={{ color: "var(--accent)" }} />
              </div>

              {/* Title & Info */}
              <div>
                <h3 className="text-2xl font-black theme-heading leading-tight mb-3 transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-2 text-sm font-semibold theme-body">
                  <span className="flex items-center gap-2">
                    <Building2 size={16} /> {item.issuer || item.organization || "Issuer"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} /> {item.date || item.year || "Year"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============ PROFESSIONAL MODAL ============ */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setSelectedItem(null)}>
          <div 
            className="theme-card theme-shadow rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={() => setSelectedItem(null)} className="absolute top-5 right-5 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/80 transition-colors z-20 backdrop-blur-sm">
              <X size={18} />
            </button>

            <div className="p-8 md:p-10 space-y-8">
              
              {/* Header */}
              <div className="text-center space-y-3 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
                  {selectedItem.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">{selectedItem.title}</h2>
              </div>

              {/* Image Section — Full width, fills the modal */}
              {selectedItem.image && (
                <div className="rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: "var(--border)" }}>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-auto object-cover max-h-[500px]" 
                  />
                </div>
              )}

              {/* Details Table */}
              <div className="grid grid-cols-2 gap-4 rounded-xl p-5" style={{ backgroundColor: "var(--bg)" }}>
                <div className="space-y-1">
                  <p className="text-xs font-semibold theme-muted uppercase tracking-wider">Issued By</p>
                  <p className="text-base font-bold theme-heading">{selectedItem.issuer || selectedItem.organization || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold theme-muted uppercase tracking-wider">Date Awarded</p>
                  <p className="text-base font-bold theme-heading">{selectedItem.date || selectedItem.year || "N/A"}</p>
                </div>
              </div>

              {/* Description */}
              {selectedItem.description && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold theme-heading uppercase tracking-wider">About this Certificate</h4>
                  <p className="text-sm theme-body leading-relaxed">{selectedItem.description}</p>
                </div>
              )}
{/* Action Buttons */}
<div className="pt-4 flex flex-col items-center gap-3">
  {/* Primary action — Verify if URL exists, otherwise just indicate it's a certificate */}
  {selectedItem.link ? (
    <a 
      href={selectedItem.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold transition-transform hover:scale-105 shadow-lg"
      style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
    >
      <ExternalLink size={18} /> Verify Certificate
    </a>
  ) : (
    <div className="text-center space-y-2">
      <p className="text-xs theme-muted italic">
        This certificate does not have an online verification link.
      </p>
    </div>
  )}

  {/* Secondary action — always show "View Image" if certificate image exists */}
  {selectedItem.image && (
    <a 
      href={selectedItem.image} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xs font-medium underline theme-accent hover:opacity-80"
    >
      Open certificate image in full size →
    </a>
  )}
</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}