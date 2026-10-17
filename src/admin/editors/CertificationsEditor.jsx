import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader, ChevronUp, ChevronDown } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import ImageUpload from "../components/ImageUpload";

export default function CertificationsEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [certifications, setCertifications] = useState(content.certifications || []);

  useEffect(() => {
    if (content.certifications) setCertifications(content.certifications);
  }, [content.certifications]);

  const handleSave = async () => {
    const newData = { ...content, certifications };
    await save(newData);
  };

  const updateEntry = (i, field, value) => {
    const next = [...certifications];
    next[i] = { ...next[i], [field]: value };
    setCertifications(next);
  };

  const addEntry = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        category: "Robotics", // Default suggestion
        issuer: "",
        date: "",
        description: "",
        link: "",
        image: "",
      },
    ]);
  };

  const removeEntry = (i) => {
    if (!confirm("Delete this certification?")) return;
    setCertifications(certifications.filter((_, idx) => idx !== i));
  };

  const moveEntry = (i, dir) => {
    const swap = i + dir;
    if (swap < 0 || swap >= certifications.length) return;
    const next = [...certifications];
    [next[i], next[swap]] = [next[swap], next[i]];
    setCertifications(next);
  };

  // Suggestions for the category dropdown
  const categorySuggestions = [
    "Robotics", "Programming", "Debate", "Hackathon", 
    "Academic", "Creative", "Sports", "Professional"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">Certifications</h1>
          <p className="text-xs theme-muted mt-1">Manage your certificates and achievements</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
          style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
        >
          {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Feedback */}
      {error && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>❌ {error}</div>}
      {success && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>✅ Saved successfully!</div>}

      {/* Entries List */}
      <div className="space-y-4">
        {certifications.map((entry, i) => (
          <div key={i} className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            
            {/* Entry Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold theme-accent">Certificate {i + 1}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => moveEntry(i, -1)} disabled={i === 0} className="p-1.5 rounded disabled:opacity-30" style={{ color: "var(--text-muted)" }}><ChevronUp size={14} /></button>
                <button onClick={() => moveEntry(i, 1)} disabled={i === certifications.length - 1} className="p-1.5 rounded disabled:opacity-30" style={{ color: "var(--text-muted)" }}><ChevronDown size={14} /></button>
                <button onClick={() => removeEntry(i)} className="p-1.5 rounded-lg ml-2" style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
              </div>
            </div>

            {/* Title & Category */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Title">
                <input type="text" value={entry.title || ""} onChange={(e) => updateEntry(i, "title", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="e.g. Champion, Line Following Robot" />
              </Field>
              <Field label="Category">
                <input 
                  type="text" 
                  list={`cat-suggestions-${i}`}
                  value={entry.category || ""} 
                  onChange={(e) => updateEntry(i, "category", e.target.value)} 
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" 
                  style={inputStyle} 
                  placeholder="e.g. Robotics, Debate"
                />
                <datalist id={`cat-suggestions-${i}`}>
                  {categorySuggestions.map((s) => <option key={s} value={s} />)}
                </datalist>
              </Field>
            </div>

            {/* Issuer & Date */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Issuer / Organizer">
                <input type="text" value={entry.issuer || ""} onChange={(e) => updateEntry(i, "issuer", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="e.g. UFTB RoboFusion" />
              </Field>
              <Field label="Date / Year">
                <input type="text" value={entry.date || ""} onChange={(e) => updateEntry(i, "date", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="e.g. 2024" />
              </Field>
            </div>

            {/* Description */}
            <Field label="Description">
              <textarea rows={2} value={entry.description || ""} onChange={(e) => updateEntry(i, "description", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={inputStyle} placeholder="What was this certificate for?" />
            </Field>

            {/* Link */}
            <Field label="Verification Link (Optional)">
              <input type="url" value={entry.link || ""} onChange={(e) => updateEntry(i, "link", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="https://..." />
            </Field>

            {/* Image Upload */}
            <ImageUpload
              label="Certificate Image / Badge"
              hint="Upload an image or paste a URL"
              value={entry.image || ""}
              onChange={(url) => updateEntry(i, "image", url)}
              folder="certifications"
            />
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addEntry}
        className="w-full py-4 rounded-lg text-sm font-semibold border-2 border-dashed"
        style={{ borderColor: "var(--accent)", color: "var(--accent)", backgroundColor: "transparent" }}
      >
        <Plus size={16} className="inline mr-2" /> Add Certification
      </button>

      {/* Bottom Save */}
      <div className="pt-4">
        <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold disabled:opacity-50" style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}>
          {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

const inputStyle = { backgroundColor: "var(--bg)", color: "var(--text-heading)", border: "1px solid var(--border)" };
function Field({ label, children }) { return (<div className="space-y-1.5"><label className="block text-xs font-medium theme-heading">{label}</label>{children}</div>); }