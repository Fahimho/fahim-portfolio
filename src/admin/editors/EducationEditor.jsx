import { useState, useEffect } from "react";
import {
  Plus, Trash2, Save, Loader, ChevronUp, ChevronDown,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import ImageUpload from "../components/ImageUpload";

export default function EducationEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [education, setEducation] = useState(content.education || []);

  useEffect(() => {
    if (content.education) {
      setEducation(content.education);
    }
  }, [content.education]);

  const handleSave = async () => {
    const newData = { ...content, education };
    await save(newData);
  };

  const updateEntry = (i, field, value) => {
    const next = [...education];
    next[i] = { ...next[i], [field]: value };
    setEducation(next);
  };

  const addEntry = () => {
    setEducation([
      ...education,
      {
        degreeAccent: "",
        degreeRest: "",
        institution: "",
        institutionUrl: "",
        location: "",
        start: "",
        end: "",
        current: false,
        logo: "",
        description: "",
        highlights: [],
      },
    ]);
  };

  const removeEntry = (i) => {
    if (!confirm("Delete this entry?")) return;
    setEducation(education.filter((_, idx) => idx !== i));
  };

  const moveEntry = (i, dir) => {
    const swap = i + dir;
    if (swap < 0 || swap >= education.length) return;
    const next = [...education];
    [next[i], next[swap]] = [next[swap], next[i]];
    setEducation(next);
  };

  const updateHighlight = (entryIdx, hlIdx, value) => {
    const next = [...education];
    const highlights = [...(next[entryIdx].highlights || [])];
    highlights[hlIdx] = value;
    next[entryIdx] = { ...next[entryIdx], highlights };
    setEducation(next);
  };

  const addHighlight = (entryIdx) => {
    const next = [...education];
    const highlights = [...(next[entryIdx].highlights || []), ""];
    next[entryIdx] = { ...next[entryIdx], highlights };
    setEducation(next);
  };

  const removeHighlight = (entryIdx, hlIdx) => {
    const next = [...education];
    const highlights = (next[entryIdx].highlights || []).filter(
      (_, i) => i !== hlIdx
    );
    next[entryIdx] = { ...next[entryIdx], highlights };
    setEducation(next);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">Education</h1>
          <p className="text-xs theme-muted mt-1">
            Degrees, certificates, institutions
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          {saving ? (
            <><Loader size={16} className="animate-spin" /> Saving...</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
          ✅ Saved successfully!
        </div>
      )}

      {/* Entries */}
      <div className="space-y-4">
        {education.map((entry, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 space-y-4"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Entry header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold theme-accent">
                Entry {i + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveEntry(i, -1)}
                  disabled={i === 0}
                  className="p-1.5 rounded disabled:opacity-30"
                  style={{ color: "var(--text-muted)" }}
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveEntry(i, 1)}
                  disabled={i === education.length - 1}
                  className="p-1.5 rounded disabled:opacity-30"
                  style={{ color: "var(--text-muted)" }}
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() => removeEntry(i)}
                  className="p-1.5 rounded-lg"
                  style={{ color: "#ef4444" }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Degree */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Degree (Accent)" hint="e.g. 'BSc in'">
                <input
                  type="text"
                  value={entry.degreeAccent || ""}
                  onChange={(e) => updateEntry(i, "degreeAccent", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Degree (Rest)" hint="e.g. 'Internet of Things...'">
                <input
                  type="text"
                  value={entry.degreeRest || ""}
                  onChange={(e) => updateEntry(i, "degreeRest", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Institution + URL */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Institution">
                <input
                  type="text"
                  value={entry.institution || ""}
                  onChange={(e) => updateEntry(i, "institution", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Institution URL" hint="Clicking the logo opens this">
                <input
                  type="url"
                  value={entry.institutionUrl || ""}
                  onChange={(e) => updateEntry(i, "institutionUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Location */}
            <Field label="Location">
              <input
                type="text"
                value={entry.location || ""}
                onChange={(e) => updateEntry(i, "location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </Field>

            {/* Dates */}
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="Start Date" hint="e.g. Aug 2025">
                <input
                  type="text"
                  value={entry.start || ""}
                  onChange={(e) => updateEntry(i, "start", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="End Date" hint="Leave empty if current">
                <input
                  type="text"
                  value={entry.end || ""}
                  disabled={entry.current}
                  onChange={(e) => updateEntry(i, "end", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none disabled:opacity-40"
                  style={inputStyle}
                />
              </Field>
              <Field label="Current">
                <label className="flex items-center gap-2 mt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={entry.current || false}
                    onChange={(e) => {
                      updateEntry(i, "current", e.target.checked);
                      if (e.target.checked) updateEntry(i, "end", "");
                    }}
                  />
                  <span className="text-xs theme-body">Currently here</span>
                </label>
              </Field>
            </div>

            {/* Description */}
            <Field label="Description">
              <textarea
                rows={3}
                value={entry.description || ""}
                onChange={(e) => updateEntry(i, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={inputStyle}
              />
            </Field>

            {/* Highlights */}
            <div className="space-y-2">
              <label className="block text-sm font-medium theme-heading">
                Highlights
              </label>
              {(entry.highlights || []).map((h, hIdx) => (
                <div key={hIdx} className="flex gap-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => updateHighlight(i, hIdx, e.target.value)}
                    placeholder="e.g. GPA 5.00 / 5.00"
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={inputStyle}
                  />
                  <button
                    onClick={() => removeHighlight(i, hIdx)}
                    className="px-2 rounded-lg"
                    style={{ color: "#ef4444" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addHighlight(i)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Plus size={12} /> Add Highlight
              </button>
            </div>

            {/* Logo upload */}
            <ImageUpload
              label="Institution Logo"
              hint="Upload logo or paste URL"
              value={entry.logo || ""}
              onChange={(url) => updateEntry(i, "logo", url)}
              folder="education"
            />
          </div>
        ))}
      </div>

      {/* Add entry button */}
      <button
        onClick={addEntry}
        className="w-full py-4 rounded-lg text-sm font-semibold border-2 border-dashed"
        style={{
          borderColor: "var(--accent)",
          color: "var(--accent)",
          backgroundColor: "transparent",
        }}
      >
        <Plus size={16} className="inline mr-2" />
        Add Education Entry
      </button>

      {/* Bottom save */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold disabled:opacity-50"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          {saving ? (
            <><Loader size={16} className="animate-spin" /> Saving...</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "var(--bg)",
  color: "var(--text-heading)",
  border: "1px solid var(--border)",
};

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium theme-heading">{label}</label>
      {hint && <p className="text-xs theme-muted">{hint}</p>}
      {children}
    </div>
  );
}