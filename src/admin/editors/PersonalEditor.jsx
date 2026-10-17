import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";

export default function PersonalEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [personal, setPersonal] = useState(content.personal);
  const [socials, setSocials] = useState(content.socials);

  // Refresh local state when content loads
  useEffect(() => {
    setPersonal(content.personal);
    setSocials(content.socials);
  }, [content]);

  const handleSave = async () => {
    const newData = { ...content, personal, socials };
    await save(newData);
  };

  // Helpers for arrays
  const updateArrayItem = (field, index, value) => {
    const arr = [...(personal[field] || [])];
    arr[index] = value;
    setPersonal({ ...personal, [field]: arr });
  };

  const addArrayItem = (field) => {
    const arr = [...(personal[field] || []), ""];
    setPersonal({ ...personal, [field]: arr });
  };

  const removeArrayItem = (field, index) => {
    const arr = (personal[field] || []).filter((_, i) => i !== index);
    setPersonal({ ...personal, [field]: arr });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">Personal Info</h1>
          <p className="text-xs theme-muted mt-1">
            Name, contact details, titles, motivations
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                     transition-opacity disabled:opacity-50"
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

      {/* Name */}
      <Field label="Full Name">
        <input
          type="text"
          value={personal.name || ""}
          onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Highlight word */}
      <Field label="Highlight Word" hint="Which word in your name to color with accent">
        <input
          type="text"
          value={personal.nameHighlight || ""}
          onChange={(e) => setPersonal({ ...personal, nameHighlight: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Location */}
      <Field label="Location">
        <input
          type="text"
          value={personal.location || ""}
          onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Email */}
      <Field label="Email">
        <input
          type="email"
          value={personal.email || ""}
          onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Phone */}
      <Field label="Phone">
        <input
          type="text"
          value={personal.phone || ""}
          onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Status dot */}
      <Field label="Status Dot" hint="Show the green dot on the sidebar avatar">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={personal.statusDot || false}
            onChange={(e) => setPersonal({ ...personal, statusDot: e.target.checked })}
          />
          <span className="text-sm theme-body">Enabled</span>
        </label>
      </Field>

      {/* Rotating titles */}
      <Field label="Rotating Titles" hint="Cycles through these under your name in the sidebar">
        <ArrayEditor
          items={personal.titles || []}
          onChange={(v) => setPersonal({ ...personal, titles: v })}
          placeholder="e.g., IoT & Robotics Engineering Student"
        />
      </Field>

      {/* Motivations */}
      <Field label="Motivation Messages" hint="Shown in the tooltip when hovering the status dot">
        <ArrayEditor
          items={personal.motivations || []}
          onChange={(v) => setPersonal({ ...personal, motivations: v })}
          placeholder="e.g., Always learning, always growing."
        />
      </Field>

      {/* Socials */}
      <h2 className="text-lg font-bold theme-heading pt-4">Social Links</h2>

      <Field label="GitHub">
        <input
          type="url"
          value={socials.github || ""}
          onChange={(e) => setSocials({ ...socials, github: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      <Field label="LinkedIn">
        <input
          type="url"
          value={socials.linkedin || ""}
          onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      <Field label="Facebook">
        <input
          type="url"
          value={socials.facebook || ""}
          onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </Field>

      {/* Bottom save button */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                     text-sm font-semibold transition-opacity disabled:opacity-50"
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

// ============ Small helpers ============

const inputStyle = {
  backgroundColor: "var(--bg-card)",
  color: "var(--text-heading)",
  border: "1px solid var(--border)",
};

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium theme-heading">
        {label}
      </label>
      {hint && (
        <p className="text-xs theme-muted mb-1.5">{hint}</p>
      )}
      {children}
    </div>
  );
}

function ArrayEditor({ items, onChange, placeholder }) {
  const handleItemChange = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };

  const add = () => onChange([...items, ""]);

  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
          <button
            onClick={() => remove(i)}
            className="px-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "#ef444420",
              color: "#ef4444",
              border: "1px solid #ef444440",
            }}
            title="Remove"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--accent)",
          border: "1px dashed var(--accent)",
        }}
      >
        <Plus size={14} />
        Add more
      </button>
    </div>
  );
}