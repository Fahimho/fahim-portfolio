import { useState, useEffect } from "react";
import {
  Plus, Trash2, Save, Loader, ChevronUp, ChevronDown,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import IconPicker from "../components/IconPicker";

export default function SkillsEditor() {
  const { content } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [skills, setSkills] = useState(content.skills || { highlights: [], categories: [] });

  useEffect(() => {
    if (content.skills) {
      // Auto-fix old data: if `icon` is a URL, move it to `iconUrl` and turn on useUrl
      const fixedSkills = JSON.parse(JSON.stringify(content.skills));
      
      fixedSkills.categories?.forEach(cat => {
        cat.skills?.forEach(skill => {
          if (skill.icon && (skill.icon.startsWith("http") || skill.icon.startsWith("data:"))) {
            skill.iconUrl = skill.icon;
            skill.icon = ""; 
            skill.useUrl = true;
          }
        });
      });

      setSkills(fixedSkills);
    }
  }, [content.skills]);

  const handleSave = async () => {
    const newData = { ...content, skills };
    await save(newData);
  };

  // ============ HIGHLIGHTS LOGIC ============
  const updateHighlight = (i, field, value) => {
    const next = { ...skills };
    next.highlights[i] = { ...next.highlights[i], [field]: value };
    setSkills(next);
  };

  const addHighlight = () => {
    setSkills({
      ...skills,
      highlights: [
        ...(skills.highlights || []),
        { icon: "Cpu", title: "", description: "", skills: [] },
      ],
    });
  };

  const removeHighlight = (i) => {
    if (!confirm("Delete this highlight?")) return;
    setSkills({
      ...skills,
      highlights: (skills.highlights || []).filter((_, idx) => idx !== i),
    });
  };

  const updateHighlightSkill = (hIdx, sIdx, value) => {
    const next = { ...skills };
    const arr = [...(next.highlights[hIdx].skills || [])];
    arr[sIdx] = value;
    next.highlights[hIdx] = { ...next.highlights[hIdx], skills: arr };
    setSkills(next);
  };

  const addHighlightSkill = (hIdx) => {
    const next = { ...skills };
    const arr = [...(next.highlights[hIdx].skills || []), ""];
    next.highlights[hIdx] = { ...next.highlights[hIdx], skills: arr };
    setSkills(next);
  };

  const removeHighlightSkill = (hIdx, sIdx) => {
    const next = { ...skills };
    const arr = (next.highlights[hIdx].skills || []).filter((_, i) => i !== sIdx);
    next.highlights[hIdx] = { ...next.highlights[hIdx], skills: arr };
    setSkills(next);
  };

  // ============ CATEGORIES LOGIC ============
  const updateCategory = (i, field, value) => {
    const next = { ...skills };
    next.categories[i] = { ...next.categories[i], [field]: value };
    setSkills(next);
  };

  const addCategory = () => {
    setSkills({
      ...skills,
      categories: [
        ...(skills.categories || []),
        { name: "", skills: [] },
      ],
    });
  };

  const removeCategory = (i) => {
    if (!confirm("Delete this category?")) return;
    setSkills({
      ...skills,
      categories: (skills.categories || []).filter((_, idx) => idx !== i),
    });
  };

  const moveCategory = (i, dir) => {
    const swap = i + dir;
    if (swap < 0 || swap >= (skills.categories || []).length) return;
    const next = [...skills.categories];
    [next[i], next[swap]] = [next[swap], next[i]];
    setSkills({ ...skills, categories: next });
  };

  const updateSkillInCategory = (catIdx, skillIdx, field, value) => {
    const next = { ...skills };
    const categories = [...next.categories];
    const catSkills = [...categories[catIdx].skills];
    catSkills[skillIdx] = { ...catSkills[skillIdx], [field]: value };
    categories[catIdx] = { ...categories[catIdx], skills: catSkills };
    setSkills({ ...next, categories });
  };

  const addSkillToCategory = (catIdx) => {
    const next = { ...skills };
    const categories = [...next.categories];
    const catSkills = [
      ...(categories[catIdx].skills || []),
      { name: "", level: 50, icon: "", iconUrl: "", iconDark: "", useUrl: false, description: "" },
    ];
    categories[catIdx] = { ...categories[catIdx], skills: catSkills };
    setSkills({ ...next, categories });
  };

  const removeSkillFromCategory = (catIdx, skillIdx) => {
    const next = { ...skills };
    const categories = [...next.categories];
    categories[catIdx].skills = categories[catIdx].skills.filter((_, i) => i !== skillIdx);
    setSkills({ ...next, categories });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-heading">Skills</h1>
          <p className="text-xs theme-muted mt-1">Highlights, categories, and skill levels</p>
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

      {error && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>❌ {error}</div>}
      {success && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>✅ Saved successfully!</div>}

      {/* HIGHLIGHTS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold theme-heading border-b pb-2" style={{ borderColor: "var(--border)" }}>Top Highlights</h2>
        
        {(skills.highlights || []).map((hl, i) => (
          <div key={i} className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold theme-accent">Highlight {i + 1}</span>
              <button onClick={() => removeHighlight(i)} style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Icon Name" hint="Lucide icon (e.g. Cpu, Bot)">
                <IconPicker 
                  value={hl.icon || ""} 
                  onChange={(value) => updateHighlight(i, "icon", value)} 
                />
              </Field>
              <Field label="Title">
                <input type="text" value={hl.title || ""} onChange={(e) => updateHighlight(i, "title", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </Field>
            </div>
            
            <Field label="Description">
              <textarea rows={2} value={hl.description || ""} onChange={(e) => updateHighlight(i, "description", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" />
            </Field>

            <div className="space-y-2">
              <label className="block text-xs font-medium theme-heading">Tags</label>
              {(hl.skills || []).map((s, sIdx) => (
                <div key={sIdx} className="flex gap-2">
                  <input type="text" value={s} onChange={(e) => updateHighlightSkill(i, sIdx, e.target.value)} style={inputStyle} className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none" />
                  <button onClick={() => removeHighlightSkill(i, sIdx)} style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => addHighlightSkill(i)} className="text-xs font-medium px-3 py-1 rounded" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>+ Add Tag</button>
            </div>
          </div>
        ))}
        
        <button onClick={addHighlight} className="w-full py-3 rounded-lg text-sm font-semibold border-2 border-dashed" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          <Plus size={16} className="inline mr-2" /> Add Highlight Card
        </button>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="space-y-4 pt-6">
        <h2 className="text-lg font-bold theme-heading border-b pb-2" style={{ borderColor: "var(--border)" }}>Skill Categories</h2>

        {(skills.categories || []).map((cat, cIdx) => (
          <div key={cIdx} className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold theme-accent">Category {cIdx + 1}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveCategory(cIdx, -1)} disabled={cIdx === 0} className="p-1 rounded disabled:opacity-30" style={{ color: "var(--text-muted)" }}><ChevronUp size={14} /></button>
                  <button onClick={() => moveCategory(cIdx, 1)} disabled={cIdx === (skills.categories || []).length - 1} className="p-1 rounded disabled:opacity-30" style={{ color: "var(--text-muted)" }}><ChevronDown size={14} /></button>
                </div>
              </div>
              <button onClick={() => removeCategory(cIdx)} style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
            </div>

            <Field label="Category Name">
              <input type="text" value={cat.name || ""} onChange={(e) => updateCategory(cIdx, "name", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm outline-none font-bold" />
            </Field>

            <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: "var(--border)" }}>
              {(cat.skills || []).map((skill, sIdx) => (
                <div key={sIdx} className="p-3 rounded-lg space-y-3" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium theme-muted">Skill {sIdx + 1}</span>
                    <button onClick={() => removeSkillFromCategory(cIdx, sIdx)} style={{ color: "#ef4444" }}><Trash2 size={12} /></button>
                  </div>
                  
                  {/* Name & % */}
                  <div className="grid md:grid-cols-[1fr_80px] gap-2">
                    <input type="text" value={skill.name || ""} onChange={(e) => updateSkillInCategory(cIdx, sIdx, "name", e.target.value)} placeholder="Skill Name" style={inputStyle} className="px-3 py-1.5 rounded text-sm outline-none" />
                    <input type="number" min="0" max="100" value={skill.level || 0} onChange={(e) => updateSkillInCategory(cIdx, sIdx, "level", parseInt(e.target.value) || 0)} placeholder="%" style={inputStyle} className="px-3 py-1.5 rounded text-sm outline-none text-center" />
                  </div>
                  
                  {/* Icon Source Toggle */}
                  <div className="flex items-center justify-between p-2 rounded bg-opacity-20" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <span className="text-[10px] theme-muted font-medium">
                      {skill.useUrl ? "Using Custom Image URL" : "Using Lucide Icon"}
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-[10px] theme-muted">Use URL</span>
                      <input 
                        type="checkbox" 
                        className="w-3 h-3 cursor-pointer"
                        checked={skill.useUrl || false}
                        onChange={(e) => updateSkillInCategory(cIdx, sIdx, "useUrl", e.target.checked)}
                      />
                    </label>
                  </div>

                  {/* Icon Pickers */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className={skill.useUrl ? "opacity-30 pointer-events-none" : ""}>
                      <label className="block text-[10px] font-medium theme-muted mb-1">Pick Lucide Icon</label>
                      <IconPicker 
                        value={skill.icon || ""} 
                        onChange={(val) => updateSkillInCategory(cIdx, sIdx, "icon", val)} 
                      />
                    </div>

                    <div className={!skill.useUrl ? "opacity-30 pointer-events-none" : ""}>
                      <label className="block text-[10px] font-medium theme-muted mb-1">Paste Image URL (or Base64)</label>
                      <input 
                        type="text" 
                        value={skill.iconUrl || ""} 
                        onChange={(e) => updateSkillInCategory(cIdx, sIdx, "iconUrl", e.target.value)} 
                        placeholder="https://... (Light Theme)" 
                        style={inputStyle} 
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none mb-2" 
                      />
                      
                      <label className="block text-[10px] font-medium theme-muted mb-1">Optional: Dark Theme URL</label>
                      <input 
                        type="text" 
                        value={skill.iconDark || ""} 
                        onChange={(e) => updateSkillInCategory(cIdx, sIdx, "iconDark", e.target.value)} 
                        placeholder="https://... (White logo for dark mode)" 
                        style={inputStyle} 
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none" 
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[10px] font-medium theme-muted mb-1">Short Description</label>
                    <input 
                      type="text" 
                      value={skill.description || ""} 
                      onChange={(e) => updateSkillInCategory(cIdx, sIdx, "description", e.target.value)} 
                      placeholder="Short description" 
                      style={inputStyle} 
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none" 
                    />
                  </div>
                </div>
              ))}
              
              <button onClick={() => addSkillToCategory(cIdx)} className="text-xs font-medium px-3 py-1.5 rounded border border-dashed" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                + Add Skill to this Category
              </button>
            </div>
          </div>
        ))}

        <button onClick={addCategory} className="w-full py-3 rounded-lg text-sm font-semibold border-2 border-dashed" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          <Plus size={16} className="inline mr-2" /> Add Skill Category
        </button>
      </div>

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
function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium theme-heading">{label}</label>
      {hint && <p className="text-[10px] theme-muted">{hint}</p>}
      {children}
    </div>
  );
}