import { Folder, ExternalLink, Github, Play } from "lucide-react";
import { useContent } from "../context/ContentContext";
export default function Projects() {
  const { content } = useContent();
  const projects = content.projects || [];
  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "2px dashed var(--accent)",
            borderLeft: "2px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-2 pt-4">
          <p className="theme-muted text-sm font-medium flex items-center justify-center gap-2">
            <Folder size={16} />
            <span>My</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            <span className="theme-accent">Projects</span>
          </h1>
        </div>
      </header>

      {/* ============ PROJECT CARDS ============ */}
      {!projects || projects.length === 0 ? (
        <div
          className="theme-card theme-shadow rounded-2xl p-12 text-center"
          style={{ border: "1px dashed var(--border)" }}
        >
          <Folder
            size={48}
            className="mx-auto mb-4"
            style={{ color: "var(--accent)", opacity: 0.5 }}
          />
           <p className="theme-muted text-sm">
            No projects added yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="theme-card theme-shadow rounded-2xl overflow-hidden
                    transition-transform duration-200 hover:scale-[1.02]">
      {/* Thumbnail */}
      <div
        className="aspect-video flex items-center justify-center relative"
        style={{ backgroundColor: "var(--accent-soft)" }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Folder size={48} style={{ color: "var(--accent)", opacity: 0.5 }} />
        )}

        {/* Status badge */}
        {project.status && (
          <span
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--text-on-accent)",
            }}
          >
            {project.status}
          </span>
        )}

        {/* Video play indicator */}
        {project.video && (
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full
                          flex items-center justify-center"
               style={{ backgroundColor: "var(--accent)" }}>
            <Play size={18} style={{ color: "var(--text-on-accent)" }} fill="currentColor" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          {project.category && (
            <span className="text-xs font-medium theme-accent">
              {project.category}
            </span>
          )}
          <h3 className="text-lg font-bold theme-heading leading-snug">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="text-xs theme-muted mt-1">{project.tagline}</p>
          )}
        </div>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="flex gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs theme-body hover:theme-accent transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs theme-body hover:theme-accent transition-colors"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}