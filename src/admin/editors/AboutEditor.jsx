import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader, GripVertical } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import ImageUpload from "../components/ImageUpload";

export default function AboutEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [about, setAbout] = useState(content.about);

  useEffect(() => {
    setAbout(content.about);
  }, [content]);

  const handleSave = async () => {
    const newData = { ...content, about };
    await save(newData);
  };

  const updateParagraph = (i, value) => {
    const next = [...(about.paragraphs || [])];
    next[i] = value;
    setAbout({ ...about, paragraphs: next });
  };

  const addParagraph = () => {
    setAbout({
      ...about,
      paragraphs: [...(about.paragraphs || []), ""],
    });
  };

  const removeParagraph = (i) => {
    setAbout({
      ...about,
      paragraphs: (about.paragraphs || []).filter((_, idx) => idx !== i),
    });
  };

  const moveParagraph = (i, direction) => {
    const next = [...(about.paragraphs || [])];
    const swap = i + direction;
    if (swap < 0 || swap >= next.length) return;
    [next[i], next[swap]] = [next[swap], next[i]];
    setAbout({ ...about, paragraphs: next });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">About Me</h1>
          <p className="text-xs theme-muted mt-1">
            Greeting, headline, and bio paragraphs
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

      {/* Greeting */}
<Field label="Greeting" hint="The small text above your name (e.g. 'Hello')">
  <input
    type="text"
    value={about.greeting || ""}
    onChange={(e) => setAbout({ ...about, greeting: e.target.value })}
    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
    style={inputStyle}
  />
</Field>

{/* Greeting Icon */}
<Field label="Greeting Icon" hint="Emoji or text shown before the greeting">
  <input
    type="text"
    value={about.greetingIcon || ""}
    onChange={(e) => setAbout({ ...about, greetingIcon: e.target.value })}
    placeholder="👋"
    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
    style={inputStyle}
  />
</Field>

{/* Greeting Size */}
<Field label="Greeting Size" hint="How big the greeting text appears">
  <select
    value={about.greetingSize || "medium"}
    onChange={(e) => setAbout({ ...about, greetingSize: e.target.value })}
    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
    style={inputStyle}
  >
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </select>
</Field>

{/* Headline */}
<Field label="Headline" hint="Text before your name (e.g. 'I'm')">
  <input
    type="text"
    value={about.headline || ""}
    onChange={(e) => setAbout({ ...about, headline: e.target.value })}
    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
    style={inputStyle}
  />
</Field>

{/* Headline Size */}
<Field label="Headline Size" hint="How big the headline and name appear">
  <select
    value={about.headlineSize || "xlarge"}
    onChange={(e) => setAbout({ ...about, headlineSize: e.target.value })}
    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
    style={inputStyle}
  >
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
    <option value="xlarge">Extra Large (default)</option>
  </select>
</Field>
<ImageUpload
  label="About Photo"
  hint="Upload your profile photo or paste an image URL"
  value={about.photo || ""}
  onChange={(url) => setAbout({ ...about, photo: url })}
  folder="about"
/>

      {/* Paragraphs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium theme-heading">
              Bio Paragraphs
            </label>
            <p className="text-xs theme-muted mt-1">
              Each paragraph is a block of text in your About Me section
            </p>
          </div>
          <button
            onClick={addParagraph}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            <Plus size={14} /> Add Paragraph
          </button>
        </div>

        <div className="space-y-3">
          {(about.paragraphs || []).map((para, i) => (
            <div
              key={i}
              className="rounded-lg p-3 space-y-2"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium theme-muted">
                  Paragraph {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveParagraph(i, -1)}
                    disabled={i === 0}
                    className="p-1 rounded disabled:opacity-30 hover:opacity-70"
                    style={{ color: "var(--text-muted)" }}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveParagraph(i, 1)}
                    disabled={i === (about.paragraphs || []).length - 1}
                    className="p-1 rounded disabled:opacity-30 hover:opacity-70"
                    style={{ color: "var(--text-muted)" }}
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeParagraph(i)}
                    className="p-1.5 rounded-lg"
                    style={{ color: "#ef4444" }}
                    title="Delete paragraph"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <textarea
                rows={4}
                value={para}
                onChange={(e) => updateParagraph(i, e.target.value)}
                placeholder="Write your paragraph here..."
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "var(--text-heading)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom save */}
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

const inputStyle = {
  backgroundColor: "var(--bg-card)",
  color: "var(--text-heading)",
  border: "1px solid var(--border)",
};

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium theme-heading">{label}</label>
      {hint && <p className="text-xs theme-muted mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}