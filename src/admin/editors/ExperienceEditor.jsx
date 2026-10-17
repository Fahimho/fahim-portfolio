import { useState, useEffect } from "react";
import {
  Plus, Trash2, Save, Loader, ChevronUp, ChevronDown,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import ImageUpload from "../components/ImageUpload";

export default function ExperienceEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

    const [experience, setExperience] = useState(content.experience || []);

  useEffect(() => {
    if (content.experience) {
      setExperience(content.experience);
    }
  }, [content.experience]);

  const handleSave = async () => {
    const newData = { ...content, experience };
    await save(newData);
  };

  const updateEntry = (i, field, value) => {
    const next = [...experience];
    next[i] = { ...next[i], [field]: value };
    setExperience(next);
  };

  const addEntry = () => {
    setExperience([
      ...experience,
      {
        roleAccent: "",
        roleRest: "",
        organization: "",
        orgUrl: "",
        location: "",
        type: "",
        start: "",
        end: "",
        current: false,
        logo: "",
        description: "",
        skills: [],
      },
    ]);
  };

  const removeEntry = (i) => {
    if (!confirm("Delete this entry?")) return;
    setExperience(experience.filter((_, idx) => idx !== i));
  };

  const moveEntry = (i, dir) => {
    const swap = i + dir;
    if (swap < 0 || swap >= experience.length) return;
    const next = [...experience];
    [next[i], next[swap]] = [next[swap], next[i]];
    setExperience(next);
  };

  const updateSkill = (entryIdx, skillIdx, value) => {
    const next = [...experience];
    const skills = [...(next[entryIdx].skills || [])];
    skills[skillIdx] = value;
    next[entryIdx] = { ...next[entryIdx], skills };
    setExperience(next);
  };

  const addSkill = (entryIdx) => {
    const next = [...experience];
    const skills = [...(next[entryIdx].skills || []), ""];
    next[entryIdx] = { ...next[entryIdx], skills };
    setExperience(next);
  };

  const removeSkill = (entryIdx, skillIdx) => {
    const next = [...experience];
    const skills = (next[entryIdx].skills || []).filter(
      (_, i) => i !== skillIdx
    );
    next[entryIdx] = { ...next[entryIdx], skills };
    setExperience(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">Experience</h1>
          <p className="text-xs theme-muted mt-1">
            Jobs, roles, positions, clubs
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

      <div className="space-y-4">
        {experience.map((entry, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 space-y-4"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
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
                  disabled={i === experience.length - 1}
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
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Role (Accent)" hint="e.g. 'Senior Executive Member'">
                <input
                  type="text"
                  value={entry.roleAccent || ""}
                  onChange={(e) => updateEntry(i, "roleAccent", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Role (Rest)" hint="e.g. '— R&D Team'">
                <input
                  type="text"
                  value={entry.roleRest || ""}
                  onChange={(e) => updateEntry(i, "roleRest", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Org */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Organization">
                <input
                  type="text"
                  value={entry.organization || ""}
                  onChange={(e) => updateEntry(i, "organization", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Organization URL">
                <input
                  type="url"
                  value={entry.orgUrl || ""}
                  onChange={(e) => updateEntry(i, "orgUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Location + Type */}
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Location">
                <input
                  type="text"
                  value={entry.location || ""}
                  onChange={(e) => updateEntry(i, "location", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Type" hint="Full-time / Part-time / Volunteer...">
                <input
                  type="text"
                  value={entry.type || ""}
                  onChange={(e) => updateEntry(i, "type", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="Start Date">
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

            <Field label="Description">
              <textarea
                rows={3}
                value={entry.description || ""}
                onChange={(e) => updateEntry(i, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={inputStyle}
              />
            </Field>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-sm font-medium theme-heading">
                Skills
              </label>
              {(entry.skills || []).map((s, sIdx) => (
                <div key={sIdx} className="flex gap-2">
                  <input
                    type="text"
                    value={s}
                    onChange={(e) => updateSkill(i, sIdx, e.target.value)}
                    placeholder="e.g. Arduino"
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={inputStyle}
                  />
                  <button
                    onClick={() => removeSkill(i, sIdx)}
                    className="px-2 rounded-lg"
                    style={{ color: "#ef4444" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSkill(i)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Plus size={12} /> Add Skill
              </button>
            </div>

            <ImageUpload
              label="Organization Logo"
              hint="Upload logo or paste URL"
              value={entry.logo || ""}
              onChange={(url) => updateEntry(i, "logo", url)}
              folder="experience"
            />
          </div>
        ))}
      </div>

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
        Add Experience Entry
      </button>

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