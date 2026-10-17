import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useSaveContent } from "../useSaveContent";
import ImageUpload from "../components/ImageUpload";
import { supabase } from "../../lib/supabase"; // Import supabase for image deletion
import { deleteImage } from "../../lib/uploadImage"; // Import image deleter

export default function ProjectsEditor() {
  const { content, refreshContent } = useContent();
  const { save, saving, error, success } = useSaveContent();

  const [projects, setProjects] = useState(content.projects || []);
  const [editingIndex, setEditingIndex] = useState(null); // null = list view
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    if (content.projects) setProjects(content.projects);
  }, [content.projects]);

  // --- 1. SAVE / ADD / EDIT ---
  const saveAndPublish = async () => {
    const newProjects = [...projects];
    if (editingIndex === projects.length) {
      newProjects.push(currentProject);
    } else {
      newProjects[editingIndex] = currentProject;
    }
    
    setProjects(newProjects);
    
    // Sync to Supabase
    const newData = { ...content, projects: newProjects };
    const ok = await save(newData);
    
    if (ok) {
      setEditingIndex(null);
      setCurrentProject(null);
      await refreshContent(); // Force update the context
    }
  };

  // --- 2. DELETE PROJECT + IMAGE ---
  const handleDelete = async (indexToDelete) => {
    if (!confirm("Are you sure? This will delete the project and its thumbnail permanently.")) return;

    const projectToDelete = projects[indexToDelete];
    
    // A. Delete the image from Supabase Storage (if it exists)
    if (projectToDelete.thumbnail && projectToDelete.thumbnail.includes("supabase.co")) {
      await deleteImage(projectToDelete.thumbnail);
    }

    // B. Remove from local state
    const newProjects = projects.filter((_, idx) => idx !== indexToDelete);
    setProjects(newProjects);

    // C. Save to Supabase immediately
    const newData = { ...content, projects: newProjects };
    await save(newData);
    await refreshContent();
  };

  // ============ LIST VIEW ============
  if (editingIndex === null) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold theme-heading">Projects</h1>
            <p className="text-xs theme-muted mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => {
              setEditingIndex(projects.length);
              setCurrentProject({
                title: "", tagline: "", category: "IoT", status: "Completed",
                start: "", end: "", role: "", problem: "", features: [],
                tech: [], description: "", videoUrl: "", thumbnail: "",
                images: [], docsUrl: "", github: "", live: "", team: [], learnings: "", future: ""
              });
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
          >
            <Plus size={16} /> Add New Project
          </button>
        </div>

        {error && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>❌ {error}</div>}
        {success && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>✅ Saved successfully!</div>}

        {projects.length === 0 ? (
          <div className="p-10 text-center rounded-2xl border-2 border-dashed" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">No projects yet. Click "Add New Project" to start.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((proj, i) => (
              <div key={i} className="p-4 rounded-2xl flex gap-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={24} style={{ color: "var(--text-muted)" }} />
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold theme-heading truncate">{proj.title || "Untitled Project"}</h3>
                  <p className="text-xs theme-muted truncate">{proj.category}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        setEditingIndex(i);
                        setCurrentProject({ ...proj });
                      }}
                      className="text-xs font-medium px-3 py-1 rounded"
                      style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-xs font-medium px-3 py-1 rounded text-red-400 hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ============ EDIT FORM VIEW ============
  const updateField = (field, value) => {
    setCurrentProject({ ...currentProject, [field]: value });
  };

  const updateArray = (field, index, value) => {
    const arr = [...(currentProject[field] || [])];
    arr[index] = value;
    updateField(field, arr);
  };

  const addArrayItem = (field) => {
    updateField(field, [...(currentProject[field] || []), ""]);
  };

  const removeArrayItem = (field, index) => {
    updateField(field, (currentProject[field] || []).filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border)" }}>
        <button onClick={() => setEditingIndex(null)} className="flex items-center gap-2 text-sm theme-muted hover:theme-heading transition-colors">
          <ArrowLeft size={16} /> Back to List
        </button>
        <div className="flex items-center gap-3">
          <button onClick={saveAndPublish} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}>
            {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save & Publish</>}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold theme-heading">Basic Info</h2>
          
          <Field label="Project Title">
            <input type="text" value={currentProject.title} onChange={(e) => updateField("title", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="e.g. Smart Home Automation" />
          </Field>

          <Field label="Tagline" hint="A short one-liner description">
            <input type="text" value={currentProject.tagline} onChange={(e) => updateField("tagline", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="e.g. Control your home from anywhere" />
          </Field>

          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Category">
              <select value={currentProject.category} onChange={(e) => updateField("category", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm">
                <option>IoT</option>
                <option>Robotics</option>
                <option>Web</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={currentProject.status} onChange={(e) => updateField("status", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm">
                <option>Completed</option>
                <option>Ongoing</option>
                <option>Prototype</option>
              </select>
            </Field>
            <Field label="Your Role">
              <input type="text" value={currentProject.role} onChange={(e) => updateField("role", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="e.g. Lead Developer" />
            </Field>
          </div>
        </section>

        {/* Media & Links */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold theme-heading">Media & Links</h2>
          
          <ImageUpload 
            label="Thumbnail Image" 
            hint="This is the image shown on the project card" 
            value={currentProject.thumbnail} 
            onChange={(url) => updateField("thumbnail", url)} 
            folder="projects" 
          />

          <Field label="Video URL" hint="YouTube, Vimeo, or Drive link">
            <input type="url" value={currentProject.videoUrl} onChange={(e) => updateField("videoUrl", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="https://youtube.com/watch?v=..." />
          </Field>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="GitHub Repo Link">
              <input type="url" value={currentProject.github} onChange={(e) => updateField("github", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="https://github.com/..." />
            </Field>
            <Field label="Live Demo Link">
              <input type="url" value={currentProject.live} onChange={(e) => updateField("live", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm" placeholder="https://..." />
            </Field>
          </div>
        </section>

        {/* Full Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold theme-heading">Full Details</h2>
          
          <Field label="Full Description">
            <textarea rows={4} value={currentProject.description} onChange={(e) => updateField("description", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm resize-none" placeholder="Write the full story of your project here. What does it do? How does it work?" />
          </Field>
          
          <Field label="Problem it Solves">
            <textarea rows={2} value={currentProject.problem} onChange={(e) => updateField("problem", e.target.value)} style={inputStyle} className="w-full px-3 py-2 rounded-lg text-sm resize-none" placeholder="What real-world problem were you trying to solve?" />
          </Field>

          <Field label="Tech Stack / Hardware">
            <ArrayInput field="tech" currentProject={currentProject} updateArray={updateArray} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} placeholder="e.g. Arduino, ESP32, React" />
          </Field>

          <Field label="Key Features">
            <ArrayInput field="features" currentProject={currentProject} updateArray={updateArray} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} placeholder="e.g. App Control, Voice Commands" />
          </Field>
        </section>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button onClick={saveAndPublish} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold" style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}>
            {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save & Publish</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Helper Components ============
const inputStyle = { backgroundColor: "var(--bg)", color: "var(--text-heading)", border: "1px solid var(--border)" };

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium theme-heading">{label}</label>
      {hint && <p className="text-xs theme-muted">{hint}</p>}
      {children}
    </div>
  );
}

function ArrayInput({ field, currentProject, updateArray, addArrayItem, removeArrayItem, placeholder }) {
  const items = currentProject[field] || [];
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input type="text" value={item} onChange={(e) => updateArray(field, idx, e.target.value)} style={inputStyle} className="flex-1 px-3 py-2 rounded-lg text-sm" placeholder={placeholder} />
          <button onClick={() => removeArrayItem(field, idx)} className="px-2 text-red-400"><Trash2 size={16} /></button>
        </div>
      ))}
      <button onClick={() => addArrayItem(field)} className="text-xs font-medium px-3 py-1.5 rounded border border-dashed" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        + Add Item
      </button>
    </div>
  );
}