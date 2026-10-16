import { Github, Linkedin, Facebook, Mail } from "lucide-react";
import { personal, socials, footer } from "../data/content";

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-6 text-center">
      <div className="flex justify-center gap-3 mb-4">
        <FooterIcon href={socials.github} icon={<Github size={16} />} label="GitHub" />
        <FooterIcon href={socials.linkedin} icon={<Linkedin size={16} />} label="LinkedIn" />
        <FooterIcon href={socials.facebook} icon={<Facebook size={16} />} label="Facebook" />
        <FooterIcon href={`mailto:${personal.email}`} icon={<Mail size={16} />} label="Email" />
      </div>

      <p className="text-xs theme-muted">{footer.copyright}</p>
      <p className="text-xs theme-muted mt-1">{footer.tagline}</p>
    </footer>
  );
}

function FooterIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full flex items-center justify-center
                 transition-colors duration-200"
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {icon}
    </a>
  );
}