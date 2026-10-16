import { MapPin, Mail, Github, Linkedin, User } from "lucide-react";
import { personal, socials, about } from "../data/content";

export default function HomeSection() {
  const nameParts = personal.name.split(" ");

  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        {/* Dotted corner decoration */}
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "2px dashed var(--accent)",
            borderLeft: "2px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-4 pt-4">
          <p className="theme-heading text-lg font-medium flex items-center justify-center gap-2">
            <span>👋</span>
            <span>{about.greeting}</span>
          </p>

     <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
  <span className="theme-heading">{about.headline}</span>{" "}
  <span className="theme-accent">{personal.name}!</span>
</h1>

          {/* Contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm theme-body pt-2">
            <ContactItem icon={<MapPin size={16} />} text={personal.location} />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Mail size={16} />}
              text={personal.email}
              href={`mailto:${personal.email}`}
            />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Github size={16} />}
              text="@Fahimho"
              href={socials.github}
            />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Linkedin size={16} />}
              text="LinkedIn"
              href={socials.linkedin}
            />
          </div>
        </div>
      </header>

      {/* ============ ABOUT ============ */}
      <section className="space-y-6">
        <h2 className="section-bar text-2xl font-bold theme-heading">
          About Me
        </h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Photo placeholder */}
          <div className="theme-card theme-shadow rounded-2xl p-4 aspect-square
                          flex items-center justify-center overflow-hidden">
            {about.photo ? (
              <img
                src={about.photo}
                alt="About"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full rounded-xl theme-bg-accent-soft
                              flex items-center justify-center">
                <User size={64} className="theme-accent" />
              </div>
            )}
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4 theme-body leading-relaxed">
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon, text, href }) {
  const content = (
    <span className="flex items-center gap-2 theme-body hover:theme-accent transition-colors">
      {icon}
      <span>{text}</span>
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}