import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Play, CheckCircle2, Calendar, User, Cpu } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content } = useContent();
  const projects = content.projects || [];

  const getSlug = (title) => {
    if (!title) return "";
    return title
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const project = projects.find((p) => getSlug(p.title) === slug);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold theme-heading">Project not found</h1>
        <p className="text-sm theme-muted mt-2">Looking for: "{slug}"</p>
        <button onClick={() => navigate("/")} className="mt-4 text-sm theme-accent hover:underline">
          ← Back to portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* 1. BACK BUTTON */}
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-medium theme-muted hover:theme-accent transition-colors">
        <ArrowLeft size={16} /> Back to Portfolio
      </button>

      {/* 2. HERO HEADER */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
          {project.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold theme-heading leading-tight">
          {project.title}
        </h1>
        <p className="text-lg theme-muted max-w-2xl mx-auto">
          {project.tagline}
        </p>
      </div>

      {/* 3. MAIN IMAGE */}
      {project.thumbnail && (
        <div className="rounded-2xl overflow-hidden theme-shadow aspect-video border" style={{ borderColor: "var(--border)" }}>
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* 4. QUICK INFO BOXES (Role, Timeline, Tech Stack) */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="theme-card theme-shadow p-5 rounded-xl flex flex-col items-center text-center space-y-2" style={{ border: "1px solid var(--border)" }}>
          <User size={24} style={{ color: "var(--accent)" }} />
          <h4 className="text-xs font-bold theme-muted uppercase tracking-wider">My Role</h4>
          <p className="text-sm theme-heading font-semibold">{project.role || "Developer"}</p>
        </div>
        
        <div className="theme-card theme-shadow p-5 rounded-xl flex flex-col items-center text-center space-y-2" style={{ border: "1px solid var(--border)" }}>
          <Calendar size={24} style={{ color: "var(--accent)" }} />
          <h4 className="text-xs font-bold theme-muted uppercase tracking-wider">Timeline</h4>
          <p className="text-sm theme-heading font-semibold">{project.start || "N/A"} — {project.current ? "Present" : (project.end || "N/A")}</p>
        </div>

        <div className="theme-card theme-shadow p-5 rounded-xl flex flex-col items-center text-center space-y-2" style={{ border: "1px solid var(--border)" }}>
          <Cpu size={24} style={{ color: "var(--accent)" }} />
          <h4 className="text-xs font-bold theme-muted uppercase tracking-wider">Tech Stack</h4>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(project.tech || []).map((t, i) => (
              <span key={i} className="px-2 py-1 rounded text-[10px]" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-body)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. ACTION BUTTONS (GitHub / Live) */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-transform hover:scale-105 theme-card" style={{ border: "1px solid var(--border)" }}>
            <Github size={18} /> View Source Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-transform hover:scale-105" style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}>
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
      </div>

      {/* 6. LONG CONTENT (Step-by-step flow) */}
      <div className="space-y-8 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        
        {project.problem && (
          <div className="space-y-3">
            <h3 className="text-2xl font-bold theme-heading flex items-center gap-2">
              <span className="theme-accent">01.</span> The Problem
            </h3>
            <p className="text-base theme-body leading-relaxed pl-8">
              {project.problem}
            </p>
          </div>
        )}

        {project.description && (
          <div className="space-y-3">
            <h3 className="text-2xl font-bold theme-heading flex items-center gap-2">
              <span className="theme-accent">02.</span> Overview
            </h3>
            <p className="text-base theme-body leading-relaxed whitespace-pre-wrap pl-8">
              {project.description}
            </p>
          </div>
        )}

        {project.features?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-2xl font-bold theme-heading flex items-center gap-2">
              <span className="theme-accent">03.</span> Key Features
            </h3>
            <ul className="space-y-3 pl-8">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base theme-body">
                  <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 7. VIDEO DEMO */}
      {project.videoUrl && (
        <div className="pt-10">
          <h3 className="text-2xl font-bold theme-heading mb-4 flex items-center gap-2">
            <Play size={24} style={{ color: "var(--accent)" }} /> Project Demo
          </h3>
          <div className="aspect-video rounded-2xl overflow-hidden theme-shadow border" style={{ borderColor: "var(--border)" }}>
            <iframe
              width="100%"
              height="100%"
              src={project.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
              title="Project Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}